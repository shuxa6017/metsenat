<template>
  <Banner userType="student" :user="student" @sponsor-add-modal-toggle="sponsorAddModalToggle" />

  <section class="flex flex-col items-center justify-between mt-10 h-screen">
    <!-- info block -->
    <div class="flex flex-col bg-white rounded-xl p-8 w-198 border border-blue-50">
      <!-- title -->
      <div class="flex-y-center justify-between">
        <h3 class="text-2xl text-black font-bold family-['sf-pro-display']">
          {{ $t('about_student') }}
        </h3>
        <div class="flex-center gap-2">
          <BaseButton
            icon="icon-trash"
            :iconLeft="true"
            :text="$t('button.delete_student')"
            variant="delete"
            @click="deleteStudent"
          />
          <BaseButton
            icon="icon-edit"
            :iconLeft="true"
            :text="$t('edit')"
            variant="secondary"
            @click="studentEditModalToggle(true)"
          />
        </div>
      </div>

      <div class="flex-center mt-8">
        <p class="text-xs text-blue bg-gray-200 py-0.5 px-3 uppercase">{{ $t('main_info') }}</p>
        <span class="flex-grow h-px bg-blue-50"></span>
      </div>

      <!-- user info -->
      <div class="flex-y-center gap-5 w-61 mt-6">
        <span
          class="w-16 h-16 rounded-md bg-gray-200 border border-blue-50 flex-center flex-shrink-0"
        >
          <img src="/images/user.svg" alt="user" />
        </span>
        <h5 class="text-md text-black">{{ student?.full_name }}</h5>
      </div>

      <div class="grid grid-cols-2 mt-6">
        <!-- phone -->
        <div class="col-span-1 flex flex-col gap-3">
          <h6 class="text-xs text-gray uppercase">{{ $t('phone') }}</h6>
          <p class="text-md text-black">{{ formatPhone(student?.phone) }}</p>
        </div>
      </div>

      <div class="flex-center mt-8">
        <p class="text-xs text-blue bg-gray-200 py-0.5 px-3 uppercase">
          {{ $t('study_place_info') }}
        </p>
        <span class="flex-grow h-px bg-blue-50"></span>
      </div>

      <!-- user tags -->
      <div class="grid grid-cols-2 mt-6 gap-y-6 gap-x-7">
        <!-- otm -->
        <div class="col-span-1 flex flex-col gap-3">
          <h6 class="text-xs text-gray uppercase">OTM</h6>
          <p class="text-md text-black">{{ student?.institute?.name }}</p>
        </div>

        <!-- degree -->
        <div class="col-span-1 flex flex-col gap-3">
          <h6 class="text-xs text-gray uppercase">{{ $t('label.student_type') }}</h6>
          <p class="text-md text-black">{{ formatStudentType(student?.type) }}</p>
        </div>

        <!-- given sum -->
        <div class="col-span-1 flex flex-col gap-3">
          <h6 class="text-xs text-gray uppercase">{{ $t('label.allocated_amount') }}</h6>
          <p class="text-md text-black uppercase">{{ formatNumbers(student?.given) }} uzs</p>
        </div>

        <!-- contract -->
        <div class="col-span-1 flex flex-col gap-3">
          <h6 class="text-xs text-gray uppercase">{{ $t('label.contract_summ') }}</h6>
          <p class="text-md text-black uppercase">{{ formatNumbers(student?.contract) }} uzs</p>
        </div>
      </div>
    </div>

    <!-- table -->
    <div class="bg-white rounded-xl p-8 w-198 mt-10 border border-blue-50">
      <!-- title -->
      <div class="flex-y-center justify-between">
        <h3 class="text-2xl text-black font-bold family-['sf-pro-display']">
          {{ $t('sponsor_to_student') }}
        </h3>
        <BaseButton
          icon="icon-add"
          :iconLeft="true"
          :text="$t('button.add_sponsor')"
          variant="secondary"
          @click="sponsorAddModalToggle"
        />
      </div>

      <!-- table content -->
      <table class="w-full mt-6" v-if="studentSponsors?.length">
        <TableHead :tableHead>
          <th
            v-for="(item, key) in tableHead"
            :key
            class="text-xs text-gray uppercase"
            :class="[
              {
                'text-left w-4': key === 0,
                'w-[222px] text-left': key === 1,
                'w-38': key === 2
              }
            ]"
          >
            {{ item }}
          </th>
        </TableHead>

        <TableBody :list="studentSponsors" wrapperClass="bg-[#FBFBFC] border border-blue/8">
          <!-- main info -->
          <template #content="{ user, key }">
            <td class="text-left w-4 text-sm text-black font-normal">{{ key + 1 }}</td>
            <td class="w-[222px] text-left text-sm text-black">{{ user?.sponsor?.full_name }}</td>
            <td class="w-36 text-sm text-black">
              {{ formatNumbers(user?.summa) }} <span class="text-gray">UZS</span>
            </td>
          </template>
          <!-- actions -->
          <template #tableBtn="{ user }">
            <button @click="getSponsorInfo(user)">
              <i class="icon-edit text-blue text-xl"></i>
            </button>
          </template>
        </TableBody>
      </table>
    </div>

    <img src="/images/bottom.png" class="w-205" alt="bottom" />
  </section>

  <!-- student edit -->
  <CModal title="Tahrirlash" :show="studentEditModalActive" @close="studentEditModalToggle">
    <template #content>
      <!-- name -->
      <FormGroup id="name" label="F.I.Sh. (Familiya Ism Sharifingiz)">
        <FormInput
          id="name"
          type="text"
          placeholder="F.I.Sh. (Familiya Ism Sharifingiz)"
          v-model="form.student.name"
        />
      </FormGroup>

      <!-- phone -->
      <FormGroup id="phone" :label="$t('phone')">
        <FormInput
          id="phone"
          type="text"
          placeholder="###-##-##"
          v-mask="'## ###-##-##'"
          v-model="form.student.phone"
        >
          <template #prefix>
            <span class="text-sm text-gray-700 font-normal">+998</span>
          </template>
        </FormInput>
      </FormGroup>

      <!-- institutes -->
      <FormGroup label="OTM" id="status">
        <FormSelect
          v-model="form.student.institute"
          :selectedVal="form.student.institute.name"
          :options="institutesList"
          optionsWrapper="h-52"
        />
      </FormGroup>

      <!-- given sum -->
      <FormGroup :label="$t('label.sponsorship_amount')" id="amount">
        <FormSelect
          v-model:model-value="form.student.given"
          :selectedVal="form.student.given.name"
          :options="options.amount"
        />
      </FormGroup>
    </template>

    <template #footer>
      <BaseButton
        icon="icon-file"
        :iconLeft="true"
        :text="$t('button.save')"
        variant="primary"
        :loading
        @click="updateStudent"
      />
    </template>
  </CModal>

  <!-- sponsor edit -->
  <CModal
    :title="$t('edit_sponsor')"
    :show="sponsorEditModalActive"
    @close="sponsorEditModalToggle"
  >
    <template #content>
      <!-- name -->
      <FormGroup id="name" label="F.I.Sh. (Familiya Ism Sharifingiz)">
        <FormInput
          id="name"
          type="text"
          placeholder="F.I.Sh. (Familiya Ism Sharifingiz)"
          v-model="form.sponsor.name"
        />
      </FormGroup>

      <!-- amount -->
      <FormGroup :label="$t('label.sponsorship_amount')" id="amount">
        <FormSelect
          v-model:model-value="form.sponsor.sum"
          :selectedVal="form.sponsor.sum"
          :options="options.amount"
        />
      </FormGroup>
    </template>

    <template #footer>
      <BaseButton
        icon="icon-trash"
        :iconLeft="true"
        :text="$t('button.delete_sponsor')"
        variant="delete"
        @click="deleteSponsor"
        :loading
      />
      <BaseButton
        icon="icon-file"
        :iconLeft="true"
        :text="$t('button.save')"
        variant="primary"
        :loading
      />
    </template>
  </CModal>

  <!-- sponsor add -->
  <CModal
    :title="$t('button.add_sponsor')"
    :show="sponsorAddModalActive"
    @close="sponsorAddModalToggle"
  >
    <template #content>
      <!-- name -->
      <FormGroup id="name" label="F.I.Sh. (Familiya Ism Sharifingiz)">
        <FormInput
          id="name"
          type="text"
          placeholder="F.I.Sh. (Familiya Ism Sharifingiz)"
          v-model="form.sponsor.full_name"
        />
      </FormGroup>

      <!-- amount -->
      <FormGroup :label="$t('label.sponsorship_amount')" id="amount">
        <FormSelect
          v-model:model-value="form.sponsor.sponsoring"
          :selectedVal="form.sponsor.sponsoring.name"
          :options="options.amount"
        />
      </FormGroup>
    </template>

    <template #footer>
      <BaseButton
        icon="icon-add"
        :iconLeft="true"
        :text="$t('button.add')"
        variant="primary"
        :loading
      />
    </template>
  </CModal>
</template>

<script setup lang="ts">
import Banner from '@/components/Layout/CBanner.vue';
import BaseButton from '@/components/Base/CButton.vue';
import TableHead from '@/components/Table/CTableHead.vue';
import TableBody from '@/components/Table/CTableBody.vue';
import CModal from '@/components/Common/CModal.vue';
import FormInput from '@/components/Form/CInput.vue';
import FormSelect from '@/components/Form/CSelect.vue';
import FormGroup from '@/components/Form/CGroup.vue';

import { computed, ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

import { formatPhone, formatNumbers, formatStudentType } from '@/utils/formatters';
import { useStudentsStore } from '@/stores/students';
import { useInstitutesStore } from '@/stores/institute';
import router from '@/router';
import { onMounted } from 'vue';

const route = useRoute();

const studentsStore = useStudentsStore();
const student = computed(() => studentsStore.student);
const studentSponsors = computed(() => studentsStore.studentSponsors);
const loading = computed(() => studentsStore.loading);

const getSponsorInfo = (sponsor: { id: number; sponsor: { full_name: string }; summa: number }) => {
  form.sponsor.id = sponsor.id;
  form.sponsor.name = sponsor.sponsor.full_name;
  form.sponsor.sum = sponsor.summa;

  sponsorEditModalToggle(true);
};
const updateStudent = () => {
  const updatedStudent = {
    full_name: form.student.name,
    phone: form.student.phone,
    institute: `${form.student.institute.id}`,
    given: form.student.given.value
  };

  studentsStore
    .updateStudent(student.value?.id, updatedStudent)
    .then(() => studentEditModalToggle(false))
    .finally(() => studentsStore.getStudentDetail(student.value.id));
};

const deleteStudent = () => {
  studentsStore.deleteStudent(student.value?.id).then(() => router.push({ name: 'MainStudents' }));
};

const deleteSponsor = () => {
  studentsStore
    .deleteSponsor(form.sponsor.id)
    .then(() => sponsorEditModalToggle(false))
    .then(() => studentsStore.getStudentSponsors(student.value.id));
};

const tableHead = ['#', 'f.i.sh', 'Ajratilingan summa', 'Amallar'];

const institutesStore = useInstitutesStore();
const institutesList = computed(() => institutesStore.institutesList);

const options = reactive({
  institutes: null,
  amount: [
    { id: Math.random(), name: 'Barchasi', value: 'Barchasi' },
    { id: Math.random(), name: `${formatNumbers(1000000)} UZS`, value: 1000000 },
    { id: Math.random(), name: `${formatNumbers(5000000)} UZS`, value: 5000000 },
    { id: Math.random(), name: `${formatNumbers(7000000)} UZS`, value: 7000000 },
    { id: Math.random(), name: `${formatNumbers(10000000)} UZS`, value: 10000000 },
    { id: Math.random(), name: `${formatNumbers(30000000)} UZS`, value: 30000000 },
    { id: Math.random(), name: `${formatNumbers(50000000)} UZS`, value: 50000000 }
  ]
});

const form = reactive<any>({
  student: {
    name: null,
    phone: null,
    institute: {
      id: null,
      name: null
    },
    contract: null,
    given: {
      name: null,
      value: null
    }
  },
  sponsor: {
    id: null,
    full_name: null,
    sponsoring: {
      name: 'Barchasi',
      sum: null
    }
  }
});

// form values
watch(
  () => student,
  (newVal) => {
    form.student.name = newVal.value?.full_name;
    form.student.phone = formatPhone(newVal.value?.phone);
    form.student.institute = newVal.value?.institute;
    form.student.contract = formatNumbers(newVal.value?.contract);
    form.student.given.name = formatNumbers(newVal.value?.given);
  },
  { deep: true }
);

// fetch data
onMounted(() => {
  studentsStore.getStudentDetail(route.params.id);
  studentsStore.getStudentSponsors(route.params.id);
  institutesStore.getInstitutesList();
});

const studentEditModalActive = ref<boolean>(false);
const sponsorEditModalActive = ref<boolean>(false);
const sponsorAddModalActive = ref<boolean>(false);

const studentEditModalToggle = (val: boolean = true): void => {
  resetStudentEditModal();
  studentEditModalActive.value = val;
};

const sponsorEditModalToggle = (val: boolean = true): boolean =>
  (sponsorEditModalActive.value = val);

const sponsorAddModalToggle = (val: boolean = true): void => {
  resetSponsorAddModal();
  sponsorAddModalActive.value = val;
};

const resetStudentEditModal = () => {
  form.student.name = student.value?.full_name;
  form.student.phone = formatPhone(student.value?.phone);
  form.student.institute = student.value?.institute;
  form.student.contract = formatNumbers(student.value?.contract);
  form.student.given.name = formatNumbers(student.value?.given);
};

const resetSponsorAddModal = () => {
  form.sponsor.id = null;
  form.sponsor.full_name = null;
  form.sponsor.sponsoring = { name: 'Barchasi', sum: null };
};
</script>
