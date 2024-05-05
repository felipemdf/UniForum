<template>
  <!-- Filters -->
  <div class="relative mb-4 bg-white rounded shadow border-c-gray-100">
    <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0">
      <!-- Search Input -->
      <div class="w-full md:w-[55%]">
        <form class="flex items-center" novalidate>
          <label for="search" class="sr-only">Search</label>
          <div class="relative w-full">
            <input
              @keyup.enter="filterTopics"
              v-model="search"
              type="text"
              id="search"
              class="block w-full py-2.5 p-2 pl-4 text-sm text-c-gray-800 border border-c-gray-300 rounded-lg outline-none bg-c-gray-50 focus:border-c-blue-500 focus:ring-c-blue-500"
              placeholder="Pesquisar..."
              required
            />
          </div>

          <button
            @click.prevent="filterTopics"
            class="flex items-center justify-center w-10 h-10 ml-2 text-white bg-blue-600 rounded-lg shrink-0 hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </button>
        </form>
      </div>

      <!-- Filter Button -->
      <div
        class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
      >
        <!-- Button New TOpic -->
        <router-link
          class="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-c-blue-600 rounded-lg hover:bg-c-blue-700"
          to="/topic/create"
        >
          <svg
            class="w-[14px] h-[14px] mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 12h14m-7 7V5"
            />
          </svg>
          Novo Tópico</router-link
        >
        <Filter
          :filters="{ Curso: coursesFilterManager.checkboxes, Tag: tagsFilterManager.checkboxes }"
          @filter="filterTopics"
          @clean="cleanFilters"
        />
      </div>
    </div>
  </div>

  <!-- Order by -->
  <div class="relative overflow-hidden">
    <div class="flex flex-row items-center justify-between px-2 py-4">
      <div class="inline-flex flex-row w-full gap-4">
        <div v-for="option in topicsOrderByManager.checkboxes" :key="option.id">
          <a
            class="text-sm cursor-pointer text-c-gray-500"
            @click="
              topicsOrderByManager.check(option.id);
              filterTopics();
            "
            ><p :class="{ 'text-c-blue-500  ': option.checked }">
              {{ option.label }}
            </p></a
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Topics -->

  <section id="topicsContainer">
    <Topic v-for="topic in topicStore.topics" :key="topic.id" :topic="topic" />
  </section>

  <!-- Infinit scroll -->
  <div
    v-infinite-scroll="[
      fetchTopics,
      { distance: 0, direction: 'bottom', interval: 5000, canLoadMore: canLoadMore }
    ]"
  ></div>
</template>

<script setup lang="ts">
// Refs
const search = ref('');
const coursesFilterManager = ref(new CheckboxManager(COURSE_LABELS));
const tagsFilterManager = ref(new CheckboxManager(TAG_LABELS));
const topicsOrderByManager = ref(new CheckboxManager(ORDER_BY_LABELS, ORDER_BY.MAIS_RECENTES));

// Stores
const topicStore = useTopicStore();

onMounted(() => {
  fetchTopics();
});

onUnmounted(() => {
  topicStore.cleanTopics();
});

function canLoadMore() {
  if (topicStore.topicsPagination) {
    return (
      topicStore.topicsPagination?.pageSize > 0 &&
      topicStore.topicsPagination?.page < topicStore.topicsPagination?.total
    );
  }
  return false;
}

function filterTopics() {
  topicStore.cleanTopics();
  fetchTopics();
}

function fetchTopics() {
  const coursesFilter = coursesFilterManager.value.getCheckedCheckboxesToString();
  const tagsFilter = tagsFilterManager.value.getCheckedCheckboxesToString();
  const searchFilter = search.value;
  const orderByFilter = topicsOrderByManager.value.getCheckedCheckboxesToString();

  topicStore.fetchTopics(searchFilter, coursesFilter, tagsFilter, orderByFilter);
}

function cleanFilters() {
  coursesFilterManager.value.resetCheckboxList();
  tagsFilterManager.value.resetCheckboxList();
}
</script>
