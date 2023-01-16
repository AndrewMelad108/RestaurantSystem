<template>
  <navigationComponent class="navbar" />
  <div class="delete-restaurant">
    <div class="card col-4 m-auto">
      <div class="card-body">
        <h4 class="card-name">
          {{ "Name :   " + nameRestaurant }}
        </h4>
        <h5 class="card-id">{{ "ID :#" + id }}</h5>
        <h5 class="card-subtitle mb-2">
          Phone : <span class="ph"> {{ phoneRestaurant }}</span>
        </h5>
        <h6 class="card-subtitle mb-2">
          addressRestaurant :
          <span class="ph"> {{ addressRestaurant }}</span>
        </h6>
        <div class="group-button">
          <div class="row">
            <button
              class="card-link btn btn-info d-block col-5 m-auto"
              @click="deleteRestaurant(id)"
            >
              DELETE
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
import { mapActions, mapMutations } from "vuex"; // component vuex
import navigationComponent from "@/components/Header/navigation.vue";
export default {
  name: "deleteRestaurant",
  data() {
    return {
      userId: "",
      restaurant: {},
      restaurantId: this.$route.params.deleteRestaurant,
      addressRestaurant: "",
      phoneRestaurant: "",
      nameRestaurant: "",
      listAllCategories: [],
      listAllItems: [],
    };
  },
  components: {
    navigationComponent,
  },
  async mounted() {
    let allCategories = await axios.get(
      `http://localhost:3000/categories/?userId=${this.userId}&locationId=${this.restaurantId}`
    );
    for (let i = 0; i < allCategories.data.length; i++) {
      this.listAllCategories.push(allCategories.data[i].id);
    }
    console.table(this.listAllCategories);
    let allIems = await axios.get(
      `http://localhost:3000/items/?userId=${this.userId}&locationId=${this.restaurantId}`
    );
    for (let i = 0; i < allIems.data.length; i++) {
      this.listAllItems.push(allIems.data[i].id);
    }
    console.table(this.listAllItems);
  },
  created() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirect("signUp");
    } else {
      this.userId = JSON.parse(user).id;
      this.getDeleteRestaurant();
      this.accessUserLocation({
        //access location
        userId: this.userId,
        locationId: this.restaurantId,
        redirect: "Home",
      });
    }
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations(["accessUserLocation"]),
    async getDeleteRestaurant() {
      let allResultCategories = [];
      for (let i = 0; i < this.listAllCategories.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/categories/${this.listAllCategories[i]}`
        );

        if (result.status == 201) {
          allResultCategories.push(true);
          this.redirect("Home");
        } else {
          allResultCategories.push(false);
        }
      }
      let allResultItems = [];
      for (let v = 0; v < this.listAllCategories.length; v++) {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.listAllItems[v]}`
        );

        if (result.status == 201) {
          allResultItems.push(true);
          this.redirect("Home");
        } else {
          allResultItems.push(false);
        }
      }
      axios
        .get(
          `http://localhost:3000/locations/${this.restaurantId}/?userId=${this.userId}`
        )
        .then((res) => {
          console.log(res);
          this.addressRestaurant = res.data.addressRestaurant;
          this.phoneRestaurant = res.data.phoneRestaurant;
          this.nameRestaurant = res.data.nameRestaurant;
          this.id = res.data.id;
        });
    },
    async deleteRestaurant(id) {
      if (id === "") {
        this.redirect("home");
      } else {
        await axios
          .delete(
            `http://localhost:3000/locations/${id}/?userId=${this.userId}`
          )
          .then((res) => {
            console.log(res.status);
            this.redirect("RestaurantsComp");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-restaurant {
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
}
</style>
