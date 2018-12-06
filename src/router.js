import Vue from "vue";
import Router from "vue-router";
import Browse from "./views/Browse.vue";
import About from "./views/About.vue";
import Brewing from "./views/Brewing.vue";
import Pairing from "./views/Pairing.vue";
import BeerInfo from "./views/BeerInfo.vue";
import "./animations.css";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "browse",
      component: Browse
    },
    {
      path: "/brewing",
      name: "brewing",
      component: Brewing
    },
    {
      path: "/pairing",
      name: "pairing",
      component: Pairing
    },
    {
      path: "/beers/:id",
      name: "beer-info",
      component: BeerInfo
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
