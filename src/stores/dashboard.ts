import { defineStore } from 'pinia';

import { ref } from 'vue';

import useApi from '@/plugins/axios';

import type { IDashboard } from '@/types/dashboard.types';

export const useDashboardStore = defineStore('dashboard', () => {
  const dashboardTotals = ref<null | IDashboard>(null);

  const getDashboardTotals = async () => {
    try {
      const res = await useApi.get(`/dashboard/`);
      dashboardTotals.value = await res.data;
    } catch (error) {
      console.log('error in getting dashboard', error);
    }
  };

  return { dashboardTotals, getDashboardTotals };
});
