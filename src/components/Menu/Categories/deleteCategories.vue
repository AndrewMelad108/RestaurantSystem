<template>
  <div class="DeleteCategories">
    <navigationComponent class="navbar" />
    <div class="DeleteCategories-content container">
      <div class="row">
        <div class="location-info text-center mt-2">
          <h1 class="restaurant-title text-light">{{ localName }}</h1>
          <p class="lead text-danger m-auto des">
            Do you want to delete category {{ nameCategory }}
          </p>
          <div class="group-btn">
            <button class="btn btn-danger delete" @click="DeleteCategories()">
              delete category
            </button>
            <router-link
              :to="{
                name: 'MenuComp',
                params: {
                  restaurantId: locationId,
                },
              }"
              class="btn btn-info DeleteCategories-back-menu"
            >
              Back menu
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import navigationComponent from "@/components/Header/navigation.vue";
import { mapActions, mapMutations, mapState } from "vuex"; // component vuex
export default {
  name: "DeleteCategories",
  data() {
    return {
      locationId: this.$route.params.locationId,
      localName: "",
      name: "",
      catId: this.$route.params.catId,
      listUserCategories: [],
      listAllItems: [],
      nameCategory: "",
    };
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "listOfCategories",
      "numOfCategories",
      "isUserLoggedInId",
    ]),
  },
  components: {
    navigationComponent,
  },
  mounted() {
    this.isUserLogged();
    this.getLocationName();
    this.getCategoryName();
    this.getDeleteAllItems();
    this.canAccessUserThisCategory({
      userId: this.isUserLoggedInId,
      locationId: this.locationId,
      id: this.catId,
      redirect: "Home",
    });
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations([
      "isUserLogged",
      "displayCategories",
      "canAccessUserThisCategory",
    ]),
    async getLocationName() {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${this.isUserLoggedInId}&id=${this.locationId}`
      );
      if (result.status == 200) {
        this.localName = result.data[0].nameRestaurant;
        this.addressName = result.data[0].addressRestaurant;
      } else {
        console.log("not run");
      }
    },
    async getCategoryName() {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${this.isUserLoggedInId}&locationId=${this.locationId}&id=${this.catId}`
      );
      if (result.status == 200) {
        this.nameCategory = result.data[0].name;
      } else {
        console.log("not displayUserCategories");
      }
    },
    async DeleteCategories() {
      let result = await axios.delete(
        `http://localhost:3000/categories/${this.catId}`
      );
      for (let i = 0; i < this.listAllItems.length; i++) {
        await axios.delete(
          `http://localhost:3000/items/${this.listAllItems[i]}`
        );
      }
      if (result.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Delete succeeded",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          this.$router.push({
            name: "MenuComp",
            params: {
              restaurantId: this.locationId,
            },
          });
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
    async getDeleteAllItems() {
      let items = await axios.get(
        `http://localhost:3000/items?catId=${this.catId}&userId=${this.isUserLoggedInId}`
      );

      if (items.status == 200) {
        for (let i = 0; i < items.data.length; i++) {
          this.listAllItems.push(items.data[i].id);
        }
        console.table(this.listAllItems);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.DeleteCategories {
  background-image: url("@/assets/homeImages/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall.jpg");
  width: 100%;
  background-size: cover;
  background-position: center center;
  min-height: 648px;
}
.des {
  font-size: 35px;
}
.delete,
.DeleteCategories-back-menu {
  margin: 35px 0;
}
.DeleteCategories-back-menu {
  margin-left: 25px;
}
</style>
