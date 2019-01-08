import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @OneToOne(() => Post)
  @JoinColumn()
  post: Post;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
