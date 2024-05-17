import type { Pageable } from '@/core/http/interfaces/Pageable';
import type { Commentary, Topic, TopicStore } from './interfaces/Topic';
import type { TopicDetailsResponse } from './interfaces/topic-details-response';

export const useTopicStore = defineStore('topic', {
  state: (): TopicStore => ({
    topics: [],
    topicsPagination: undefined,

    topic: undefined,
    commentsPagination: undefined
  }),

  actions: {
    async fetchTopics(search: string, courses: string, tags: string, orderBy: string) {
      try {
        const response: Pageable<Topic> = await HTTPRequest.createHttpRequest<Pageable<Topic>>()
          .endpoint('topic')
          .param('courses', courses)
          .param('tags', tags)
          .param('search', search)
          .param('orderBy', orderBy)
          .pageable(this.getNextPage())
          .skipAuthentication()
          .send();

        response.result.forEach((t) => this.topics.push(t));
        this.topicsPagination = response.pagination;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async fetchTopic(id: number) {
      try {
        const response: TopicDetailsResponse =
          await HTTPRequest.createHttpRequest<TopicDetailsResponse>()
            .endpoint('topic/' + id)
            .skipAuthentication()
            .send();

        this.topic = { ...response, commentaries: response.commentaries.result };
        this.commentsPagination = response.commentaries.pagination;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async fetchCommentary(id: number, orderBy: string) {
      try {
        const response: Pageable<Commentary> = await HTTPRequest.createHttpRequest<
          Pageable<Commentary>
        >()
          .endpoint(`topic/${id}/commentary`)
          .param('orderBy', orderBy)
          .pageable(this.getNextPage())
          .skipAuthentication()
          .send();

        if (this.topic) {
          response.result.forEach((t) => this.topic?.commentaries.push(t));
          this.commentsPagination = response.pagination;
        } else {
          throw new Error('Não foi encontrado um tópico!');
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async createCommentary(content: string, topicId: number, userId: number): Promise<void> {
      try {
        await HTTPRequest.createHttpRequest()
          .endpoint(`topic/${topicId}/commentary`)
          .method(HttpMethod.POST)
          .body({ content, userId })
          .send();

        this.topic!.qtComments += 1;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async createTopic(
      title: string,
      course: number,
      tag: number,
      content: string,
      userId: number
    ): Promise<number> {
      try {
        const response: { id: number } = await HTTPRequest.createHttpRequest<number>()
          .endpoint('topic')
          .method(HttpMethod.POST)
          .body({ title, course, tag, content, userId })
          .send();

        return response.id;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async updateTopic(
      title: string,
      course: number,
      tag: number,
      content: string
    ): Promise<number> {
      try {
        const response: number = await HTTPRequest.createHttpRequest<number>()
          .endpoint(`topic/${this.topic!.id}`)
          .method(HttpMethod.PATCH)
          .body({ title, course, tag, content })
          .sendMock(1);

        return response;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async deleteTopic(id: number): Promise<void> {
      try {
        await HTTPRequest.createHttpRequest()
          .endpoint(`topic/${id}`)
          .method(HttpMethod.DELETE)
          .send();
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async deleteCommentary(id: number): Promise<void> {
      try {
        await HTTPRequest.createHttpRequest()
          .endpoint(`topic/${this.topic?.id}/commentary/${id}`)
          .method(HttpMethod.DELETE)
          .send();
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async cleanTopics() {
      this.topics = [];
      this.topicsPagination = undefined;
    },

    async cleanTopic() {
      this.topic = undefined;
      this.commentsPagination = undefined;
    },

    async cleanComments() {
      if (this.topic) this.topic.commentaries = [];
      this.commentsPagination = undefined;
    },

    getNextPage(): number {
      return (this.topicsPagination?.page ?? 0) + 1;
    }
  }
});
