<template>
  <div class="container">
    <div>
      <Login />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Login from "./Login";

export default defineComponent({
  name: "PageIndex",
  components: {
    Login,
  },
});
</script>
