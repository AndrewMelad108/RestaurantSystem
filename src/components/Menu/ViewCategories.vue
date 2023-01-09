<template>
  <div class="ViewCategories">
    <navigationComponent class="navbar" />
    <div class="ViewCategories-content"></div>
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
      </div>
    </div>
  </div>
</template>

<script>
import navigationComponent from "@/components/Header/navigation.vue";
import { mapActions, mapMutations, mapState } from "vuex"; // component vuex

export default {
  name: "ViewCategories",
  data() {
    return {
      restaurantId: this.$route.params.locationId,
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
    console.log(this.isUserLoggedInId);
    console.log(this.restaurantId);
    this.accessUserLocations({
      //access user locations
      userId: this.isUserLoggedInId,
      locationId: this.restaurantId,
      redirect: "Home",
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
