import axios from 'axios';

const APP_ID = "43ee5599";
const APP_KEY = "1665fb730b871dade7a51670f9bee22f";

// Fonction pour la requête GET vers le Parser de l'API
export const getParserData = async (required) => {
  try {
    const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${required}&nutrition-type=logging`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Fonction pour la requête POST vers "Nutrients" de l'API
export const postNutrientsData = async (ingredient) => {
  try {
    const url = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await axios.post(url, { ingredient });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Fonction pour la requête GET vers l'auto-complétion de l'API
export const getAutoCompleteData = async (query, limit) => {
  try {
    const url = `https://api.edamam.com/auto-complete?app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}&limit=${limit}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
