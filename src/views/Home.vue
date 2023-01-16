<template>
  <div class="homePage">
    <navigationComponent />
    <introPage class="introPage" />
    <div class="container">
      <div class="row">
        <div class="home-content">
          <addRestaurantStyle />
        </div>
      </div>
    </div>
    <descriptionSite />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import navigationComponent from "@/components/Header/navigation.vue";
import introPage from "@/components/homeComponent/introPage.vue";
import addRestaurantStyle from "@/components/homeComponent/addSectionRestaurantStyle.vue";
import descriptionSite from "@/components/homeComponent/descriptionSite.vue";
export default {
  name: "homePage",
  data: function () {
    return {};
  },
  components: {
    navigationComponent,
    introPage,
    addRestaurantStyle,
    descriptionSite,
  },
  computed: {
    ...mapState(["isUserLoggedIn", "isUserLoggedInId"]),
  },
  mounted() {
    this.isUserLogged();
    if (this.isUserLoggedIn) {
      console.log(this.isUserLoggedIn);
    } else {
      this.redirect("signUp");
      console.log(this.isUserLoggedIn);
    }
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations(["isUserLogged"]),
  },
};
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital@1&display=swap");
.homePage {
  margin-top: 0 !important ;
  height: 10000px;
  font-family: "Crimson Text", serif;
}
.navbar {
  color: #dc0000 !important;
}
//////////////////////////home page/////////////////////////////
</style>
