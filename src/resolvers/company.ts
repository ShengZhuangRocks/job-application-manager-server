import { Company } from "../entities/Company";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";

@Resolver(Company)
export class CompanyResolver {
  @Mutation(() => Boolean)
  insert(@Arg("name") name: string) {
    return Company.insert({ name });
  }

  @Query(() => [Company])
  async companies() {
    const companyRepo = getRepository(Company);
    return await companyRepo.find();
  }
}
