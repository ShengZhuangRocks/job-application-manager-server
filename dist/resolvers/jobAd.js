"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobAdResolver = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const inputTypes_1 = require("../inputTypes");
const objectTypes_1 = require("../objectTypes");
const Company_1 = require("./../entities/Company");
const Contact_1 = require("./../entities/Contact");
const Followup_1 = require("./../entities/Followup");
const JobAd_1 = require("./../entities/JobAd");
let JobAdResolver = class JobAdResolver {
    createAd(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let company = yield Company_1.Company.findOne({ name: input.companyName });
            let contact = yield Contact_1.Contact.findOne({
                name: input.contactName,
                phone: input.contactNumber,
            });
            if (!company) {
                company = yield Company_1.Company.create({ name: input.companyName }).save();
                contact = yield Contact_1.Contact.create({
                    name: input.contactName,
                    phone: input.contactNumber,
                    companyId: company.id,
                }).save();
            }
            if (company && !contact) {
                contact = yield Contact_1.Contact.create({
                    name: input.contactName,
                    phone: input.contactNumber,
                    companyId: company.id,
                }).save();
            }
            yield JobAd_1.JobAd.create(Object.assign(Object.assign({}, input), { contactId: contact.id, companyId: company.id })).save();
            return true;
        });
    }
    jobAds() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield JobAd_1.JobAd.find({ relations: ["company", "contact", "followups"] });
        });
    }
    jobAdById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield JobAd_1.JobAd.findOne(id, {
                relations: ["company", "contact", "followups"],
            });
        });
    }
    adsByCompany(companyName) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield Company_1.Company.findOne({ name: companyName });
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
            const jobAdRepo = typeorm_1.getRepository(JobAd_1.JobAd);
            const ads = yield jobAdRepo
                .createQueryBuilder("jobAd")
                .leftJoinAndSelect("jobAd.contact", "contact")
                .leftJoinAndSelect("jobAd.company", "company")
                .where('"jobAd"."companyId"=:id', { id: company.id })
                .getMany();
            return {
                ads: ads,
            };
        });
    }
    jobAdByContact(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield Contact_1.Contact.findOne({ phone: phoneNumber });
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
            const jobAdRepo = typeorm_1.getRepository(JobAd_1.JobAd);
            const ads = yield jobAdRepo
                .createQueryBuilder("job")
                .leftJoinAndSelect("job.contact", "contact")
                .leftJoinAndSelect("job.company", "company")
                .where('job."contactId"=:id', { id: contact.id })
                .getMany();
            return { ads };
        });
    }
    updateJobAd(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobAd = yield JobAd_1.JobAd.findOne(input.id, {
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
            yield JobAd_1.JobAd.save(jobAd);
            if (input.contactName || input.contactNumber || input.email) {
                if (jobAd.contact !== null) {
                    if (jobAd.contact) {
                        if (input.contactName !== jobAd.contact.name ||
                            input.contactNumber !== jobAd.contact.phone) {
                            const contact = yield Contact_1.Contact.findOne(jobAd.contactId);
                            if (contact) {
                                let name = input.contactName ? input.contactName : contact.name;
                                let phone = input.contactNumber
                                    ? input.contactNumber
                                    : contact.phone;
                                let email = input.email ? input.email : contact.email;
                                yield typeorm_1.getConnection()
                                    .createQueryBuilder()
                                    .update(Contact_1.Contact)
                                    .set({ name, phone, email })
                                    .where("id=:id", { id: contact.id })
                                    .execute();
                            }
                        }
                    }
                }
                else {
                    let contact = yield Contact_1.Contact.findOne({ phone: input.contactNumber });
                    if (contact !== undefined) {
                        yield typeorm_1.getConnection()
                            .createQueryBuilder()
                            .update(JobAd_1.JobAd)
                            .set({ contactId: contact.id })
                            .where("id=:id", { id: jobAd.id })
                            .execute();
                        let name = input.contactName ? input.contactName : contact.name;
                        let phone = input.contactNumber ? input.contactNumber : contact.phone;
                        let email = input.email ? input.email : contact.email;
                        yield typeorm_1.getConnection()
                            .createQueryBuilder()
                            .update(Contact_1.Contact)
                            .set({ name, phone, email })
                            .where("id=:id", { id: contact.id })
                            .execute();
                    }
                    else {
                        contact = new Contact_1.Contact();
                        input.contactName && (contact.name = input.contactName);
                        input.contactNumber && (contact.phone = input.contactNumber);
                        input.email && (contact.email = input.email);
                        contact.companyId = jobAd.companyId;
                        yield Contact_1.Contact.create(contact).save();
                        yield typeorm_1.getConnection()
                            .createQueryBuilder()
                            .update(JobAd_1.JobAd)
                            .set({ contactId: contact.id })
                            .where("id=:id", { id: jobAd.id })
                            .execute();
                    }
                }
            }
            if (input.followups) {
                input.followups.forEach((f) => __awaiter(this, void 0, void 0, function* () {
                    const followup = yield Followup_1.Followup.findOne({
                        id: f.id,
                        jobAdId: input.id,
                    });
                    if (followup) {
                        followup.date = f.date;
                        followup.sumary = f.sumary;
                        if (f.isCurrentEvent === 1) {
                            followup.isCurrentEvent = true;
                        }
                        else if (f.isCurrentEvent === -1) {
                            followup.isCurrentEvent = false;
                        }
                        followup.type = f.type;
                        yield Followup_1.Followup.save(followup);
                    }
                    else {
                        yield Followup_1.Followup.create({
                            id: f.id,
                            date: f.date,
                            type: f.type,
                            sumary: f.sumary,
                            isCurrentEvent: f.isCurrentEvent === 1 ? true : false,
                            jobAdId: jobAd.id,
                        }).save();
                    }
                }));
            }
            const updatedJobAd = yield JobAd_1.JobAd.findOne(input.id, {
                relations: ["company", "contact", "followups"],
            });
            return { ad: updatedJobAd };
        });
    }
    deleteJobAd(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield JobAd_1.JobAd.delete({ id });
            return true;
        });
    }
    createJobAdByUrl(url) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(url);
            const data = response.data;
            const $ = cheerio_1.default.load(data);
            const jobAd = new JobAd_1.JobAd();
            jobAd.link = url;
            jobAd.title = $('span[data-automation="job-detail-title"] span h1').text();
            jobAd.postedAt = $('[data-automation="job-detail-date"] span span').html();
            jobAd.description = (_a = $("div[data-automation='mobileTemplate']")) === null || _a === void 0 ? void 0 : _a.html();
            jobAd.city = (_b = $("dl dd span span strong")) === null || _b === void 0 ? void 0 : _b.html();
            jobAd.jobType = (_c = $('dd[data-automation="job-detail-work-type"] span span')) === null || _c === void 0 ? void 0 : _c.html();
            const companyName = (_d = $('span[data-automation="advertiser-name"] span')) === null || _d === void 0 ? void 0 : _d.html();
            let company = yield Company_1.Company.findOne({ name: companyName });
            if (company) {
                jobAd.companyId = company.id;
            }
            else {
                company = yield Company_1.Company.create({ name: companyName }).save();
                jobAd.companyId = company.id;
            }
            yield JobAd_1.JobAd.save(jobAd);
            const savedJobAd = JobAd_1.JobAd.findOne(jobAd.id, {
                relations: ["contact", "company"],
            });
            return {
                ad: savedJobAd,
            };
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputTypes_1.JobAdInput]),
    __metadata("design:returntype", Promise)
], JobAdResolver.prototype, "createAd", null);
__decorate([
    type_graphql_1.Query(() => [JobAd_1.JobAd]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobAdResolver.prototype, "jobAds", null);
__decorate([
    type_graphql_1.Query(() => JobAd_1.JobAd),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobAdResolver.prototype, "jobAdById", null);
__decorate([
    type_graphql_1.Query(() => objectTypes_1.JobAdsResponse),
    __param(0, type_graphql_1.Arg("companyName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobAdResolver.prototype, "adsByCompany", null);
__decorate([
    type_graphql_1.Query(() => objectTypes_1.JobAdsResponse),
    __param(0, type_graphql_1.Arg("phoneNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobAdResolver.prototype, "jobAdByContact", null);
__decorate([
    type_graphql_1.Mutation(() => objectTypes_1.JobAdResponse),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputTypes_1.UpdatejobAdInput]),
    __metadata("design:returntype", Promise)
], JobAdResolver.prototype, "updateJobAd", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobAdResolver.prototype, "deleteJobAd", null);
__decorate([
    type_graphql_1.Mutation(() => objectTypes_1.JobAdResponse),
    __param(0, type_graphql_1.Arg("url")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobAdResolver.prototype, "createJobAdByUrl", null);
JobAdResolver = __decorate([
    type_graphql_1.Resolver(JobAd_1.JobAd)
], JobAdResolver);
exports.JobAdResolver = JobAdResolver;
//# sourceMappingURL=jobAd.js.map