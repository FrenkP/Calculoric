<template>
  <div>
    <div v-if="donneesChargees && !isEditing">
      <h1>Profil de {{ profil.nomUtilisateur }}</h1>
      <p>Objectif : {{ profil.objectif }}</p>
      <p>Niveau d'activité : {{ profil.niveau }}</p>
      <p>Sexe : {{ profil.sexe }}</p>
      <p>Date de naissance : {{ profil.dateNaissance }}</p>
      <p>Taille : {{ profil.taille }} cm</p>
      <p>Poids : {{ profil.poids }} kg</p>
      <p>Objectif de poids : {{ profil.objectifPoids }} kg</p>
      <p>Objectif hebdomadaire : {{ profil.objectifHebdo }} kg/semaine</p>
      <p>Objectif Calories : {{ profil.objectifCalorie }} </p>

      <!-- Boutons d'action pour modification et suppression -->
      <button @click="editProfile">Modifier le profil</button>
      <button @click="deleteProfile">Supprimer le profil</button>
    </div>

    <!-- Formulaire de modification du profil -->
    <div v-if="isEditing">
      <h2>Modifier le profil</h2>
      <form @submit.prevent="saveProfile">
        <!-- Ajoutez ici les champs pour la modification -->
        <!-- Exemple : -->
        <input v-model="editedProfile.nomUtilisateur" type="text" placeholder="nomUtilisateur">
        <input v-model="editedProfile.objectif" type="text" placeholder="Objectif">
        <input v-model="editedProfile.niveau" type="text" placeholder="Niveau d'activité">
        <input v-model="editedProfile.poids" type="text" placeholder="Number">
        <input v-model="editedProfile.objectifPoids" type="text" placeholder="Number">
        <input v-model="editedProfile.objectifHebdo" type="text" placeholder="Number">
        <!-- Ajoutez d'autres champs selon vos besoins -->

        <button type="submit">Enregistrer les modifications</button>
        <button @click="cancelEdit">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useUser } from "vue-clerk";

export default {
  setup() {
    const { user } = useUser();
    const profil = ref(null);
    const editedProfile = ref({}); // Champ pour stocker les modifications
    const donneesChargees = ref(false);
    const isEditing = ref(false);
    const clerkUserId = user.value.id;
    const apiUrl = `/api/profile/${clerkUserId}`;

    onMounted(() => {
      axios
        .get(apiUrl)
        .then((response) => {
          const rawData = response.data;
          rawData.dateNaissance = new Date(rawData.dateNaissance)
            .toISOString()
            .split("T")[0];
          profil.value = rawData;
          donneesChargees.value = true;
          editedProfile.value = { ...profil.value }; // Copie du profil pour la modification
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données du profil", error);
        });
    });

    const editProfile = () => {
      isEditing.value = true;
    };

    const saveProfile = () => {
      // Envoyez les modifications au serveur avec une requête PUT
      axios
        .put(apiUrl, editedProfile.value)
        .then((response) => {
          profil.value = response.data;
          isEditing.value = false;
        })
        .catch((error) => {
          console.error("Erreur lors de la modification du profil", error);
        });
    };

    const cancelEdit = () => {
      isEditing.value = false;
      editedProfile.value = { ...profil.value }; // Réinitialise les modifications
    };

    const deleteProfile = () => {
      // Envoyez une requête DELETE au serveur pour supprimer le profil
      axios
        .delete(apiUrl)
        .then(() => {
          // Gérer la suppression réussie, par exemple, rediriger l'utilisateur
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du profil", error);
        });
    };

    return {
      profil,
      editedProfile,
      donneesChargees,
      isEditing,
      editProfile,
      saveProfile,
      cancelEdit,
      deleteProfile,
    };
  },
};
</script>

<style scoped>
/* Container */
.profile-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f6f8; /* Une couleur de fond légère */
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Titres */
h1, h2 {
    color: #2c3e50; /* Bleu foncé */
    margin-bottom: 20px;
}

/* Paragraphe des données du profil */
p {
    margin-bottom: 12px;
    font-size: 16px;
    color: #7f8c8d; /* Gris */
}

/* Boutons */
button {
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
    margin-top: 20px;
    margin-right: 10px;
}

button.primary {
    background-color: #3498db; /* Bleu */
    color: #ffffff;
}

button.secondary {
    background-color: #e74c3c; /* Rouge */
    color: #ffffff;
}

button.primary:hover {
    background-color: #2980b9; /* Bleu un peu plus foncé */
}

button.secondary:hover {
    background-color: #c0392b; /* Rouge un peu plus foncé */
}

button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
    transform: scale(0.98);
}

/* Formulaire */
form {
    margin-top: 20px;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #bdc3c7;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.2s;
}

input:focus {
    border-color: #3498db; /* Bleu */
    outline: none;
}
</style>