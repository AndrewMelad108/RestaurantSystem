import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/index";
const state = {
  isUserLoggedIn: false,
  isUserLoggedInId: "",
  numOfCategories: "",
  listOfCategories: [],
  listOfAllCategories: [],
  listOfLocations: [],
  ThisLocation: [],
  listOfItems: [],
  listOfAllItems: [],
};
const getters = {
  isUserLoggedIn(state) {
    return state.isUserLoggedIn;
  },
};
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
  async canAccessUserThisLocations(state, payload) {
    //access all location by special user
    let locations = await axios.get(
      `   http://localhost:3000/locations?userId=${payload.userId}`
    );
    if (locations.status == 200) {
      state.listOfLocations = locations.data;
      let lengthOfLocations = state.listOfLocations.length;

      if (lengthOfLocations == 0) {
        //not empty
        this.commit("redirect", payload.redirect);
      }
    } else {
      console.log("dispaly locations");
    }
  },
  async accessUserLocation(state, payload) {
    //access location by special user
    let location = await axios.get(
      `   http://localhost:3000/locations?userId=${payload.userId}&id=${payload.locationId}`
    );
    if (location.status == 200) {
      state.ThisLocation = location.data;
      let locationLength = state.ThisLocation.length;
      if (locationLength == 0) {
        //not empty
        this.commit("redirect", payload.redirect);
      }
    } else {
      alert(" location is add by user");
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
  async canAccessUserThisItems(state, payload) {
    //access items by special user
    let items = await axios.get(
      `http://localhost:3000/items?userId=${payload.userId}&locationId=${payload.locationId}&catId=${payload.catId}`
    );
    if (items.status == 200) {
      state.listOfItems = items.data;
      let lengthOfItems = state.listOfItems.length;
      console.log(lengthOfItems);
      if (lengthOfItems === 0) {
        this.commit("redirect", payload.redirect);
      }
    } else {
      alert("show  items");
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
