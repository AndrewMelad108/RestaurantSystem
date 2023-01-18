<template>
  <div class="DeleteAllCategories">
    <navigationComponent class="navbar" />
    <div class="card col-4 m-auto text-center">
      <div class="card-body">
        <p class="lead text-center text-danger message">
          Would you like to delete all categories?
        </p>
        <div class="group-button">
          <div class="row">
            <button
              class="card-link btn btn-danger d-block col-5 m-auto"
              @click="DeleteAllCategories()"
            >
              DELETEALL
            </button>
            <router-link
              :to="{
                name: 'MenuComp',
                params: {
                  restaurantId: locationId,
                },
              }"
              class="card-link btn btn-dark d-block col-5 m-auto"
            >
              BACK
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapMutations } from "vuex"; // component vuex
import navigationComponent from "@/components/Header/navigation.vue";
export default {
  name: "DeleteAllCategories",
  data() {
    return {
      userId: "",
      listAllItems: [],
      listAllCategories: [],
      locationId: this.$route.params.locationId,
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
      let allCategories = await axios.get(
        `http://localhost:3000/categories/?userId=${this.userId}`
      );
      for (let i = 0; i < allCategories.data.length; i++) {
        this.listAllCategories.push(allCategories.data[i].id);
      }
      console.table(this.listAllCategories);
      let allIems = await axios.get(
        `http://localhost:3000/items/?userId=${this.userId}`
      );
      for (let i = 0; i < allIems.data.length; i++) {
        this.listAllItems.push(allIems.data[i].id);
      }
      console.table(this.listAllItems);
      this.accessUserLocation({
        userId: this.userId,
        locationId: this.locationId,
        redirect: "Home",
      });
    }
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations(["isUserLogged", "accessUserLocation"]),
    async DeleteAllCategories() {
      let allResultCategories = [];
      for (let i = 0; i < this.listAllCategories.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/categories/${this.listAllCategories[i]}`
        );

        if (result.status == 201) {
          allResultCategories.push(true);
          this.redirect("Home");
        } else {
          allResultCategories.push(false);
        }
      }
      let allResultItems = [];
      for (let v = 0; v < this.listAllCategories.length; v++) {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.listAllItems[v]}`
        );

        if (result.status == 201) {
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
.DeleteAllCategories {
  background-image: url("@/assets/homeImages/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall.jpg");
  width: 100%;
  background-size: cover;
  background-position: center center;
  min-height: 649;
  padding: auto;
  min-height: 649px;
}
.card {
  margin-top: 15% !important;
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
