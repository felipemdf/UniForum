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
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Username"
              />
              <!-- <p class="text-sm font-medium text-gray-900">{{ props.topic.username}}</p> -->
              <p class="text-sm font-medium text-gray-900">{{ topicStore.topic?.user.username }}</p>
            </button>
            <p class="text-sm text-gray-500">- {{ formattedActivity }}</p>
          </div>

          <!-- Option Button-->
          <div class="relative">
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
                  <a href="#" class="block px-4 py-2 text-red-600 hover:bg-gray-100">Denunciar</a>
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
            {{ topicStore.topic?.course }}
          </div>
          <div class="px-3 py-2 text-xs leading-3 text-indigo-700 bg-indigo-100 rounded-xl">
            {{ topicStore.topic?.tag }}
          </div>
        </div>
      </main>

      <footer>
        <!-- Info -->
        <div class="flex gap-5 mt-4">
          <button
            type="button"
            class="flex items-center gap-1 text-sm font-normal text-gray-400 hover:underline"
          >
            <svg
              class="w-[16px] h-[16px] text-red-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z"
              />
            </svg>

            {{ topicStore.topic?.qtLikes }}
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
  <div class="flex flex-col">
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
        ></textarea>
      </div>
    </div>

    <button
      type="submit"
      class="self-end px-4 py-3 mt-4 text-sm font-medium text-white rounded-lg bg-c-blue-600 hover:bg-c-blue-700 focus:outline-none"
    >
      Comentar
    </button>
  </div>

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
  <Comment v-for="comment in topicStore.topic?.comments" :key="comment.id" :comment="comment" />

  <!-- Infinit scroll -->
  <div
    v-infinite-scroll="[
      fetchComments,
      { distance: 0, direction: 'bottom', interval: 5000, canLoadMore: canLoadMore }
    ]"
  ></div>
</template>

<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core';

// Stores
const topicStore = useTopicStore();

// Refs
const commentsOrderByManager = ref(new CheckboxManager(ORDER_BY_LABELS, ORDER_BY.MAIS_RECENTES));

let isOptionsOpen = ref(false);

onMounted(() => {
  fetchTopic();
  fetchComments();
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
  topicStore.fetchTopic(1);
}

function fetchComments() {
  const orderByFilter = commentsOrderByManager.value.getCheckedCheckboxesToString();

  topicStore.fetchCommentary(1, orderByFilter);
}

function filterComments() {
  topicStore.cleanComments();
  fetchComments();
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
