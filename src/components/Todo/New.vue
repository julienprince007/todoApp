<template>
  <div class="row q-pa-md justify-center">
    <q-form @submit="onSubmit" name="insertForm">
      <div class="q-mt-md">
        <div class="row justify-between">
          <q-input rounded v-model="todoName" label="New Task" />
          <div style="min-width: 200px">
            <q-select
              v-if="todoName.length"
              class="q-ml-xl"
              v-model="model"
              :options="options"
              label="Catégorie"
            />
          </div>
        </div>
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
import { defineComponent, ref, inject, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "newTodo",
  setup() {
    const route = useRoute();
    const store = useStore();
    //TODO:gerer les categoris des todos
    const model = ref(null);
    const todoName = ref("");

    const { role, org } = store.getters["rxdb/getUser"];
    let options =
      role === "free"
        ? ["daily_task", "work_planing"]
        : ["daily_task", "work_planing", "shopping_lists", "reminder"];
    let cat_Id = computed(() => {
      switch (model.value) {
        case "daily_task":
          return 1;
          break;
        case "work_planing":
          return 2;
          break;
        case "shopping_lists":
          return 3;
          break;
        case "reminder":
          return 4;
          break;
        default:
          return 1;
      }
    });

    const { getCollection } = inject("DB");

    const onSubmit = async () => {
      const collection = getCollection("todos");
      if (todoName.value !== "") {
        const obj = {
          id: uuidv4(),
          text: todoName.value,
          isCompleted: false,
          category_id: cat_Id.value,
          company_id: +org,
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
      model,
      options,
    };
  },
});
</script>
