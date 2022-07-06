<template>
  <Button
    label="Add New Item"
    class="p-button-raised p-button-rounded"
    @click="toggleForm"
  />
  <DataTable
    :value="item"
    responsiveLayout="scroll"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 50]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    :globalFilterFields="['id', 'name', 'price']"
    filterDisplay="menu"
    v-model:filters="filters1"
    dataKey="id"
  >
    <template #header>
      <div class="table-header">
        Item
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
    <Column field="id" header="Item ID" :sortable="true">
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by ID"
        />
      </template>
    </Column>
    <Column field="name" header="Item Name" :sortable="true">
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by Item Name"
        />
      </template>
    </Column>
    <Column field="price" header="Price">
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by Price"
        />
      </template>
    </Column>
    <Column field="unit" header="Unit"> </Column>
    <Column :exportable="false" style="min-width: 8rem">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          class="p-button-rounded p-button-success mr-2"
          @click="editItem(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-warning"
          @click="deleteItem(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
  <ItemForm :display3="display3" />
  <UpdateItemForm
    :display4="display4"
    :name="selectedname"
    :unit="selectedunit"
    :price="selectedprice"
    :id="selectedid"
  />
  <Toast />
  <Dialog
    v-model:visible="deleteItemDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="deleteitemid"
        >Are you sure you want to delete the selected products?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text"
        @click="deleteItemDialog = false"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        class="p-button-text"
        @click="deleteSelectedItem"
      />
    </template>
  </Dialog>
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
import ItemForm from "@/components/ItemForm";
import UpdateItemForm from "@/components/UpdateItemForm";
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";

export default {
  name: "Item",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Button,
    InputText,
    ItemForm,
    Toast,
    UpdateItemForm,
    Dialog,
  },
  data() {
    return {
      item: null,
      filters1: null,
      selectedItem: null,
      display3: false,
      display4: false,
      selectedname: null,
      selectedunit: null,
      selectedprice: null,
      selectedid: null,
      deleteItemDialog: false,
      deleteitemid: null,
    };
  },
  methods: {
    refresh() {
      axios
        .get("/item/")
        .then((res) => {
          this.item = res.data.data;
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
        unit: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
    },
    showSuccess() {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Item Deleted Successfully",
        life: 3000,
      });
    },
    toggleForm() {
      this.display3 = !this.display3;
    },
    editItem(item) {
      this.display4 = true;
      this.selectedname = item.name;
      this.selectedunit = item.unit;
      this.selectedprice = item.price;
      this.selectedid = item.id;
    },
    deleteItem(item) {
      this.deleteItemDialog = true;
      this.deleteitemid = item.id;
    },
    deleteSelectedItem() {
      axios
        .delete("/item/" + this.deleteitemid)
        .then((response) => {
          console.log(response);
          this.showSuccess();
          window.location.reload();
        })
        .catch((error) => {
          console.log("There was an error!", error);
        });
    },
  },
  created() {
    this.initFilters1();
  },
  mounted() {
    axios
      .get("/item/")
      .then((res) => {
        this.item = res.data;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
