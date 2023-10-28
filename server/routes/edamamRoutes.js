import express from 'express';
import axios from 'axios';

const router = express.Router();

const errorCodes = {
  404: "The specified URL was not found or couldn't be retrieved",
  422: "Couldn't parse the request or extract the nutritional info",
  555: "Text with insufficient quality to process correctly",
};

// Route pour parser
router.get("/parser", async (req, res) => {
  try {
    const { ingr } = req.query; // Extrait le paramètre "ingr" de la requête URL

    const app_id = "43ee5599";
    const app_key = "1665fb730b871dade7a51670f9bee22f";

    // Requête vers l'API Edamam pour le parser
    const response = await axios.get(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${ingr}&nutrition-type=logging`
    );
    const { data } = response;
    res.json(data);
  } catch (error) {
    const errorCode = error.response?.status || "x";
    const errorMessage = errorCodes[errorCode] || "An unknown error occurred";
    res.status(errorCode).send(errorMessage);
  }
});

// Route pour nutrients
router.post("/nutrients", async (req, res) => {
  try {
    const app_id = "43ee5599";
    const app_key = "1665fb730b871dade7a51670f9bee22f";

    const data = {
      ingredient: [
        {
          quantity: 0,
          measureURI: "string",
          qualifiers: ["string"],
          foodId: "string",
        },
      ],
    };

    // Requête vers l'API Edamam pour les valeurs nutritives
    const response = await axios.post(
      `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${app_id}&app_key=${app_key}`,
      data
    );

    const responseData = {
      uri: "http://www.edamam.com/ontologies/edamam.owl#b9f0784d-4bac-4dce-bb35-e1457db99782",
      calories: 0,
      totalWeight: 0,
      totalNutrients: {},
      ingredient: [{}],
    };

    res.json(responseData);
  } catch (error) {
    const errorCode = error.response?.status || 500;
    const errorMessage = errorCodes[errorCode] || "An unknown error occurred";
    res.status(errorCode).send(errorMessage);
  }
});

// Route pour l'auto-complétion
router.get("/auto-complete", async (req, res) => {
  try {
    const { q, limit } = req.query; // Extrait les paramètres "q" et "limit" de la requête URL
    const app_id = "43ee5599";
    const app_key = "1665fb730b871dade7a51670f9bee22f";

    // Requête vers l'API Edamam pour l'auto-complétion
    const response = await axios.get(
      `https://api.edamam.com/auto-complete?app_id=${app_id}&app_key=${app_key}&q=${q}&limit=${limit}`
    );
    const { data } = response;
    res.json(data);
  } catch (error) {
    const errorCode = error.response?.status || "x";
    const errorMessage = errorCodes[errorCode] || "An unknown error occurred";
    res.status(errorCode).send(errorMessage);
  }
});

export default router;
