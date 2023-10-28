import express from "express";
import { createProfile, getProfile, updateProfile, deleteProfile } from "../controllers/profileController.js";

const router = express.Router();

// Endpoint pour créer un profil
router.post("/profile", createProfile);

// Endpoint pour récupérer un profil en fonction du clerkId
router.get("/profile/:clerkUserId", getProfile);

// Endpoint pour mettre à jour un profil en fonction du clerkId
router.put("/profile/:clerkUserId", updateProfile);

// Endpoint pour supprimer un profil en fonction du clerkId
router.delete("/profile/:clerkUserId", deleteProfile);

export default router;
