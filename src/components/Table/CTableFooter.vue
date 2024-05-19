<template>
  <tfoot class="flex-y-center justify-between mt-6">
    <p class="text-sm text-black font-normal">
      100 tadan {{ page.startCount }}-{{ page.endCount }} ko'rsatilmoqda
    </p>

    <div class="flex-center gap-5">
      <!-- select pagination -->
      <div class="flex-center gap-3">
        <p class="text-sm text-black font-normal">{{ $t('to_show') }}</p>
        <FormSelect
          v-model="page.size"
          :options="pageSizes"
          wrapperClass="bg-white !py-2"
          selectClass="gap-2"
          :selectedVal="page.size.name"
        />
      </div>

      <!-- button pagination -->
      <div class="flex-center gap-2">
        <vue-awesome-paginate
          :total-items="100"
          :items-per-page="page.size.name"
          :max-pages-shown="3"
          v-model="page.current"
          :on-click="selectedPage"
          :disabled-back-button="page.current == 1"
        >
          <!-- prev -->
          <template #prev-button>
            <i class="icon-chevron-left text-gray text-xs"></i>
          </template>

          <!-- next -->
          <template #next-button>
            <i class="icon-chevron-right text-gray text-xs"></i>
          </template>
        </vue-awesome-paginate>
      </div>
    </div>
  </tfoot>
</template>

<script setup lang="ts">
import FormSelect from '../Form/CSelect.vue';

import { reactive, watch } from 'vue';

interface Page {
  current: number;
  size: { name: number };
  startCount: number;
  endCount: number;
  usersCount: number;
}

const props = defineProps<{ pageLength: number }>();

const emit = defineEmits<{
  (e: 'changeCurrentPage', current: number, size: number): void;
}>();

const page = reactive<Page>({
  current: 1,
  size: { name: 10 },
  startCount: 1,
  endCount: 10,
  usersCount: 0
});

const pageSizes = [
  { id: Math.random(), name: 10 },
  { id: Math.random(), name: 20 },
  { id: Math.random(), name: 30 }
];

const selectedPage = (selectedPage: number): number => (page.current = selectedPage);

const calcCurrentList = (action: string, current: number) => {
  page.endCount = page.current * page.size.name;
  page.startCount =
    action === 'increase' ? current + page.size.name - 1 : page.startCount - page.size.name;
};

watch(
  () => page.current,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      calcCurrentList('increase', page.current);
    } else {
      calcCurrentList('decrease', page.current);
    }
    emit('changeCurrentPage', page.current, page.size.name);
  }
);

watch(
  () => page.size,
  () => {
    page.current = 1;
    emit('changeCurrentPage', page.current, page.size.name);
  }
);
</script>

<style>
.pagination-container {
  @apply gap-2;
}

.paginate-buttons {
  @apply w-8 h-8 rounded flex-center bg-white border border-gray-200 text-sm disabled:border-none disabled:bg-gray-100;
}

.paginate-buttons.number-buttons.active-page {
  @apply text-blue border-blue;
}
</style>
