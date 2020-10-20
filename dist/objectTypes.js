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
exports.FollowupResponse = exports.JobAdResponse = exports.JobAdsResponse = exports.FieldErrors = void 0;
const type_graphql_1 = require("type-graphql");
const Followup_1 = require("./entities/Followup");
const JobAd_1 = require("./entities/JobAd");
let FieldErrors = class FieldErrors {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldErrors.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldErrors.prototype, "message", void 0);
FieldErrors = __decorate([
    type_graphql_1.ObjectType()
], FieldErrors);
exports.FieldErrors = FieldErrors;
let JobAdsResponse = class JobAdsResponse {
};
__decorate([
    type_graphql_1.Field(() => [JobAd_1.JobAd], { nullable: true }),
    __metadata("design:type", Array)
], JobAdsResponse.prototype, "ads", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldErrors], { nullable: true }),
    __metadata("design:type", Array)
], JobAdsResponse.prototype, "errors", void 0);
JobAdsResponse = __decorate([
    type_graphql_1.ObjectType()
], JobAdsResponse);
exports.JobAdsResponse = JobAdsResponse;
let JobAdResponse = class JobAdResponse {
};
__decorate([
    type_graphql_1.Field(() => JobAd_1.JobAd, { nullable: true }),
    __metadata("design:type", JobAd_1.JobAd)
], JobAdResponse.prototype, "ad", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldErrors], { nullable: true }),
    __metadata("design:type", Array)
], JobAdResponse.prototype, "errors", void 0);
JobAdResponse = __decorate([
    type_graphql_1.ObjectType()
], JobAdResponse);
exports.JobAdResponse = JobAdResponse;
let FollowupResponse = class FollowupResponse {
};
__decorate([
    type_graphql_1.Field(() => Followup_1.Followup, { nullable: true }),
    __metadata("design:type", Followup_1.Followup)
], FollowupResponse.prototype, "followup", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldErrors], { nullable: true }),
    __metadata("design:type", Array)
], FollowupResponse.prototype, "errors", void 0);
FollowupResponse = __decorate([
    type_graphql_1.ObjectType()
], FollowupResponse);
exports.FollowupResponse = FollowupResponse;
//# sourceMappingURL=objectTypes.js.map