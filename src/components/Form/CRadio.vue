<template>
  <label
    :for="`${item.id}`"
    class="relative flex bg-white rounded-md w-31 h-13 cursor-pointer"
    :class="{ '!bg-sky': item.sum === 'Barchasi' }"
  >
    <input
      :id="`${item.id}`"
      type="radio"
      v-model="model"
      name="sponsor-sum"
      class="opacity-0 absolute peer"
    />
    <span
      class="w-4 h-4 rounded-full bg-blue absolute -top-1 -right-1 hidden peer-checked:flex items-center justify-center"
    >
      <i class="icon-checkmark text-white text-[8px]"></i>
    </span>
    <div
      class="w-full h-full flex-center border border-gray-100 rounded-md text-sm text-blue-700 peer-checked:border-blue"
      :class="[contentClass, { 'border-transparent': isNaN(item.sum) }]"
    >
      <p v-if="isNaN(item.sum)">{{ item.sum }}</p>
      <p v-else>
        {{ formatNumbers(item.sum) }}
        <span class="text-blue text-xs font-normal uppercase">UZS</span>
      </p>
    </div>
  </label>
</template>

<script setup lang="ts">
import { formatNumbers } from '@/utils/formatters';

interface Props {
  item: { id: number; sum: any };
  contentClass?: string;
  wrapperClass?: string;
}

defineProps<Props>();

const model = defineModel('modelValue');
</script>
