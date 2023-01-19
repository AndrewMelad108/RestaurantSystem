<template>
  <div class="ItemsComp">
    <navigationComponent />
    <div class="cover">
      <div class="ItemsComp">
        <div class="container-fluid">
          <h1 class="nameCategory">
            {{ name }}
          </h1>
          <div class="row">
            <router-link
              :to="{
                name: 'MenuComp',
                params: {
                  restaurantId: locationId,
                },
              }"
              class="btn btn-success ItemsComp-add-categories"
            >
              BackMenu
            </router-link>
            <router-link
              :to="{
                name: 'addItems',
                params: {
                  locationId: locationId,
                },
              }"
              class="btn btn-success ItemsComp-add-item"
            >
              add items
            </router-link>
            <div class="displayItems">
              <div class="row gx-15 gy-15">
                <div
                  class="card col-lg-3 col-sm-6 text-center"
                  v-for="item in listOfAllItems"
                  :key="item.index"
                >
                  <div class="card-body">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <h6 class="card-subtitle mb-2">
                      {{ item.Price }}
                    </h6>
                    <p class="card-text">
                      {{ item.Description }}
                    </p>
                    <div class="row">
                      <router-link
                        :to="{
                          name: 'updateItem',
                          params: {
                            itemId: item.id,
                            locationId: locationId,
                          },
                        }"
                        class="btn btn-info col-lg-6 btn-update"
                        >UPDATE</router-link
                      >
                      <router-link
                        :to="{
                          name: 'DeleteItem',
                          params: {
                            itemId: item.id,
                            locationId: locationId,
                          },
                        }"
                        class="btn btn-danger col-lg-6 btn-delete"
                        >DELETE</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex"; // component vuex
import navigationComponent from "@/components/Header/navigation.vue";
import axios from "axios";
export default {
  name: "ItemsCategory",
  data() {
    return {
      locationId: this.$route.params.locationId,
      catId: this.$route.params.catId,
      name: "",
    };
  },
  components: {
    navigationComponent,
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "numOfCategories",
      "isUserLoggedInId",
      "listOfAllItems",
    ]),
  },
  async mounted() {
    this.isUserLogged();
    this.getAllItemOfCategory({
      userId: this.isUserLoggedInId,
      locationId: this.locationId,
      catId: this.catId,
    });
    let nameCategory = await axios.get(
      `http://localhost:3000/categories?userId=${this.isUserLoggedInId}&locationId=${this.locationId}&id=${this.catId}`
    );
    if (nameCategory.status == 200) {
      console.log(nameCategory.data);
      this.name = nameCategory.data[0].name;
    }
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations([
      "isUserLogged",
      "canAccessUserThisItems",
      "getAllItemOfCategory",
    ]),
  },
};
</script>

<style scoped>
.cover {
  height: 100vh;
  width: 100%;
  background: rgba(2, 2, 2, 0.4);
  position: absolute;
}
.ItemsComp {
  padding-top: 1%;
  background-image: url("@/assets/homeImages/sandwich-with-ground-meat.jpg");
  width: 100%;
  background-size: cover;
  background-position: center center;
  min-height: 100vh !important;
  background-repeat: no-repeat !important;
}

.ItemsComp-add-item,
.ItemsComp-add-categories {
  display: block;
  width: auto;
  margin: 0 15px 15px 15px;
}
.nameCategory {
  font-size: 50px;
  color: #fff;
  background: rgba(2, 2, 2, 0.6);
  width: 25%;
  margin: auto;
  text-align: center;
  padding: 10px;
  border-radius: 4%;
}
.card {
  padding: 15px 10px;
  background-color: rgba(2, 2, 2, 0.6);
  cursor: pointer;
  color: #eee;
  text-indent: 10px;
  transition: all ease-in-out 0.7s;
  margin: 0 0 20px 50px;
  font-size: 35px;
  font-weight: bold;
}
.card:hover {
  background-color: transparent;
}
.card-text {
  min-height: 50px;
  font-size: 15px;
}
.btn-delete,
.btn-update {
  margin-top: 2%;
  width: auto;
  display: block;
  margin: auto;
}
</style>
