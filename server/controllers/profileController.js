// profileController.js
import Profile from "../models/profileModel.js";

// Contrôleur pour créer un profil
export const createProfile = async (req, res) => {
  try {
    const {
      clerkUserId,
      nomUtilisateur,
      objectif,
      niveau,
      sexe,
      dateNaissance,
      taille,
      poids,
      objectifPoids,
      objectifHebdo,
      objectifCalorie,
    } = req.body;

    // Créez un nouveau profil avec les données du formulaire
    const newProfile = new Profile({
      clerkUserId,
      nomUtilisateur,
      objectif,
      niveau,
      sexe,
      dateNaissance,
      taille,
      poids,
      objectifPoids,
      objectifHebdo,
      objectifCalorie,
    });

    // Enregistrez le profil dans la base de données
    await newProfile.save();

    res.status(201).json({
      success: true,
      message: "Profil créé avec succès",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Contrôleur pour récupérer un profil en fonction du clerkId
export const getProfile = async (req, res) => {
  const { clerkUserId } = req.params;

  try {
    const profile = await Profile.findOne({ clerkUserId });

    if (!profile) {
      return res.status(404).json({ message: "Profil non trouvé" });
    }

    return res.status(200).json(profile);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Erreur lors de la récupération du profil",
        error: error.message,
      });
  }
};

// Contrôleur pour mettre à jour un profil en fonction du clerkId
export const updateProfile = async (req, res) => {
  const { clerkUserId } = req.params;

  try {
    const updatedProfileData = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { clerkUserId },
      updatedProfileData,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profil non trouvé" });
    }

    return res.status(200).json(updatedProfile);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la mise à jour du profil",
      error: error.message,
    });
  }
};

// Contrôleur pour supprimer un profil en fonction du clerkId
export const deleteProfile = async (req, res) => {
  const { clerkUserId } = req.params;

  try {
    const deletedProfile = await Profile.findOneAndDelete({ clerkUserId });

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profil non trouvé" });
    }

    return res.status(200).json({ message: "Profil supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la suppression du profil",
      error: error.message,
    });
  }
};


