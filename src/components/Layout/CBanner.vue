<template>
  <div class="bg-white">
    <div class="flex-y-center justify-between container py-6">
      <div class="flex-center gap-3">
        <RouterLink :to="{ name: backLink }">
          <i class="icon-arrow-left hover:text-gray-500 transition-300"></i>
        </RouterLink>
        <h2 class="text-2xl text-black font-[sf-pro-display]">{{ titleText }}</h2>
        <span
          class="text-xs font-normal rounded-md py-1.5 px-3"
          :class="userStatusDisplay(user?.get_status_display)"
          v-if="userType === 'sponsor'"
          >{{ user?.get_status_display }}</span
        >
      </div>

      <BaseButton
        icon="icon-add"
        :iconLeft="true"
        :text="$t('button.add_sponsor')"
        variant="secondary"
        @click="emit('sponsorAddModalToggle', true)"
        v-if="userType === 'student'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/Base/CButton.vue';

import { computed } from 'vue';

import { userStatusDisplay } from '@/utils/statusDisplay';

interface IUser {
  id: string;
  full_name: string;
  get_status_display: string;
}

const props = defineProps<{ userType: string; user?: IUser | null; title?: string }>();
const emit = defineEmits<{
  (e: 'sponsorAddModalToggle', value: boolean): void;
}>();

const backLink = computed(() =>
  props.userType === 'student' || props.userType === 'new-student' ? 'MainStudents' : 'MainSponsors'
);
const titleText = computed(() => (props.title ? props.title : props.user?.full_name));
</script>
