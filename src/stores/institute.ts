import { defineStore } from 'pinia';

import { ref } from 'vue';

import useApi from '@/plugins/axios';

export const useInstitutesStore = defineStore('institute', () => {
  const institutesList = ref(null);
  const loading = ref<boolean>(false);

  const getInstitutesList = async (): Promise<void> => {
    try {
      const res = await useApi.get(`/institute-list/`);
      institutesList.value = res.data;
    } catch (error) {
      console.log('error in gettgin sposnsors list', error);
    }
  };

  return { institutesList, getInstitutesList };
});
