import { defineStore } from 'pinia';

interface ITopic {
  id: number;
  username: string;
  title: string;
  preview: string;
  likes: number;
  numberComments: number;
  course: string;
  tag: string;
  updatedAt: string;
}

interface IComment {
  id: number;
  username: string;
  content: string;
  likes: number;
  updatedAt: string;
}

interface TopicStore {
  orderBy: OrderBy;
  topic: ITopic;
  comments: IComment[];
}

type OrderBy = 'mais recentes' | 'melhores';

export const useTopicStore = defineStore({
  id: 'topic',
  state: (): TopicStore => ({
    orderBy: 'mais recentes',
    topic: {
      id: 1,
      username: 'Podório',
      title: 'The Future of Magazines Is on Tablets',
      preview:
        "Today, we're looking at three particularly interesting stories. Pinterest added a new location-based feature...",
      likes: 59,
      numberComments: 120,
      updatedAt: '2024-03-02T12:00:00',
      course: 'Sistemas de Informação',
      tag: 'Dúvida'
    },
    comments: [
      {
        id: 1,
        username: 'Podório',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        likes: 3,
        updatedAt: '2024-03-02T12:00:00'
      },

      {
        id: 2,
        username: 'Podório',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        likes: 8,
        updatedAt: '2024-03-02T12:00:00'
      }
    ]
  }),
  actions: {
    // OrderBy
    setOrderBy(value: OrderBy) {
      this.orderBy = value;
    }
  }
});
