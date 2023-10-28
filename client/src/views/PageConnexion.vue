<template>
  <SignIn @signedIn="handleSignIn" />
</template>

<script>
import { SignIn } from 'vue-clerk';

export default {
  components: {
    SignIn,
  },
  methods: {
    handleSignIn(response) {
      console.log(response.message); 
    },
  },
};
</script>
