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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobAd = void 0;
const typeorm_1 = require("typeorm");
const Contact_1 = require("./Contact");
const Company_1 = require("./Company");
const type_graphql_1 = require("type-graphql");
const Followup_1 = require("./Followup");
let JobAd = class JobAd extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], JobAd.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], JobAd.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], JobAd.prototype, "link", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], JobAd.prototype, "postedAt", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], JobAd.prototype, "city", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], JobAd.prototype, "jobType", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], JobAd.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], JobAd.prototype, "stacks", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], JobAd.prototype, "softSkills", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], JobAd.prototype, "degree", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], JobAd.prototype, "minYears", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], JobAd.prototype, "applied", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], JobAd.prototype, "appliedAt", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], JobAd.prototype, "terminated", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], JobAd.prototype, "contactId", void 0);
__decorate([
    type_graphql_1.Field(() => Contact_1.Contact, { nullable: true }),
    typeorm_1.ManyToOne(() => Contact_1.Contact, (contact) => contact.jobAds, {
        onDelete: "CASCADE",
        eager: false,
    }),
    __metadata("design:type", Contact_1.Contact)
], JobAd.prototype, "contact", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], JobAd.prototype, "companyId", void 0);
__decorate([
    type_graphql_1.Field(() => Company_1.Company),
    typeorm_1.ManyToOne(() => Company_1.Company, (company) => company.jobAds, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Company_1.Company)
], JobAd.prototype, "company", void 0);
__decorate([
    type_graphql_1.Field(() => [Followup_1.Followup]),
    typeorm_1.OneToMany(() => Followup_1.Followup, (followup) => followup.jobAd),
    __metadata("design:type", Array)
], JobAd.prototype, "followups", void 0);
JobAd = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], JobAd);
exports.JobAd = JobAd;
//# sourceMappingURL=JobAd.js.map