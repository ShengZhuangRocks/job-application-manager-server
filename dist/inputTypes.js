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
exports.UpdateFollowupInput = exports.UpdatejobAdInput = exports.FollowupInput = exports.JobAdInput = void 0;
const type_graphql_1 = require("type-graphql");
let JobAdInput = class JobAdInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JobAdInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JobAdInput.prototype, "link", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JobAdInput.prototype, "postedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JobAdInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JobAdInput.prototype, "companyName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JobAdInput.prototype, "contactName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JobAdInput.prototype, "contactNumber", void 0);
JobAdInput = __decorate([
    type_graphql_1.InputType()
], JobAdInput);
exports.JobAdInput = JobAdInput;
let FollowupInput = class FollowupInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FollowupInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FollowupInput.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], FollowupInput.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], FollowupInput.prototype, "sumary", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], FollowupInput.prototype, "isCurrentEvent", void 0);
FollowupInput = __decorate([
    type_graphql_1.InputType()
], FollowupInput);
exports.FollowupInput = FollowupInput;
let UpdatejobAdInput = class UpdatejobAdInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], UpdatejobAdInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdatejobAdInput.prototype, "jobType", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], UpdatejobAdInput.prototype, "stacks", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], UpdatejobAdInput.prototype, "softSkills", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdatejobAdInput.prototype, "degree", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdatejobAdInput.prototype, "minYears", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdatejobAdInput.prototype, "contactName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdatejobAdInput.prototype, "contactNumber", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdatejobAdInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdatejobAdInput.prototype, "applied", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdatejobAdInput.prototype, "appliedAt", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdatejobAdInput.prototype, "terminated", void 0);
__decorate([
    type_graphql_1.Field(() => [FollowupInput], { nullable: true }),
    __metadata("design:type", Array)
], UpdatejobAdInput.prototype, "followups", void 0);
UpdatejobAdInput = __decorate([
    type_graphql_1.InputType()
], UpdatejobAdInput);
exports.UpdatejobAdInput = UpdatejobAdInput;
let UpdateFollowupInput = class UpdateFollowupInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UpdateFollowupInput.prototype, "jobAdId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", FollowupInput)
], UpdateFollowupInput.prototype, "followup", void 0);
UpdateFollowupInput = __decorate([
    type_graphql_1.InputType()
], UpdateFollowupInput);
exports.UpdateFollowupInput = UpdateFollowupInput;
//# sourceMappingURL=inputTypes.js.map