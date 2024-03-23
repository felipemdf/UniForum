import { defineStore } from 'pinia';

interface ICheckbox {
  id: number;
  label: string;
  checked: boolean;
}

interface IFilters {
  courseFilter: ICheckbox[];
  tagFilter: ICheckbox[];
}

interface ITopic {
  id: number;
  username: string;
  photo: string;
  title: string;
  preview: string;
  qtLikes: number;
  qtComments: number;
  course: string;
  tag: string;
  createdAt: string;
}

interface TopicsStore {
  filters: IFilters;
  orderBy: OrderBy;
  topics: ITopic[];
}

type OrderBy = 'mais recentes' | 'melhores';

export const useTopicsStore = defineStore({
  id: 'topics',
  state: (): TopicsStore => ({
    filters: {
      courseFilter: [
        { id: 1, label: 'Análise e Desenvolvimento de Sistemas', checked: false },
        { id: 2, label: 'Sistemas de Informação', checked: false },
        { id: 3, label: 'Arquitetura', checked: false }
      ],
      tagFilter: [
        { id: 1, label: 'Dúvida', checked: false },
        { id: 2, label: 'Artigo', checked: false },
        { id: 3, label: 'Projeto', checked: false },
        { id: 4, label: 'Oportunidade', checked: false },
        { id: 5, label: 'Recurso', checked: false }
      ]
    },
    orderBy: 'mais recentes',
    topics: [
      // {
      //   id: 1,
      //   username: 'Podório',
      //   title: 'The Future of Magazines Is on Tablets',
      //   preview:
      //     "Today, we're looking at three particularly interesting stories. Pinterest added a new location-based feature...",
      //   likes: 59,
      //   numberComments: 120,
      //   updatedAt: '2024-03-02T12:00:00',
      //   course: 'Sistemas de Informação',
      //   tag: 'Dúvida'
      // },
      // {
      //   id: 2,
      //   username: 'João',
      //   title: 'The Future of Magazines Is on Tablets',
      //   preview:
      //     "Today, we're looking at three particularly interesting stories. Pinterest added a new location-based feature...",
      //   likes: 345,
      //   numberComments: 32,
      //   updatedAt: '2024-03-03T12:00:00',
      //   course: 'Sistemas de Informação',
      //   tag: 'Artigo'
      // }
    ]
  }),
  actions: {
    // Filters
    clearFilters() {
      this.filters.courseFilter.forEach((course) => (course.checked = false));
      this.filters.tagFilter.forEach((tag) => (tag.checked = false));
    },

    // OrderBy
    setOrderBy(value: OrderBy) {
      this.orderBy = value;
    },

    async fetchTopics() {
      // if (params.search) urlParams += `search=${params.search}&`;
      // if (params.course) urlParams += `course=${params.course}&`;
      // if (params.tag) urlParams += `course=${params.tag}&`;
      // urlParams += `orderBy=${params.orderBy}`;

      const response = await fetch(`http://127.0.0.1:8000/api/topic`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      this.topics = data;
    }
  }
});
