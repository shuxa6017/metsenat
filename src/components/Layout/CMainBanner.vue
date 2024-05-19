<template>
  <div class="bg-white py-6">
    <div class="flex-y-center justify-between container">
      <!-- navigation -->
      <div class="flex-center border-2 border-sky rounded-md overflow-hidden">
        <RouterLink
          v-for="(link, key) in navlinks"
          :key
          :to="{ name: link.name }"
          class="text-xs text-blue/60 bg-white py-3.5 px-14 capitalize hover:bg-slate-100 transition-all"
          :class="{ 'border-x-2  border-sky': key === 1 }"
        >
          {{ link.text }}
        </RouterLink>
      </div>

      <!-- filters -->
      <div class="flex-center gap-5">
        <FormInput
          id="search"
          :placeholder="$t('search')"
          type="search"
          variant="primary"
          wrapperClass="!bg-gray-100 border-transparent !py-2.5 !w-71"
          v-model:model-value="form.search"
        >
          <template #prefix>
            <i class="icon-search text-gray"></i>
          </template>
        </FormInput>

        <BaseButton
          icon="icon-filter"
          :iconLeft="true"
          :text="$t('filter')"
          variant="secondary"
          wrapperClass="py-2.5 !w-30"
          @click="openModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from '@/components/Form/CInput.vue';
import BaseButton from '@/components/Base/CButton.vue';

import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

interface Emits {
  (e: 'openModal', value: boolean): void;
}

const emit = defineEmits<Emits>();

const i18n = useI18n();

const navlinks = computed(() => [
  {
    name: 'MainDashboard',
    text: `${i18n.t('dashboard')}`
  },
  {
    name: 'MainSponsors',
    text: `${i18n.t('sponsors')}`
  },
  {
    name: 'MainStudents',
    text: `${i18n.t('students')}`
  }
]);

const form = reactive({
  search: null
});

const openModal = () => emit('openModal', true);
</script>

<style scoped>
.router-link-active {
  @apply bg-blue text-white transition duration-300;
}
</style>
