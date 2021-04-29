<template>
  <div class="row justify-around">
    <div class="q-ml-lg q-pa-md">
      <h4 style="color: #1876d2; text-align: center">Todos Lists</h4>
      <NewTodo />
      <TodoList />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, inject } from "vue";
import NewTodo from "components/Todo/New";
import TodoList from "components/Todo/List";
import subTodoQuery from "../rxdb/subscription/subTodoQuery";
import subUserQuery from "../rxdb/subscription/subUserQuery";
import {
  todoPushQueryBuilder,
  todoPullQueryBuilder,
} from "../rxdb/queryBuilder/todoQueryBuilder ";

export default defineComponent({
  name: "PageIndex",
  components: {
    NewTodo,
    TodoList,
  },

  setup() {
    const { initTodoReplication } = inject("DB");

    onMounted(async () => {
      const secret = process.env.SECRET;
      const urlweb = process.env.URLWEBSOCKET;
      const urlsync = process.env.SYNCURL;
      const collection = "todos";
      await initTodoReplication(
        secret,
        urlweb,
        urlsync,
        subTodoQuery,
        todoPushQueryBuilder,
        todoPullQueryBuilder,
        collection
      );
    });
    return {};
  },
});
</script>
