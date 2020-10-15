import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Taker } from "./Taker";

@ObjectType()
@Entity()
export class Photo extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  url!: string;

  @Field()
  @Column()
  takerId!: number;

  @Field()
  @ManyToOne(() => Taker, (taker) => taker.photos)
  taker: Taker;
}
