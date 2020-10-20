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

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  // one contact may have many ads
  @Field(() => [JobAd])
  @OneToMany(() => JobAd, (JobAd) => JobAd.contact)
  jobAds: JobAd[];

  // relations, forign key
  @Field()
  @Column()
  companyId!: number;

  // many contacts may be in the same company
  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.contacts, {
    onDelete: "CASCADE",
  })
  company: Company;
}
