import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { clerkPlugin } from "vue-clerk";
import axios from "axios";

const app = createApp(App);

app.use(store);
app.use(router);

app.use(clerkPlugin, {
  publishableKey: process.env.VUE_APP_CLERK_PUBLISHABLE_KEY,
});

// Configure Axios avec l'URL de votre backend
axios.defaults.baseURL = "http://localhost:5000"; // Remplacez par l'URL de votre backend

app.mount("#app");
