<template>
  <div class="descriptionSite text-center">
    <div class="layout"></div>
    <p class="lead des-info text-center">
      A site that provides all users with information about restaurants and
      making an amendment to all restaurants added by the user responsible for
      adding and making all amendments to the data in the entry and after
      registering, I enjoy the services and I hope for your comfort
    </p>
  </div>
</template>

<script>
export default {
  name: "descriptionSite",
};
</script>

<style lang="scss" scoped>
.descriptionSite {
  background-image: url("@/assets/homeImages/table-top-with-background.jpg");
  background-size: cover;
  width: 100%;
  height: 400px;
  position: relative;
  background-attachment: fixed;
}
.layout {
  background-color: rgb(131, 125, 125);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
}
.des-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  color: black;
  line-height: 1.2;
  letter-spacing: 1px;
  font-size: 30px;
  text-shadow: 1px 1px 2px red, 0 0 0.2em blue;
}
</style>
