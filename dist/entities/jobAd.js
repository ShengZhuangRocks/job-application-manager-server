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
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Date)
], JobAd.prototype, "postedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], JobAd.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], JobAd.prototype, "contactId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], JobAd.prototype, "CompanyId", void 0);
__decorate([
    type_graphql_1.Field(() => Contact_1.Contact),
    typeorm_1.ManyToOne(() => Contact_1.Contact, (contact) => contact.jobAds),
    __metadata("design:type", Contact_1.Contact)
], JobAd.prototype, "contact", void 0);
__decorate([
    type_graphql_1.Field(() => Company_1.Company),
    typeorm_1.ManyToOne(() => Company_1.Company, (company) => company.jobAds),
    __metadata("design:type", Company_1.Company)
], JobAd.prototype, "company", void 0);
JobAd = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], JobAd);
exports.JobAd = JobAd;
//# sourceMappingURL=JobAd.js.map