<template>
  <div
    v-if="tasks.length > 0"
    class="q-pa-xl column justify-content"
    id="q-app"
    style="margin: auto; max-width: 700px"
  >
    <div class="q-mb-md row justify-center">
      <q-btn
        class="q-mr-xs"
        color="red"
        label="Delete All task"
        @click="clearAll"
      />
      <q-btn color="orange" label="Delete task done" @click="clearAllDone" />
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-list
        v-for="task in tasks"
        :key="task.id"
        bordered
        class="rounded-borders"
        style="width: 100%; margin: 5px"
      >
        <Item :text="task.text" :todo="task" :isCompleted="task.isCompleted" />
      </q-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject, onMounted } from "vue";

import Item from "./Item";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default defineComponent({
  name: "TodoList",
  components: { Item },

  setup() {
    // Injection DB
    const DB = inject("DB");
    const $q = useQuasar();
    const token = $q.localStorage.getItem("token");

    const store = useStore();

    const tasks = ref([]);
    onMounted(() => {
      DB.todos
        .find()
        .sort("created_at")
        .$.subscribe((todos) => {
          if (!todos) {
            return;
          }
          tasks.value = todos;
        });
      if (token && store.getters["auth/isSignedIn"] === null) {
        store.commit("auth/SET_TOKEN", token);
      }
    });

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
      clearAll,
      clearAllDone,
    };
  },
});
</script>
