"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Company_1 = require("./entities/Company");
const Contact_1 = require("./entities/Contact");
const Followup_1 = require("./entities/Followup");
const JobAd_1 = require("./entities/JobAd");
const company_1 = require("./resolvers/company");
const contact_1 = require("./resolvers/contact");
const followup_1 = require("./resolvers/followup");
const hello_1 = require("./resolvers/hello");
const jobAd_1 = require("./resolvers/jobAd");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: "postgres",
        url: "postgresql://postgres:123@localhost:5432/jobs",
        logging: true,
        synchronize: true,
        entities: [JobAd_1.JobAd, Contact_1.Contact, Company_1.Company, Followup_1.Followup],
    });
    const app = express_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    const apolloserver = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                hello_1.HelloResolver,
                contact_1.ContactResolver,
                company_1.CompanyResolver,
                jobAd_1.JobAdResolver,
                followup_1.FollowupResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloserver.applyMiddleware({ app });
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`server started on http://localhost:${PORT}/graphql`);
    });
});
main();
//# sourceMappingURL=index.js.map