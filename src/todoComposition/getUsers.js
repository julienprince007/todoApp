import { ref, inject, onMounted } from "vue";

export default function getUsers() {
  const DB = inject("DB");
  const users = ref([]);
  onMounted(() => {
    DB.users
      .find()
      .sort("created_at")
      .$.subscribe((user) => {
        if (!user) {
          return;
        }
        users.value = user;
      });
  });

  return { DB, users };
}
