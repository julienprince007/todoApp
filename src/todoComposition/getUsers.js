import { ref, inject, onMounted } from "vue";

export default function getUsers() {
  const DBUser = inject("DBUser");
  const users = ref([]);
  onMounted(() => {
    DBUser.users
      .find()
      .sort("created_at")
      .$.subscribe((user) => {
        if (!user) {
          return;
        }
        users.value = user;
      });
  });

  return { DBUser, users };
}
