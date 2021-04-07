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
        <q-btn
          type="submit"
          :loading="loading"
          color="primary"
          label="login"
          style="width: 200px"
        >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref, computed, inject } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "LoginPAge",
  setup() {
    const $q = useQuasar();
    const API = inject("API");
    const store = useStore();
    const user = ref({
      email: null,
      password: null,
    });
    const loading = computed(() => store.getters["auth/loading"]);

    function onSubmit() {
      if (user.value.email !== null && user.value.password !== null) {
        store.commit("auth/SET_LOADING");
        API.post("users/sign_in", user.value)
          .then(function (response) {
            store.commit("auth/SET_TOKEN", response.data.token);
            store.commit("auth/SET_LOADING_END");
          })
          .catch(function (error) {
            $q.notify({
              type: "negative",
              position: "top",
              message:
                error.response.data.error + ".Verifier votre identifiant!",
            });
            store.commit("auth/SET_LOADING_END");
          });
      }
    }
    return {
      user,
      onSubmit,
      loading,
    };
  },
});
</script>
