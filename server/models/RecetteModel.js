// Import the necessary modules
import mongoose from "mongoose";

// Define the recipe schema
const recipeSchema = new mongoose.Schema({
  name: String,
  value: {
    calories: Number,
    carbs: Number,
    protein: Number,
    fats: Number,
  },
  ingredients: String, // Add the 'ingredients' field here
});

// Define the overall recettes schema
const recettesSchema = new mongoose.Schema(
  { clerkUserId: String,
    recettes: [recipeSchema],
  },
  { timestamps: true }
);

// Create the Recette model based on the defined schema
const Recette = mongoose.model("Recette", recettesSchema);

// Export the Recette model
export default Recette;
