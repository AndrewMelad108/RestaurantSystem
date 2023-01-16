<template>
  <div class="profile-content">
    <div class="container">
      <div class="row">
        <profileForm class="profileForm" />
      </div>
    </div>
  </div>
</template>

<script>
import profileForm from "@/components/Profile/Profile.vue";
export default {
  name: "profilePage",
  data: function () {
    return {};
  },
  components: {
    profileForm,
  },
};
</script>
<style scoped lang="scss">
.profile-content {
  background-image: url("@/assets/back.jpg");
  background-size: cover;
  background-attachment: center center;
  width: 100%;
  min-height: 590px;
  padding: 5% 25%;
}
</style>
