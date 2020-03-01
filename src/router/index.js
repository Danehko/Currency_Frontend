import Vue from "vue";
import VueRouter from "vue-router";
import CurrencyConverter from "../views/CurrencyConverter";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "Home",
    component: CurrencyConverter
  },
];

const router = new VueRouter({
  routes
});

export default router;
