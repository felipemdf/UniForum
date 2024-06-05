<template>
  <!-- Topic -->
  <main>
    <article class="p-6 mb-4 bg-white border-gray-200 rounded shadow">
      <!-- Header -->
      <header class="flex-col">
        <!-- First line -->
        <div class="flex justify-between mb-4">
          <!-- User and topic info -->
          <div class="flex flex-wrap items-center gap-1">
            <button class="inline-flex items-center gap-1">
              <img
                class="w-8 h-8 mr-2 rounded-full"
                :src="
                  topicStore.topic?.user.photo
                    ? 'data:image/png;base64,' + topicStore.topic.user.photo
                    : '/public/userIcon.png'
                "
                alt="Username"
              />
              <!-- <p class="text-sm font-medium text-gray-900">{{ props.topic.username}}</p> -->
              <p class="text-sm font-medium text-gray-900">{{ topicStore.topic?.user.username }}</p>
            </button>
            <p class="text-sm text-gray-500">- {{ formattedActivity }}</p>
          </div>

          <!-- Option Button-->
          <div class="relative" v-if="topicStore.topic?.user.id === authStore.user.id">
            <button
              @click="toggleMenuOptions"
              class="inline-flex items-center p-2 text-center text-gray-500 rounded-lg hover:bg-gray-100"
              type="button"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path
                  d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
                />
              </svg>
              <span class="sr-only">Topic settings</span>
            </button>

            <!-- Dropdown menu -->
            <div
              v-on-click-outside="toggleMenuOptions"
              v-if="isOptionsOpen"
              class="absolute right-0 bg-white divide-y divide-gray-100 rounded shadow w-36"
            >
              <ul class="py-1 text-sm text-gray-700">
                <li>
                  <button
                    @click.prevent="deleteTopic(topicStore.topic?.id)"
                    class="block px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Excluir
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Title -->
        <p class="pb-4 text-xl font-medium leading-5 text-gray-900 border-b border-x-gray-100">
          {{ topicStore.topic?.title }}
        </p>
      </header>

      <!-- Content preview -->
      <main>
        <p class="pt-4 text-sm leading-5 text-gray-600">
          {{ topicStore.topic?.content }}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mt-4">
          <div class="px-3 py-2 text-xs leading-3 text-indigo-700 bg-indigo-100 rounded-xl">
            {{ getCourseLabel(topicStore.topic?.course) }}
          </div>
          <div class="px-3 py-2 text-xs leading-3 text-indigo-700 bg-indigo-100 rounded-xl">
            {{ getTagLabel(topicStore.topic?.tag) }}
          </div>
        </div>
      </main>

      <footer>
        <!-- Info -->
        <div class="flex gap-5 mt-4">
          <button
            type="button"
            class="flex items-center gap-1 text-sm font-normal text-gray-400 hover:underline"
            @click.prevent="likeDeslikeTopic(topicStore.topic)"
          >
            <svg
              :class="isLikedClass(topicStore.topic)"
              class="w-[16px] h-[16px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z"
              />
            </svg>

            {{ topicStore.topic?.usersLikes.length }}
          </button>

          <button
            type="button"
            class="flex items-center gap-1 text-sm font-normal text-gray-400 hover:underline"
          >
            <svg
              class="w-[18px] h-[18px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M3.6 4.5c.3-.3.8-.5 1.3-.5H19a1.9 1.9 0 0 1 2 1.9V15a1.9 1.9 0 0 1-1.9 1.9h-3.6l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.9A1.9 1.9 0 0 1 3 15.1V6c0-.5.2-1 .6-1.4Zm4 3a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.6Z"
                clip-rule="evenodd"
              />
            </svg>

            {{ topicStore.topic?.qtComments }}
          </button>
        </div>
      </footer>
    </article>
  </main>

  <!-- Comment -->
  <form class="flex flex-col" @submit.prevent="createCommentary()">
    <p class="pt-4 pb-3 text-base font-medium leading-5 text-gray-90">Comentar</p>

    <div class="col-span-full">
      <div class="mt-2">
        <textarea
          required
          id="about"
          name="about"
          rows="6"
          placeholder="No que você está pensando?"
          class="block w-full py-2 pl-4 text-sm bg-gray-200 border-gray-300 rounded-md shadow-sm outline-none resize-none text-c-gray-800 focus:border-c-blue-500 focus:ring-c-blue-500 sm:leading-6"
          v-model="formData.content"
        ></textarea>
      </div>
    </div>

    <button
      type="submit"
      class="self-end px-4 py-3 mt-4 text-sm font-medium text-white rounded-lg bg-c-blue-600 hover:bg-c-blue-700 focus:outline-none"
    >
      Comentar
    </button>
  </form>

  <!-- Order by -->
  <div class="relative mt-2 overflow-hidden">
    <div class="flex flex-row items-center justify-between px-2 py-4">
      <div class="inline-flex flex-row w-full gap-4">
        <div v-for="option in commentsOrderByManager.checkboxes" :key="option.id">
          <a
            class="text-sm cursor-pointer text-c-gray-500"
            @click="
              commentsOrderByManager.check(option.id);
              filterComments();
            "
            ><p :class="{ 'text-c-blue-500  ': option.checked }">
              {{ option.label }}
            </p></a
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Comments -->
  <Comment
    v-for="comment in topicStore.topic?.commentaries"
    :key="comment.id"
    :comment="comment"
    @deleteCommentary="deleteCommentary"
    @likeDeslikeCommentary="likeDeslikeCommentary"
  />

  <!-- Infinit scroll -->
  <div
    v-infinite-scroll="[
      fetchComments,
      { distance: 0, direction: 'bottom', interval: 5000, canLoadMore: canLoadMore }
    ]"
  ></div>
</template>

<script setup lang="ts">
import type { Commentary, Topic, TopicDetails } from '@/stores/topicStore/interfaces/Topic';
import { useTimeAgo } from '@vueuse/core';

// Stores
const topicStore = useTopicStore();
const routeStore = useRoute();
const routerStore = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();

// Refs
const commentsOrderByManager = ref(new CheckboxManager(ORDER_BY_LABELS, ORDER_BY.MAIS_RECENTES));
const formData = ref({
  content: ''
});

let isOptionsOpen = ref(false);

onMounted(() => {
  fetchTopic();
});

onUnmounted(() => {
  topicStore.cleanTopic();
});

function canLoadMore() {
  if (topicStore.commentsPagination) {
    return (
      // topicStore.commentsPagination?.pageSize > 0 &&
      topicStore.commentsPagination?.page < topicStore.commentsPagination?.total
    );
  }
  return false;
}

function fetchTopic() {
  topicStore.fetchTopic(parseInt(routeStore.params.id as string));
}

async function fetchComments() {
  const orderByFilter = commentsOrderByManager.value.getCheckedCheckboxesToString();

  await topicStore.fetchCommentary(parseInt(routeStore.params.id as string), orderByFilter);
}

async function filterComments() {
  topicStore.cleanComments();
  await fetchComments();
}

async function createCommentary() {
  const userId = authStore.user.id;
  const topicId = parseInt(routeStore.params.id as string);
  const content = formData.value.content;

  if (content.trim().length == 0) {
    toastStore.notify('Escreva algo antes de comentar!', NotificationType.Warning);
  }
  await topicStore.createCommentary(content, topicId, userId);
  await filterComments();

  formData.value = { content: '' };
}

async function deleteTopic(id: number) {
  try {
    await topicStore.deleteTopic(id);
    routerStore.push('/home');
  } catch (error) {
    console.log(error);
  }
}

async function deleteCommentary(id: number) {
  await topicStore.deleteCommentary(id);
  await filterComments();
}

function isLikedClass(topic: TopicDetails | undefined) {
  if (topic == undefined) return 'text-gray-400';
  return topic.usersLikes.includes(authStore.user.id) ? 'text-red-500' : 'text-gray-400';
}

async function likeDeslikeTopic(topic: TopicDetails | undefined) {
  if (topic == undefined) {
    return;
  }
  const likeUserId = topic.usersLikes.find((id) => id == authStore.user.id);
  topicStore.likeTopic(topic.id);

  if (likeUserId) {
    topic.usersLikes = topic.usersLikes.filter((id) => id != authStore.user.id);
  } else {
    topic.usersLikes.push(authStore.user.id);
  }
}

async function likeDeslikeCommentary(commentary: Commentary | undefined) {
  if (commentary == undefined) {
    return;
  }
  const likeUserId = commentary.usersLikes.find((id) => id == authStore.user.id);
  topicStore.likeCommentary(commentary.id);

  if (likeUserId) {
    commentary.usersLikes = commentary.usersLikes.filter((id) => id != authStore.user.id);
  } else {
    commentary.usersLikes.push(authStore.user.id);
  }
}

const toggleMenuOptions = () => {
  isOptionsOpen.value = !isOptionsOpen.value;
};

const formattedActivity = computed(() => {
  if (topicStore.topic) {
    return useTimeAgo(new Date(topicStore.topic!.createdAt)).value;
  }
});
</script>
