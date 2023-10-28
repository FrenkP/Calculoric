<template>
  <div>
    <UserProfile />
  </div>
</template>

<script setup>
// Importez UserProfile depuis 'vue-clerk' correctement
import { UserProfile } from 'vue-clerk';
import { useAuth } from 'vue-clerk';

const { isSignedIn } = useAuth();

// Pour utiliser votre middleware, assurez-vous d'importer la fonction useMiddleware correctement depuis '../components/middleware'.
import { useMiddleware } from '../components/middleware';
useMiddleware(isSignedIn);
</script>
