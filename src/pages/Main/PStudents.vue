<template>
  <MainBanner @open-modal="toggleModal" />

  <div class="container mt-7 mb-32 flex flex-col">
    <RouterLink :to="{ name: 'NewStudent' }" class="mb-7 self-end">
      <BaseButton
        icon="icon-add"
        :iconLeft="true"
        :text="$t('button.add_student')"
        variant="primary"
      />
    </RouterLink>

    <table class="w-full">
      <TableHead :tableHead ref="head">
        <th
          v-for="(item, key) in tableHead"
          :key
          class="text-xs text-gray uppercase"
          :class="[
            {
              'text-left w-4': key === 0,
              'w-[222px] text-left': key === 1,
              'w-28': key === 2,
              'w-50': key === 3,
              'w-[153px]': key === 4,
              'w-[132px]': key === 5
            }
          ]"
        >
          {{ item }}
        </th>
      </TableHead>

      <TableBody :list="studentsList">
        <!-- main info -->
        <template #content="{ user, key }">
          <td class="text-left w-4 text-sm text-black font-normal">{{ key + 1 }}</td>
          <td class="w-[222px] text-left text-sm text-black">{{ user?.full_name }}</td>
          <td class="w-28 text-sm text-black">{{ formatStudentType(user?.type) }}</td>
          <td class="w-50 text-xs text-black font-normal">{{ user?.institute?.name }}</td>
          <td class="w-[153px] text-sm text-black">
            {{ formatNumbers(user?.given) }} <span class="text-gray">UZS</span>
          </td>
          <td class="w-[132px] text-sm text-black">
            {{ formatNumbers(user?.contract) }} <span class="text-gray">UZS</span>
          </td>
        </template>
        <!-- actions -->
        <template #tableBtn="{ user }">
          <RouterLink :to="{ name: 'Student', params: { id: user.id } }">
            <img src="/images/eye.svg" alt="eye" />
          </RouterLink>
        </template>
      </TableBody>

      <TableFooter @change-current-page="getList" :page-length="studentsList.length" />
    </table>
  </div>

  <CModal :title="$t('filter')" :show="showModal" @close="toggleModal">
    <template #content>
      <!-- status -->
      <FormGroup :label="$t('label.student_type')" id="status">
        <FormSelect v-model="form.status" :selectedVal="form.status.name" :options="studentsType" />
      </FormGroup>

      <!-- institutes -->
      <FormGroup label="OTM" id="status">
        <FormSelect
          v-model="form.institute"
          :selectedVal="form.institute.name"
          :options="institutesList"
          optionsWrapper="h-52"
        />
      </FormGroup>
    </template>

    <template #footer>
      <BaseButton
        icon="icon-clear"
        :iconLeft="true"
        variant="outline"
        :text="$t('button.clear')"
        @click="resetModal"
      />

      <BaseButton
        icon="icon-eye"
        :iconLeft="true"
        variant="primary"
        :text="$t('button.show_results')"
        @click="toggleModal(false)"
      />
    </template>
  </CModal>
</template>

<script setup lang="ts">
import MainBanner from '@/components/Layout/CMainBanner.vue';
import TableHead from '@/components/Table/CTableHead.vue';
import TableBody from '@/components/Table/CTableBody.vue';
import TableFooter from '@/components/Table/CTableFooter.vue';
import FormSelect from '@/components/Form/CSelect.vue';
import FormGroup from '@/components/Form/CGroup.vue';
import BaseButton from '@/components/Base/CButton.vue';
import CModal from '@/components/Common/CModal.vue';

import { computed, reactive, ref, watch } from 'vue';
import { useStudentsStore } from '@/stores/students';
import { useInstitutesStore } from '@/stores/institute';

import { formatNumbers, formatStudentType } from '@/utils/formatters';

const tableHead: string[] = [
  '#',
  'f.i.sh.',
  'Talabalik turi',
  'OTM',
  'Ajratilingan summa',
  'Kontrakt miqdori',
  'Amallar'
];

const studentsStore = useStudentsStore();
const studentsList = computed(() => studentsStore.studentsList ?? '');
studentsStore.getStudentsList();

const getList = (current: number, size: number) => studentsStore.getStudentsList(current, size);

const institutesStore = useInstitutesStore();
const institutesList = computed(() => institutesStore.institutesList);
institutesStore.getInstitutesList();

const studentsType = [
  { id: Math.random(), name: 'Barchasi' },
  { id: Math.random(), name: 'Bakalavr' },
  { id: Math.random(), name: 'Magistr' }
];

const form = reactive<any>({
  status: {
    name: studentsType[0].name
  },
  institute: {
    name: null
  }
});

watch(
  () => institutesList,
  (newVal: any) => (form.institute = newVal?.value[0]),
  { deep: true }
);

const showModal = ref<boolean>(false);
const toggleModal = (val: boolean) => {
  resetModal();
  showModal.value = val;
};

const resetModal = () => {
  form.status.name = studentsType[0].name;
  form.institute.name = institutesList?.value[0].name;
};
</script>
