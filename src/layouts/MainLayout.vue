<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Hasura, RxDB, Vue3, Composition API</q-toolbar-title>
        <q-btn
          v-if="this.$route.path === `/todo/${this.$route.params.userId}`"
          flat
          @click="logout"
          icon-right="logout"
          label="Logout"
          class="absolute-right"
          to="/login"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, inject } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const store = useStore();
    const stopReplication = inject("stopReplication");
    function logout() {
      try {
        store.commit("rxdb/LOGOUT");
        stopReplication();
      } catch (error) {
        console.log(error);
      }
    }
    return {
      logout,
    };
  },
});
</script>
