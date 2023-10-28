// profileModel.js
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  clerkUserId: String,
  nomUtilisateur: String,
  objectif: String,
  niveau: String,
  sexe: String,
  dateNaissance: Date,
  taille: Number,
  poids: Number,
  objectifPoids: Number,
  objectifHebdo: Number,
  objectifCalorie: Number,
}
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;