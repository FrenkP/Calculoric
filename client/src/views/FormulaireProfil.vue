<template>
  <div class="formulaire">
    <div v-if="isLoaded && isSignedIn && etape === 1">
      <h1>Bienvenue, {{ user.fullName }} ! Personnalisons votre profil Calculoric selon vos besoins et objectifs.</h1>
      <label for="nomUtilisateur">Votre nom d'utilisateur :</label>
      <input type="text" id="nomUtilisateur" v-model="nomUtilisateur" />
      <button @click="prochaineEtape">Suivant</button>
    </div>
    <div v-if="etape === 2">
      <h2>Merci, {{ nomUtilisateur }} ! Passons maintenant à vos objectifs.</h2>
      <label for="objectif">Sélectionnez l'objectif le plus important pour vous:</label>
      <select id="objectif" v-model="objectif">
        <option value="perdre">Perdre du poids</option>
        <option value="maintenir">Maintenir le poids</option>
        <option value="prendre">Prendre du poids</option>
      </select>
      <button @click="precedenteEtape">Retour</button>
      <button @click="prochaineEtape">Suivant</button>
    </div>
    <div v-if="etape === 3">
      <label for="niveau">Quel est votre niveau d'activité de base ?</label>
      <select id="niveau" v-model="niveau">
        <option value="peu">Pas très actif</option>
        <option value="modere">Modérément actif</option>
        <option value="actif">Actif</option>
        <option value="tres">Très actif</option>
      </select>
      <button @click="precedenteEtape">Retour</button>
      <button @click="prochaineEtape">Suivant</button>
    </div>
    <!-- Ajoutez d'autres étapes ici -->
    <div v-if="etape === 4">
      <label>Quel est votre sexe ?</label>
      <input type="radio" id="homme" value="homme" v-model="sexe" />
      <label for="homme">Homme</label>
      <input type="radio" id="femme" value="femme" v-model="sexe" />
      <label for="femme">Femme</label>
      <label for="date">Quelle est votre date de naissance ?</label>
      <input type="date" id="date" v-model="dateNaissance" />
      <button @click="precedenteEtape">Retour</button>
      <button @click="prochaineEtape">Suivant</button>
    </div>
    <div v-if="etape === 5">
      <label for="taille">Combien mesurez-vous ? (en cm)</label>
      <input type="number" id="taille" v-model="taille" />
      <label for="poids">Combien pesez-vous ? (en kg)</label>
      <input type="number" id="poids" v-model="poids" />
      <label for="objectifPoids">Quel est votre objectif de poids ? (en kg)</label>
      <input type="number" id="objectifPoids" v-model="objectifPoids" />
      <button @click="precedenteEtape">Retour</button>
      <button @click="prochaineEtape">Suivant</button>
    </div>
    <div v-if="etape === 6">
      <label for="objectifHebdo">Quel est votre objectif hebdomadaire ?</label>
      <select id="objectifHebdo" v-model="objectifHebdo">
        <option value="0.25">Perdre 0.25 kg par semaine</option>
        <option value="0.5">Perdre 0.5 kg par semaine (recommandé)</option>
        <option value="0.75">Perdre 0.75 kg par semaine</option>
        <option value="1">Perdre 1 kg par semaine</option>
      </select>
      <button @click="precedenteEtape">Retour</button>
      <button @click="calculerObjectifCalorie(); soumettreFormulaire(); prochaineEtape()">Soumettre</button>
    </div>
    <!-- Ajoutez un élément pour afficher l'objectif calorique -->
    <div v-if="etape === 7">
      <h2>Votre objectif calorique :</h2>
      <p>{{ objectifCalorie }} calories par jour</p>
    </div>
  </div>
</template>

<script >
import axios from 'axios';
import { useUser } from 'vue-clerk';



export default {
  data() {
    return {
      etape: 1,
      nomUtilisateur: "",
      objectif: "",
      niveau: "",
      sexe: "",
      dateNaissance: "",
      taille: 0,
      poids: 0,
      objectifPoids: 0,
      objectifHebdo: "",
      clerkUserId: "",
      objectifCalorie: 0, // Nouvelle donnée pour l'objectif calorique
    };
  },
  setup() {
    const { isLoaded, isSignedIn, user } = useUser();

    return {
      isLoaded,
      isSignedIn,
      user,
    };
    
  },
  methods: {
    
    prochaineEtape() {
      if (this.etape === 1) {
        this.clerkUserId = this.user.id;
    }

      if (this.etape < 7) {
        this.etape += 1;
      }
    },
    precedenteEtape() {
      if (this.etape > 1) {
        this.etape -= 1;
      }
    },
    soumettreFormulaire() {
      // Créez un objet pour les données du formulaire
      // Convertir les données au bon format
      const formData = {
        clerkUserId: this.clerkUserId, 
        nomUtilisateur: this.nomUtilisateur,
        objectif: this.objectif,
        niveau: this.niveau,
        sexe: this.sexe,
        dateNaissance: new Date(this.dateNaissance), // Convertir en objet Date
        taille: parseFloat(this.taille), // Convertir en nombre
        poids: parseFloat(this.poids), // Convertir en nombre
        objectifPoids: parseFloat(this.objectifPoids), // Convertir en nombre
        objectifHebdo: parseFloat(this.objectifHebdo), // Convertir en nombre
        objectifCalorie: this.objectifCalorie,
      };

      // Utilisez Axios pour envoyer les données au backend
      axios
        .post('/api/profile', formData) // Assurez-vous que '/api/profile' est l'URL correcte pour votre endpoint
        .then((response) => {
          // Gérez la réponse du backend, par exemple, affichez un message de confirmation
          console.log('Formulaire soumis avec succès', response.data);
        })
        .catch((error) => {
          // Gérez les erreurs, affichez un message d'erreur, etc.
          console.error('Erreur lors de la soumission du formulaire', error);
        });
    },calculerObjectifCalorie() {
      const age = new Date().getFullYear() - new Date(this.dateNaissance).getFullYear();
      let objectifCalorie = 0;

      if (this.sexe === 'homme') {
        objectifCalorie =
          10 * this.poids + 6.25 * this.taille - 5 * age + 5;
      } else if (this.sexe === 'femme') {
        objectifCalorie =
          10 * this.poids + 6.25 * this.taille - 5 * age - 161;
      }

      if (this.niveau === 'peu') {
        objectifCalorie *= 1.1;
      } else if (this.niveau === 'modere') {
        objectifCalorie *= 1.25;
      } else if (this.niveau === 'actif') {
        objectifCalorie *= 1.40;
      } else if (this.niveau === 'tres') {
        objectifCalorie *= 1.55;
      }

      this.objectifCalorie = objectifCalorie;
    },
  }
};
</script>

<style scoped>
.formulaire {
  background-color: #f6f9fc;
  border: 1px solid #e3e9ed;
  text-align: center;
  padding: 40px 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 500px;
  margin: 40px auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  color: #2c3e50;
  margin-bottom: 25px;
}

label {
  display: inline-block; /* Modification pour les boutons radio */
  margin: 15px 5px;     /* Modification pour les boutons radio */
  font-weight: 500;
  color: #34495e;
}

input[type="text"], select {
  padding: 10px 15px;
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-top: 5px;
  font-size: 16px;
  transition: border 0.2s;
}

input[type="radio"] {
  margin-right: 5px;
  vertical-align: middle;
}

input[type="date"] {
  appearance: none;
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 16px;
  color: #34495e;
}

input:focus, select:focus {
  border-color: #5c9ced;
  outline: none;
  box-shadow: 0 0 5px rgba(92, 156, 237, 0.5);
}

button {
  background-color: #27ae60;  /* Incorporation de la couleur verte */
  border: none;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 20px;
  margin-right: 10px;  /* Espacement ajouté à droite */
  margin-left: 10px;   /* Espacement ajouté à gauche */
}

button:last-child {   /* Pour retirer l'espacement du dernier bouton */
  margin-right: 0;
}

button:first-child {  /* Pour retirer l'espacement du premier bouton */
  margin-left: 0;
}

button:hover {
  background-color: #229a54;  /* Une nuance plus foncée pour le hover */
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>
