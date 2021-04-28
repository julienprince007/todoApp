<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Hasura, RxDB, Vue3, Composition API</q-toolbar-title>
        <q-btn
          v-if="this.$route.path === `/todo/${this.$route.params.userId}`"
          flat
          icon-right="logout"
          label="Logout"
          class="absolute-right"
          to="/user"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>
