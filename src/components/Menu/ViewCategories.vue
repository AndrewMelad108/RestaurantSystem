<template>
  <div class="ViewCategories">
    <navigationComponent class="navbar" />
    <div class="ViewCategories-content">
      <div class="container">
        <div class="row">
          <button
            class="btn btn-info ViewCategories-add-categories col-6"
            @click="goToAddCategories()"
          >
            Add categories
          </button>
          <button
            class="btn btn-info ViewCategories-Back-btn col-6"
            @click="Back()"
          >
            Back to menu
          </button>
          <div class="location-info text-center mt-2">
            <h1 class="restaurant-title">{{ localName }}</h1>
            <p class="restaurant-title text-muted pt-0">{{ addressName }}</p>
          </div>
          <div class="displayCategories text-center">
            <div class="row">
              <div
                class="card col-4"
                v-for="item in listOfCategories"
                :key="item.index"
              >
                <div class="card-body">
                  <h3 class="card-name">
                    {{ "Name :   " + item.name }}
                  </h3>
                  <div class="group-button">
                    <div class="row">
                      <button
                        class="card-link btn btn-info d-block col-4 m-auto"
                        @click="updateCategories(item.id)"
                      >
                        Update
                      </button>
                      <button
                        class="card-link btn btn-dark d-block col-4 m-auto"
                        @click="dataCategories(item.id)"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationComponent from "@/components/Header/navigation.vue";
import { mapActions, mapMutations, mapState } from "vuex"; // component vuex
import axios from "axios";
export default {
  name: "ViewCategories",
  data() {
    return {
      restaurantId: this.$route.params.locationId,
      addressName: "",
      localName: "",
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
  mounted() {
    this.isUserLogged();
    this.accessUserLocations({
      //access user locations
      userId: this.isUserLoggedInId,
      locationId: this.restaurantId,
      redirect: "Home",
    });
    this.displayLocations(); //display name and address
    this.displayCategories({
      id: this.isUserLoggedInId,
      location: this.restaurantId,
    });
  },

  components: {
    navigationComponent,
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations([
      "isUserLogged",
      "displayCategories",
      "accessUserLocations",
    ]),

    goToAddCategories() {
      this.$router.push({
        name: "AddCategories",
        params: {
          locationId: this.restaurantId,
        },
      });
    },
    Back() {
      this.$router.push({
        name: "MenuComp",
        params: {
          restaurantId: this.restaurantId,
        },
      });
    },
    async displayLocations() {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${this.isUserLoggedInId}&id=${this.restaurantId}`
      );
      if (result.status == 200) {
        console.log("run");
        console.log(result.data);
        this.localName = result.data[0].nameRestaurant;
        this.addressName = result.data[0].addressRestaurant;
      } else {
        console.log("not run");
      }
    },
    updateCategories(catId) {
      this.$router.push({
        name: "UpdateCategories",
        params: {
          catId: catId,
          locationId: this.restaurantId,
        },
      });
    },
    dataCategories(catId) {
      this.$router.push({
        name: "DeleteCategories",
        params: {
          catId: catId,
          locationId: this.restaurantId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ViewCategories-content {
  padding-top: 10%;
}
.ViewCategories-Back-btn,
.ViewCategories-add-categories {
  width: auto;
}
.ViewCategories-Back-btn {
  margin-left: auto;
}
</style>
