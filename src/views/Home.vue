<template>
  <div class="homePage">
    <navigationComponent v-if="show" />
    <navComp v-else />
    <introPage class="introPage" />
    <div class="container">
      <div class="row">
        <div class="home-content">
          <addRestaurantStyle />
        </div>
      </div>
    </div>
    <descriptionSite />
    <ContactUs />
  </div>
  <FooterComp />
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import navigationComponent from "@/components/Header/navigation.vue";
import navComp from "@/components/Header/NavbarWithOutUser.vue";
import introPage from "@/components/homeComponent/introPage.vue";
import addRestaurantStyle from "@/components/homeComponent/addSectionRestaurantStyle.vue";
import descriptionSite from "@/components/homeComponent/descriptionSite.vue";
import ContactUs from "@/components/homeComponent/ContactUs.vue";
import FooterComp from "@/components/homeComponent/Footer.vue";
export default {
  name: "homePage",
  data: function () {
    return {
      show: null,
    };
  },
  components: {
    navigationComponent,
    introPage,
    addRestaurantStyle,
    descriptionSite,
    ContactUs,
    FooterComp,
    navComp,
  },
  computed: {
    ...mapState(["isUserLoggedIn", "isUserLoggedInId"]),
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.show = true;
      console.log(this.show);
    } else {
      this.show = false;
      console.log(this.show);
    }
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations(["isUserLogged"]),
  },
};
</script>
<style scoped lang="scss">
.homePage {
  margin-top: 0 !important ;
  height: auto;
}
.navbar {
  color: #dc0000 !important;
}
//////////////////////////home page/////////////////////////////
</style>
