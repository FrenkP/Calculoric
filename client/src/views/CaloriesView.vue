<template>
    <div>
      <h1>Calories consommer aujourd'hui</h1>
      <div v-if="caloriesData">
        <h2>Mes calories du jour : </h2>
        <div>
          <p>Calories : {{ caloriesData[selectedDay].calories }}kcal</p>
          <p>Glucides : {{ caloriesData[selectedDay].carbs }}g</p>
          <p>Protéines : {{ caloriesData[selectedDay].protein }}g</p>
          <p>Matières grasses : {{ caloriesData[selectedDay].fats }}g</p>
        </div>
      </div>
      <div v-else>
        <p>Données de calories non trouvées pour cet utilisateur.</p>
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
      const caloriesData = ref(null);
  
      // Obtenir le jour actuel
      const today = new Date().getDay();
      const selectedDay = ref(`Jour${today}`);
  
      const clerkUserId = user.value.id;
      const apiUrl = `/api/calories/${clerkUserId}`;
  
      onMounted(() => {
        axios.get(apiUrl)
          .then((response) => {
            const rawData = response.data;
            if (response.data.success) {
              caloriesData.value = rawData.data.Jours;
            }
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des données de calories', error);
          });
      });
  
      return {
        caloriesData,
        selectedDay,
      };
    },
  };
  </script>

<style scoped>
div {
    font-family: 'Arial', sans-serif;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #4CAF50; /* Vert pour rappeler la santé */
    text-align: center;
}

h2 {
    border-bottom: 1px solid #4CAF50;
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: #333;
}

p {
    color: #666;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}

div v-else {
    color: #FF5252; /* Rouge pour signaler une erreur ou une absence de données */
    font-style: italic;
}
</style>