import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Photo } from "../entities/Photo";
import { Taker } from "../entities/Taker";

@Resolver(Photo)
export class PhotoResolver {
  @Mutation(() => Photo)
  async addPhoto(@Arg("url") url: string, @Arg("username") username: string) {
    const u = Taker.create({ name: username });
    await Taker.save(u);
    const p = Photo.create({ url });
    p.takerId = u.id;

    await Photo.save(p);
    return p;
  }

  @Query(() => [Photo])
  async photos(): Promise<Photo[]> {
    return await Photo.find({ relations: ["taker"] });
    // let repo = getRepository(Photo);
    // return await repo
    //   .createQueryBuilder("photo")
    //   .leftJoinAndSelect("photo.taker", "taker")
    //   .getMany();
  }

  @Query(() => Photo, { nullable: true })
  async photo(@Arg("id") id: number) {
    return await Photo.findOne(id, { relations: ["taker"] });
  }
}
