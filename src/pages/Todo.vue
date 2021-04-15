<template>
  <div class="row justify-around">
    <div class="q-pa-md">
      <h4 style="color: #1876d2; text-align: center">Users Lists</h4>
      <div style="min-width: 350px">
        <q-list bordered v-for="user in users" :key="user.id">
          <UserItem :user="user" :selectUser="selectUser" />
        </q-list>
      </div>
    </div>
    <div class="q-ml-lg q-pa-md">
      <h4 style="color: #1876d2; text-align: center">Todos Lists</h4>
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
