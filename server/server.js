import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import edamamRoutes from "./routes/edamamRoutes.js";
import { handleWebhook } from "./controllers/userController.js"; // Importez le contrôleur
import profileRoutes from "./routes/profileRoutes.js"; // Importez les routes du profil
import calorieRoutes from "./routes/CalorieRoutes.js"; // Importez les routes des calories
import recetteRoutes from "./routes/RecetteRoutes.js"; // Importez les routes des recettes

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err.message));

const app = express();

app.use(cors());

app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  handleWebhook
); // Utilisez le contrôleur

app.use(express.json()); // Middleware pour gérer les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Middleware pour gérer les requêtes URL encodées

// Utilisez les routes d'edamam avec le préfixe "/api"
app.use("/api", edamamRoutes);

// Utilisez les routes du profil avec le préfixe "/api"
app.use("/api", profileRoutes);

// Utilisez les routes des calories avec le préfixe "/api"
app.use("/api", calorieRoutes);

// Utilisez les routes des recettes avec le préfixe "/api"
app.use("/api", recetteRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
