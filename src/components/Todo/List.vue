<template>
  <div style="margin: auto; min-width: 500px">
    {{ onlines }}
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
import {
  defineComponent,
  ref,
  inject,
  onMounted,
  watch,
  onBeforeUnmount,
  computed,
} from "vue";

import TodoItem from "./todoItem";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "TodoList",
  components: { TodoItem },

  setup() {
    // Injection DB
    const DB = inject("DB");
    const RP = inject("RP");
    const route = useRoute();

    const tasks = ref([]);
    const userId = computed(() => {
      return Array.isArray(route.params.userId)
        ? route.params.userId[0]
        : route.params.userId;
    });

    const onlines = ref(navigator.onLine);

    watch(userId, getTodo);
    // watch(onlines, stopReplication);

    onMounted(() => {
      getTodo();
      stopReplication();
      window.addEventListener("online", updateStatus);
      window.addEventListener("offline", updateStatus);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    });

    function updateStatus(e) {
      const { type } = e;
      onlines.value = type === "online";
    }

    function getTodo() {
      DB.todos
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

    async function stopReplication() {
      const isReplicated = await RP.awaitInitialReplication();
      if(isReplicated) {
        RP.cancel()
      }
    }

    return {
      tasks,
      getTodo,
      onlines,
    };
  },
});
</script>
