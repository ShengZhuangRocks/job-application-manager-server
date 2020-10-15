import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./Contact";
import { JobAd } from "./JobAd";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Company extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  // one company may have many contacts
  @Field(() => [Contact])
  @OneToMany(() => Contact, (contact) => contact.company)
  contacts: Contact[];

  // one company may have many ads
  @Field(() => [JobAd])
  @OneToMany(() => JobAd, (jobAd) => jobAd.company)
  jobAds: JobAd[];
}
