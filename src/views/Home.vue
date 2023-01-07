<template>
  <div class="homePage">
    <navigationComponent class="navbar" />
    <introPage class="introPage" />
    <div class="container">
      <div class="row">
        <div class="home-content">
          <addRestaurantStyle class="addRestaurantStyle" />
        </div>
      </div>
    </div>
    <descriptionSite class="descriptionSite" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
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

  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirect("signUp");
    } else {
      this.redirect("Home");
    }
  },
  methods: {
    ...mapActions(["redirect"]),
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
