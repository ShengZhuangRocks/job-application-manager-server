import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Contact } from "../entities/Contact";
import { Company } from "../entities/Company";

@Resolver(Contact)
export class ContactResolver {
  // create
  @Mutation(() => Contact)
  async createContact(
    @Arg("name") name: string,
    @Arg("phone") phone: string,
    @Arg("companyName") companyName: string
  ) {
    let company = await Company.findOne({ name: companyName });
    if (!company) {
      company = await Company.create({ name: companyName }).save();
    }
    return await Contact.create({ name, phone, companyId: company.id }).save();
  }

  @Query(() => [Contact])
  async contacts() {
    return await Contact.find({ relations: ["company"] });
  }

  @Query(() => Contact, { nullable: true })
  async contact(@Arg("id") id: number) {
    return await Contact.findOne(id, { relations: ["company"] });
  }
}
