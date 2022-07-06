<template>
<Dialog v-model:visible="display3">
    <template #header>
      <h3>Add New Item</h3>
    </template>
    <form>
      <div class="field">
        <label>Item Name:</label>
        <input type="text" required v-model="name" />
      </div>
       <div class="field">
          <label> Unit: </label>
          <Dropdown 
                v-model="unit" 
                name="unit" 
                id="unit" 
                :options="unitchoice" 
                optionLabel="name" 
                :editable="true"
          />        
      </div>
      <div class="field">
        <label>Price:</label>
        <input type="number" v-model="price" />
      </div>
    </form>
    <template #footer>       
        <Button label="Submit" class="p-button-raised p-button-rounded" @click.prevent="submit"/>
    </template>
  </Dialog>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import Dialog from "primevue/dialog";
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import axios from "../plugins/axios";
export default {
  name: "ItemForm",
  components:{
        Dropdown,
        Dialog,
        Toast,
        Button
  },
  data(){
    return{
      name: null,
      unit: null,
      price: null,
      unitchoice:[
              {name:"m"},
              {name:"ft"},
              {name:"nos"},
              {name:"lumpsum"}
            ],
    }
    
  },
  methods: {
    showSuccess() {
            this.$toast.add({severity:'success', summary: 'Success Message', detail:'Invoice Added Successfully', life: 3000});
        },
    showError() {
            this.$toast.add({severity:'error', summary: 'Error Message', detail:'An error occur', life: 3000});
        },
    submit() {
      if (this.unit.name) {
        this.unit=this.unit.name
      }
      const postdata = {NewList:
                        [{
                          name: this.name,
                          unit: this.unit,
                          price: this.price
                        }] 
                      } 
      
      axios({
        method: "post",
        url:
          process.env.VUE_APP_BASE_URL +
          "/item/",
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
  props: ["display3"]

}
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