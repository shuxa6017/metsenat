<template>
  <MainBanner />

  <div class="container mt-12">
    <!-- totals -->
    <div class="flex-y-center justify-between">
      <!-- totals item -->
      <div
        v-for="(item, key) in totals"
        :key="key"
        class="max-w-[381px] w-full flex flex-col flex-wrap content-start gap-x-4 h-24 p-6 bg-white rounded-lg"
      >
        <i
          class="w-12 h-full rounded-xl flex-center text-[#4C6FFF] bg-[#4C6FFF]/10 icon-cash"
          :class="getTotalData(key)?.iconStyle"
        ></i>
        <p class="text-xs text-[#7A7A9D] font-rubik font-normal">{{ getTotalData(key)?.title }}</p>
        <h4 class="text-xl text-blue-700 font-bold font-['sf-pro-display']">
          {{ formatNumbers(totals?.[key]) }} <span class="text-gray ml-[6px]">UZS</span>
        </h4>
      </div>
    </div>

    <!-- chart -->
    <div class="flex flex-col bg-white p-6 rounded-lg mt-[28px]">
      <h2 class="text-2xl text-blue-700 font-bold font-['sf-pro-display']">
        {{ $t('total_users') }}
      </h2>
      <div class="flex-y-center gap-5 mt-2">
        <span
          class="flex-center gap-2 capitalize text-xs text-[#7A7A9D] font-normal before:w-2 before:h-2 before:rounded-full before:bg-blue"
        >
          {{ $t('sponsors') }}
        </span>
        <span
          class="flex-center gap-2 capitalize text-xs text-[#7A7A9D] font-normal before:w-2 before:h-2 before:rounded-full before:bg-[#FF92AE]"
        >
          {{ $t('students') }}
        </span>
      </div>
      <apexchart height="282px" type="line" :options :series></apexchart>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainBanner from '@/components/Layout/CMainBanner.vue';

import { computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import { formatNumbers } from '@/utils/formatters';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const dashboardStore = useDashboardStore();
const totals = computed(() => dashboardStore.dashboardTotals);

dashboardStore.getDashboardTotals();

// chart
const series = [
  {
    name: `${i18n.t('sponsors')}`,
    data: [31, 40, 28, 51, 42, 109, 100]
  },
  {
    name: `${i18n.t('students')}`,
    data: [11, 32, 45, 32, 34, 52, 41]
  }
];
const options = {
  chart: {
    type: 'area',
    toolbar: { show: false }
  },
  legend: { show: false },
  stroke: { curve: 'smooth' },
  colors: ['#4C6FFF', '#FF92AE'],
  tooltip: {
    styles: {
      fontSize: '20px',
      fontWeight: 500
    }
  },
  xaxis: {
    categories: [
      'Yanvar',
      'Fevral',
      'Mart',
      'Aprel',
      'May',
      'Iyun',
      'Iyul',
      'Avgust',
      'Sentabr',
      'Oktabr',
      'Noyabr',
      'Dekabr'
    ]
  },
  yaxis: {
    categories: ['50 000', '10 000', '5000', '1000', '500', '100']
  }
};

const getTotalData = computed(() => (key: string) => {
  const titles = {
    total_paid: `${i18n.t('total_paid')}`,
    total_need: `${i18n.t('total_need')}`,
    total_must_pay: `${i18n.t('total_must_pay')}`
  };

  const iconStyles = {
    total_paid: 'text-[#4C6FFF] bg-[#4C6FFF]/10',
    total_need: 'text-[#EDC700] bg-[#EDC700]/10',
    total_must_pay: 'text-[#ED7200] bg-[#ED7200]/10'
  };

  return {
    title: titles[key],
    iconStyle: iconStyles[key]
  };
});
</script>

<style>
.apexcharts-tooltip {
  backdrop-filter: blur(10px) !important;
  display: flex !important;
  flex-wrap: wrap !important;
  flex-direction: row !important;
  justify-content: space-evenly !important;
  padding: 10px 12px 8px !important;
}

.apexcharts-tooltip.apexcharts-theme-light {
  border: 1px solid #dfe6fe !important;
  background: #f3f4fe !important;
}

.apexcharts-tooltip-title {
  width: 100% !important;
  font-size: 10px !important;
  background: transparent !important;
  border: none !important;
  text-align: center !important;
  padding: 0 !important;
  margin-bottom: 6px !important;
}

.apexcharts-tooltip-series-group.apexcharts-active,
.apexcharts-tooltip-series-group:last-child,
.apexcharts-tooltip-y-group {
  padding: 0 !important;
}

.apexcharts-tooltip-text-y-value {
  margin: 0 !important;
}

.apexcharts-tooltip-marker,
.apexcharts-tooltip-text-y-label {
  display: none !important;
}

.apexcharts-tooltip-text-y-value {
  font-size: 20px !important;
  font-weight: 500 !important;
  font-family: 'rubik' !important;
}

.apexcharts-tooltip-series-group .apexcharts-tooltip-text-y-value {
  color: #4c6fff !important;
}

.apexcharts-tooltip-series-group:last-of-type .apexcharts-tooltip-text-y-value {
  color: #f591b3 !important;
}
</style>
