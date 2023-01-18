<template>
  <navigationComponent class="navbar" />
  <div class="DeleteAllLocations">
    <div class="card col-4 m-auto text-center">
      <div class="card-body">
        <p class="lead text-center text-danger message">
          Would you like to delete all location?
        </p>
        <div class="group-button">
          <div class="row">
            <button
              class="card-link btn btn-danger d-block col-5 m-auto"
              @click="DeleteAllLocations()"
            >
              DELETEALL
            </button>
            <button
              class="card-link btn btn-dark d-block col-5 m-auto"
              @click="redirect('RestaurantsComp')"
            >
              BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex"; // component vuex
import navigationComponent from "@/components/Header/navigation.vue";
export default {
  name: "deleteRestaurant",
  data() {
    return {
      userId: "",
      allLocation: [],
      allItems: [],
      allCategories: [],
    };
  },
  components: {
    navigationComponent,
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirect("signUp");
    } else {
      this.userId = JSON.parse(user).id;
      let resultLocation = await axios.get(
        `http://localhost:3000/locations/?userId=${this.userId}`
      );
      for (let i = 0; i < resultLocation.data.length; i++) {
        this.allLocation.push(resultLocation.data[i].id);
      }
      console.table(this.allLocation);
      let resultCategoriesId = await axios.get(
        `http://localhost:3000/categories/?userId=${this.userId}`
      );
      for (let i = 0; i < resultCategoriesId.data.length; i++) {
        this.allCategories.push(resultCategoriesId.data[i].id);
      }
      console.table(this.allCategories);
      let resultItemsId = await axios.get(
        `http://localhost:3000/items/?userId=${this.userId}`
      );
      for (let i = 0; i < resultItemsId.data.length; i++) {
        this.allItems.push(resultItemsId.data[i].id);
      }
      console.table(this.allItems);
    }
  },
  methods: {
    ...mapActions(["redirect"]),
    async DeleteAllLocations() {
      let allResult = [];
      for (let j = 0; j < this.allLocation.length; j++) {
        let result = await axios.delete(
          `http://localhost:3000/locations/${this.allLocation[j]}`
        );

        if (result.status == 200) {
          allResult.push(true);
          this.redirect("Home");
        } else {
          allResult.push(false);
        }
      }
      let allResultCategories = [];
      for (let i = 1; i <= this.allLocation.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/categories/?&id=${this.allCategories[i]}&userId=${this.userId}`
        );

        if (result.status == 200) {
          allResultCategories.push(true);
          this.redirect("Home");
        } else {
          allResultCategories.push(false);
        }
      }
      let allResultItems = [];
      for (let v = 1; v <= this.allLocation.length; v++) {
        let result = await axios.delete(
          `http://localhost:3000/items/?&id=${this.allItems[v]}&userId=${this.userId}`
        );

        if (result.status == 200) {
          allResultItems.push(true);
          this.redirect("Home");
        } else {
          allResultItems.push(false);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.DeleteAllLocations {
  padding: auto;
  padding-top: 15%;
  background-image: url("@/assets/homeImages/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall.jpg");
  background-origin: center center;
  background-size: cover;
  width: 100%;
  height: 649px;
  color: #8b6a2a;
}
.card {
  padding: 0 15px;
  background-color: #0000 !important;
  border: 2px solid #8b6a2a;
  width: 50%;
}
.message {
  font-size: 25px;
  color: #fff;
  font-weight: bold;
}
</style>
