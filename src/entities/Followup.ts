import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobAd } from "./JobAd";

export type FollowupType = "interview" | "email" | "phone";

@ObjectType()
@Entity()
export class Followup extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column({ default: "phone" })
  type: FollowupType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sumary?: string;

  // should add with who, number
  // for now just add this info in sumary

  @Field()
  @Column({ default: false })
  isCurrentEvent: boolean;

  // relations, forign key
  @Column()
  jobAdId: number;

  @ManyToOne(() => JobAd, (jobAd) => jobAd.followups, { onDelete: "CASCADE" })
  jobAd: JobAd;
}
