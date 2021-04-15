<template>
  <div class="container">
    <div>
      <User />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import User from "./User";
import { useQuasar } from "quasar";
import * as todoReplication from "poctodoplugin/src/replication";
import * as UserReplication from "plugin-user/src/replication";

export default defineComponent({
  name: "PageIndex",
  components: {
    User,
  },

  setup() {
    const $q = useQuasar();
    const token = $q.localStorage.getItem("token");
    const secret = process.env.SECRET;
    const urlweb = process.env.URLWEBSOCKET;
    const urlsync = process.env.SYNCURL;

    onMounted(() => {
      todoReplication.initReplication(secret, urlweb, urlsync);
      UserReplication.initReplication(secret, urlweb, urlsync);
    });
  },
});
</script>
