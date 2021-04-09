<template>
  <div class="container">
    <div>
      <h4 style="text-align: center; color: #1876d2">
        Hasura, RxDB, Vue3, API composition, Apollo Client
      </h4>
      <NewTodo />
      <TodoList />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import NewTodo from "components/Todo/New";
import TodoList from "components/Todo/List";
import { useQuasar } from "quasar";
import * as replication from "poctodoplugin/src/replication";

export default defineComponent({
  name: "PageIndex",
  components: {
    NewTodo,
    TodoList,
  },

  setup() {
    const $q = useQuasar();
    const token = $q.localStorage.getItem("token");
    const secret = process.env.SECRET;
    const urlweb = process.env.URLWEBSOCKET;
    const urlsync = process.env.SYNCURL;

    onMounted(() => {
      replication.initReplication(token, secret, urlweb, urlsync);
    });
  },
});
</script>
