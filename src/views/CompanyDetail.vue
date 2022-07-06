<template>
  <section id="about-section" class="pt-5 pb-5">
    <div class="container">
      <div class="row">
        <div class="child">
          <div class="blockabout">
            <div class="blockabout-inner">
              <div class="title-big" @click="toggleForm">
                <h3>{{ detail.name }} <i class="fas fa-pen"></i></h3>
              </div>
              <p class="description-p">ID : {{ detail.id }}</p>
              <p class="description-p">Name : {{ detail.name }}</p>
              <p class="description-p">Attention : {{ detail.attention }}</p>
              <p class="description-p">Address : {{ detail.address }}</p>
              <p class="description-p">Phone : {{ detail.phone }}</p>
              <p class="description-p">Fax : {{ detail.fax }}</p>
            </div>
          </div>
        </div>
        <div class="child">
          <DataTable
            :value="invoices"
            responsiveLayout="scroll"
            :paginator="true"
            :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            :globalFilterFields="['id', 'sub_date', 'total']"
            filterDisplay="menu"
            v-model:filters="filters1"
            v-model:selection="selectedInvoice"
            selectionMode="single"
            dataKey="id"
            @rowSelect="openInvoice"
          >
            <template #header>
              <div class="table-header">
                Invoice
                <div>
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      v-model="filters1['global'].value"
                      placeholder="Keyword Search"
                    />
                  </span>
                  <Button icon="pi pi-refresh" @click="refresh" />
                </div>
              </div>
            </template>
            <Column field="id" header="Invoice ID" :sortable="true">
              <template #filter="{ filterModel }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  class="p-column-filter"
                  placeholder="Search by ID"
                />
              </template>
            </Column>
            <Column field="sub_date" data-type="date" header="Date" :sortable="true">
              <template #body="{ data }">
                {{ formatDate(data.sub_date) }}
              </template>
              <template #filter="{ filterModel }">
                <Calendar
                  v-model="filterModel.value"
                  dateFormat="dd/mm/yy"
                  placeholder="dd/mm/yyyy"
                />
              </template>
            </Column>
            <Column field="total" header="Total" :sortable="true">
              <template #filter="{ filterModel }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  class="p-column-filter"
                  placeholder="Search by Total Amount"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </section>
  <CompanyForm
    :display="display"
    :name="detail.name"
    :id="detail.id"
    :attention="detail.attention"
    :address="detail.address"
    :phone="detail.phone"
    :fax="detail.fax"
  />
  <Toast />
</template>

<script>
import axios from "../plugins/axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; //optional for column grouping
import Row from "primevue/row"; //optional for row
import Button from "primevue/button";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import CompanyForm from "@/components/UpdateCompanyForm";
import Toast from "primevue/toast";
import Calendar from "primevue/calendar";

export default {
  name: "CompanyDetail",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Button,
    InputText,
    CompanyForm,
    Toast,
    Calendar,
  },
  data() {
    return {
      detail: [],
      invoices: null,
      display: false,
      filters1: null,
      selectedInvoice: null,
    };
  },
  mounted() {
    var id = this.$route.params.id;
    axios
      .get("/company/" + id)
      .then((res) => {
        this.detail = res.data;
      })
      .catch((err) => console.log(err.message));
    axios
      .get("/summary/invoice_s/" + id)
      .then((res) => {
        this.invoices = res.data;
      })
      .catch((err) => console.log(err.message));
  },
  methods: {
    toggleForm() {
      this.display = !this.display;
    },
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        // sub_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        sub_date: {
          operator: FilterOperator.AND,
          constraints: [
            {
              operator: FilterOperator.AND,
              constraints: [
                { value: null, matchMode: FilterMatchMode.DATE_IS },
              ],
            },
          ],
        },
        total: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
    },
    openInvoice(event) {
      const pushid = event.data.id;
      this.$router.push({ path: `/invoice/${pushid}` });
    },
    refresh() {
      var id = this.$route.params.id;
      axios
        .get("/summary/invoice_s/" + id)
        .then((res) => {
          this.invoices = res.data.map((item) => {
            item.sub_date = new Date(item.sub_date);
          });
          return item;
        })
        .catch((err) => console.log(err.message));
    },
    formatDate(value) {
      var mydate = new Date(value);
      return mydate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },

  created() {
    this.initFilters1();
  },
};
</script>

<style scoped>
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
  width: 50%;
  box-sizing: border-box;
}
.description-p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 3em;
}
.title-big {
  font-weight: bold;
  font-size: 4em;
  color: rgba(255, 255, 255, 0.7);
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
</style>>

