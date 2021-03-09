import { ref, inject, onMounted } from "vue";

export default function getTask() {
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

  return { DB, tasks };
}
