<template>
  <SignOutButton @signedOut="handleSignOut" />
</template>

<script>
import { SignOutButton } from 'vue-clerk';

export default {
  components: {
    SignOutButton,
  },
  methods: {
    handleSignOut(response) {
      console.log(response.message); 
    },
  },
};
</script>
