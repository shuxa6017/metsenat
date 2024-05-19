<template>
  <header class="bg-white shadow-2xl relative">
    <div class="container flex-y-center justify-between py-3">
      <RouterLink :to="{ name: 'MainDashboard' }">
        <img src="/images/logo.svg" alt="metsenat" />
      </RouterLink>

      <div class="flex-center gap-10">
        <FormSelect
          v-model="selectedOption.lang"
          :selectedVal="selectedOption.lang.name"
          :options
        />

        <RouterLink
          to="#!"
          class="w-[133px] flex items-center justify-end gap-6 p-1 rounded-md bg-[#F1F1F3]"
        >
          <span class="text-sm text-blue-700 font-bold font-['sf-pro-text']">Shohrux</span>
          <i
            class="icon-user text-white text-[22px] w-8 h-8 rounded-md bg-[#00AE69] flex-x-center items-end"
          />
        </RouterLink>

        <button class="active:scale-50 transition" @click="logout">
          <i class="icon-logout text-gray text-lg hover:text-gray-400 transition-300"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import FormSelect from '../Form/CSelect.vue';

import { reactive, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import i18n from '@/plugins/vue-i18n';

const router = useRouter();

const logout = () => {
  router.push({ name: 'Login' });
  localStorage.clear();
};

const { locale } = useI18n();

const options = [
  { id: Math.random(), name: 'uz', value: 'uz' },
  { id: Math.random(), name: 'ru', value: 'ru' },
  { id: Math.random(), name: 'en', value: 'en' }
];

const selectedOption = reactive({
  lang: { id: Math.random(), name: 'uz', value: 'uz' }
});

const swhitchLang = (lang: { id: number; name: string; value: string }) => {
  locale.value = lang.value;
  localStorage.locale = JSON.stringify(lang);

  i18n.global.locale.value = lang.value;
};

watch(
  () => selectedOption.lang,
  (newVal) => swhitchLang(newVal)
);
// console.log(selectedOption)
onMounted(() => {
  if (localStorage.locale) {
    selectedOption.lang = JSON.parse(localStorage.locale);
    i18n.global.locale.value = selectedOption.lang.value;
  }
});
</script>
../Form/CSelect.vue
