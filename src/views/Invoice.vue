<template>
  <Button label="Add New Invoice" class="p-button-raised p-button-rounded" @click="toggleForm"/>
  <DataTable
    :value="invoices"
    responsiveLayout="scroll"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 50]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    :globalFilterFields="['id', 'sub_date', 'name','total']"
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
    <Column field="name" header="Company Name" :sortable="true"> 
    <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by Company Name"
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
  <InvoiceForm :display2="display2"/>
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
import InvoiceForm from "@/components/InvoiceForm";
import Toast from "primevue/toast";
import Calendar from "primevue/calendar";

export default {
  name: "Invoice",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Button,
    InputText,
    InvoiceForm,
    Toast,
    Calendar,
  },
  data() {
    return {
      detail: [],
      invoices: null,
      display2: false,
      filters1: null,
      selectedInvoice: null,
    };
  },
  mounted() {
    axios
      .get("/summary/invoice_s")
      .then((res) => {
        this.invoices = res.data;
      })
      .catch((err) => console.log(err.message));
  },
  methods: {
    toggleForm() {
      this.display2 = !this.display2;
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
        name: {
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
        .get("/summary/invoice_s")
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
