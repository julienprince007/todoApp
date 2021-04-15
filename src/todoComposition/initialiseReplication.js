import { ref, inject, onMounted } from "vue";
import * as todoReplication from "poctodoplugin/src/replication";
import * as UserReplication from "plugin-user/src/replication";
const secret = process.env.SECRET;
const urlweb = process.env.URLWEBSOCKET;
const urlsync = process.env.SYNCURL;

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
