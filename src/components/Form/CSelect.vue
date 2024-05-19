<template>
  <div
    class="relative border border-sky bg-sky/20 rounded-md p-2.5 cursor-pointer"
    :class="[{ '!border-blue': selectActive }, { '!border-red': error }, wrapperClass]"
    @click="toggleSelectActive"
    ref="select"
  >
    <!-- select -->
    <div class="w-full flex-y-center justify-between gap-2" :class="selectClass">
      <p class="text-sm text-blue-700 font-normal">{{ model?.name }}</p>
      <i
        class="icon-chevron-down text-gray transition duration-300"
        :class="{ 'rotate-180 !text-blue': selectActive }"
      ></i>
    </div>

    <!-- options -->
    <div
      class="absolute z-30 flex flex-col flex-grow top-11 left-0 w-full max-h-50 min-h-14 border border-sky bg-white rounded-lg overflow-scroll transition duration-300"
      :class="[{ '!opacity-0 !hidden': !selectActive }, optionsWrapper]"
    >
      <button
        class="w-full text-left flex py-3 px-4 bg-white first-of-type:border-none border-t border-sky text-sm text-blue-700 font-normal hover:bg-blue hover:text-white transition duration-300"
        v-for="(option, key) in options"
        :key
        :class="[optionClass, { '!bg-blue text-white': selectedVal == option.name }]"
        @click="setActiveOption(option)"
      >
        {{ option?.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

interface Props {
  wrapperClass?: string;
  selectClass?: string;
  optionsWrapper?: string;
  optionClass?: string;
  selectedVal: string | number | null;
  error?: boolean;
  options: { id: number; name: string | number; value?: any }[] | null;
}

const props = defineProps<Props>();
const model = defineModel<{ id: number; name: string; value: any }>();

const selectActive = ref<boolean>(false);
const setActiveOption = (val: any) => (model.value = val);
const toggleSelectActive = () => (selectActive.value = !selectActive.value);

const select = ref();

onClickOutside(select, (event) => {
  if (!select.value.contains(event.target)) {
    selectActive.value = false;
  }
});
</script>
