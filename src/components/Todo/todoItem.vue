<template>
  <q-item>
    <q-item-section @click="updateTodo(todo)" style="cursor: pointer">
      <q-item-label>
        <p :class="rowClass(isCompleted)" style="margin: 0px">
          {{ text }}
        </p>
      </q-item-label>
      <q-item-label caption>Catégorie: {{ cat_name }}</q-item-label>
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
import { defineComponent, computed } from "vue";
import todoMethods from "./todoMethods";

export default defineComponent({
  name: "Item",
  props: {
    todo: Object,
    cat_id: Number,
    text: String,
    isCompleted: Boolean,
  },

  setup(props) {
    const { toggleTodo, removeTodo, updateTodo, rowClass } = todoMethods();

    let cat_name = computed(() => {
      switch (props.cat_id) {
        case 1:
          return "daily_task";
          break;
        case 2:
          return "work_planing";
          break;
        case 3:
          return "shopping_lists";
          break;
        case 4:
          return "reminder";
          break;
        default:
          return "";
      }
    });

    return {
      rowClass,
      toggleTodo,
      removeTodo,
      updateTodo,
      cat_name,
    };
  },
});
</script>
<style>
.textThrough {
  text-decoration: line-through;
}
</style>
