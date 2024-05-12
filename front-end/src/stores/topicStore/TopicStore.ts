import type { Pageable } from '@/core/http/interfaces/Pageable';

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
        const response: Omit<TopicDetails, 'comments'> = await HTTPRequest.createHttpRequest<
          Omit<TopicDetails, 'comments'>
        >()
          .endpoint('topic/' + id)
          .skipAuthentication()
          .sendMock(topicDetailsMock);

        this.topic = { ...response, comments: [] };
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
          .sendMock(commentsRequest);

        if (this.topic) {
          response.result.forEach((t) => this.topic?.comments.push(t));
          this.commentsPagination = response.pagination;
        } else {
          throw new Error('Não foi encontrado um tópico!');
        }
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
        const response: number = await HTTPRequest.createHttpRequest<number>()
          .endpoint('topic')
          .method(HttpMethod.POST)
          .body({ title, course, tag, content, userId })
          .send();

        return response;
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

    async cleanTopics() {
      this.topics = [];
      this.topicsPagination = undefined;
    },

    async cleanTopic() {
      this.topic = undefined;
      this.commentsPagination = undefined;
    },

    async cleanComments() {
      if (this.topic) this.topic.comments = [];
      this.commentsPagination = undefined;
    },

    getNextPage(): number {
      return (this.topicsPagination?.page ?? 0) + 1;
    }
  }
});
