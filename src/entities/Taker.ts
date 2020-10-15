import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Photo } from "./Photo";

@ObjectType()
@Entity()
export class Taker extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @OneToMany(() => Photo, (photo) => photo.taker)
  photos: Photo[];
}
