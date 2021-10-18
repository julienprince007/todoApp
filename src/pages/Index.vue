<template>
  <div class="container">
    <Login />
  </div>
</template>

<script>
import { defineComponent } from "vue"
import Login from "./Login"

export default defineComponent({
  name: "PageIndex",
  components: {
    Login
  }
})
</script>
