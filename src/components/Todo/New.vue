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

export default defineComponent({
  name: "newTodo",
  setup() {
    const todoName = ref("");
    const route = useRoute();
    const { getDB } = inject("DB");

    const onSubmit = async () => {
      const db = getDB();
      if (todoName.value !== "") {
        const obj = {
          id: uuidv4(),
          text: todoName.value,
          isCompleted: false,
          user_id: route.params.userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        await db.todos.insert(obj);
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
