import { HTTPRequest } from '@/core/http/HTTPRequest';
import { defineStore } from 'pinia';

export interface ICheckbox {
  id: number;
  label: string;
  checked: boolean;
}

interface IFilters {
  searchFilter: string;
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
  orderBy: OrderBy[];
  topics: ITopic[];
}

interface OrderBy {
  label: string;
  value: string;
  selected: boolean;
}

export const useTopicsStore = defineStore({
  id: 'topics',
  state: (): TopicsStore => ({
    filters: {
      searchFilter: '',
      courseFilter: [
        { id: 1, label: 'Administração', checked: false },
        { id: 2, label: 'Biomedicina', checked: false },
        { id: 3, label: 'Enfermagem', checked: false },
        { id: 4, label: 'Engenharia Civil', checked: false },
        { id: 5, label: 'Farmácia', checked: false },
        { id: 6, label: 'Nutrição', checked: false },
        { id: 7, label: 'Arquitetura e Urbanismo', checked: false },
        { id: 8, label: 'Direito', checked: false },
        { id: 9, label: 'Engenharia Ambiental', checked: false },
        { id: 10, label: 'Letras', checked: false },
        { id: 11, label: 'Psicologia', checked: false },
        { id: 12, label: 'Análise e Desenvolvimento de Sistema', checked: false },
        { id: 13, label: 'Ciências Contábeis', checked: false },
        { id: 14, label: 'Engenharia Mecânica', checked: false },
        { id: 15, label: 'Gastronomia', checked: false },
        { id: 16, label: 'Pedagogia', checked: false },
        { id: 17, label: 'Sistemas de Informação', checked: false }
      ],
      tagFilter: [
        { id: 1, label: 'Dúvida', checked: false },
        { id: 2, label: 'Artigo', checked: false },
        { id: 3, label: 'Projeto', checked: false },
        { id: 4, label: 'Oportunidade', checked: false },
        { id: 5, label: 'Evento', checked: false }
      ]
    },
    orderBy: [
      { label: 'Mais recentes', value: 'mais_recentes', selected: true },
      { label: 'Melhores', value: 'melhores', selected: false }
    ],
    topics: []
  }),
  actions: {
    // Filters
    clearFilters() {
      this.filters.courseFilter.forEach((course) => (course.checked = false));
      this.filters.tagFilter.forEach((tag) => (tag.checked = false));
    },

    // OrderBy
    setOrderBy(value: string) {
      this.orderBy.forEach((option) => {
        if (option.value == value) option.selected = true;
        else option.selected = false;
      });
    },

    async fetch(userId: number) {
      console.log('CONSULTANDO');

      const selectedCourses = this.$state.filters.courseFilter
        .filter((course) => course.checked)
        .map((course) => course.id)
        .join(',');

      const selectedTags = this.$state.filters.tagFilter
        .filter((tag) => tag.checked)
        .map((tag) => tag.id)
        .join(',');

      const searchFilter = this.$state.filters.searchFilter.trimEnd().trimStart();
      const orderBy = this.$state.orderBy.filter((option) => option.selected)[0].value;

      // const response = await fetch(`http://127.0.0.1:8000/api/topic`, {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' }
      // });

      const response = await HTTPRequest.createHttpReques()
        .endpoint('topic')
        .param('courses', selectedCourses)
        .param('tags', selectedTags)
        .param('search', searchFilter)
        .param('orderBy', orderBy)
        .send();

      this.topics = response;
    },

    async clearTopics() {
      this.topics = [];
    }
  }
});
