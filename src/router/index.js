import { createRouter, createWebHistory } from "vue-router";
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
import ViewCategories from "../components/Menu/ViewCategories.vue";
import AddCategories from "../components/Menu/addCategories.vue";
import UpdateCategories from "../components/Menu/updateCategories.vue";
import DeleteCategories from "../components/Menu/deleteCategories.vue";
import DeleteAllCategories from "../components/Menu/DeleteAllCategories.vue";
import addItems from "../components/Menu/addItems.vue";
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
    path: "/add-Restaurant-Location",
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
    path: "/delete-Restaurant/:deleteRestaurant",
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
    path: "/MenuComp/:restaurantId",
    name: "MenuComp",
    component: MenuComp,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MenuComp/view/:locationId",
    name: "ViewCategories",
    component: ViewCategories,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MenuComp/AddCategories/:locationId",
    name: "AddCategories",
    component: AddCategories,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MenuComp/UpdateCategories/:locationId/:catId",
    name: "UpdateCategories",
    component: UpdateCategories,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MenuComp/delete/:locationId/:catId",
    name: "DeleteCategories",
    component: DeleteCategories,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MenuComp/DeleteAllCategories/:locationId",
    name: "DeleteAllCategories",
    component: DeleteAllCategories,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MenuComp/add/-item/:locationId",
    name: "addItems",
    component: addItems,
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
