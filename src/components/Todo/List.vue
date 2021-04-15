<template>
  <div style="margin: auto; min-width: 600px">
    <div class="q-pa-md q-gutter-md">
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
    const users = ref([]);
    const id = computed(() => {
      return Array.isArray(route.params.userId)
        ? route.params.userId[0]
        : route.params.userId;
    });

    watch(id, getTodo, { deep: false });

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
    function clearAllDone() {
      if (tasks.value) {
        tasks.value.map((task) => {
          if (task.isCompleted) task.remove();
        });
      }
    }
    function clearAll() {
      if (tasks.value) tasks.value.map((task) => task.remove());
    }

    return {
      tasks,
      users,
      clearAll,
      getTodo,
      clearAllDone,
    };
  },
});
</script>
