<template>
  <div></div>
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
        <q-item>
          <q-item-section>
            <q-item-label>
              <p :class="rowClass(task.isCompleted)" style="margin: 0px">
                {{ task.text }}
              </p>
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                color="red"
                round
                @click="removeTodo(task)"
                icon="delete"
              ></q-btn>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                color="green"
                dense
                round
                @click="toggleTodo(task)"
                icon="done"
              ></q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject, onMounted } from "vue";

export default defineComponent({
  name: "TodoList",

  setup() {
    // Injection DB
    const DB = inject("DB");
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
    });

    async function clearAll() {
      if (this.todos) await this.todos.map((task) => task.remove());
    }

    function clearAllDone() {
      if (tasks.value) {
        tasks.value.map((task) => {
          if (task.isCompleted) task.remove();
        });
      }
    }

    function rowClass(isCompleted) {
      return { textThrough: isCompleted };
    }

    async function removeTodo(todo) {
      if (todo.isCompleted) return await todo.remove();
    }

    async function toggleTodo(todo) {
      await todo.update({
        $set: {
          isCompleted: !todo.isCompleted,
        },
      });
    }

    return {
      tasks,
      DB,
      clearAll,
      clearAllDone,
      rowClass,
      removeTodo,
      toggleTodo,
    };
  },
});
</script>
<style>
.textThrough {
  text-decoration: line-through;
}
</style>
