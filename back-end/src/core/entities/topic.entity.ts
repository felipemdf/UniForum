import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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
  commentaries: CommentaryEntity[];

  @OneToMany(() => LikeTopicEntity, (like) => like.topic, {
    lazy: true,
    cascade: true,
  })
  likes: LikeTopicEntity[];

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  course: COURSE;

  @Column({ nullable: true })
  tag: TAG;

  @Column({ nullable: true, default: 0 })
  qtdLikes: number;

  @Column({ nullable: true, default: 0 })
  qtdComments: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
