<template>
  <thead class="w-full flex">
    <tr class="w-full flex-y-center justify-between px-4">
      <slot />
    </tr>
  </thead>
</template>

<script setup lang="ts">
interface Props {
  tableHead: string[];
  thClass?: string;
}

defineProps<Props>();
</script>
