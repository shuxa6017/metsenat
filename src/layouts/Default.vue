<template>
  <div>
    <LayoutHeader />
    <slot />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '@/components/Layout/CHeader.vue';
</script>