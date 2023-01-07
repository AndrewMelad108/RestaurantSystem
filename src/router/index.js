import { createRouter, createWebHistory } from "vue-router";
// import router from "./router";
import SignUpForm from "../views/SignUp.vue";
import LogInPage from "../views/LogIn.vue";
import profilePage from "../views/Profile/Profile.vue";
import updateProfile from "../components/Profile/UpdateProfile.vue";
import homePage from "../views/Home.vue";
import RestaurantsComp from "../components/RestaurantMethods/Restaurants.vue";
import addRestaurantLocation from "../components/RestaurantMethods/addRestaurantLocation.vue";
import updateRestaurant from "../components/RestaurantMethods/updateRestaurant.vue";
import deleteRestaurant from "../components/RestaurantMethods/deleteRestaurant.vue";
import DeleteAllLocations from "../components/RestaurantMethods/DeleteAllLocations.vue";
import MenuComp from "../components/Menu/menuComp.vue";
import errorPage from "../views/Error.vue";
const routes = [
  {
    path: "/signup",
    name: "signUp",
    component: SignUpForm,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LogInPage,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: homePage,
    meta: {
      requireAuth: true,
    },
    children: [],
  },
  {
    path: "/RestaurantsComp",
    name: "RestaurantsComp",
    component: RestaurantsComp,
  },
  {
    path: "/addRestaurantLocation",
    name: "addRestaurantLocation",
    component: addRestaurantLocation,
  },
  {
    path: "/updateRestaurant/:id",
    name: "updateRestaurant",
    component: updateRestaurant,
  },
  {
    path: "/updateProfile",
    name: "updateProfile",
    component: updateProfile,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/deleteRestaurant/:deleteRestaurant",
    name: "deleteRestaurant",
    component: deleteRestaurant,
  },
  {
    path: "/DeleteAllLocations",
    name: "DeleteAllLocations",
    component: DeleteAllLocations,
  },
  {
    path: "/profile",
    name: "Profile",
    component: profilePage,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MenuComp",
    name: "MenuComp",
    component: MenuComp,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)", //error page router in last object
    name: "Error 404",
    component: errorPage,
    meta: {
      requireAuth: true,
    },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  //   if (to.meta.requireAuth) {
  document.title = to.name;
  //     to.fullPath = "/signUp";
  //     // if (from.name === undefined) {
  //     //   document.title = process.env.TITLE_APP_NAME;
  //     // }
  //   }
  next();
});
export default router;
