import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/index";
const state = {
  isUserLoggedIn: false,
  isUserLoggedInId: "",
  numOfCategories: "",
  listOfCategories: [],
  listOfLocations: [],
  ThisLocation: [],
  listOfAllItems: [],
  ThisItem: [],
};
const getters = {
  isUserLoggedIn(state) {
    return state.isUserLoggedIn;
  },
};
const mutations = {
  redirect(state, payload) {
    //redirect bettween pages
    //function redirect from pages
    //payload عشان تكون مفعله لكله
    router.push({ name: payload });
  },
  isUserLogged(state) {
    //check user in login or not
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
    //all categories
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
    //all locations
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
    // access user of special location
    //access location by special user
    let location = await axios.get(
      `http://localhost:3000/locations?userId=${payload.userId}&id=${payload.locationId}`
    );
    if (location.status == 200) {
      state.ThisLocation = location.data;
      let locationLength = state.ThisLocation.length;
      console.log(locationLength);
      if (locationLength == 0) {
        //not empty
        this.commit("redirect", payload.redirect);
      }
    } else {
      console.log(" location is add by user");
    }
  },
  async canAccessUserThisCategory(state, payload) {
    //access user of special category
    //access categories by special user
    let categories = await axios.get(
      `http://localhost:3000/categories?userId=${payload.userId}&id=${payload.locationId}&id=${payload.id}`
    );
    if (categories.status == 200) {
      state.listOfCategories = categories.data;
      let categoryLength = state.listOfCategories.length;
      console.log(categoryLength);
      if (categoryLength == 0) {
        //not empty
        this.commit("redirect", payload.redirect);
      }
    } else {
      console.log(" home");
    }
  },
  async getAllItemOfCategory(state, payload) {
    //get all items
    //access items by special user
    let items = await axios.get(
      `http://localhost:3000/items?userId=${payload.userId}&locationId=${payload.locationId}&catId=${payload.catId}`
    );
    if (items.status == 200) {
      state.listOfAllItems = items.data;
      let lengthOfItems = state.listOfAllItems.length;
      console.log(lengthOfItems);
      if (lengthOfItems == 0) {
        this.commit("redirect", payload.redirect);
      }
    } else {
      alert("show  items");
    }
  },
  async canAccessUserThisItem(state, payload) {
    //access user of special item
    //access item by special user
    let categories = await axios.get(
      `http://localhost:3000/items?userId=${payload.userId}&locationId=${payload.locationId}&id=${payload.id}`
    );
    if (categories.status == 200) {
      state.ThisItem = categories.data;
      let itemLength = state.ThisItem.length;
      console.log(itemLength);
      if (itemLength == 0) {
        //not empty
        this.commit("redirect", payload.redirect);
      }
    } else {
      console.log(" home");
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
