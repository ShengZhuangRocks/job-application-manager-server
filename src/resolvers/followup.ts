import { FollowupResponse } from "../objectTypes";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Followup } from "../entities/Followup";
import { UpdateFollowupInput } from "../inputTypes";

@Resolver(Followup)
export class FollowupResolver {
  @Mutation(() => Boolean)
  async deleteFollowup(
    @Arg("followupId") followupId: number,
    @Arg("jobAdId") jobAdId: number
  ) {
    await Followup.delete({ id: followupId, jobAdId });
    return true;
  }

  @Mutation(() => FollowupResponse)
  async createFollowups(@Arg("input") input: UpdateFollowupInput) {
    if (input.followup.id) {
      const followup = await Followup.findOne({
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

    // let current: boolean;
    // input.followup.isCurrentEvent === 1 && (current = true);
    // input.followup.isCurrentEvent === -1 && (current = false);

    const savedItem = await Followup.create({
      date: input.followup.date,
      type: input.followup.type,
      sumary: input.followup.sumary,
      isCurrentEvent: true, // Todo
      jobAdId: input.jobAdId,
    }).save();
    return { followup: savedItem };
  }
}
