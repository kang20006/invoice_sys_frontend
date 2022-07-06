<template>
  <Dialog v-model:visible="display4">
    <template #header>
      <h3>Update Item</h3>
    </template>
    <form>
      <div class="field">
        <label>Item Name:</label>
        <input type="text" required :value="name" @change="changeName" />
      </div>
      <div class="field">
        <label> Unit: </label>
        <Dropdown
          :value="unit"
          name="unit"
          id="unit"
          :options="unitchoice"
          optionLabel="name"
          :editable="true"
          @change="changeUnit"
        />
      </div>
      <div class="field">
        <label>Price:</label>
        <input type="number" :value="price" @change="changePrice" />
      </div>
    </form>
    <template #footer>
      <Button
        label="Submit"
        class="p-button-raised p-button-rounded"
        @click.prevent="submit"
      />
    </template>
  </Dialog>
</template>

<script>
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Button from "primevue/button";
import axios from "../plugins/axios";
export default {
  name: "ItemForm",
  components: {
    Dropdown,
    Dialog,
    Toast,
    Button,
  },
  data() {
    return {
      name1: null,
      unit1: null,
      price1: null,
      unitchoice: [
        { name: "m" },
        { name: "ft" },
        { name: "nos" },
        { name: "lumpsum" },
      ],
    };
  },
  methods: {
    showSuccess() {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Item Updated Successfully",
        life: 3000,
      });
    },
    showError() {
      this.$toast.add({
        severity: "error",
        summary: "Error Message",
        detail: "An error occur",
        life: 3000,
      });
    },
    submit() {
      if (!this.unit1) {
        this.unit1 = this.unit;
      }
      if (!this.name1) {
        this.name1 = this.name;
      }
      if (!this.price1) {
        this.price1 = this.price;
      }
      if (this.unit1.name) {
        this.unit1 = this.unit1.name;
      }
      const postdata = {
        name: this.name1,
        unit: this.unit1,
        price: this.price1,
      };

      axios({
        method: "put",
        url: process.env.VUE_APP_BASE_URL + "/item/" + this.id,
        headers: {
          "Content-Type": "application/json",
        },
        data: postdata,
      })
        .then((response) => {
          console.log(response);
          this.showSuccess();
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          this.showError();
        });
    },
    changeName(event) {
      this.name1 = event.target.value;
    },
    changePrice(event) {
      this.price1 = event.target.value;
    },
    changeUnit(event) {
      this.unit1 = event.value.name;
    },
  },
  props: ["display4", "name", "unit", "price", "id"],
};
</script>

<style scoped>
.field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
}
input {
  width: 330px;
}
</style>