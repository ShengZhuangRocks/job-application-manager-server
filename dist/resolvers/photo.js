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
exports.PhotoResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Photo_1 = require("../entities/Photo");
const Taker_1 = require("../entities/Taker");
let PhotoResolver = class PhotoResolver {
    addPhoto(url, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const u = Taker_1.Taker.create({ name: username });
            yield Taker_1.Taker.save(u);
            const p = Photo_1.Photo.create({ url });
            p.takerId = u.id;
            yield Photo_1.Photo.save(p);
            return p;
        });
    }
    photos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Photo_1.Photo.find({ relations: ["taker"] });
        });
    }
    photo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Photo_1.Photo.findOne(id, { relations: ["taker"] });
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Photo_1.Photo),
    __param(0, type_graphql_1.Arg("url")), __param(1, type_graphql_1.Arg("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PhotoResolver.prototype, "addPhoto", null);
__decorate([
    type_graphql_1.Query(() => [Photo_1.Photo]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PhotoResolver.prototype, "photos", null);
__decorate([
    type_graphql_1.Query(() => Photo_1.Photo, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhotoResolver.prototype, "photo", null);
PhotoResolver = __decorate([
    type_graphql_1.Resolver(Photo_1.Photo)
], PhotoResolver);
exports.PhotoResolver = PhotoResolver;
//# sourceMappingURL=photo.js.map