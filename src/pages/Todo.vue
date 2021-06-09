<template>
  <div class="row justify-around">
    <div class="q-ml-lg q-pa-md">
      <h4 style="color: #1876d2; text-align: center">Todos Lists</h4>
      <NewTodo />
      <TodoList />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue"

import NewTodo from "components/Todo/New"
import TodoList from "components/Todo/List"
import rxdb from "@sowell/rxdb"

export default defineComponent({
  name: "PageIndex",
  components: {
    NewTodo,
    TodoList
  },

  setup() {
    const { initReplication } = rxdb()
    onMounted(async () => {
      try {
        await initReplication()
      } catch (error) {
        console.log("error: ", error)
      }
    })

    return {}
  }
})
</script>
