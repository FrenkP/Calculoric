<template>
  <div class="recettes-container">
    <h1 class="title">Vos Recettes</h1>
    <div v-if="recettes.length" class="recipes-list">
      <div v-for="recipe in recettes" :key="recipe._id" class="recipe-card">
        <h2 class="recipe-title">{{ recipe.name }}</h2>
        <div class="recipe-details">
          <p><span class="detail-label">Calories:</span> {{ recipe.value.calories }}kcal</p>
          <p><span class="detail-label">Glucides:</span> {{ recipe.value.carbs }}g</p>
          <p><span class="detail-label">Protéines:</span> {{ recipe.value.protein }}g</p>
          <p><span class="detail-label">Matières grasses:</span> {{ recipe.value.fats }}g</p>
          <p><span class="detail-label">Ingrédients:</span> {{ recipe.ingredients }}</p>
        </div>
      </div>
    </div>
    <div v-else class="no-recipes">
      <p>Aucune recette trouvée pour cet utilisateur.</p>
    </div>
  </div>
</template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useUser } from 'vue-clerk';
  
  export default {
    setup() {
      const { user } = useUser();
      const recettes = ref([]);
  
      const clerkUserId = user.value.id;
      const apiUrl = `http://localhost:5000/api/getRecipes?clerkUserId=${clerkUserId}`;

  
      onMounted(() => {
        axios.get(apiUrl)
          .then((response) => {
            if (response.data.success && response.data.data.length > 0) {
        recettes.value = response.data.data[0].recettes;
    }
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des recettes', error);
          });
      });
  
      return {
        recettes,
      };
    },
  };
  </script>
  
  <style scoped>
.recettes-container {
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  color: #334;
  text-align: center;
  margin-bottom: 30px;
}

.recipes-list {
  display: grid;
  grid-gap: 20px;
}

.recipe-card {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.recipe-title {
  font-size: 1.5rem;
  color: #445;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.recipe-details {
  color: #666;
}

.detail-label {
  font-weight: 500;
  color: #334;
}

.no-recipes {
  text-align: center;
  margin-top: 20px;
  color: #888;
}
</style>