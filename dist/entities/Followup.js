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
exports.Followup = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const JobAd_1 = require("./JobAd");
let Followup = class Followup extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Followup.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Followup.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: "phone" }),
    __metadata("design:type", String)
], Followup.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Followup.prototype, "sumary", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Followup.prototype, "isCurrentEvent", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Followup.prototype, "jobAdId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => JobAd_1.JobAd, (jobAd) => jobAd.followups, { onDelete: "CASCADE" }),
    __metadata("design:type", JobAd_1.JobAd)
], Followup.prototype, "jobAd", void 0);
Followup = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Followup);
exports.Followup = Followup;
//# sourceMappingURL=Followup.js.map