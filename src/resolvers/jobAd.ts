import Axios from "axios";
import cheerio from "cheerio";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { JobAdInput, UpdatejobAdInput } from "../inputTypes";
import { JobAdResponse, JobAdsResponse } from "../objectTypes";
import { Company } from "./../entities/Company";
import { Contact } from "./../entities/Contact";
import { Followup } from "./../entities/Followup";
import { JobAd } from "./../entities/JobAd";

@Resolver(JobAd)
export class JobAdResolver {
  // create ad
  @Mutation(() => Boolean)
  async createAd(@Arg("input") input: JobAdInput) {
    // 1.check if company and if contact
    let company = await Company.findOne({ name: input.companyName });
    let contact = await Contact.findOne({
      name: input.contactName,
      phone: input.contactNumber,
    });
    // if not company in db, then contact of this company should not exist too
    if (!company) {
      company = await Company.create({ name: input.companyName }).save();
      contact = await Contact.create({
        name: input.contactName,
        phone: input.contactNumber,
        companyId: company.id,
      }).save();
    }
    // company in the db, but not the contact
    if (company && !contact) {
      contact = await Contact.create({
        name: input.contactName,
        phone: input.contactNumber,
        companyId: company.id,
      }).save();
    }
    // return this directly, seems has an issue of relations
    await JobAd.create({
      ...input,
      contactId: contact!.id,
      companyId: company!.id,
    }).save();
    return true;
  }

  //
  @Query(() => [JobAd])
  async jobAds() {
    return await JobAd.find({ relations: ["company", "contact", "followups"] });
  }

  // query by id
  @Query(() => JobAd)
  async jobAdById(@Arg("id", () => Int) id: number) {
    return await JobAd.findOne(id, {
      relations: ["company", "contact", "followups"],
    });
  }

  // query ads with company name
  @Query(() => JobAdsResponse)
  async adsByCompany(@Arg("companyName") companyName: string) {
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return {
        errors: [
          {
            field: "company",
            message: "the company does not exist",
          },
        ],
      };
    }
    const jobAdRepo = getRepository(JobAd);
    // const ads = await JobAd.find({ relations: ["contact", "company"] });
    const ads = await jobAdRepo
      .createQueryBuilder("jobAd")
      .leftJoinAndSelect("jobAd.contact", "contact")
      .leftJoinAndSelect("jobAd.company", "company")
      .where('"jobAd"."companyId"=:id', { id: company.id })
      .getMany();
    return {
      ads: ads,
    };
  }

  // query ads with contact
  @Query(() => JobAdsResponse)
  async jobAdByContact(@Arg("phoneNumber") phoneNumber: string) {
    const contact = await Contact.findOne({ phone: phoneNumber });
    if (!contact) {
      return {
        errors: [
          {
            Field: "phone",
            message: "no contact with such phone number exists",
          },
        ],
      };
    }
    const jobAdRepo = getRepository(JobAd);
    const ads = await jobAdRepo
      .createQueryBuilder("job")
      .leftJoinAndSelect("job.contact", "contact")
      .leftJoinAndSelect("job.company", "company")
      .where('job."contactId"=:id', { id: contact.id })
      .getMany();

    return { ads };
  }

  // update ad
  @Mutation(() => JobAdResponse)
  async updateJobAd(@Arg("input") input: UpdatejobAdInput) {
    const jobAd = await JobAd.findOne(input.id, {
      relations: ["contact", "company", "followups"],
    });

    if (!jobAd) {
      return {
        errors: [
          {
            field: "id",
            message: "jobAd not exist",
          },
        ],
      };
    }

    // main fields
    jobAd.jobType = input.jobType;
    jobAd.stacks = input.stacks;
    jobAd.softSkills = input.softSkills;
    jobAd.degree = input.degree === 1 ? true : false;
    jobAd.minYears = input.minYears;
    input.applied === -1 ? (jobAd.applied = false) : (jobAd.applied = true);
    input.terminated === -1
      ? (jobAd.terminated = false)
      : (jobAd.terminated = true);
    if (input.appliedAt) {
      jobAd.appliedAt = input.appliedAt;
    }
    await JobAd.save(jobAd);

    // update contact info
    // there is another scenrio, your case is transfer to another agent in the middle of the process,
    // so you need add another contact, the relation need to be many-to-many, and a field to show which is current

    if (input.contactName || input.contactNumber || input.email) {
      // only do this for there is input related to contact
      if (jobAd.contact !== null) {
        // contact exist in jobAd
        // 1. check if jobAd.contact match with input
        if (jobAd.contact) {
          if (
            input.contactName !== jobAd.contact.name ||
            input.contactNumber !== jobAd.contact.phone
          ) {
            const contact = await Contact.findOne(jobAd.contactId);
            // although this won't be undefined, as it is in the jobAd, just check it to save trouble from typescript
            if (contact) {
              let name = input.contactName ? input.contactName : contact.name;
              let phone = input.contactNumber
                ? input.contactNumber
                : contact.phone;
              let email = input.email ? input.email : contact.email;
              await getConnection()
                .createQueryBuilder()
                .update(Contact)
                .set({ name, phone, email })
                .where("id=:id", { id: contact.id })
                .execute();
            }
          }
        }
      } else {
        // jobAd.contactId === null
        let contact = await Contact.findOne({ phone: input.contactNumber }); // find options
        if (contact !== undefined) {
          // contact exists, just not set foreign key to it in jobAd,
          // set foreign key
          await getConnection()
            .createQueryBuilder()
            .update(JobAd)
            .set({ contactId: contact.id })
            .where("id=:id", { id: jobAd.id })
            .execute();
          // update contact
          let name = input.contactName ? input.contactName : contact.name;
          let phone = input.contactNumber ? input.contactNumber : contact.phone;
          let email = input.email ? input.email : contact.email;
          await getConnection()
            .createQueryBuilder()
            .update(Contact)
            .set({ name, phone, email })
            .where("id=:id", { id: contact.id })
            .execute();
        } else {
          // contact not exist
          // create contact
          contact = new Contact();
          input.contactName && (contact.name = input.contactName);
          input.contactNumber && (contact.phone = input.contactNumber);
          input.email && (contact.email = input.email);
          contact.companyId = jobAd.companyId;
          await Contact.create(contact).save();
          // set foreign key
          await getConnection()
            .createQueryBuilder()
            .update(JobAd)
            .set({ contactId: contact.id })
            .where("id=:id", { id: jobAd.id })
            .execute();
        }
      }
    }

    // update followups
    // Issue: it will not update the exisitng followps, always create new followups
    if (input.followups) {
      input.followups.forEach(async (f) => {
        const followup = await Followup.findOne({
          id: f.id,
          jobAdId: input.id,
        });
        if (followup) {
          //update
          followup.date = f.date;
          followup.sumary = f.sumary;
          if (f.isCurrentEvent === 1) {
            followup.isCurrentEvent = true;
          } else if (f.isCurrentEvent === -1) {
            followup.isCurrentEvent = false;
          }
          followup.type = f.type;
          await Followup.save(followup);
        } else {
          //create
          await Followup.create({
            id: f.id,
            date: f.date,
            type: f.type,
            sumary: f.sumary,
            isCurrentEvent: f.isCurrentEvent === 1 ? true : false,
            jobAdId: jobAd.id,
          }).save();
        }
      });
    }

    // get final ouput
    const updatedJobAd = await JobAd.findOne(input.id, {
      // Question: how to set items order by like postedAt in followups?
      relations: ["company", "contact", "followups"],
    });
    return { ad: updatedJobAd };
  }

  // delete ad
  @Mutation(() => Boolean)
  async deleteJobAd(@Arg("id", () => Int) id: number) {
    await JobAd.delete({ id });
    return true;
  }

  // create ad by seek url for now
  @Mutation(() => JobAdResponse)
  // @Mutation(() => Boolean)
  async createJobAdByUrl(@Arg("url") url: string) {
    const response = await Axios.get(url);
    const data = response.data;
    const $ = cheerio.load(data);
    // prefer this method than save object directly, this way can expose jobAd.id here
    const jobAd = new JobAd();
    jobAd.link = url;
    jobAd.title = $('span[data-automation="job-detail-title"] span h1').text();
    jobAd.postedAt = $('[data-automation="job-detail-date"] span span').html()!;
    jobAd.description = $("div[data-automation='mobileTemplate']")?.html()!;
    jobAd.city = $("dl dd span span strong")?.html()!;
    // const area = $("dl dd span span span span")?.html();
    // some ad may not show this, then this selector will point to other element
    // an ad may or may not have a contact, and it is not well documented if there is one
    // so would input the contact detail later manually
    jobAd.jobType = $(
      'dd[data-automation="job-detail-work-type"] span span'
    )?.html()!;

    const companyName = $(
      'span[data-automation="advertiser-name"] span'
    )?.html()!;
    let company = await Company.findOne({ name: companyName });
    if (company) {
      jobAd.companyId = company.id;
    } else {
      company = await Company.create({ name: companyName }).save();
      jobAd.companyId = company.id;
    }

    await JobAd.save(jobAd);
    const savedJobAd = JobAd.findOne(jobAd.id, {
      relations: ["contact", "company"],
    });
    return {
      ad: savedJobAd,
    };
  }
}
