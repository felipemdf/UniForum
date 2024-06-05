import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationCount,
  UpdateDateColumn,
} from "typeorm";
import { COURSE } from "./enums/Course";
import { TAG } from "./enums/Tag";
import { CommentaryEntity, LikeTopicEntity, UserEntity } from ".";

@Entity({ name: "topic" })
export class TopicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.topics)
  author: UserEntity;

  @OneToMany(() => CommentaryEntity, (commentary) => commentary.topic, {
    lazy: true,
    cascade: true,
  })
  commentaries: Promise<CommentaryEntity[]>;

  @OneToMany(() => LikeTopicEntity, (like) => like.topic, {
    lazy: true,
    cascade: true,
  })
  likes: Promise<LikeTopicEntity[]>;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  course: COURSE;

  @Column({ nullable: true })
  tag: TAG;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedAt: Date;
}
