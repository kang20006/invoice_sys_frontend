<template>
<div class="big-container">
  <div class="grid-container">
    <div class="grid-item" @click="toggleForm">
      <i class="fas fa-plus"></i>
      <div class="title">Add New Company</div>
    </div>
    <div class="grid-item" @click="toggleForm2">
      <i class="fas fa-plus"></i>
      <div class="title">Add New Invoice</div>
    </div>
    <div class="grid-item" @click="toggleForm3">
      <i class="fas fa-plus"></i>
      <div class="title">Add New Item</div>
    </div>
    <div class="grid-item"><router-link to="/invoice">Show Invoice</router-link> </div>
    <div class="grid-item"><router-link to="/company">Show Company</router-link></div>
    <div class="grid-item"><router-link to="/item">Show Item</router-link></div>
  </div> 
</div>
<CompanyForm :display="display"/>
<InvoiceForm :display2="display2"/>
<ItemForm :display3="display3"/>
</template>

<script>

import CompanyForm from '@/components/CompanyForm'
import InvoiceForm from '@/components/InvoiceForm'
import ItemForm from '@/components/ItemForm'
export default {
  name: 'HomeView',

  components: {
    CompanyForm,
    InvoiceForm,
    ItemForm
  
  },
  data(){
    return{
      display:false,
      display2:false,
      display3:false,
    }
    
  },
  methods:{
    toggleForm(){
      this.display=!this.display
    },
    toggleForm2(){
      this.display2=!this.display2
    },
    toggleForm3(){
      this.display3=!this.display3
    },
  }

}
</script>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto; 
    column-gap: 15px;
    row-gap: 15px;
    height: 700px;
    width: 100%;
    justify-items: center;
    margin-top: 100px;
  }
  .grid-item {
    display: flex;
    width:90%;
    background-color: #00094B;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: white;
    overflow-wrap: break-word;
  }
 
  .grid-item:hover {
    background-color: #00157F;
  }
  .title {
    width: 150px;
    overflow-wrap: break-word;
  }
</style>