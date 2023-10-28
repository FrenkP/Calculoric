<script setup lang="ts">
import { useSignUp } from 'vue-clerk'

const { isLoaded, signUp } = useSignUp()
</script>

<template>
  <div v-if="isLoaded">
    The current sign up attempt status
    is {{ signUp.status }}.
  </div>
</template>