<template>
  <div class="AddCategories">
    <navigationComponent class="navbar" />
    <div class="AddCategories-content"></div>
    AddCategories
  </div>
</template>

<script>
import navigationComponent from "@/components/Header/navigation.vue";
import { mapActions, mapMutations, mapState } from "vuex"; // component vuex
export default {
  name: "AddCategories",
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
  components: {
    navigationComponent,
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
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations([
      "isUserLogged",
      "displayCategories",
      "accessUserLocations",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.AddCategories-content {
  padding-top: 10%;
}
</style>
