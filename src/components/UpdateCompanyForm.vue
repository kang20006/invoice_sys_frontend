<template>
  <Dialog v-model:visible="display">
    <template #header>
      <h3>Add New Company</h3>
    </template>
    <form>
      <div class="field">
        <label>Company Name:</label>
        <input type="text" required v-model="name" />
      </div>
      <div class="field">
        <label>Attention:</label>
        <input type="text" v-model="attention" />
      </div>
      <div class="field">
        <label>Address:</label>
        <Textarea v-model="address" rows="5" cols="30" />
      </div>
      <div class="field">
        <label>Phone:</label>
        <input type="text" v-model="phone" />
      </div>
      <div class="field">
        <label>Fax:</label>
        <input type="text" v-model="fax" />
      </div>
    </form>
    <template #footer>       
        <Button label="Submit" class="p-button-raised p-button-rounded" @click.prevent="submit"/>
    </template>
  </Dialog>
  <Toast />
</template>

<script>
import Dialog from "primevue/dialog";
import axios from "../plugins/axios";
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
export default {
  name: "CompanyForm",
  components: {
    Dialog,
    Button,
    Textarea,
    Toast
  },
  data() {
    return {
      
    };
  },
  methods: {
    showSuccess() {
            this.$toast.add({severity:'success', summary: 'Success Message', detail:'Company Updated Successfully', life: 3000});
        },
    showError() {
            this.$toast.add({severity:'error', summary: 'Error Message', detail:'An error occur', life: 3000});
        },
    submit() {
      const postdata = { name: this.name,
                         attention: this.attention,
                         address: this.address,
                         phone: this.phone,
                         fax: this.fax };
      axios({
        method: "put",
        url:
          process.env.VUE_APP_BASE_URL +
          "/company/" + this.id,
        headers: {
          "Content-Type": "application/json",
        },
        data: postdata,
      })
        .then((response) => {
            console.log(response)
            this.showSuccess()
        })
        .catch(function (error) {
          console.log(error);
          this.showError()

        });
    },
  },
  props: ["display","name","attention","address","phone","fax","id"],
};
</script>

<style>
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