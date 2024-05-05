interface User {
  username: string;
  photo: string;
}
interface Topic {
  id: number;
  user: User;
  title: string;
  preview: string;
  qtLikes: number;
  qtComments: number;
  course: number;
  tag: number;
  createdAt: string;
}
interface Commentary {
  id: number;
  user: User;
  content: string;
  qtLikes: number;
  createdAt: string;
}

interface TopicDetails {
  id: number;
  user: User;
  title: string;
  content: string;
  qtLikes: number;
  qtComments: number;
  course: number;
  tag: number;
  comments: Commentary[];
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  peerPage: number;
}

interface TopicStore {
  topics: Topic[];
  topicsPagination?: Pagination;
  topic?: TopicDetails;
  commentsPagination?: Pagination;
}
