export interface ProfileStore {
  user: User;
}

export interface User {
  id: number;
  username: string;
  course: number;
  period: number;
  photo: string;
  totalizers: Totalizers | null;
}

export interface Totalizers {
  topics: number;
  likes: number;
  commentaries: string;
}
