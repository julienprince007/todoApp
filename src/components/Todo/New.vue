<template>
  <q-form @submit="onSubmit" name="insertForm">
    <div class="q-mt-md row justify-center">
      <q-input outlined v-model="todoName" label="Task" />
      <q-btn
        outline
        type="submit"
        class="q-ml-xs"
        style="color: goldenrod"
        label="add todo"
      />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref, inject } from "vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "newTodo",

  setup() {
    const todoName = ref("");
    // Injection DB
    const DB = inject("DB");

    const onSubmit = async () => {
      if (todoName.value != "") {
        const obj = {
          id: uuidv4(),
          text: todoName.value,
          isCompleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        await DB.todos.insert(obj);
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
