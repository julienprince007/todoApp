<template>
  <q-item
    clickable
    v-ripple
    @click="selectUser(user.id)"
    :active="
      user.id === this.$route.params.userId &&
      this.$route.path === `/todo/${this.$route.params.userId}`
    "
    active-class="bg-amber-3 text-blue-grey"
  >
    <q-item-section avatar>
      <q-avatar color="blue-grey" text-color="white">
        {{ user.name[0] }}
      </q-avatar>
    </q-item-section>
    <q-item-section>{{ user.name }}</q-item-section>
    <q-item-section side>
      <q-icon name="list" color="bg-amber-3" />
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Item",
  props: {
    user: Object,
    selectUser: Function,
  },

  setup() {
    return {};
  },
});
</script>
