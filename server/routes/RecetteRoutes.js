import express from "express";
import { createRecipeRecord, getRecipeRecord } from "../controllers/RecetteController.js";

// Create a new router
const router = express.Router();

// Endpoint to create a recipe record
router.post("/recipes", createRecipeRecord);
router.get("/getRecipes", getRecipeRecord);

// Export the router
export default router;
