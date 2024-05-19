<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        class="bg-black/80 fixed top-0 left-0 w-screen h-screen z-50 flex-center"
        @click="closeModal"
        v-if="show"
      >
        <div class="flex flex-col gap-y-7 max-w-146.5 w-full bg-white rounded-xl p-7" @click.stop>
          <!-- title -->
          <div class="flex-y-center justify-between px-1 pb-7 border-b border-b-gray-200">
            <h2 class="text-2xl text-black family-['sf-pro-display'] capitalize">{{ title }}</h2>
            <button @click="closeModal">
              <i class="icon-xmark hover:text-red transition duration-150"></i>
            </button>
          </div>

          <!-- content -->
          <slot name="content" />

          <!-- footer -->
          <div class="flex-y-center justify-end gap-4 px-1 pt-7 border-t border-t-gray-200">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';

interface Props {
  title: string;
  show: boolean;
}
interface Emits {
  (e: 'close', value: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  show: false
});
const emit = defineEmits<Emits>();

const closeModal = () => {
  emit('close', false);
};

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      emit('close', false);
    }
  });
});

watch(
  () => props.show,
  () => {
    if (props.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.2);
}
.modal-enter-to,
.modal-leave-from {
  transform: scale(1);
  opacity: 1;
}

.modal-enter-active,
.modal-leave-active {
  transition: 0.2s linear;
}
</style>
