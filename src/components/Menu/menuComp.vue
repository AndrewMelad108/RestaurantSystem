<template>
  <div class="MenuComp">
    <navigationComponent class="navbar" />
  </div>
</template>

<script>
import { mapActions } from "vuex"; // component vuex
import navigationComponent from "@/components/Header/navigation.vue";
export default {
  name: "MenuComp",
  data() {
    return {
      userId: "",
      restaurantId: "",
    };
  },
  components: {
    navigationComponent,
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    console.log(user);
    if (!user) {
      this.redirect("signUp");
    } else {
      this.userId = JSON.parse(user).userId;
      //   this.userId = JSON.parse(user).userId;
    }
  },
  methods: {
    ...mapActions(["redirect"]),
  },
};
</script>

<style></style>
