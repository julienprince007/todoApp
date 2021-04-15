<template>
  <div class="container">
    <div>
      <User />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import User from "./User";

export default defineComponent({
  name: "PageIndex",
  components: {
    User,
  },
});
</script>
