import { inject, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

export default function todoMethods() {
  const { getCollection } = inject("DB");
  const $q = useQuasar();
  const { getDB } = inject("DB");
  const route = useRoute();
  const tasks = ref([]);

  const collection = getCollection("todos");
  if (collection === undefined) {
    collection = getDB.todos;
  }

  async function findOneTodo(id) {
    return await collection.find({
      selector: { id: { $eq: id } },
    });
  }

  async function toggleTodo(todo) {
    const doc = await findOneTodo(todo.id);
    doc.update({
      $set: {
        isCompleted: !todo.isCompleted,
      },
    });
  }

  async function removeTodo(todo) {
    await findOneTodo(todo.id).then((doc) => {
      doc.remove();
    });
  }

  function updateTodo(todo) {
    $q.dialog({
      title: "Modification",
      dark: true,
      prompt: {
        model: todo.text,
      },
      cancel: true,
      persistent: true,
    }).onOk(async (data) => {
      if (data) {
        const doc = await findOneTodo(todo.id);
        doc.update({
          $set: {
            text: data,
          },
        });
      }
    });
  }

  function rowClass(isCompleted) {
    return { textThrough: isCompleted };
  }

  function findTask() {
    if (collection === null) {
      const localDB = getDB();
      setupQuery(localDB.todos);
    } else {
      setupQuery(collection);
    }
  }

  function setupQuery(collection) {
    collection
      .find()
      .sort("created_at")
      .$.subscribe((todos) => {
        if (!todos) {
          return;
        }
        tasks.value = todos;
      });
  }

  return {
    toggleTodo,
    findOneTodo,
    removeTodo,
    updateTodo,
    rowClass,
    findTask,
    tasks,
  };
}
