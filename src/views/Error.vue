<template>
  <div class="container">
    <h1>ERROR PAGE</h1>
  </div>
</template>

<script>
export default {
  name: "errorPage",
  data: function () {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (!user) {
      this.redirect("Login");
    }
  },
};
</script>
<style scoped></style>
