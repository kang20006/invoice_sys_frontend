<template>
  <Button label="Add New Company" class="p-button-raised p-button-rounded" @click="toggleForm"/>
  <DataTable
    :value="company"
    responsiveLayout="scroll"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 50]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    :globalFilterFields="['id', 'name', 'phone']"
    filterDisplay="menu"
    v-model:filters="filters1"
    v-model:selection="selectedCompany"
    selectionMode="single"
    dataKey="id"
    @rowSelect="openCompany"
  >
    <template #header>
      <div class="table-header">
        Company
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
    <Column field="id" header="Company ID" :sortable="true">
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by ID"
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
    <Column field="phone" header="Phone">
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by Phone"
        />
      </template>
    </Column>
  </DataTable>
  <CompanyForm :display="display"/>
  <Toast />
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; //optional for column grouping
import Row from "primevue/row"; //optional for row
import axios from "../plugins/axios";
import Button from "primevue/button";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import CompanyForm from '@/components/CompanyForm'
import Toast from 'primevue/toast';

export default {
  name: "Company",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Button,
    InputText,
    CompanyForm,
    Toast

  },
  data() {
    return {
      company: null,
      filters1: null,
      selectedCompany: null,
      display: false
    };
  },
  methods: {
    refresh() {
      axios
        .get("/company/")
        .then((res) => {
          this.company = res.data.data;
        })
        .catch((err) => console.log(err.message));
    },
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        id: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        phone: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
    },
    openCompany(event) {
      const pushid = event.data.id;
      this.$router.push({ path: `/company/${pushid}` });
    },
    toggleForm(){
      this.display=!this.display
    },
    
  },
  created() {
    this.initFilters1();
  },
  mounted() {
    axios
      .get("/company/")
      .then((res) => {
        this.company = res.data.data;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>