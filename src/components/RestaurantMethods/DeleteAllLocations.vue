<template>
  <navigationComponent class="navbar" />
  <div class="DeleteAllLocations">
    <div class="card col-4 m-auto text-center">
      <div class="card-body">
        <p class="lead text-center text-danger message">
          Would you like to delete all location?
        </p>
        <div class="group-button">
          <div class="row">
            <button
              class="card-link btn btn-info d-block col-5 m-auto"
              @click="DeleteAllLocations()"
            >
              DELETEALL
            </button>
            <button
              class="card-link btn btn-dark d-block col-5 m-auto"
              @click="redirect('RestaurantsComp')"
            >
              BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex"; // component vuex
import navigationComponent from "@/components/Header/navigation.vue";
export default {
  name: "deleteRestaurant",
  data() {
    return {
      userId: "",
      allLocation: [],
    };
  },
  components: {
    navigationComponent,
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirect("signUp");
    } else {
      this.userId = JSON.parse(user).id;
      let result = await axios.get(
        `http://localhost:3000/locations/?userId=${this.userId}`
      );
      for (let i = 0; i < result.data.length; i++) {
        this.allLocation.push(result.data[i].id);
      }
      console.table(this.allLocation);
    }
  },
  methods: {
    ...mapActions(["redirect"]),
    async DeleteAllLocations() {
      let allResult = [];
      for (let i = 0; i < this.allLocation.length; i++) {
        let result = await axios
          .delete(`http://localhost:3000/locations/${this.allLocation[i]}`)
          .then(() => {
            this.redirect("Home ");
          });
        if (result.status == 201) {
          allResult.push(true);
        } else {
          allResult.push(false);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.DeleteAllLocations {
  padding: auto;
  padding-top: 15%;
  background-image: url("@/assets/homeImages/deleteImage.jpg");
  background-origin: center center;
  background-size: cover;
  width: 100%;
  height: 649px;
  color: #fff;
  color: #8b6a2a;
}
.card {
  padding: 0 15px;
  background-color: #0000 !important;
  border: 2px solid #8b6a2a;
  width: 50%;
}
.message {
  font-size: 25px;
  color: #fff;
  font-weight: bold;
}
</style>
