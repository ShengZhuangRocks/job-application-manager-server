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
exports.ContactResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Contact_1 = require("../entities/Contact");
const Company_1 = require("../entities/Company");
let ContactResolver = class ContactResolver {
    createContact(name, phone, companyName) {
        return __awaiter(this, void 0, void 0, function* () {
            let company = yield Company_1.Company.findOne({ name: companyName });
            if (!company) {
                company = yield Company_1.Company.create({ name: companyName }).save();
            }
            return yield Contact_1.Contact.create({ name, phone, companyId: company.id }).save();
        });
    }
    contacts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Contact_1.Contact.find({ relations: ["company"] });
        });
    }
    contact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Contact_1.Contact.findOne(id, { relations: ["company"] });
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Contact_1.Contact),
    __param(0, type_graphql_1.Arg("name")),
    __param(1, type_graphql_1.Arg("phone")),
    __param(2, type_graphql_1.Arg("companyName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ContactResolver.prototype, "createContact", null);
__decorate([
    type_graphql_1.Query(() => [Contact_1.Contact]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactResolver.prototype, "contacts", null);
__decorate([
    type_graphql_1.Query(() => Contact_1.Contact, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactResolver.prototype, "contact", null);
ContactResolver = __decorate([
    type_graphql_1.Resolver(Contact_1.Contact)
], ContactResolver);
exports.ContactResolver = ContactResolver;
//# sourceMappingURL=contact.js.map