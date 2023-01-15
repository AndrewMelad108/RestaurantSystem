import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/index";
const state = {
  isUserLoggedIn: "",
  isUserLoggedInId: "",
  numOfCategories: "",
  listOfCategories: [],
  listOfAllCategories: [],
  listOfLocations: [],
  listOfItems: {},
  listOfAllItems: [],
};
const getters = {};
const mutations = {
  redirect(state, payload) {
    //function redirect from pages
    //payload عشان تكون مفعله لكله
    router.push({ name: payload });
  },
  isUserLogged(state) {
    // check function in user login or not
    let user = localStorage.getItem("user-info");
    if (user) {
      state.isUserLoggedIn = true;
      state.isUserLoggedInId = JSON.parse(user).id;
    } else {
      state.isUserLoggedIn = false;
      // this.commit("redirect", payload.name);
    }
  },
  async displayCategories(state, payload) {
    //display all categories in location
    let categories = await axios.get(
      `   http://localhost:3000/categories?userId=${payload.id}&locationId=${payload.location}`
    );
    if (categories.status == 200) {
      state.listOfAllCategories = categories.data;
      state.numOfCategories = state.listOfAllCategories.length;
    } else {
      alert("no categories");
    }
  },
  async getUserItems(state, payload) {
    //access items by location user
    let AllitemsOfCategories = await axios.get(
      `http://localhost:3000/items?userId=${payload.userId}&locationId=${payload.locationId}`
    );
    if (AllitemsOfCategories.status == 200) {
      state.listOfAllItems = AllitemsOfCategories.data;
    } else {
      alert("no items");
    }
  },
  async accessUserLocations(state, payload) {
    //access location by special user
    let locations = await axios.get(
      `   http://localhost:3000/locations?userId=${payload.userId}&id=${payload.locationId}`
    );
    if (locations.status == 200) {
      state.listOfLocations = locations.data;
      if (state.listOfLocations.length !== 1) {
        //not empty
        this.commit("redirect", payload.redirect);
      }
    } else {
      alert("no locations");
    }
  },
  async accessUserThisCategories(state, payload) {
    //access categories by special user
    let categories = await axios.get(
      `http://localhost:3000/categories?userId=${payload.userId}&id=${payload.locationId}&id=${payload.id}`
    );
    if (categories.status == 200) {
      state.listOfCategories = categories.data;
      if (state.listOfCategories.length !== 1) {
        //not empty
        this.commit("redirect", payload.redirect);
      }
    } else {
      alert("no categories");
    }
  },
  async accessUserThisItems(state, payload) {
    //access items by special user
    let items = await axios.get(
      `http://localhost:3000/items?userId=${payload.userId}&locationId=${payload.locationId}&id=${payload.id}`
    );
    if (items.status == 200) {
      state.listOfItems = items.data[0];
      if (state.listOfItems.length > 0) {
        //not empty
        // console.log(state.listOfItems.length);
        // this.commit("redirect", payload.redirect);
      }
    } else {
      alert("no items");
    }
  },
};
const actions = {
  redirect({ commit }, payload) {
    commit("redirect", payload);
  },
};
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
