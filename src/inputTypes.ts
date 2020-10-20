import { Field, InputType, Int } from "type-graphql";
import { FollowupType } from "./entities/Followup";

@InputType()
export class JobAdInput {
  @Field()
  title!: string;
  @Field()
  link!: string;
  @Field()
  postedAt: string;
  @Field()
  description: string;
  @Field()
  companyName!: string;
  @Field()
  contactName!: string;
  @Field()
  contactNumber!: string;
}

@InputType()
export class FollowupInput {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field()
  date!: string;
  @Field(() => String)
  type: FollowupType;
  @Field({ nullable: true })
  sumary?: string;
  @Field({ nullable: true })
  isCurrentEvent?: number; // is current event
}

@InputType()
export class UpdatejobAdInput {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  jobType?: string;

  @Field(() => [String], { nullable: true })
  stacks?: string[];

  @Field(() => [String], { nullable: true })
  softSkills?: string[];

  @Field(() => Int, { nullable: true })
  degree?: number; // convert to boolean in mutation

  @Field(() => Int, { nullable: true })
  minYears?: number;

  @Field({ nullable: true })
  contactName?: string;

  @Field({ nullable: true })
  contactNumber?: string;

  @Field({ nullable: true })
  email?: string;

  // @Field({ nullable: true })
  // companyName?: string;

  @Field(() => Int, { nullable: true })
  applied?: number; // convert to boolean
  @Field({ nullable: true })
  appliedAt?: string;
  @Field(() => Int, { nullable: true })
  terminated?: number; // convert to boolean
  @Field(() => [FollowupInput], { nullable: true })
  followups?: FollowupInput[];
}

@InputType()
export class UpdateFollowupInput {
  @Field()
  jobAdId!: number;
  @Field()
  followup: FollowupInput;
}
