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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowupResolver = void 0;
const objectTypes_1 = require("../objectTypes");
const type_graphql_1 = require("type-graphql");
const Followup_1 = require("../entities/Followup");
const inputTypes_1 = require("../inputTypes");
let FollowupResolver = class FollowupResolver {
    deleteFollowup(followupId, jobAdId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Followup_1.Followup.delete({ id: followupId, jobAdId });
            return true;
        });
    }
    createFollowups(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.followup.id) {
                const followup = yield Followup_1.Followup.findOne({
                    id: input.followup.id,
                    jobAdId: input.jobAdId,
                });
                if (followup) {
                    return {
                        errors: [
                            {
                                field: "id",
                                message: "follow up with this id pair exists",
                            },
                        ],
                    };
                }
            }
            const savedItem = yield Followup_1.Followup.create({
                date: input.followup.date,
                type: input.followup.type,
                sumary: input.followup.sumary,
                isCurrentEvent: true,
                jobAdId: input.jobAdId,
            }).save();
            return { followup: savedItem };
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("followupId")),
    __param(1, type_graphql_1.Arg("jobAdId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FollowupResolver.prototype, "deleteFollowup", null);
__decorate([
    type_graphql_1.Mutation(() => objectTypes_1.FollowupResponse),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputTypes_1.UpdateFollowupInput]),
    __metadata("design:returntype", Promise)
], FollowupResolver.prototype, "createFollowups", null);
FollowupResolver = __decorate([
    type_graphql_1.Resolver(Followup_1.Followup)
], FollowupResolver);
exports.FollowupResolver = FollowupResolver;
//# sourceMappingURL=followup.js.map