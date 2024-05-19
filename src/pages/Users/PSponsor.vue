<template>
  <Banner userType="sponsor" :user="sponsor" />

  <section class="flex flex-col items-center justify-between mt-10 h-screen">
    <!-- info block -->
    <div class="flex flex-col bg-white rounded-xl p-8 w-198 border border-blue-50">
      <!-- title -->
      <div class="flex-y-center justify-between">
        <h3 class="text-2xl text-black font-bold family-['sf-pro-display']">
          {{ $t('about_sponsor') }}
        </h3>
        <BaseButton
          icon="icon-edit"
          :iconLeft="true"
          :text="$t('edit')"
          variant="secondary"
          @click="toggleModalActive(true)"
        />
      </div>

      <!-- user info -->
      <div class="flex-y-center gap-5 w-61 mt-8">
        <span
          class="w-16 h-16 rounded-md bg-gray-200 border border-blue-50 flex-center flex-shrink-0"
        >
          <img src="/images/user.svg" alt="user" />
        </span>
        <h5 class="text-md text-black">{{ sponsor?.full_name }}</h5>
      </div>

      <!-- user tags -->
      <div class="grid grid-cols-2 mt-6">
        <!-- phone -->
        <div class="col-span-1 flex flex-col gap-3">
          <h6 class="text-xs text-gray uppercase">{{ $t('phone') }}</h6>
          <p class="text-md text-black">{{ formatPhone(sponsor?.phone) }}</p>
        </div>

        <!-- sum -->
        <div class="col-span-1 flex flex-col gap-3">
          <h6 class="text-xs text-gray uppercase">{{ $t('label.sponsorship_amount') }}</h6>
          <p class="text-md text-black uppercase">{{ formatNumbers(sponsor?.sum) }} uzs</p>
        </div>
      </div>
    </div>

    <img src="/images/bottom.png" class="w-205" alt="bottom" />
  </section>

  <CModal :title="$t('edit')" :show="showModal" @close="toggleModalActive">
    <template #content>
      <!-- modal toggler -->
      <div class="border border-sky rounded-md overflow-hidden flex-center">
        <button
          class="flex-grow tracking-wide leading-3 py-3.5 bg-white text-blue/60 text-xs uppercase hover:bg-slate-50 transition duration-150 disabled:cursor-not-allowed"
          :class="{ '!bg-blue text-white hover:!bg-blue-500': !sponsor?.is_legal }"
          :disabled="sponsor?.is_legal"
        >
          {{ $t('physical_person') }}
        </button>
        <button
          class="flex-grow tracking-wide leading-3 py-3.5 bg-white text-blue/60 text-xs uppercase hover:bg-slate-50 transition duration-150 disabled:cursor-not-allowed"
          :class="{ '!bg-blue text-white hover:!bg-blue-500': sponsor?.is_legal }"
          :disabled="!sponsor?.is_legal"
        >
          {{ $t('legal_entity') }}
        </button>
      </div>

      <!-- form legal entity sponsor -->
      <template v-if="sponsor?.is_legal">
        <!-- name -->
        <FormGroup id="name" label="F.I.Sh. (Familiya Ism Sharifingiz)">
          <FormInput
            id="name"
            type="text"
            placeholder="F.I.Sh. (Familiya Ism Sharifingiz)"
            v-model="formLegal.name"
            wrapperClass="h-10.5"
            :error="v$.formLegal.value.name.$error"
          />
        </FormGroup>

        <!-- phone -->
        <FormGroup id="phone" :label="$t('phone')">
          <FormInput
            id="phone"
            type="text"
            placeholder="###-##-##"
            v-model="formLegal.phone"
            wrapperClass="h-10.5"
            :error="v$.formLegal.value.phone.$error"
            v-mask="'## ###-##-##'"
          >
            <template #prefix>
              <span class="text-sm text-gray-700 font-normal">+998</span>
            </template>
          </FormInput>
        </FormGroup>

        <!-- status -->
        <FormGroup :label="$t('label.status')" id="status">
          <FormSelect
            v-model:model-value="formLegal.status"
            :selectedVal="formLegal.status.name"
            :options="options.status"
            :error="v$.formLegal.value.status.$error"
          />
        </FormGroup>

        <!-- amount -->
        <FormGroup :label="$t('label.sponsorship_amount')" id="amount">
          <FormSelect
            v-model:model-value="formLegal.amount"
            :selectedVal="formLegal.amount.name"
            :options="options.amount"
          />
        </FormGroup>

        <!-- payment_type -->
        <FormGroup :label="$t('payment_type')" id="payment_type">
          <FormSelect
            v-model:model-value="formLegal.payment_type"
            :selectedVal="formLegal.payment_type.name"
            :options="options.payment_type"
            :error="v$.formLegal.value.payment_type.$error"
          />
        </FormGroup>

        <!-- firm -->
        <FormGroup id="firm" :label="$t('label.organization')">
          <FormInput
            id="firm"
            type="text"
            :placeholder="$t('label.organization')"
            v-model="formLegal.firm"
            wrapperClass="h-10.5"
            :error="v$.formLegal.value.firm.$error"
          />
        </FormGroup>
      </template>

      <!-- form physical sponsor -->
      <template v-else>
        <!-- name -->
        <FormGroup id="name" label="F.I.Sh. (Familiya Ism Sharifingiz)">
          <FormInput
            id="name"
            type="text"
            placeholder="F.I.Sh. (Familiya Ism Sharifingiz)"
            v-model="form.name"
            :error="v$.form.value.name.$error"
          />
        </FormGroup>

        <!-- phone -->
        <FormGroup id="phone" :label="$t('phone')">
          <FormInput
            id="phone"
            type="text"
            placeholder="###-##-##"
            v-model="form.phone"
            v-mask="'## ###-##-##'"
            :error="v$.form.value.phone.$error"
          >
            <template #prefix>
              <span class="text-sm text-gray-700 font-normal">+998</span>
            </template>
          </FormInput>
        </FormGroup>

        <!-- status -->
        <FormGroup :label="$t('label.status')" id="status">
          <FormSelect
            v-model:model-value="form.status"
            :selectedVal="form.status.name"
            :options="options.status"
            :error="v$.form.value.status.$error"
          />
        </FormGroup>

        <!-- amount -->
        <FormGroup :label="$t('label.sponsorship_amount')" id="amount">
          <FormSelect
            v-model:model-value="form.amount"
            :selectedVal="form.amount.name"
            :options="options.amount"
          />
        </FormGroup>

        <!-- payment_type -->
        <FormGroup :label="$t('label.payment_type')" id="payment_type">
          <FormSelect
            v-model:model-value="form.payment_type"
            :selectedVal="form.payment_type.name"
            :options="options.payment_type"
            :error="v$.form.value.payment_type.$error"
          />
        </FormGroup>
      </template>
    </template>
    <template #footer>
      <BaseButton
        icon="icon-file"
        :icon-left="true"
        :loading
        :text="$t('button.save')"
        variant="primary"
        @click="submit"
      />
    </template>
  </CModal>
</template>

<script setup lang="ts">
import Banner from '@/components/Layout/CBanner.vue';
import CModal from '@/components/Common/CModal.vue';
import BaseButton from '@/components/Base/CButton.vue';
import FormInput from '@/components/Form/CInput.vue';
import FormGroup from '@/components/Form/CGroup.vue';
import FormSelect from '@/components/Form/CSelect.vue';

import { computed, reactive, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import { formatPhone, formatNumbers } from '@/utils/formatters';
import { useSponsorsStore } from '@/stores/sponsors';

import type { ISponsor } from '@/types/sposnor.types';

const route = useRoute();

const sponsorsStore = useSponsorsStore();
const sponsor = computed(() => sponsorsStore.sponsor);
const loading = computed(() => sponsorsStore.loading);

const options = {
  status: [
    { id: Math.random(), name: 'Barchasi' },
    { id: Math.random(), name: 'Yangi' },
    { id: Math.random(), name: 'Moderatsiyada' },
    { id: Math.random(), name: 'Tasdiqlangan' },
    { id: Math.random(), name: 'Bekor qilingan' }
  ],
  amount: [
    { id: Math.random(), name: 'Barchasi' },
    { id: Math.random(), name: `${formatNumbers(1000000)} UZS`, value: 1000000 },
    { id: Math.random(), name: `${formatNumbers(5000000)} UZS`, value: 5000000 },
    { id: Math.random(), name: `${formatNumbers(7000000)} UZS`, value: 7000000 },
    { id: Math.random(), name: `${formatNumbers(10000000)} UZS`, value: 10000000 },
    { id: Math.random(), name: `${formatNumbers(30000000)} UZS`, value: 30000000 },
    { id: Math.random(), name: `${formatNumbers(50000000)} UZS`, value: 50000000 }
  ],
  payment_type: [
    { id: Math.random(), name: 'Click' },
    { id: Math.random(), name: 'Payme' },
    { id: Math.random(), name: 'Nalichno' }
  ]
};

const form = reactive<any>({
  name: null,
  phone: null,
  status: {
    name: null
  },
  amount: {
    name: null
  },
  payment_type: {
    name: 'Nalichno'
  }
});
const formLegal = reactive<any>({
  name: null,
  phone: null,
  status: {
    name: null
  },
  amount: {
    name: null
  },
  firm: null,
  payment_type: {
    name: 'Nalichno'
  }
});

const rules = {
  name: { required },
  phone: { required },
  status: { required },
  payment_type: { required }
};
const v$ = {
  form: useVuelidate(rules, form),
  formLegal: useVuelidate({ ...rules, firm: { required } }, formLegal)
};

const submit = () => {
  const formResult = v$.form.value.$validate();
  const formLegalResult = v$.formLegal.value.$validate();

  if (!formResult || !formLegalResult) {
    return;
  }

  const updatedSponsor = {
    ...sponsor.value,
    full_name: form.name,
    phone: form.phone,
    sum: form.amount.value
  };

  sponsorsStore
    .updateSponsor(sponsor.value?.id, updatedSponsor)
    .then(() => toggleModalActive(false))
    .finally(() => sponsorsStore.getSponsorDetail(route.params.id));
};

// form values
watch(
  () => sponsor,
  (newVal: any) => {
    form.name = newVal.value?.full_name;
    form.phone = formatPhone(newVal.value?.phone);
    form.status.name = newVal.value?.get_status_display;
    form.amount.name = `${formatNumbers(newVal.value?.sum)} UZS`;

    formLegal.name = newVal.value?.full_name;
    formLegal.phone = formatPhone(newVal.value?.phone);
    formLegal.status.name = newVal.value?.get_status_display;
    formLegal.amount.name = `${formatNumbers(newVal.value?.sum)} UZS`;
    formLegal.firm = newVal.value?.firm;
  },
  { deep: true }
);

// fatch user data
onMounted(() => sponsorsStore.getSponsorDetail(route.params.id));

const showModal = ref<boolean>(false);
const toggleModalActive = (val: boolean) => {
  resetModal();

  showModal.value = val;
};

const resetModal = () => {
  form.name = sponsor.value?.full_name;
  form.phone = formatPhone(sponsor.value?.phone);
  form.status.name = sponsor.value?.get_status_display;
  form.amount.name = `${formatNumbers(sponsor.value?.sum)} UZS`;

  formLegal.name = sponsor.value?.full_name;
  formLegal.phone = formatPhone(sponsor.value?.phone);
  formLegal.status.name = sponsor.value?.get_status_display;
  formLegal.amount.name = `${formatNumbers(sponsor.value?.sum)} UZS`;
  formLegal.firm = sponsor.value?.firm;
};
</script>
