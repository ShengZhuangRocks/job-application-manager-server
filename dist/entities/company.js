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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const Contact_1 = require("./Contact");
const JobAd_1 = require("./JobAd");
const type_graphql_1 = require("type-graphql");
let Company = class Company extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => [Contact_1.Contact]),
    typeorm_1.OneToMany(() => Contact_1.Contact, (contact) => contact.company),
    __metadata("design:type", Array)
], Company.prototype, "contacts", void 0);
__decorate([
    type_graphql_1.Field(() => [JobAd_1.JobAd]),
    typeorm_1.OneToMany(() => JobAd_1.JobAd, (jobAd) => jobAd.company),
    __metadata("design:type", Array)
], Company.prototype, "jobAds", void 0);
Company = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Company);
exports.Company = Company;
//# sourceMappingURL=Company.js.map