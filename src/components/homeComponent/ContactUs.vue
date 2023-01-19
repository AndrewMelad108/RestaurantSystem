<template>
  <div class="contact-us">
    <div class="fields">
      <h1 class="text-center title-section">ContactUs</h1>
      <h4 class="text-center title-section text-muted">Tell Us What Yu Fell</h4>
      <p class="text-center title-section text-muted">
        Feel Free Contact Us Any Some
      </p>
      <div class="container text-center">
        <div class="row">
          <div class="form-floating col-md-6 col-xs-12">
            <!--name itmes-->

            <input
              type="text"
              class="form-control btn-input"
              id="floatingName"
              placeholder="Enter Your Name"
              v-model.trim="name"
            />
            <label for="floatingName">Enter Your Name </label>
          </div>
          <div class="form-floating col-md-6 col-xs-12">
            <!--name itmes-->

            <input
              type="text"
              class="form-control btn-input"
              id="floatingEmail"
              placeholder="Enter Your Email"
              v-model.trim="email"
            />
            <label for="floatingEmail">Enter Your Email</label>
          </div>
          <div class="form-floating col-md-6 col-xs-12">
            <!--name itmes-->

            <input
              type="phone"
              class="form-control btn-input"
              id="floatingPhone"
              placeholder="Enter Your Phone"
              v-model.trim="phone"
            />
            <label for="floatingPhone">Enter Your Phone</label>
          </div>
          <div class="form-floating col-md-6 col-xs-12">
            <textarea
              class="form-control btn-input"
              placeholder="Enter Description About page"
              id="floatingTextarea"
              v-model.trim="description"
            ></textarea>
            <label for="floatingTextarea p-2"
              >Enter Description About page</label
            >
          </div>
          <button class="btn btn-danger btn-contact" @click="Contact">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { mapActions, mapMutations, mapState } from "vuex"; // component vuex
import Swal from "sweetalert2";
export default {
  name: "ContactUs",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      description: "",
    };
  },
  methods: {
    async Contact() {
      let result = await axios.post(`http://localhost:3000/contactUs`, {
        name: this.name,
        email: this.email,
        phone: this.phone,
        description: this.description,
      });
      if (result.status == 201) {
        Swal.fire({
          icon: "success",
          title: "add succeeded",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oop!!!!!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  },
};
</script>

<style scoped>
h1,
h3,
.title-section {
  padding: 5px 0;
  font-size: 25px;
}
.form-floating > label {
  margin-left: 10px !important;
}
.contact-us {
  background: url("@/assets/homeImages/vegetables-set-left-black-slate.jpg")
    no-repeat fixed center center;
  background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  -webkit-background-size: cover;
  min-height: 600px;
}

.contact-us .fields {
  background: rgb(9, 9, 9, 0.5);
  min-height: 600px;
  padding-top: 40px;
  padding-bottom: 40px;
  color: #ddd;
}
.title-section {
  margin-bottom: 1% !important;
}
.form-floating {
  margin-bottom: 15px !important;
}
.btn-input::placeholder {
  padding-left: 10px !important;
}
.btn-input,
.btn-input:focus,
.btn-input:active {
  background: transparent;
  color: #ddd;
}
.btn-contact {
  font-size: 25px;
  font-weight: bold;
}
</style>
