<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

import Countries from "./Api/Countries";
import Order from "./Api/Order";

import BaseAlert from "./components/BaseAlert.vue";
import BaseTitle from "./components/BaseTitle.vue";
import BaseField from "./components/BaseField.vue";
import CreditCardField from "./components/CreditCardField.vue";
import CvvField from "./components/CvvField.vue";
import ExpDateField from "./components/ExpDateField.vue";
import PhoneField from "./components/PhoneField.vue";
import SelectField from "./components/SelectField.vue";
import TheCheckout from "./components/TheCheckout.vue";
import { PurchaseData, CountiresInterface } from "./types/form";

const alert = reactive({
  classes: "",
  display: false,
  message: "",
});

const formData = reactive(<PurchaseData>{
  firstName: {
    value: "",
    isValid: false,
  },
  lastName: {
    value: "",
    isValid: false,
  },
  email: {
    value: "",
    isValid: false,
  },
  country: {
    value: "",
    isValid: false,
  },
  postalCode: {
    value: "",
    isValid: false,
  },
  phone: {
    value: "",
    isValid: false,
  },
  creditCard: {
    value: "",
    isValid: false,
  },
  CVV: {
    value: "",
    isValid: false,
  },
  expDate: {
    value: "",
    isValid: false,
  },
});

const countriesData = ref([{ name: "", idd: "" }]);
const checkoutData = ref<unknown>();
const forcingValidate = ref(false);

const selectedCountryIdd = computed(() => {
  if (formData.country.value !== "") {
    const country = countriesData.value.find(
      (x: CountiresInterface) => x.name === formData.country.value
    );
    return country;
  }
  return "";
});

const getCountries = async () => {
  let responseStatus = 0;
  await Countries.get()
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((response) => {
      try {
        if (responseStatus !== 200) throw `Error: ${responseStatus}`;
        countriesData.value = response.map(
          (x: any) =>
            <CountiresInterface>{
              name: x.name.common,
              idd: `${x.idd.root}${x.idd.suffixes}`,
            }
        );
      } catch (error) {
        console.log(error);
      }
    });
};

const convertPostData = () => {
  return {
    firstName: formData.firstName.value,
    lastName: formData.lastName.value,
    email: formData.email.value,
    country: formData.country.value,
    postalCode: formData.postalCode.value,
    phone: formData.phone.value.replace(/(\d{3})-(\d{3})-(\d{3})/, "$1$2$3"),
    creditCard: formData.creditCard.value.replace(
      /(\d{4})-(\d{4})-(\d{4})-(\d{4})/,
      "$1$2$3$4"
    ),
    CVV: formData.CVV.value,
    expDate: formData.expDate.value,
  };
};

const submitOrder = async () => {
  forcingValidate.value = !forcingValidate.value;
  if (
    formData.firstName.isValid &&
    formData.lastName.isValid &&
    formData.email.isValid &&
    formData.country.isValid &&
    formData.postalCode.isValid &&
    formData.phone.isValid &&
    formData.creditCard.isValid &&
    formData.CVV.isValid &&
    formData.expDate.isValid
  ) {
    const dataToPost = convertPostData();
    let responseStatus = 0;
    await Order.post(dataToPost)
      .then((response) => {
        responseStatus = response.status;
        return response.json();
      })
      .then((response) => {
        try {
          if (responseStatus !== 200) throw `Error: ${responseStatus}`;
          alert.classes = "alert__success";
          alert.display = true;
          alert.message = response.message;
        } catch (error) {
          alert.classes = "alert__error";
          alert.display = true;
          alert.message = error;
        }
      });
  }
};

onMounted(() => {
  getCountries();
});
</script>

<template>
  <div class="bg-gray-100">
    <BaseAlert :data="alert" @displayUpdate="alert.display = $event" />
    <div class="mx-auto flex items-center min-h-screen py-12 md:px-[12%]">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-8 gap-x-4 w-full px-6">
        <form
          action="#"
          @submit.prevent="submitOrder"
          class="lg:col-span-2 lg:pl-10 xl:pl-20"
        >
          <div class="mb-12">
            <BaseTitle
              class="mb-4"
              :counter="1"
              :title="'Personal infomration'"
            />
            <div class="grid lg:grid-cols-2 gap-4 w-full">
              <BaseField
                v-model="formData.firstName.value"
                :label="'First name'"
                :placeholder="'First name'"
                :forcingValidate="forcingValidate"
                :validation="{ required: true }"
                @update:valid="formData.firstName.isValid = $event"
              />
              <BaseField
                v-model="formData.lastName.value"
                :label="'Last name'"
                :placeholder="'Last name'"
                :forcingValidate="forcingValidate"
                :validation="{ required: true }"
                @update:valid="formData.lastName.isValid = $event"
              />
              <BaseField
                v-model="formData.email.value"
                :label="'Email'"
                :placeholder="'email@gmail.com'"
                :forcingValidate="forcingValidate"
                :validation="{ required: true, type: 'email' }"
                @update:valid="formData.email.isValid = $event"
                class="lg:col-span-2"
              />
              <SelectField
                v-model="formData.country.value"
                :label="'Country'"
                :placeholder="'Select country'"
                :forcingValidate="forcingValidate"
                :validation="{ required: true }"
                @update:valid="formData.country.isValid = $event"
                :options="countriesData"
              />
              <BaseField
                v-model="formData.postalCode.value"
                :label="'Post Code'"
                :placeholder="'00000'"
                :forcingValidate="forcingValidate"
                :countryIdd="selectedCountryIdd"
                :validation="{ required: true, type: 'postalCode' }"
                @update:valid="formData.postalCode.isValid = $event"
              />
              <PhoneField
                v-model="formData.phone.value"
                :label="'Phone number'"
                :placeholder="'000-000-000'"
                :validation="{ required: true }"
                :forcingValidate="forcingValidate"
                @update:valid="formData.phone.isValid = $event"
                class="lg:col-span-2"
              />
            </div>
          </div>
          <div>
            <BaseTitle
              class="mb-4"
              :counter="2"
              :title="'Payments details'"
              :icon="'lock.svg'"
            />
            <div class="grid lg:grid-cols-2 gap-4 w-full">
              <CreditCardField
                v-model="formData.creditCard.value"
                :label="'Credit Card Number'"
                :placeholder="'0000-0000-0000-0000'"
                :forcingValidate="forcingValidate"
                @update:valid="formData.creditCard.isValid = $event"
                class="lg:col-span-2"
              />
              <CvvField
                v-model="formData.CVV.value"
                :label="'Credit Card Number'"
                :placeholder="'CVV'"
                :forcingValidate="forcingValidate"
                @update:valid="formData.CVV.isValid = $event"
              />
              <ExpDateField
                v-model="formData.expDate.value"
                :label="'Expire Date'"
                :placeholder="'MM/YY'"
                :forcingValidate="forcingValidate"
                @update:valid="formData.expDate.isValid = $event"
              />
            </div>
          </div>
          <button
            type="submit"
            class="mt-8 flex items-center justify-center w-full h-12 rounded-[6px] bg-purchase-100 hover:bg-purchase-200 focus:bg-purchase-200"
          >
            <img
              class="mr-2"
              src="/images/cart.svg"
              alt="Cart icon"
              loading="lazy"
            />
            <span class="text-sm text-white font-bold uppercase"
              >Complete purchase</span
            >
          </button>
        </form>
        <div
          class="pt-8 lg:pt-10 border-t lg:border-t-0 border-solid border-black"
        >
          <TheCheckout />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
