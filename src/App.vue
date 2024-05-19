<template>
  <div>
    <component :is="activeLayouts">
      <RouterView />
    </component>
  </div>
</template>

<script setup lang="ts">
import Default from '@/layouts/Default.vue';
import Auth from '@/layouts/Auth.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layouts = {
  auth: Auth,
  default: Default
};
const activeLayouts = computed(() => layouts[route.meta.layout ?? 'default']);
</script>
