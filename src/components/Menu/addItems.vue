<template>
  <div class="addItems">
    <navigationComponent class="navbar" />
    <div class="addItems-content"></div>
    addItems
  </div>
</template>

<script>
import navigationComponent from "@/components/Header/navigation.vue";
export default {
  name: "addItems",
  data() {
    return {};
  },

  components: {
    navigationComponent,
  },
};
</script>

<style lang="scss" scoped>
.addItems-content {
  padding-top: 10%;
}
</style>
