import { Query, Resolver } from "type-graphql";
import { MetaD } from "./../entities/MetaD";

@Resolver(MetaD)
export class MetaResolver {
  @Query(() => [MetaD])
  async metas() {
    return await MetaD.find({ relations: ["p"] });
  }
}
