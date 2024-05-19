<template>
  <tbody class="w-full flex flex-col gap-3 mt-3">
    <tr
      v-for="(user, key) in list"
      :key
      class="w-full flex-y-center justify-between text-center px-4 py-6 bg-white rounded-lg"
      :class="wrapperClass"
    >
      <slot name="content" :user :key />
      <td class="w-16 flex-center text-sm text-black font-normal">
        <slot name="tableBtn" :user></slot>
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
defineProps<{ list: any; wrapperClass?: string }>();
</script>
