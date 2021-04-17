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
          :todo="task"
          :isCompleted="task.isCompleted"
        />
      </q-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject, onMounted, watch, computed } from "vue";

import TodoItem from "./todoItem";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "TodoList",
  components: { TodoItem },

  setup() {
    // Injection DB
    const DBTodo = inject("DBTodo");
    const route = useRoute();

    const tasks = ref([]);
    const userId = computed(() => {
      return Array.isArray(route.params.userId)
        ? route.params.userId[0]
        : route.params.userId;
    });

    watch(userId, getTodo);

    onMounted(() => {
      getTodo();
    });

    function getTodo() {
      DBTodo.todos
        .find({
          selector: { user_id: { $eq: route.params.userId } },
        })
        .sort("created_at")
        .$.subscribe((todos) => {
          if (!todos) {
            return;
          }
          tasks.value = todos;
        });
    }

    return {
      tasks,
      getTodo,
    };
  },
});
</script>
