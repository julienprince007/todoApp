<template>
  <div>
    <div class="q-mt-lg row justify-center">
      <div>
        <h4 style="color: #1876d2; text-align: center">Users Lists</h4>
        <q-form class="q-gutter-md" style="width: 375px" @submit="onSubmit">
          <div class="q-mt-md row justify-center">
            <q-input outlined v-model="name" label="New User" />
            <q-btn
              outline
              type="submit"
              class="q-ml-md"
              size="sm"
              style="color: #1876d2"
              label="add user"
            />
          </div>
        </q-form>
      </div>
    </div>
    <div class="q-mt-lg row justify-center">
      <div class="q-pa-md" style="min-width: 450px">
        <q-list bordered separator v-for="user in users" :key="user.id">
          <Item :user="user" :selectUser="selectUser" />
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Item from "../components/user/UserItem";
import { v4 as uuidv4 } from "uuid";
import getUser from "../todoComposition/getUsers";
import redirect from "../todoComposition/redirect";

export default defineComponent({
  name: "User",
  components: { Item },
  setup() {
    const { DBUser, users } = getUser();
    const { selectUser } = redirect();

    const name = ref();

    const onSubmit = async () => {
      if (name.value !== "") {
        const obj = {
          id: uuidv4(),
          name: name.value,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        await DBUser.users.insert(obj);
        name.value = "";
      }
    };

    return {
      name,
      onSubmit,
      users,
      selectUser,
    };
  },
});
</script>
