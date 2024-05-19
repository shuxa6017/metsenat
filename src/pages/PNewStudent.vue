<template>
  <Banner userType="new-student" :title="$t('button.add_student')" />
  <section>
    <form
      @submit.prevent
      class="grid grid-cols-2 gap-7 bg-white max-w-197.5 w-full border border-blue-50 mt-10 mx-auto p-7 rounded-xl"
    >
      <!-- name -->
      <FormGroup id="name" label="F.I.Sh. (Familiya Ism Sharifingiz)">
        <FormInput
          id="name"
          type="text"
          placeholder="F.I.Sh. (Familiya Ism Sharifingiz)"
          v-model="form.name"
          :error="v$.name.$error"
        />
      </FormGroup>

      <!-- phone -->
      <FormGroup id="phone" :label="$t('phone')">
        <FormInput
          id="phone"
          type="text"
          placeholder="00 000-00-00"
          v-model="form.phone"
          v-mask="'## ###-##-##'"
          :error="v$.phone.$error"
        >
          <template #prefix>
            <span class="text-sm text-gray-700 font-normal">+998</span>
          </template>
        </FormInput>
      </FormGroup>

      <!-- institutes -->
      <FormGroup label="OTM" id="status" class="col-span-2">
        <FormSelect
          v-model="form.institute"
          :selectedVal="form.institute.name"
          :options="institutesList"
          optionsWrapper="h-52"
          :error="v$.institute.$error"
        />
      </FormGroup>

      <!-- status -->
      <FormGroup :label="$t('label.student_type')" id="status">
        <FormSelect
          v-model="form.status"
          :selectedVal="form.status.name"
          :options="options.studentsType"
          :error="v$.status.$error"
        />
      </FormGroup>

      <!-- contract -->
      <FormGroup id="contract" :label="$t('label.sponsorship_amount')">
        <FormInput
          id="contract"
          type="text"
          :placeholder="$t('enter_sum')"
          v-model="form.contract"
          :error="v$.contract.$error"
        />
      </FormGroup>

      <div class="flex-y-center justify-end gap-4 px-1 pt-7 border-t border-t-gray-200 col-span-2">
        <BaseButton
          icon="icon-add"
          :iconLeft="true"
          :text="$t('button.add')"
          variant="primary"
          type="submit"
          :loading
          @click="submit"
        />
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/Base/CButton.vue';
import Banner from '@/components/Layout/CBanner.vue';
import FormInput from '@/components/Form/CInput.vue';
import FormGroup from '@/components/Form/CGroup.vue';
import FormSelect from '@/components/Form/CSelect.vue';

import { reactive, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, alpha, integer, maxLength, numeric } from '@vuelidate/validators';

import { useInstitutesStore } from '@/stores/institute';
import { useStudentsStore } from '@/stores/students';

const institutesStore = useInstitutesStore();
const institutesList = computed(() => institutesStore.institutesList);
institutesStore.getInstitutesList();

const studentsStore = useStudentsStore();

const loading = computed({
  get() {
    return studentsStore.loading;
  },
  set(val) {
    console.log('loading', val);
    loading.value = val;
  }
});

const router = useRouter();

const options = {
  studentsType: [
    { id: Math.random(), name: 'Bakalavr', value: 1 },
    { id: Math.random(), name: 'Magistr', value: 2 }
  ]
};

const form = reactive<any>({
  name: null,
  phone: null,
  contract: null,
  institute: { name: null },
  status: { name: options.studentsType[0].name, value: 1 }
});

const rules = {
  name: { required, alpha },
  phone: { required },
  contract: { required, numeric, integer, maxLength },
  institute: { required },
  status: { required }
};

const v$ = useVuelidate(rules, form);

const submit = async () => {
  const result = await v$.value.$validate();

  if (!result) {
    loading.value = false;
    return;
  }

  const student = {
    full_name: form.name,
    type: form.status.value,
    phone: form.phone,
    institute: `${form.institute.id}`,
    contract: +form.contract
  };

  studentsStore.createStudent(student).then(() => {
    v$.value.$reset();
    loading.value = false;
    router.push({ name: 'MainStudents' });
  });
};

watch(
  () => institutesList,
  (newVal) => (form.institute = newVal.value[0])
);
</script>
