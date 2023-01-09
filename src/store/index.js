import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/index";
const state = {
  isUserLoggedIn: "",
  isUserLoggedInId: "",
  numOfCategories: "",
  listOfCategories: [],
  listOfLocations: [],
};
const getters = {};
const mutations = {
  redirect(state, payload) {
    //payload عشان تكون مفعله لكله
    router.push({ name: payload });
  },
  isUserLogged(state) {
    let user = localStorage.getItem("user-info");
    if (user) {
      state.isUserLoggedIn = true;
      state.isUserLoggedInId = JSON.parse(user).id;
    } else {
      state.isUserLoggedIn = false;
    }
  },
  async displayCategories(state, payload) {
    let categories = await axios.get(
      `   http://localhost:3000/categories?userId=${payload.id}&locationId=${payload.location}`
    );
    if (categories.status == 200) {
      state.listOfCategories = categories.data;
      state.numOfCategories = state.listOfCategories.length;
    } else {
      alert("no categories");
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
