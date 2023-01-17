import { createRouter, createWebHistory } from "vue-router";
// import store from "../store/index";
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
import AddCategories from "../components/Menu/Categories/addCategories.vue";
import UpdateCategories from "../components/Menu/Categories/updateCategories.vue";
import DeleteCategories from "../components/Menu/Categories/deleteCategories.vue";
import DeleteAllCategories from "../components/Menu/Categories/DeleteAllCategories.vue";
import addItems from "../components/Menu/Items/addItems.vue";
import updateItem from "../components/Menu/Items/UpdateItems.vue";
import DeleteItem from "../components/Menu/Items/DeleteItem.vue";
import ItemsCategory from "../components/Menu/Items/Items.vue";
import errorPage from "../views/Error.vue";
const routes = [
  {
    path: "/signup",
    name: "signUp",
    component: SignUpForm,
  },
  {
    path: "/login",
    name: "Login",
    component: LogInPage,
  },
  {
    path: "/home",
    name: "Home",
    component: homePage,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/RestaurantsComp",
    name: "RestaurantsComp",
    component: RestaurantsComp,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/add-Restaurant-Location",
    name: "addRestaurantLocation",
    component: addRestaurantLocation,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/updateRestaurant/:id",
    name: "updateRestaurant",
    component: updateRestaurant,
    meta: {
      requireAuth: true,
    },
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
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/DeleteAllLocations",
    name: "DeleteAllLocations",
    component: DeleteAllLocations,
    meta: {
      requireAuth: true,
    },
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
    path: "/MenuComp/add/item/:locationId",
    name: "addItems",
    component: addItems,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MenuComp/update/loc/:locationId/item/:itemId",
    name: "updateItem",
    component: updateItem,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MenuComp/delete/loc/:locationId/item/:itemId",
    name: "DeleteItem",
    component: DeleteItem,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MenuComp/display/loc/:locationId/category/:catId",
    name: "ItemsCategory",
    component: ItemsCategory,
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
// router.beforeEach((to, from, next) => {
//   console.log(store.getters.isUserLoggedIn);

//   if (to.name !== "signUp") {
//     if (store.getters.isUserLoggedIn == false) {
//       store.commit("isUserLogged");
//       router.push("/signUp");
//     }
//   } else next();
// });

export default router;
