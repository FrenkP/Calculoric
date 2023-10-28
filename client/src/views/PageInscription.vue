<template>
  <div>
    <h2>Inscription</h2>
    <SignUp />
  </div>
</template>

<script>
import { SignUp } from "vue-clerk";

export default {
  components: {
    SignUp,
  },
};
</script>
