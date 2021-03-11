<template>
  <q-item>
    <q-item-section>
      <q-item-label>
        <p :class="rowClass(isCompleted)" style="margin: 0px">
          {{ text }}
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
          @click="removeTodo(todo)"
          icon="delete"
        />
        <q-btn
          class="gt-xs"
          size="12px"
          flat
          color="green"
          dense
          round
          @click="toggleTodo(todo)"
          :icon="isCompleted ? 'history' : 'done'"
        />
        <q-btn
          class="gt-xs"
          size="12px"
          flat
          color="blue"
          dense
          round
          @click="updateText(todo)"
          icon="edit"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "Item",
  props: {
    todo: Object,
    text: String,
    isCompleted: Boolean,
  },

  setup() {
    const $q = useQuasar();

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

    function updateText(todo) {
      $q.dialog({
        title: "Modification",
        dark: true,
        prompt: {
          model: todo.text,
        },
        cancel: true,
        persistent: true,
      }).onOk((data) => {
        if (data) {
          todo.update({
            $set: {
              text: data,
            },
          });
        }
      });
    }
    return {
      rowClass,
      removeTodo,
      toggleTodo,
      updateText,
    };
  },
});
</script>
<style>
.textThrough {
  text-decoration: line-through;
}
</style>
