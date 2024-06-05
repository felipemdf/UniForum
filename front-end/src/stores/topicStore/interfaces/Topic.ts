import type { Pageable } from '@/core/http/interfaces/Pageable';

interface User {
  id: number;
  username: string;
  photo: string;
}
export interface Topic {
  id: number;
  user: User;
  title: string;
  preview: string;
  usersLikes: number[];
  qtComments: number;
  course: number;
  tag: number;
  createdAt: string;
}
export interface Commentary {
  id: number;
  user: User;
  content: string;
  usersLikes: number[];
  createdAt: string;
}

export interface TopicDetails {
  id: number;
  user: User;
  title: string;
  content: string;
  usersLikes: number[];
  qtComments: number;
  course: number;
  tag: number;
  commentaries: Commentary[];
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
}

export interface TopicStore {
  topics: Topic[];
  topicsPagination?: Pagination;
  topic?: TopicDetails;
  commentsPagination?: Pagination;
}
