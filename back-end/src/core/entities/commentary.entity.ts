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
import { LikeCommentaryEntity, TopicEntity, UserEntity } from ".";

@Entity({ name: "commentary" })
export class CommentaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TopicEntity, (topic) => topic.commentaries)
  topic: TopicEntity;

  @ManyToOne(() => UserEntity, (user) => user.topics)
  author: UserEntity;

  @OneToMany(() => LikeCommentaryEntity, (like) => like.commentary, {
    lazy: true,
    cascade: true,
  })
  likes: LikeCommentaryEntity[];

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true, default: 0 })
  qtdLikes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
