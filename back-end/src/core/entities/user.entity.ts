import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { COURSE } from "./enums/Course";
import { CommentaryEntity, LikeEntity, TopicEntity } from "./index";

import bcrypt from "bcrypt";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  course: COURSE;

  @Column({ nullable: true })
  period: number;

  @Column({
    type: "blob",
    nullable: true,
    transformer: {
      to: (value: string | null) =>
        value ? Buffer.from(value, "base64") : null,
      from: (value: Buffer | null) => (value ? value.toString("base64") : null),
    },
  })
  photo: string;

  @OneToMany(() => TopicEntity, (topic) => topic.author, {
    lazy: true,
    cascade: true,
  })
  topics: Promise<TopicEntity[]>;

  @OneToMany(() => CommentaryEntity, (commentary) => commentary.author, {
    lazy: true,
    cascade: true,
  })
  commentaries: Promise<CommentaryEntity[]>;

  @OneToMany(() => LikeEntity, (like) => like.user, {
    lazy: true,
    cascade: true,
  })
  likes: Promise<LikeEntity[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword(): Promise<void> {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
