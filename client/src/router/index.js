import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PageConnexion from "../views/PageConnexion.vue";
import PageInscription from "../views/PageInscription.vue";
import CalculateurCalories from "../views/CalculateurCalories.vue";
import UserView from "../views/UserView.vue";
import FormulaireProfil from "../views/FormulaireProfil.vue";
import PageProfil from "../views/PageProfil.vue";
import RecetteView from "../views/RecetteView.vue";
import CaloriesViewVue from "@/views/CaloriesView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sign-in",
    name: "signin",
    component: PageConnexion,
  },
  {
    path: "/sign-up",
    name: "signup",
    component: PageInscription,
  },
  {
    path: "/CalculateurCalories",
    name: "CalculateurCalories",
    component: CalculateurCalories,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },
  {
    path: "/FormulaireProfil",
    name: "FormulaireProfil",
    component: FormulaireProfil,
  },
  {
    path: "/PageProfil",
    name: "PageProfil",
    component: PageProfil,
  },
  {
    path: "/calories-view",
    name: "caloriesview",
    component: CaloriesViewVue,
  },
  {
    path: "/RecetteView",
    name: "RecetteView",
    component: RecetteView,
  },
  {
    path: "/CalculateurCalories",
    name: "CalculateurCalories",
    component: CalculateurCalories,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
