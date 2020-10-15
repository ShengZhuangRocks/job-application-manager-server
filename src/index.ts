// express
// ✔ postgres + typeOrm
// type-graphql
// apollo-server-express
// ✔ cors

import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Company } from "./entities/Company";
import { Contact } from "./entities/Contact";
import { JobAd } from "./entities/JobAd";
import { Photo } from "./entities/Photo";
import { Taker } from "./entities/Taker";
import { CompanyResolver } from "./resolvers/company";
import { ContactResolver } from "./resolvers/contact";
import { HelloResolver } from "./resolvers/hello";
import { PhotoResolver } from "./resolvers/photo";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: "postgresql://postgres:123@localhost:5432/jobs",
    logging: true,
    synchronize: true,
    entities: [JobAd, Contact, Company, Photo, Taker],
    // migrations
  });

  // await Photo.delete({});
  // await Taker.delete({});
  // await Company.delete({});
  // await JobAd.delete({});
  // await Contact.delete({});

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const apolloserver = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        ContactResolver,
        CompanyResolver,
        PhotoResolver,
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
};

main();
