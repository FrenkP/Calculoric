<template>
  <div>
    <div>
      <form @submit="handleSearchSubmit">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Banana"
          @input="fetchAutoCompleteResults"
        />
        <button type="submit">Recherche</button>
      </form>
      <ul v-if="autoCompleteResults.length">
        <li
          v-for="result in autoCompleteResults"
          :key="result"
          @click="onAutoCompleteSelect(result)"
        >
          {{ result }}
        </li>
      </ul>
      <div id="result">
        <div class="card" v-if="searchResults.length">
          <div class="card-header">
            <h3>{{ searchResults[0].label }}</h3>
            <h4>{{ searchResults[0].category }}</h4>
          </div>
          <div class="card-body">
            <ul v-if="searchResults[0].nutrients">
              <li v-if="searchResults[0].nutrients.ENERC_KCAL">
                <b>Energy: </b
                ><span
                  >{{
                    searchResults[0].nutrients.ENERC_KCAL.toFixed(2)
                  }}kcal</span
                >
              </li>
              <li v-if="searchResults[0].nutrients.CHOCDF">
                <b>Carbs: </b
                ><span
                  >{{ searchResults[0].nutrients.CHOCDF.toFixed(2) }}g</span
                >
              </li>
              <li v-if="searchResults[0].nutrients.PROCNT">
                <b>Protein: </b
                ><span
                  >{{ searchResults[0].nutrients.PROCNT.toFixed(2) }}g</span
                >
              </li>
              <li v-if="searchResults[0].nutrients.FAT">
                <b>Fat: </b
                ><span>{{ searchResults[0].nutrients.FAT.toFixed(2) }}g</span>
              </li>
            </ul>
            <label for="quantityToAdd">Quantité (g) :</label>
            <input v-model="quantityToAdd" type="number" id="quantityToAdd" placeholder="Quantité en grammes" />
            <button @click="saveNutriments">Ajouter</button>
          </div>
        </div>
      </div>
      <div>
        <ul v-if="GetRecettes && GetRecettes.length > 0">
          <li v-for="(item, index) in GetRecettes" :key="item._id">
            <b>({{ index + 1 }}) </b>
            <small>Recipe Name</small>
            <small> Calories <b>: </b>{{ item.value.calories }},</small>
            <small> Carbs <b>: </b>{{ item.value.carbs }},</small>
            <small> protein <b>: </b>{{ item.value.protein }},</small>
            <small> fats <b>: </b>{{ item.value.protein }}</small>
          </li>
        </ul>
      </div>
      <div class="box">
        <h3>Nutriments sélectionnés</h3>
        <ul v-if="selectedFoods.length">
          <li v-for="food in selectedFoods" :key="food.name">
            <b>Name:</b> {{ food.name }}, <b>Energy:</b>
            {{ food.nutrients.ENERC_KCAL.toFixed(2) }}kcal, <b>Carbs:</b>
            {{ food.nutrients.CHOCDF.toFixed(2) }}g, <b>Protein:</b>
            {{ food.nutrients.PROCNT.toFixed(2) }}g, <b>Fat:</b>
            {{ food.nutrients.FAT.toFixed(2) }}g
            <b>Quantity:</b> {{ quantityToAdd }}g
          </li>
        </ul>

        <div>
          <button @click="removeLastFood">Retour</button>
          <button @click="sendToJourTotalAndSendToBackend">
            Envoyer au Total
          </button>
          <button @click="addRecipeFromSelected">Ajouter aux Recettes</button>
        </div>
      </div>
    </div>
    <div>
      <div class="box">
        <h3>Total</h3>
        <p><b>Calories:</b> {{ JourTotal.calories.toFixed(2) }}</p>
        <p><b>Carbs:</b> {{ JourTotal.carbs.toFixed(2) }}</p>
        <p><b>Protein:</b> {{ JourTotal.protein.toFixed(2) }}</p>
        <p><b>Fats:</b> {{ JourTotal.fats.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUser } from "vue-clerk";

export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      autoCompleteResults: [],
      selectedFoods: [],
      JourTotal: {
        calories: 0,
        carbs: 0,
        protein: 0,
        fats: 0,
      },
      Jours: [0, 0, 0, 0, 0, 0, 0], // Jour0 to Jour6
      Recettes: [],
      GetRecettes: [],
      nutrientsTotal: {
        calories: 0,
        carbs: 0,
        protein: 0,
        fats: 0,
      },
      successMessage: "",
      errorMessage: "",
      clerkUserId: null, // Définissez clerkUserId ici
      quantityToAdd: 100, // Ajoutez cette propriété
    };
  },
  methods: {
    async getRecipes() {
      const skip = 0;
      const limit = 15;
      await axios
        .get(`http://localhost:5000/api/getRecipes?skip=${skip}&limit=${limit}`)
        .then((response) => {
          var records = response.data.data;
          let cap = [];
          records.forEach((item) => {
            cap = [...cap, ...item.recettes];
          });
          this.GetRecettes = cap;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    handleSearchSubmit(e) {
      e.preventDefault();
      this.searchResults = [];
      this.searchFood();
      this.autoCompleteResults = []; // Clear autocomplete results
    },
    searchFood() {
      axios
        .get(
          `https://api.edamam.com/api/food-database/parser?app_id=ca747d07&app_key=722fabaee32b8118f7b1cb2e32b137cf&ingr=${this.searchQuery}`
        )
        .then((resp) => {
          if (resp.data.hints.length) {
            this.searchResults = [resp.data.hints[0].food];
          } else {
            console.error("No food found.");
          }
          this.searchQuery = "";
        })
        .catch(() => {
          console.error("An error occurred. Try again later.");
        });
    },
    fetchAutoCompleteResults() {
      const query = this.searchQuery;
      const limit = 3;
      axios
        .get(
          `http://localhost:5000/api/auto-complete?q=${query}&limit=${limit}`
        )
        .then((response) => {
          this.autoCompleteResults = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    onAutoCompleteSelect(result) {
      this.searchQuery = result;
      this.handleAutoCompleteSearch();
      this.autoCompleteResults = []; // Clear the autocomplete results after selection
      this.handleSearchSubmit(event); // Trigger the search action
    },
    handleAutoCompleteSearch() {
      axios
        .get("http://localhost:5000/api/auto-complete", {
          params: {
            q: this.searchQuery,
            limit: 3,
          },
        })
        .then((response) => {
          this.searchResults = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    saveNutriments() {
  if (this.searchResults.length > 0 && this.searchResults[0].nutrients) {
    const selectedFood = {
      name: this.searchResults[0].label,
      nutrients: this.calculateNutrientsForQuantity(this.searchResults[0].nutrients, this.quantityToAdd), // Utilisez la quantité spécifiée
    };
    this.selectedFoods.push(selectedFood);
  }
},calculateNutrientsForQuantity(nutrients, quantity) {
  const result = {};
  for (const key in nutrients) {
    if (Object.prototype.hasOwnProperty.call(nutrients, key)) {
      result[key] = (nutrients[key] * quantity) / 100;
    }
  }
  return result;
},
    removeLastFood() {
      this.selectedFoods.pop();
    },
    sendToJourTotal() {
      if (this.selectedFoods.length > 0) {
        let sumCalories = 0;
        let sumCarbs = 0;
        let sumProtein = 0;
        let sumFats = 0;

        this.selectedFoods.forEach((food) => {
          sumCalories += food.nutrients.ENERC_KCAL || 0;
          sumCarbs += food.nutrients.CHOCDF || 0;
          sumProtein += food.nutrients.PROCNT || 0;
          sumFats += food.nutrients.FAT || 0;
        });

        this.JourTotal.calories += sumCalories;
        this.JourTotal.carbs += sumCarbs;
        this.JourTotal.protein += sumProtein;
        this.JourTotal.fats += sumFats;

        // Clear the selected nutrients
        this.selectedFoods = [];
      }
    },

    addRecipeFromSelected() {
      if (this.selectedFoods.length > 0) {
        if (this.Recettes.length < 15) {
          const name = prompt("Enter the name of the recipe:");
          if (name) {
            let sumCalories = 0;
            let sumCarbs = 0;
            let sumProtein = 0;
            let sumFats = 0;
            let ingredients = [];

            this.selectedFoods.forEach((selectedFood) => {
              sumCalories += selectedFood.nutrients.ENERC_KCAL || 0;
              sumCarbs += selectedFood.nutrients.CHOCDF || 0;
              sumProtein += selectedFood.nutrients.PROCNT || 0;
              sumFats += selectedFood.nutrients.FAT || 0;
              const ingredientName = selectedFood.name;
              if (!ingredients.includes(ingredientName)) {
                ingredients.push(ingredientName);
              }
            });

            const recipe = {
              name: name,
              value: {
                calories: parseFloat(sumCalories.toFixed(2)),
                carbs: parseFloat(sumCarbs.toFixed(2)),
                protein: parseFloat(sumProtein.toFixed(2)),
                fats: parseFloat(sumFats.toFixed(2)),
              },
              ingredients: ingredients.join(", "),
            };
            this.Recettes.push(recipe);
            this.resetNutrientsTotal();
            this.successMessage = "Added to Recettes successfully.";
            this.saveRecipeToBackend(); // Call the new method to save the recipe to the backend
          } else {
            this.errorMessage = "Recipe name cannot be empty.";
          }
        } else {
          this.errorMessage = "Maximum recipe limit reached!";
        }
      } else {
        this.errorMessage = "No nutrients to add to the recipe.";
      }
    },

    async saveRecipeToBackend() {
      try {
        const data = {
          recettes: this.Recettes.map((recipe) => ({
            name: recipe.name,
            value: {
              calories: parseFloat(recipe.value.calories),
              carbs: parseFloat(recipe.value.carbs),
              protein: parseFloat(recipe.value.protein),
              fats: parseFloat(recipe.value.fats),
            },
            ingredients: Array.isArray(recipe.ingredients)
              ? recipe.ingredients
              : [recipe.ingredients], // Ensure 'ingredients' is an array
          })),
          
        };
        // Include clerkUserId if it's defined
        if (this.clerkUserId) {
          data.clerkUserId = this.clerkUserId;
        }
        axios
          .post("/api/recipes", data)
          .then(function (response) {
            if (response.data.success) {
              self.successMessage = "Recipe added successfully.";
            } else {
              self.errorMessage = "An error occurred while adding the recipe.";
            }
          })
          .catch(function (error) {
            console.error("Error while adding the recipe", error);
            self.errorMessage = "An error occurred while adding the recipe.";
          });
      } catch (error) {
        console.error("Error while adding the recipe", error);
        this.errorMessage = "An error occurred while adding the recipe.";
      }
    },

    async sendTotalsToBackend() {
      try {
        const jourTotal = {
          calories: this.JourTotal.calories,
          carbs: this.JourTotal.carbs,
          protein: this.JourTotal.protein,
          fats: this.JourTotal.fats,
        };
        const jourIndex = new Date().getDay();
        const jours = { [`Jour${jourIndex}`]: jourTotal };
        const dataToSend = {
          JourTotal: [jourTotal],
          Jours: jours,
        };
        if (this.clerkUserId) {
          dataToSend.clerkUserId = this.clerkUserId;
        }
        const response = await axios.post("/api/calories", dataToSend);
        if (response.data.success) {
          this.successMessage = "Totaux envoyés avec succès au backend.";
        } else {
          this.errorMessage =
            "Une erreur est survenue lors de l'envoi des totaux.";
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi des totaux au backend", error);
        this.errorMessage =
          "Une erreur est survenue lors de l'envoi des totaux.";
      }
    },
    sendToJourTotalAndSendToBackend() {
      this.sendToJourTotal();
      this.sendTotalsToBackend();
    },
    resetNutrientsTotal() {
      this.nutrientsTotal.calories = 0;
      this.nutrientsTotal.carbs = 0;
      this.nutrientsTotal.protein = 0;
      this.nutrientsTotal.fats = 0;
    },
    pushJourTotal() {
      const now = new Date();
      const currentDay = now.getDay();
      this.Jours[currentDay] += this.JourTotal.calories;
    },
    resetJourTotal() {
      this.JourTotal = {
        calories: 0,
        carbs: 0,
        protein: 0,
        fats: 0,
      };
    },
    resetJours() {
      if (new Date().getDay() === 0) {
        this.Jours = [0, 0, 0, 0, 0, 0, 0];
      }
    },
  },
  created() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (hours === 23 && minutes === 59 && seconds === 30) {
      this.pushJourTotal();
    } else if (hours === 0 && minutes === 0 && seconds === 0) {
      this.resetJourTotal();
    }

    const { user } = useUser(); // Assuming useUser is properly imported
    if (user && user.value && user.value.id) {
      this.clerkUserId = user.value.id;
      console.log(this.clerkUserId);
    }
  },
};
</script>

<style scoped>
div {
    font-family: 'Arial', sans-serif;
}

form {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

input, button {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

button:hover {
    background-color: #e0e0e0;
    cursor: pointer;
}

.card {
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header h3, .card-header h4 {
    margin: 5px 0;
}

ul {
    list-style: none;
    padding-left: 0;
}

.box {
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 15px;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
