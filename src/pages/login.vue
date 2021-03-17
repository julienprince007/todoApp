<template>
  <div class="q-mt-md row justify-center">
    <q-form class="q-gutter-md" style="width: 375px" @submit="onSubmit">
      <q-input outlined v-model="user.email" label="email" />
      <q-input
        outlined
        v-model="user.password"
        label="password"
        type="password"
        autocomplete="new-password"
      />
      <div class="row justify-center">
        <q-btn type="submit" color="primary" label="connexion" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginPAge",
  setup() {
    const user = ref({
      email: null,
      password: null,
    });
    const store = useStore();

    function onSubmit() {
      if (user.value.email !== null && user.value.password !== null) {
        store.dispatch("auth/connectUser", user.value);
      }
    }

    return {
      user,
      onSubmit,
    };
  },
});
</script>
