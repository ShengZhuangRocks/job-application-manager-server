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
exports.Contact = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const JobAd_1 = require("./JobAd");
const Company_1 = require("./Company");
let Contact = class Contact extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Contact.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Contact.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Contact.prototype, "companyId", void 0);
__decorate([
    type_graphql_1.Field(() => [JobAd_1.JobAd]),
    typeorm_1.OneToMany(() => JobAd_1.JobAd, (JobAd) => JobAd.contact),
    __metadata("design:type", Array)
], Contact.prototype, "jobAds", void 0);
__decorate([
    type_graphql_1.Field(() => Company_1.Company),
    typeorm_1.ManyToOne(() => Company_1.Company, (company) => company.contacts),
    __metadata("design:type", Company_1.Company)
], Contact.prototype, "company", void 0);
Contact = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map