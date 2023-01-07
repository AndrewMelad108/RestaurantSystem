<template>
  <div class="container profile-content">
    <div class="row">
      <div class="image-container col-5">
        <img
          src="@/assets/profileImages/profileImage.jpg"
          alt="profileImage"
          class="profileImage"
        />
      </div>
      <div class="profileForm col-7">
        <profileForm />
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
  methods: {},
};
</script>
<style scoped lang="scss">
.profile-content {
  height: 50% !important;
}
.image-container .profileImage {
  max-height: 19%;
}
.profileForm {
  text-align: center;
}
</style>
