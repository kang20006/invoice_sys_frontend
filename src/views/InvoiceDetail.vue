<template>
  <section id="about-section" class="pt-5 pb-5">
    <div class="container">
      <div class="row">
        <div class="child">
          <div class="blockabout">
            <div class="blockabout-inner">
              <div class="title-big" @click="toggleForm">
                <h3>{{this.id}} <i class="fas fa-pen"></i></h3>
              </div>
              <header>
                <h1>Invoice</h1>
                <address>
                  <p>Company Name: {{detail.name}}</p>
                  <p>Attention: {{detail.attention}}</p>
                  <p>Address: {{detail.address}}</p>
                  <p>Phone: {{detail.phone}}</p>
                  <p>Fax: {{detail.fax}}</p>
                </address>
                <article>
                  <table class="meta">
                    <tr>
                      <th><span class="title-small">Invoice #</span></th>
                      <td><span>{{detail.id}}</span></td>
                    </tr>
                    <tr>
                      <th><span class="title-small">Date</span></th>
                      <td><span>{{detail.sub_date}}</span></td>
                    </tr>
                    <tr>
                      <th><span class="title-small">Amount</span></th>
                      <td>
                        <span id="prefix">RM</span
                        ><span>{{detail.total}}</span>
                      </td>
                    </tr>
                  </table>
                  <table class="inventory">
                    <thead>
                      <tr>
                        <th><span class="title-small">Item</span></th>
                        <th><span class="title-small">Price</span></th>
                        <th><span class="title-small">Quantity</span></th>
                        <th><span class="title-small">Unit</span></th>
                        <th><span class="title-small">Total</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="thing in detail.itemlist">
                        <td>
                          <span>{{thing.name}}</span>
                        </td>
                        <td><span data-prefix>RM</span
                          ><span>{{thing.price}}</span></td>
                        <td>
                          <span>{{thing.quantity}}</span>
                        </td>
                        <td>
                          <span>{{thing.unit}}</span>
                        </td>
                        <td><span data-prefix>RM</span><span>{{thing.total}}</span></td>
                      </tr>
                    </tbody>
                  </table>

                  <table class="balance">
                    <tr>
                      <th><span class="title-small">Total</span></th>
                      <td><span data-prefix>RM</span><span>{{detail.total}}</span></td>
                    </tr>
                  </table>
                </article>
                <aside>
                  <h1><span>Additional Notes</span></h1>
                  <div class="title-small">
                    <p>
                      {{detail.remark}}
                    </p>
                  </div>
                </aside>
              </header>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <InvoiceForm
    :display2="display2"
    :invoice_id="id"
    :company="detail.name"       
    :date="detail.sub_date"
    :projects="detail.itemlist"
    :remark="detail.remark"
  />
  
</template>

<script>
import axios from "../plugins/axios";
import InvoiceForm from "@/components/UpdateInvoiceForm";
export default {
    components:{
        InvoiceForm
    },
    data() {
        return {
        detail: [],
        display2: false,
        id:null
        };
    },
    mounted() {
        var id = this.$route.params.id;
        this.id = id
        axios
        .get("/summary/invoice/" + id)
        .then((res) => {
            this.detail = res.data;
            this.detail.total=parseFloat(this.detail.total).toFixed(2)
            this.detail.sub_date = new Date(this.detail.sub_date);
            this.detail.sub_date = this.detail.sub_date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",});
            this.detail.itemlist.map(i=>{
                i.total=(i.price*i.quantity).toFixed(2)
                i.price=parseFloat(i.price).toFixed(2)
                i.quantity=parseFloat(i.quantity).toFixed(2)

            });
            
        })
        .catch((err) => console.log(err.message));
    },
    methods:{
        toggleForm() {
      this.display2 = !this.display2;
    },
    }
    
};
</script>

<style scoped>
*{
    color: rgba(255, 255, 255, 0.7);
    font-size: 20px;

}
.container {
  height: 100%;
  width: 100%;
  margin-top: 100px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin: -10px 0 0 -10px;
}
.child {
  width: 90%;
  box-sizing: border-box;
}
.title-big {
  font-weight: bold;
  font-size: 40px;
  color: rgba(255, 255, 255, 0.7);
}
.title-small{
font-weight: bold;
  color: black;
}
#about-section {
  position: relative;
}

.blockabout {
  padding: 20px;
  background: #00094b;
  box-shadow: 5px 5px 5px 5px #888888;
}

.blockabout-inner {
  padding: 30px;
  border: 1px solid white;
}

.sosmed-horizontal a i {
  border: 1px solid #070707;
  border-radius: 50%;
  color: #070707;
  display: inline-block;
  height: 30px;
  width: 30px;
  line-height: 30px;
  margin: auto 3px;
  font-size: 15px;
  text-align: center;
  transition: all 0.3s;
}

.rey-btn {
  border: 2px solid #070707;
  padding: 10px 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.3s;
}


/* heading */

h1 {
  font: bold 100% sans-serif;
  letter-spacing: 0.5em;
  text-align: center;
  text-transform: uppercase;
}

/* table */

table {
  font-size: 75%;
  table-layout: fixed;
  width: 100%;
}
table {
  border-collapse: separate;
  border-spacing: 2px;
}
th,
td {
  border-width: 1px;
  padding: 0.5em;
  position: relative;
  text-align: left;
}
th,
td {
  border-radius: 0.25em;
  border-style: solid;
}
th {
  background: #eee;
  border-color: #bbb;
}
td {
  border-color: #ddd;
}

/* header */

header {
  margin: 0 0 3em;
}
header:after {
  clear: both;
  content: "";
  display: table;
}

header h1 {
  background: #000;
  border-radius: 0.25em;
  color: #fff;
  margin: 0 0 1em;
  padding: 0.5em 0;
}
header address {
  float: left;
  font-size: 75%;
  font-style: normal;
  line-height: 1.25;
  margin: 0 1em 1em 0;
}
header address p {
  margin: 0 0 0.25em;
}
header span,
header img {
  display: block;
  float: right;
}
header span {
  margin: 0 0 1em 1em;
  max-height: 25%;
  max-width: 60%;
  position: relative;
}
header img {
  max-height: 100%;
  max-width: 100%;
}
header input {
  cursor: pointer;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

/* article */

article,
article address,
table.meta,
table.inventory {
  margin: 0 0 3em;
}
article:after {
  clear: both;
  content: "";
  display: table;
}
article h1 {
  clip: rect(0 0 0 0);
  position: absolute;
}

article address {
  float: left;
  font-size: 125%;
  font-weight: bold;
}

/* table meta & balance */

table.meta,
table.balance {
  float: right;
  width: 36%;
}
table.meta:after,
table.balance:after {
  clear: both;
  content: "";
  display: table;
}

/* table meta */

table.meta th {
  width: 40%;
}
table.meta td {
  width: 60%;
}

/* table items */

table.inventory {
  clear: both;
  width: 100%;
}
table.inventory th {
  font-weight: bold;
  text-align: center;
}

table.inventory td:nth-child(1) {
  width: 26%;
}
table.inventory td:nth-child(2) {
  width: 38%;
}
table.inventory td:nth-child(3) {
  text-align: right;
  width: 12%;
}
table.inventory td:nth-child(4) {
  text-align: right;
  width: 12%;
}
table.inventory td:nth-child(5) {
  text-align: right;
  width: 12%;
}

/* table balance */

table.balance th,
table.balance td {
  width: 50%;
}
table.balance td {
  text-align: right;
}

/* aside */

aside h1 {
  border: none;
  border-width: 0 0 1px;
  margin: 0 0 1em;
}
aside h1 {
  border-color: #999;
  border-bottom-style: solid;
}
</style>