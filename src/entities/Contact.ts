import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobAd } from "./JobAd";
import { Company } from "./Company";

@ObjectType()
@Entity()
export class Contact extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  phone!: string;

  @Field()
  @Column()
  companyId!: number;

  // one contact may have many ads
  @Field(() => [JobAd])
  @OneToMany(() => JobAd, (JobAd) => JobAd.contact)
  jobAds: JobAd[];

  // many contacts may be in the same company
  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.contacts)
  company: Company;
}
