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
import { defineComponent } from "vue";
import NewTodo from "components/Todo/New";
import TodoList from "components/Todo/List";

export default defineComponent({
  name: "PageIndex",
  components: {
    NewTodo,
    TodoList,
  },
});
</script>
