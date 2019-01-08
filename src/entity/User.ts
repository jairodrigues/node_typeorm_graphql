import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  photo?: string;

  @Column()
  password: string;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  createPassword() {
    console.log(this.password);
    this.password = hashSync(this.password, genSaltSync());
  }

  @BeforeUpdate()
  async updatePassword() {
    const oldUser = await User.findOne(this.id);
    if (compareSync(oldUser.password, this.password))
      this.password = hashSync(this.password, genSaltSync());
  }
}
