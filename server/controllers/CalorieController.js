import Calories from "../models/CalorieModel.js";

// Contrôleur pour créer un enregistrement de calories
export const createCaloriesRecord = async (req, res) => {
  try {
    const { clerkUserId, JourTotal, Jours } = req.body;

    // Enregistrez l'enregistrement de calories dans la base de données
    const newCaloriesRecord = new Calories({
      clerkUserId,
      Jours,
      JourTotal,
    });

    // Enregistrez l'enregistrement de calories dans la base de données
    await newCaloriesRecord.save();

    res.status(201).json({
      success: true,
      message: "Enregistrement de calories créé avec succès",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Contrôleur pour récupérer les calories en fonction du clerkId
export const getCaloriesByUserId = async (req, res) => {
  const { clerkUserId } = req.params;

  try {
    // Requête pour obtenir les données des calories en fonction de clerkUserId
    const caloriesData = await Calories.findOne({ clerkUserId });

    if (!caloriesData) {
      return res.status(404).json({
        success: false,
        message: 'Données de calories non trouvées pour cet utilisateur.',
      });
    }

    res.status(200).json({
      success: true,
      data: caloriesData, // Assurez-vous que cela correspond à votre modèle de données
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des données de calories.',
      error: error.message,
    });
  }
};