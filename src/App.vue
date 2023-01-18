<template>
  <div id="appView">
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Carter+One&display=swap");
// style.scss
.swal2-container {
  // position: absolute !important;
  z-index: 10000000000000000000000000000 !important;
}
.appView {
  font-family: "Carter One", cursive;
  padding: 0 !important;
  margin: 0 !important;
  box-sizing: border-box;
  text-transform: capitalize;
}
</style>
