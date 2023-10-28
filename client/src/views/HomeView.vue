<template>
  <div class="home-container">
    <h1>VOTRE SANTÉ COMMENCE PAR UNE BONNE ALIMENTATION.</h1>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8f9; /* Cette couleur sera affichée tant que l'image n'est pas chargée ou si elle est transparente. */
  background-image: url("~@/assets/background.jpg"); /* Modifiez ceci pour refléter le chemin réel de votre image. */
  background-size: cover; /* Cette propriété s'assure que l'image couvre toute la zone, sans répétition. */
  background-position: center; /* Centre l'image */
  background-repeat: no-repeat; /* Pas de répétition de l'image */
  padding: 50px;
  opacity: 0.8;  /* Opacité de l'image réduite à 50% */
}


.main-heading {
  font-size: 32px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.start-button {
  padding: 10px 20px;
  background-color: rgb(0, 146, 67);
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
</style>
