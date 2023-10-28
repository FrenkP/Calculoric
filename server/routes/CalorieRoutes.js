import express from 'express';
import { createCaloriesRecord, getCaloriesByUserId } from '../controllers/CalorieController.js';

const router = express.Router();

// Endpoint pour créer un enregistrement de calories
router.post('/calories', createCaloriesRecord);

// Endpoint pour récupérer les calories en fonction du clerkId
router.get('/calories/:clerkUserId', getCaloriesByUserId); // Ajoutez cette route pour récupérer les recettes

export default router;