import type { Pageable } from '@/core/http/interfaces/Pageable';
import Topic from '@/presentation/components/Topic.vue';

function getRandomDate() {
  return new Date(
    new Date('2020-01-01').getTime() +
      Math.random() * (new Date().getTime() - new Date('2020-01-01').getTime())
  ).toISOString();
}

const pagination: Pagination = {
  total: 1,
  page: 1,
  pageSize: 5,
  peerPage: 5
};

const usersMock: User[] = [
  { username: 'user1', photo: 'photo1.jpg' },
  { username: 'user2', photo: 'photo2.jpg' },
  { username: 'user3', photo: 'photo3.jpg' }
];

const topicsMock: Topic[] = [
  {
    id: 1,
    user: usersMock[0],
    title: 'Tópico 1',
    preview: 'Prévia do Tópico 1',
    qtLikes: 25,
    qtComments: 10,
    course: 1,
    tag: 2,
    createdAt: getRandomDate()
  },
  {
    id: 2,
    user: usersMock[1],
    title: 'Tópico 2',
    preview: 'Prévia do Tópico 2',
    qtLikes: 35,
    qtComments: 15,
    course: 1,
    tag: 2,
    createdAt: getRandomDate()
  },
  {
    id: 3,
    user: usersMock[2],
    title: 'Tópico 3',
    preview: 'Prévia do Tópico 3',
    qtLikes: 45,
    qtComments: 20,
    course: 3,
    tag: 4,
    createdAt: getRandomDate()
  },
  {
    id: 4,
    user: usersMock[0],
    title: 'Tópico 4',
    preview: 'Prévia do Tópico 4',
    qtLikes: 55,
    qtComments: 25,
    course: 6,
    tag: 3,
    createdAt: getRandomDate()
  },
  {
    id: 5,
    user: usersMock[1],
    title: 'Tópico 5',
    preview: 'Prévia do Tópico 5',
    qtLikes: 65,
    qtComments: 30,
    course: 3,
    tag: 1,
    createdAt: getRandomDate()
  }
];

export const topicsRequest: Pageable<Topic> = {
  pagination: pagination,
  result: topicsMock
};
