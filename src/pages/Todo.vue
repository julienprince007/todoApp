<template>
  <div class="row">
    <div class="q-pa-md">
      <h4 style="color: #1876d2">Users Lists</h4>
      <div style="min-width: 350px">
        <q-list bordered separator v-for="user in users" :key="user.id">
          <UserItem :user="user" :selectUser="selectUser" />
        </q-list>
      </div>
    </div>
    <div class="q-ml-lg q-pa-md">
      <h4 style="color: #1876d2">Todos Lists</h4>
      <NewTodo />
      <TodoList />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NewTodo from "components/Todo/New";
import TodoList from "components/Todo/List";
import getUser from "../todoComposition/getUsers";
import UserItem from "../components/user/UserItem";
import redirect from "../todoComposition/redirect";

export default defineComponent({
  name: "PageIndex",
  components: {
    NewTodo,
    TodoList,
    UserItem,
  },

  setup() {
    const { users } = getUser();
    const { selectUser } = redirect();

    return {
      users,
      selectUser,
    };
  },
});
</script>
