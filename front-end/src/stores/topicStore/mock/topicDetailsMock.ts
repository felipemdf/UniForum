import type { Pageable } from '@/core/http/interfaces/Pageable';

function getRandomDate() {
  return new Date(
    new Date('2020-01-01').getTime() +
      Math.random() * (new Date().getTime() - new Date('2020-01-01').getTime())
  ).toISOString();
}

const usersMock: User[] = [
  { username: 'user1', photo: 'photo1.jpg' },
  { username: 'user2', photo: 'photo2.jpg' },
  { username: 'user3', photo: 'photo3.jpg' }
];

export const commentsMock: Commentary[] = [
  {
    id: 1,
    user: usersMock[2],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    qtLikes: 3,
    createdAt: '2024-03-02T12:00:00'
  },

  {
    id: 2,
    user: usersMock[1],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    qtLikes: 8,
    createdAt: '2024-03-02T12:00:00'
  }
];

export const topicDetailsMock: Omit<TopicDetails, 'comments'> = {
  id: 1,
  user: usersMock[0],
  title: 'The Future of Magazines Is on Tablets',
  content:
    "Today, we're looking at three particularly interesting stories. Pinterest added a new location-based feature...",
  qtLikes: 59,
  qtComments: 120,
  createdAt: getRandomDate(),
  course: 1,
  tag: 1
};

const pagination: Pagination = {
  total: 1,
  page: 1
};
export const commentsRequest: Pageable<Commentary> = {
  pagination: pagination,
  result: commentsMock
};
