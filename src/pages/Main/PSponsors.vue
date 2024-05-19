<template>
  <MainBanner @open-modal="toggleModal" />

  <div class="container mt-12 mb-32">
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
              'w-32': key === 2,
              'w-132': key === 3,
              'w-36': key === 4,
              'w-[77px]': key === 5,
              'w-[103px]': key === 6
            }
          ]"
        >
          {{ item }}
        </th>
      </TableHead>

      <TableBody :list="sponsorsList">
        <!-- main info -->
        <template #content="{ user, key }">
          <td class="text-left w-4 text-sm text-black font-normal">{{ key + 1 }}</td>
          <td class="w-[222px] text-left text-sm text-black">{{ user?.full_name }}</td>
          <td class="w-32 text-xs text-black font-normal">{{ formatPhone(user?.phone) }}</td>
          <td class="w-[132px] text-sm text-black">
            {{ formatNumbers(user?.sum) }} <span class="text-gray">UZS</span>
          </td>
          <td class="w-36 text-sm text-black">
            {{ formatNumbers(user?.spent) }} <span class="text-gray">UZS</span>
          </td>
          <td class="w-[77px] text-sm text-black font-normal">
            {{ formatDate(user?.created_at) }}
          </td>
          <td
            class="w-[103px] text-sm text-black font-normal"
            :class="statusDisplay(user?.get_status_display)"
          >
            {{ user?.get_status_display }}
          </td>
        </template>
        <!-- actions -->
        <template #tableBtn="{ user }">
          <RouterLink :to="{ name: 'Sponsor', params: { id: user.id } }">
            <img src="/images/eye.svg" alt="eye" />
          </RouterLink>
        </template>
      </TableBody>

      <TableFooter @change-current-page="getList" :page-length="sponsorsList.length" />
    </table>
  </div>

  <CModal :title="$t('filter')" :show="showModal" @close="toggleModal">
    <template #content>
      <!-- status -->
      <FormGroup :label="$t('label.application_status')" id="status">
        <FormSelect v-model:model-value="form.status" :options :selectedVal="form.status.name" />
      </FormGroup>

      <!-- sponsored sum -->
      <FormGroup :label="$t('label.sponsorship_amount')" id="sponsored_sum">
        <div class="grid grid-cols-4 gap-3">
          <FormRadio
            v-for="(item, key) in sponsoringSum"
            :key
            :item="item"
            v-model:model-value="form.radio"
          />
        </div>
      </FormGroup>

      <!-- calendar -->
      <FormGroup wrapper-class="items-start" :label="$t('label.date')" id="Sana">
        <DatePicker v-model="range" is-range>
          <template #default="{ inputValue, inputEvents }">
            <div
              class="py-3 px-4 bg-sky/20 border border-sky rounded-md flex-y-center justify-between gap-[46px]"
            >
              <!-- inputs -->
              <div class="flex-center gap-px">
                <input
                  placeholder="kk.oo.yyyy"
                  class="border-none outline-none inline-flex bg-transparent font-normal text-sm text-blue-700 placeholder:text-blue-700/35 w-[75px]"
                  :value="inputValue.start"
                  v-on="inputEvents.start"
                />
                <span class="font-normal text-sm text-blue-700"> - </span>
                <input
                  placeholder="kk.oo.yyyy"
                  class="border-none outline-none inline-flex bg-transparent font-normal text-sm text-blue-700 placeholder:text-blue-700/35 w-[75px]"
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                />
              </div>

              <i class="icon-calendar text-[#B5B5C3]"></i>
            </div>
          </template>
        </DatePicker>

        <!-- <Calendar /> -->
        <SetupCalendar />
      </FormGroup>
    </template>

    <template #footer>
      <BaseButton icon="icon-clear" :iconLeft="true" variant="outline" :text="$t('button.clear')" />
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
import FormRadio from '@/components/Form/CRadio.vue';
import BaseButton from '@/components/Base/CButton.vue';
import CModal from '@/components/Common/CModal.vue';

import { computed, reactive, ref } from 'vue';
import { DatePicker } from 'v-calendar';

import { useSponsorsStore } from '@/stores/sponsors';

import { formatDate, formatPhone, formatNumbers } from '@/utils/formatters';
import { statusDisplay } from '@/utils/statusDisplay';

const tableHead: string[] = [
  '#',
  'f.i.sh.',
  'Tel.Raqami',
  'Homiylik summasi',
  'Sarflangan summa',
  'Sana',
  'Holati',
  'Amallar'
];
const options: { id: number; name: string }[] = [
  { id: Math.random(), name: 'Barchasi' },
  { id: Math.random(), name: 'Yangi' },
  { id: Math.random(), name: 'Moderatsiyada' },
  { id: Math.random(), name: 'Tasdiqlangan' },
  { id: Math.random(), name: 'Bekor qilingan' }
];
const sponsoringSum: { id: number; sum: string | number }[] = [
  { id: Math.random(), sum: 'Barchasi' },
  { id: Math.random(), sum: 1000000 },
  { id: Math.random(), sum: 5000000 },
  { id: Math.random(), sum: 7000000 },
  { id: Math.random(), sum: 10000000 },
  { id: Math.random(), sum: 30000000 },
  { id: Math.random(), sum: 50000000 }
];

const sponsorsStore = useSponsorsStore();
const sponsorsList = computed(() => sponsorsStore.sponsorsList ?? '');
sponsorsStore.getSponsorsList();

const getList = (current: number, size: number) => sponsorsStore.getSponsorsList(current, size);

const form = reactive({
  radio: null,
  status: {
    name: options[0].name
  }
});

const showModal = ref<boolean>(false);
const toggleModal = (val: boolean) => {
  // reset forms selections
  form.radio = null;
  form.status = {
    name: options[0].name
  };

  // close modal
  showModal.value = val;
};

const range = ref({ start: new Date(2024, 3, 3), end: new Date(2024, 3, 7) });
</script>

<style>
.vc-time-picker {
  display: none !important;
}

.calendar.vc-container {
  position: absolute;
  top: 0;
}
</style>
