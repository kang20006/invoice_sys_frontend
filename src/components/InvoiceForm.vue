<template>
    <Dialog v-model:visible="display2">
        <template #header>
        <h3>Add New Invoice</h3>
        </template>
        <form>
        <div class="field">
            <label>Invoice Id:</label>
            <input type="invoice_id" required v-model="invoice_id"  />
        </div>
        <div class="field">
            <label>Company Name:</label>
            <Dropdown v-model="company" :options="company_name" optionLabel="name" placeholder="Select a Company" />
        </div>
        <div class="field">
            <label>Invoice Date:</label>           
            <Calendar v-model="date" />
        </div>

        <div>
          <h2>Item List</h2>
          <div class="added-projects">
            <div
              class="project-labels"
              v-show="projects.length > 0"
            >
              <label id="label-name">Item Name</label>
              <label id="label-qty">Qty.</label>
              <label id="label-unit">Unit</label>
              <label id="label-price">Price</label>
              <label id="label-total">Total</label>
            </div>
            <div
              v-for="(item, index) in projects"
              :key="index"
              class="added-projects-info"
            >
              <div class="added-project-name">{{ item.name }}</div>
              <div class="added-project-qty">{{ item.quantity }}</div>
              <div class="added-project-unit">{{ item.unit }}</div>
              <div class="added-project-price">{{ item.price }}</div>
              <div class="added-project-total">
                <span class="price-symbol">RM</span>{{ item.total }}
              </div>
              <div class="">
                <svg
                  class="project-delete"
                  color="hsl(232, 23%, 61%)"
                  viewBox="0 0 1024 1024"
                  style="stroke: currentcolor; fill: currentcolor"
                  @click="deleteProject(index)"
                >
                  <path
                    d="M837.312 227.584v682.624c0 62.848-50.88 113.792-113.728 113.792h-455.168c-62.81 0-113.728-50.918-113.728-113.728 0-0.023 0-0.045 0-0.068l-0 0.004v-682.624h682.624zM638.272 0l56.832 56.896h199.104v113.792h-796.416v-113.792h199.040l57.024-56.896h284.416z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="input-group" id="project">
            <div class="input-item" id="project-name">
              <label
                for="item-name"
              >
                Item Name
              </label>
              <AutoComplete 
              v-model="projectItem.name" 
              ref="nextInput" 
              name="itemName" 
              id="item-name" 
              :suggestions="filteredItem" 
              @complete="searchItems" 
              :virtualScrollerOptions="{ itemSize: 31 }" 
              field="label" 
              dropdown />
              <!-- <input
                v-model="projectItem.name"
                ref="nextInput"
                type="text"
                name="itemName"
                id="item-name"
              /> -->
            </div>
            <div class="input-item" id="project-qty">
              <label for="quantity"> Qty. </label>
              <input
                v-model="projectItem.quantity"
                type="number"
                name="quantity"
                id="quantity"
              />
            </div>
            <div class="input-item" id="project-unit">
              <label for="unit"> Unit </label>
              <Dropdown 
                v-model="projectItem.unit" 
                name="unit" 
                id="unit" 
                :options="unitchoice" 
                optionLabel="name" 
                :editable="true"
              />

              <!-- <input
                v-model="projectItem.unit"
                type="text"
                name="unit"
                id="unit"
              /> -->
            </div>
            <div class="input-item" id="project-price">
              <label
                for="price"
              >
                Price
              </label>
              <input
                v-model="projectItem.price"
                type="number"
                name="price"
                id="price"
              />
            </div>
            <div class="input-item" id="project-total">
              <label for="total"> Total </label>
              <div id="total">
                <span class="price-symbol">RM</span>{{ projectItemTotal }}
              </div>
            </div>
            
        </div>
        </div>
        </form>
        <template #footer>
            <label
                for="remark"
              >
                Remark:
              </label>
              <input
                v-model="remark"
                type="text"
                name="remark"
                id="remark"
              />
            
              <div id="project-total">
                <label for="total"> Total </label>
                <div id="total">
                  <span class="price-symbol">RM</span> {{projectTotal}} 
                </div>
              </div>
             
            <Button label="Submit" class="p-button-raised p-button-rounded" @click="submit"/>
            <Button label="Add New Item" class="p-button-raised p-button-rounded" @click.prevent="addNewProject"/>
      
        </template>
    </Dialog>
    <Toast/>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import Dialog from "primevue/dialog";
import axios from "../plugins/axios";
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import AutoComplete from 'primevue/autocomplete';
import Toast from 'primevue/toast';
export default {
    name: "InvoiceForm",
    components:{
        Dropdown,
        Dialog,
        Button,
        Calendar,
        AutoComplete,
        Toast
    },
    data(){ 
        return {
            invoice_id : null,
            company_name : [],
            company : null,
            date: null,
            projects: [],
            projectItem: {
                name: null,
                quantity: 1,
                unit: null,
                price: null,
                total: null,
            },
            filteredItem: null,
            items: [],
            unitchoice:[
              {name:"m"},
              {name:"ft"},
              {name:"nos"},
              {name:"lumpsum"}
            ],
            subtotal: null,
            remark:null
            
        }    
    },
    
    methods: { 
        focusInput() {
        this.$refs.nextInput.focus();
        },
        addNewProject() {
            if (this.projectItem.unit) {
              this.projectItem.unit=this.projectItem.name.unit
            }
            if (this.projectItem.name) {
              this.projectItem.name=this.projectItem.name.name
            }
            
            this.projectItem.total =
                this.projectItem.quantity * this.projectItem.price;
            let newProject = { ...this.projectItem };
            this.projects.push(newProject);
            this.projectItem = { name: "", quantity: 1, price: null, total: null };
            this.focusInput();
        },
        deleteProject(i) {
            this.projects.splice(i, 1);
        },
        
        searchItems(event) {
            let query = event.query;
            let filteredItem = [];

            for(let i = 0; i < this.items.length; i++) {
                let item = this.items[i];
                if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                    filteredItem.push(item);
                }
            }

            this.filteredItem = filteredItem;
        },

        submit(){
            const postdata = { id: this.invoice_id,
                         sub_date: this.date,
                         remark: this.remark,
                         company: this.company.name,
                         total: this.subtotal,
                         NewList: this.projects };
            axios({
              method: "post",
              url:
                process.env.VUE_APP_BASE_URL +
                "/invoice/",
              headers: {
                "Content-Type": "application/json",
              },
              data: postdata,
            })
              .then((response) => {
                  console.log(response)
                  this.showSuccess()
                  axios.get('/summary/new_info')
                  .then(res => {
                      this.invoice_id = res.data["invoice_id"]
                  this.setempty()
                  
    
            })
              })
              .catch(function (error) {
                console.log(error);
                
              });
          
        },
      
        showSuccess() {
            this.$toast.add({severity:'success', summary: 'Success Message', detail:'Invoice Added Successfully', life: 3000});
        },
        showError() {
            this.$toast.add({severity:'error', summary: 'Error Message', detail:'An error occur', life: 3000});
        },
        setempty(){
          this.company = ""
            this.date= null
            this.projects= []
            this.projectItem= {
                name: "",
                quantity: 1,
                unit: "",
                price: "",
                total: "",
            }
            this.subtotal= null
            this.remark=null
        }
    },
    watch: {
      'projectItem.name'() {
          this.projectItem.price=this.projectItem.name.price
          this.projectItem.unit=this.projectItem.name.unit
        }
    },
    computed: {
        projectItemTotal() {
        return this.projectItem.quantity * this.projectItem.price;
        },
        projectTotal(){
          var sum = this.projects.reduce((accumulator, object) => {
                      return accumulator + object.total;
                    }, 0);
          this.subtotal = sum
          return sum
        }
    },
    mounted() {
        axios.get('/summary/new_info')
        .then(res => {
            this.invoice_id = res.data["invoice_id"]
            this.company_name = res.data["company_name"]
            
        })
        .catch((err) => console.log(err.message));

        axios.get('/item/')
        .then(res => {
            this.items = res.data
        })
        .catch((err) => console.log(err.message));



    },
    props: ["display2"],
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

.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-item {
  display: flex;
  flex-direction: column;
}

.input-group > .input-item {
  width: 30%;
}
.added-projects {
  margin-bottom: 20px;
}
.project-labels,
.added-projects-info {
  display: flex;
  gap: 15px;
}
.added-projects-info {
  margin-bottom: 10px;
}
#label-name,
.added-project-name {
  flex-basis: 35%;
}
#label-qty,
.added-project-qty {
  flex-basis: 10%;
}
#label-unit,
.added-project-unit {
  flex-basis: 10%;
}
#label-price,
.added-project-price {
  flex-basis: 15%;
}
#label-total,
.added-project-total {
  flex-basis: 20%;
}
.added-project-name,
.added-project-qty,
.added-project-unit,
.added-project-price,
.added-project-total {
  display: flex;
  align-items: center;
  padding: 14px 13px 14px 20px;
  border-radius: 4px;
  border: 1px solid hsl(233, 30%, 21%);
  background-color: hsl(233, 31%, 17%);
  font-weight: 700;
}
#project {
  gap: 16px;
}
#project-name input{
  width: 100%;
}
#project-name {
  width: 40%;
}
#project-qty input {
    width:100%;
}
#project-qty {
  width: 10%;
}
#project-unit input {
    width:100%;
}
#project-unit {
  width: 15%;
}
#project-price input {
  width: 100%;
}
#project-price {
  width: 15%;
}
#project-total input {
  width: 100%;
}
#project-total {
  width: 20%;
}
.project-delete {
  width: 20px;
  padding-top: 14px;
  cursor: pointer;
}
.project-delete:hover {
  color: rgb(255, 86, 86);
}
#total {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 700;
  color: white;
}
.price-symbol {
  font-size: 1rem;
  font-weight: 700;
  margin-right: 5px;
}
.btn-container {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-right: 40px;
  padding-left: 10px;
}
.btn-add-item {
  width: 100%;
  background-color: #252946;
  margin-top: 20px;
}


</style>