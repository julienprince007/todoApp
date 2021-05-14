<template>
  <div style="margin: auto; min-width: 500px">
    <div class="q-pa-md">
      <q-list
        v-for="task in tasks"
        :key="task.id"
        bordered
        class="rounded-borders"
        style="width: 100%; margin: 5px"
      >
        <TodoItem
          :text="task.text"
          :cat_id="task.category_id"
          :todo="task"
          :isCompleted="task.isCompleted"
        />
      </q-list>
      <q-list
        v-if="!tasks.length"
        bordered
        style="min-width: 500px, margin: 5px"
        class="rounded-borders"
      >
        <q-item>
          <q-item-section>No tasks for at moment</q-item-section>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="check" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed } from "vue";

import TodoItem from "./todoItem";
import todoMethods from "./todoMethods";

export default defineComponent({
  name: "TodoList",
  components: { TodoItem },

  setup() {
    const { findTask, tasks } = todoMethods();
    //surveil instance collection
    const collection = computed(() => getCollection("todos"));
    onMounted(() => {
      findTask();
    });

    return {
      tasks,
      collection,
    };
  },
});
</script>
