<template>
  <q-item>
    <q-item-section @click="updateTodo(todo)" style="cursor: pointer">
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
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import todoLogic from "../../todoComposition/todoLogic";

export default defineComponent({
  name: "Item",
  props: {
    todo: Object,
    text: String,
    isCompleted: Boolean,
  },

  setup() {
    const { toggleTodo, removeTodo, updateTodo, rowClass } = todoLogic();

    return {
      rowClass,
      toggleTodo,
      removeTodo,
      updateTodo,
    };
  },
});
</script>
<style>
.textThrough {
  text-decoration: line-through;
}
</style>
