<template>
  <!-- logo -->
  <img src="/images/logo-auth.svg" alt="logo" />

  <!-- login form -->
  <div class="max-w-[379px] w-full bg-white p-8 rounded-xl">
    <h2 class="text-2xl text-blue-700 font-bold">Kirish</h2>

    <form class="flex flex-col gap-[22px] mt-11" @submit.prevent="submitForm">
      <!-- login -->
      <FormGroup label="LOGIN" id="login">
        <FormInput
          id="login"
          placeholder="adm8904"
          type="text"
          v-model:model-value="form.login"
          :error="v$.login.$error"
        />
      </FormGroup>

      <!-- password -->
      <FormGroup label="PAROL" id="password">
        <FormInput
          id="password"
          placeholder="******"
          type="password"
          v-model:model-value="form.password"
          :error="v$.password.$error"
        />
      </FormGroup>

      <!-- reCaptcha -->
      <VueRecaptcha @verify="handleReCaptcha" sitekey="6LeidsEpAAAAAL_ed3rndk7CW60inPt2qB6JesRb" />

      <BaseButton
        text="Kirish"
        wrapper-class="!py-[14px]"
        variant="primary"
        type="submit"
        :loading
        :disabled="!form.login || !form.password || !form.reCaptcha"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import FormGroup from '@/components/Form/CGroup.vue';
import FormInput from '@/components/Form/CInput.vue';
import BaseButton from '@/components/Base/CButton.vue';

import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { VueRecaptcha } from 'vue-recaptcha';

import useApi from '@/plugins/axios';

const router = useRouter();
const loading = ref(false);

const form = reactive({
  login: 'metsenatadmin', // 'metsenatadmin',
  password: 'uF9aH1vZ3bV2kN2y', // 'uF9aH1vZ3bV2kN2y'
  reCaptcha: false
});
const rules = {
  login: { required },
  password: { required },
  reCaptcha: { required }
};
const v$ = useVuelidate(rules, form);

const handleReCaptcha = () => {
  form.reCaptcha = true;
};

const submitForm = async () => {
  loading.value = true;
  const result = await v$.value.$validate();

  if (!result) {
    loading.value = false;
    return;
  }

  const obj = {
    username: form.login,
    password: form.password
  };

  try {
    const res = await useApi.post('/auth/login/', obj);

    localStorage.refresh = res.data.refresh;
    localStorage.access = res.data.access;
  } catch (error) {
    console.log('error in logging user', error);
  } finally {
    loading.value = false;
    router.push({ name: 'MainDashboard' });
  }
};
</script>

<style scoped></style>
