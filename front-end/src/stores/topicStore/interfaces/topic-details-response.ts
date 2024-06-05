import type { Pageable } from '@/core/http/interfaces/Pageable';

interface User {
  id: number;
  username: string;
  photo: string;
}

interface Commentary {
  id: number;
  user: User;
  content: string;
  usersLikes: number[];
  createdAt: string;
}

export interface TopicDetailsResponse {
  id: number;
  user: User;
  title: string;
  content: string;
  usersLikes: number[];
  qtComments: number;
  course: number;
  tag: number;
  commentaries: Pageable<Commentary>;
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
}
