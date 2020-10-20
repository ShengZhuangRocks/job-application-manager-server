import { ObjectType, Field } from "type-graphql";
import { Followup } from "./entities/Followup";
import { JobAd } from "./entities/JobAd";

@ObjectType()
export class FieldErrors {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class JobAdsResponse {
  @Field(() => [JobAd], { nullable: true })
  ads?: JobAd[];
  @Field(() => [FieldErrors], { nullable: true })
  errors?: FieldErrors[];
}

@ObjectType()
export class JobAdResponse {
  @Field(() => JobAd, { nullable: true })
  ad?: JobAd;
  @Field(() => [FieldErrors], { nullable: true })
  errors?: FieldErrors[];
}

@ObjectType()
export class FollowupResponse {
  @Field(() => Followup, { nullable: true })
  followup?: Followup;
  @Field(() => [FieldErrors], { nullable: true })
  errors?: FieldErrors[];
}
