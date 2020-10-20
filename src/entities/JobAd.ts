import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./Contact";
import { Company } from "./Company";
import { Field, ObjectType } from "type-graphql";
import { Followup } from "./Followup";

@ObjectType()
@Entity()
export class JobAd extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  // ad
  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  link!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  postedAt?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jobType?: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  stacks?: string[];

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  softSkills?: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  degree?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  minYears?: number;

  // applying status
  @Field({ nullable: true })
  @Column({ default: false })
  applied?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  appliedAt?: string;

  @Field({ nullable: true })
  @Column({ default: false })
  terminated?: boolean;

  // relations
  // many ads may be managed by the same contact | recruiter
  // foreign key
  @Column({ nullable: true })
  contactId?: number;

  @Field(() => Contact, { nullable: true })
  @ManyToOne(() => Contact, (contact) => contact.jobAds, {
    onDelete: "CASCADE",
    eager: false,
  })
  contact: Contact;

  // many ads may be from the same company
  // foreign key
  @Column()
  companyId!: number;

  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.jobAds, {
    onDelete: "CASCADE",
  })
  company: Company;

  // one ad has many followups
  @Field(() => [Followup])
  @OneToMany(() => Followup, (followup) => followup.jobAd)
  followups: Followup[];
}
