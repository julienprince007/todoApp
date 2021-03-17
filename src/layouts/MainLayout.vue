<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Todo App </q-toolbar-title>
        <q-btn
          v-if="token"
          @click="logout"
          flat
          icon-right="account_circle"
          label="Se déconnecter"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const store = useStore();
    const token = computed(() => store.getters["auth/isSignedIn"]);

    function logout() {
      store.dispatch("auth/logoutUser");
    }
    return { token, logout };
  },
});
</script>
