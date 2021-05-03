<template>
  <div>
    <div class="q-mt-lg row justify-center">
      <div>
        <h4 style="color: #1876d2; text-align: center">Login</h4>
        <q-form class="q-gutter-md" style="width: 375px" @submit="onSubmit">
          <div class="q-mt-md">
            <q-input outlined v-model="name" label="User Name" />
            <q-input
              class="q-mt-md"
              outlined
              v-model="password"
              label="Password"
            />
            <div class="row justify-center">
              <q-btn
                :loading="loading"
                outline
                type="submit"
                class="q-mt-md row justify-center"
                style="color: #1876d2"
                label="login"
              >
              </q-btn>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import usersData from "../users.json";

export default defineComponent({
  name: "User",
  setup() {
    const router = useRouter();
    const store = useStore();

    const loading = ref(false);

    const name = ref("");
    const password = ref("");
    const { createDb } = inject("DB");

    const onSubmit = async () => {
      const user = await usersData.find((user) => user.name == name.value);
      if (user) {
        if (user.password === password.value) {
          try {
            await createDb(user.name);
            store.commit("rxdb/SET_DBNAME", user.name);
            loading.value = true;
            setTimeout(() => {
              loading.value = false;
              router.push(`/todo/${user.id}`);
            }, 1000);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        console.log("user not found");
      }
    };

    return {
      name,
      password,
      onSubmit,
      loading,
    };
  },
});
</script>
