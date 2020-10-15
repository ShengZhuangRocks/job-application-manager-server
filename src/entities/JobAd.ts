import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./Contact";
import { Company } from "./Company";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class JobAd extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  link!: string;

  @Field()
  @Column()
  postedAt: Date;

  @Field()
  @Column()
  description: string;

  @Column()
  contactId!: number;

  @Column()
  CompanyId!: number;

  // many ads may be managed by the same contact | recruiter
  @Field(() => Contact)
  @ManyToOne(() => Contact, (contact) => contact.jobAds)
  contact: Contact;

  // many ads may be from the same company
  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.jobAds)
  company: Company;
}
