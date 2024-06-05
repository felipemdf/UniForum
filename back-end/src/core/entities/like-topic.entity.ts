import { ChildEntity, ManyToOne } from "typeorm";
import { LikeEntity, TopicEntity } from "./index";

@ChildEntity("topic")
export class LikeTopicEntity extends LikeEntity {
  @ManyToOne(() => TopicEntity, (topic) => topic.likes, {eager: true})
  topic: TopicEntity;
}
