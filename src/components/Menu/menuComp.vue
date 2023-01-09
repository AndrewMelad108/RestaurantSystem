<template>
  <div class="MenuComp">
    <navigationComponent class="navbar" />
    <div class="container">
      <div class="menuContent">
        <div class="row">
          <button
            class="btn btn-info menuContent-add-categories col-6"
            @click="goToAddCategories()"
          >
            Add/View categories
          </button>
          <button
            class="btn btn-info menuContent-add-item col-6"
            v-if="numOfCategories > 0"
            @click="goToAddItems()"
          >
            add items
          </button>
        </div>
      </div>
      <div>{{ isUserLoggedIn }}</div>
      <div>{{ isUserLoggedInId }}</div>
      <div>{{ numOfCategories }}</div>
      <div>{{ listOfCategories }}</div>
      <div>{{ restaurantId }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex"; // component vuex
import navigationComponent from "@/components/Header/navigation.vue";
export default {
  name: "MenuComp",
  data() {
    return {
      userId: "",
      restaurantId: this.$route.params.restaurantId,
    };
  },
  components: {
    navigationComponent,
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
    this.displayCategories({
      id: this.isUserLoggedInId,
      location: this.restaurantId,
    });
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations([
      "isUserLogged",
      "displayCategories",
      "accessUserLocations",
    ]),
    goToAddItems() {
      this.$router.push({
        name: "addItems",
        params: {
          locationId: this.restaurantId,
        },
      });
    },
    goToAddCategories() {
      this.$router.push({
        name: "ViewCategories",
        params: {
          locationId: this.restaurantId,
        },
      });
    },
  },
};
</script>

<style scoped>
.menuContent {
  padding-top: 10%;
}
.menuContent-add-item,
.menuContent-add-categories {
  width: auto;
}
.menuContent-add-item {
  margin-left: auto;
}
</style>
