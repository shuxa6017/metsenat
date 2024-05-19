import { defineStore } from 'pinia';

import { ref } from 'vue';

import useApi from '@/plugins/axios';

export const useStudentsStore = defineStore('students', () => {
  const studentsList = ref();
  const studentSponsors = ref();
  const student = ref();
  const loading = ref<boolean>(false);

  const getStudentsList = async (page: number = 1, limit: number = 10) => {
    try {
      const res = await useApi.get(`/student-list/?page=${page}&page_size=${limit}`);
      studentsList.value = res.data.results;
    } catch (error) {
      console.log('error in gettgin sposnsors list', error);
    }
  };

  const getStudentDetail = async (id: any) => {
    try {
      const res = await useApi.get(`/student-detail/${id}`);
      student.value = res.data;
    } catch (error) {
      console.log('error in getting student detail', error);
    }
  };

  const getStudentSponsors = async (id: string | string[]) => {
    try {
      const res = await useApi.get(`/student-sponsor/${id}`);
      studentSponsors.value = res.data.sponsors;
    } catch (error) {
      console.log('error in getting student detail', error);
    }
  };

  const createStudent = (student: object) => {
    loading.value = true;

    return new Promise((resolve, reject) => {
      useApi
        .post(`/student-create/`, student)
        .then((res) => resolve(res))
        .catch((error) => reject(error))
        .finally(() => (loading.value = false));
    });
  };

  const updateStudent = async (id: number, student: object) => {
    loading.value = true;
    return new Promise((resolve, reject) => {
      useApi
        .patch(`/student-update/${id}/`, JSON.stringify(student))
        .then((res) => resolve(res))
        .catch((error) => reject(error))
        .finally(() => (loading.value = false));
    });
  };

  const deleteStudent = (id: number) => {
    loading.value = true;
    return new Promise((resolve, reject) => {
      useApi
        .delete(`/student-delete/${id}/`)
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error);
        })
        .finally(() => (loading.value = false));
    });
  };

  const deleteSponsor = (id: number) => {
    loading.value = true;
    return new Promise((resolve, reject) => {
      useApi
        .delete(`/sponsor-summa-delete/${id}/`)
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error);
        })
        .finally(() => (loading.value = false));
    });
  };

  return {
    studentsList,
    loading,
    student,
    studentSponsors,
    getStudentSponsors,
    getStudentDetail,
    getStudentsList,
    createStudent,
    updateStudent,
    deleteStudent,
    deleteSponsor
  };
});
