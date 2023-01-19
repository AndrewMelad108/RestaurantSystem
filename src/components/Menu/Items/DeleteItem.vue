<template>
  <div class="DeleteItem">
    <navigationComponent class="navbar" />
    <div class="DeleteItem-content">
      <div class="container">
        <div class="row">
          <div class="location-info text-center mt-2">
            <h1 class="restaurant-title text-light">{{ localName }}</h1>
            <p class="lead text-danger m-auto des">
              Do you want to delete item {{ nameItem }}
            </p>
            <div class="group-btn">
              <button class="btn btn-danger delete-btn" @click="DeleteItem()">
                delete item
              </button>
              <router-link
                :to="{
                  name: 'MenuComp',
                  params: {
                    restaurantId: locationId,
                  },
                }"
                class="btn btn-info DeleteItem-back"
              >
                Back menu
              </router-link>
            </div>
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
      itemId: this.$route.params.itemId,
      addressName: "",
      localName: "",
      nameItem: "",
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
    this.getItemName();
    this.canAccessUserThisItem({
      userId: this.isUserLoggedInId,
      locationId: this.locationId,
      id: this.itemId,
      redirect: "Home",
    });
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations([
      "isUserLogged",
      "displayCategories",
      "canAccessUserThisItem",
    ]),
    BackCategories() {
      this.$router.push({
        name: "ViewCategories",
        params: {
          locationId: this.locationId,
        },
      });
    },
    BackMenu() {
      this.$router.push({
        name: "MenuComp",
        params: {
          restaurantId: this.restaurantId,
        },
      });
    },
    async getLocationName() {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${this.isUserLoggedInId}&id=${this.locationId}`
      );
      if (result.status == 200) {
        for (let i = 0; i < result.data.length; i++) {
          this.localName = result.data[i].nameRestaurant;
          this.addressName = result.data[i].addressRestaurant;
        }
      } else {
        console.log("not run");
      }
    },
    async getItemName() {
      let result = await axios.get(
        `http://localhost:3000/items?userId=${this.isUserLoggedInId}&locationId=${this.locationId}&id=${this.itemId}`
      );
      if (result.status == 200) {
        this.nameItem = result.data[0].name;
      } else {
        console.log("not displayUserCategories");
      }
    },
    async DeleteItem() {
      let result = await axios.delete(
        `http://localhost:3000/items/${this.itemId}`
      );

      if (result.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Delete Succeeded",
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
        alert("error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.DeleteItem {
  background-image: url("@/assets/homeImages/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall.jpg");
  width: 100%;
  background-size: cover;
  background-position: center center;
  min-height: 648px;
}
.des {
  font-size: 35px;
}
.DeleteItem-back,
.delete-btn {
  width: auto;
  margin: auto;
  margin-top: 35px;
}
.delete-btn {
  margin-left: 10px;
}
.DeleteItem-back {
  margin-left: 20px;
}
</style>
