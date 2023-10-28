<template>
  <div>
    <header class="bg-[#6c47ff] text-white py-4">
      <nav class="container flex justify-between items-center">
        <div class="left-links">
     
            <img src="./assets/logo.png" alt="Logo" class="logo">
          
          <router-link to="/" class="text-lg mr-4"
            >Acceuil</router-link
          >

          <router-link v-if="userId" to="/FormulaireProfil"
            >Formulaire Profil</router-link
          >
          <router-link to="/CalculateurCalories" class="text-lg mr-4"
            >Calculatrice</router-link
          >
          <router-link v-if="userId" to="/PageProfil" class="text-lg mr-4"
            >Profil</router-link
          >

          <router-link v-if="userId" to="/RecetteView" class="text-lg mr-4"
            >Recettes</router-link
          >

          <router-link v-if="userId" to="/calories-view" class="text-lg mr-4">Mes calories</router-link>
        </div>
        <div class="right-links">
          <router-link v-if="!userId" to="/sign-in" class="text-lg mr-4"
            >Sign in</router-link
          >
          <router-link v-if="!userId" to="/sign-up" class="text-lg mr-4"
            >Sign Up</router-link
          >
        </div>
        <UserButton after-sign-out-url="/sign-in" class="text-xl ml-4" />
      </nav>
    </header>
    <main class="container mx-auto my-8">
      <router-view />
    </main>
  </div>
</template>

<script>
import { useAuth, UserButton } from "vue-clerk";

export default {
  setup() {
    const { userId } = useAuth();
    return {
      userId,
    };
  },
  components: { UserButton },
};
</script>

<style scoped>
body {
  font-family: "Arial", sans-serif;
  background-color: #f0f8f9;
  margin: 0;
  padding: 0;
}

.logo {
  height: 90px;
  margin-right: 1rem;
  display: block;
  background-color: transparent;
  outline: none;
}

nav {
  background-color: #fff;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.left-links, .right-links {
  display: flex;
  align-items: center;
}

.left-links {
  margin-right: auto;
}

.right-links {
  margin-left: auto;
}

nav a, .start-button {
  color: #fff;
  background-color: rgb(0, 146, 67);
  text-decoration: none;
  font-weight: 600;
  margin: 0 1rem;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

nav a:hover, .start-button:hover {
  background-color: rgb(0, 125, 57);
}

nav a img.logo {
  background-color: transparent !important;
  padding: 0 !important;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

main {
  padding: 2rem 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
</style>
