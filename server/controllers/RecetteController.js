// Import the Recette model
import Recette from "../models/RecetteModel.js";

// Controller to create a recipe record
export const createRecipeRecord = async (req, res) => {
  try {
    // Extract the 'recettes' field and 'clerkUserId' from the request body
    const {clerkUserId, recettes } = req.body;

    // Check if the number of recipes is less than 15
    if (recettes.length >= 15) {
      return res.status(400).json({
        success: false,
        message: "Maximum recipe limit reached (15 recipes).",
      });
    }

    // Map the data to match the expected structure in the database
    const recipeData = recettes.map((recipe) => ({
      name: recipe.name,
      value: {
        calories: recipe.value.calories,
        carbs: recipe.value.carbs,
        protein: recipe.value.protein,
        fats: recipe.value.fats,
      },
      ingredients: recipe.ingredients.join(", "), // Join the ingredients array into a string
    }));

    // Create a new recipe record in the database with clerkUserId
    const newRecipeRecord = new Recette({
      clerkUserId, // Add the clerkUserId here
      recettes: recipeData,
    });

    // Save the recipe record in the database
    await newRecipeRecord.save();

    // Return a success message upon successful creation
    res.status(201).json({
      success: true,
      message: "Recipe record created successfully",
    });
  } catch (error) {
    // Return an error message if an error occurs
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller to fetch recipe records for a specific clerkUserId
export const getRecipeRecord = async (req, res) => {
  try {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let clerkUserId = req.query.clerkUserId; // Extract clerkUserId from query parameters

    let dataRes = await Recette.find({ clerkUserId: clerkUserId })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Recipe records fetched successfully",
      data: dataRes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
