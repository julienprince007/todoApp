import { inject } from "vue";
import { useQuasar } from "quasar";

export default function todoLogic() {
  const db = inject("DBTodo");
  const $q = useQuasar();

  async function findOneTodo(id) {
    return await db.todos.find({
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

  return { toggleTodo, findOneTodo, removeTodo, updateTodo, rowClass };
}
