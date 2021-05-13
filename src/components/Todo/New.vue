<template>
  <div class="row q-pa-md">
    <q-form @submit="onSubmit" name="insertForm">
      <div class="q-mt-md">
        <q-input rounded v-model="todoName" label="New Task" />
        <q-btn
          outline
          type="submit"
          class="q-ml-xs q-mt-md"
          style="color: goldenrod"
          label="add todo"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref, inject } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "newTodo",
  setup() {
    const route = useRoute();
    const store = useStore();
    //TODO:gerer les categoris des todos
    const todoName = ref("");
    const role = store.getters["rxdb/getUser"];
    let cat_Id = role === "public" ? 1 : 2;

    const { getCollection } = inject("DB");

    const onSubmit = async () => {
      const collection = getCollection("todos");
      if (todoName.value !== "") {
        const obj = {
          id: uuidv4(),
          text: todoName.value,
          isCompleted: false,
          category_id: cat_Id,
          user_id: route.params.userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        await collection.insert(obj);
        todoName.value = "";
      }
    };

    return {
      todoName,
      onSubmit,
    };
  },
});
</script>
