<template>
  <button
    class="flex-center gap-[10px] text-sm font-medium py-2 px-8 rounded-md active:scale-95 cursor-pointer transition-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray"
    :class="[
      variants[variant],
      wrapperClass,
      { '!pointer-events-none': loading },
      { 'flex-row-reverse': iconLeft }
    ]"
    v-bind="{ disabled, type }"
  >
    <!-- loader -->
    <Loader :color="loaderColors[variant]" v-if="loading" />

    <!-- main -->
    <template v-else>
      <slot>
        <i :class="iconLeft" v-if="iconLeft"></i>
        <span v-if="text">{{ text }}</span>
        <i :class="icon" v-if="icon"></i>
      </slot>
    </template>
  </button>
</template>

<script setup lang="ts">
import Loader from '@/components/Base/CLoader.vue';

interface Props {
  variant: 'primary' | 'secondary' | 'delete' | 'outline';
  loading?: boolean;
  iconLeft?: boolean;
  text?: string;
  icon?: string;
  disabled?: boolean;
  wrapperClass?: string;
  type?: 'button' | 'submit';
}
interface ButtonVariants {
  primary: string;
  secondary: string;
  delete: string;
  outline: string;
}

withDefaults(defineProps<Props>(), {
  text: 'button',
  loading: false,
  variant: 'primary',
  disabled: false,
  type: 'button'
});

const variants: ButtonVariants = {
  primary: 'bg-blue text-white hover:bg-blue-800',
  secondary: 'bg-gray-200 text-blue hover:bg-gray-100',
  delete: 'bg-red-100 text-red hover:bg-red-200',
  outline: 'bg-white text-blue border border-blue hover:bg-gray-200 disabled:border-gray'
};

const loaderColors = {
  primary: 'white',
  secondary: '#2E5BFF',
  delete: '#FF4945',
  outline: '#2E5BFF'
};
</script>
