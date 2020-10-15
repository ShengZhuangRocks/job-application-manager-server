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
exports.Photo = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Taker_1 = require("./Taker");
let Photo = class Photo extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Photo.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Photo.prototype, "url", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Photo.prototype, "takerId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.ManyToOne(() => Taker_1.Taker, (taker) => taker.photos),
    __metadata("design:type", Taker_1.Taker)
], Photo.prototype, "taker", void 0);
Photo = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map