<template>
  <div>
    <AppNavbar title="Granblue Fantasy - Beautify Honors"> </AppNavbar>
    <b-container>
      <HonorForm
        :prop-expected-honors.sync="expectedHonors"
        :prop-current-honors.sync="currentHonors"
        :prop-has-solution.sync="hasSolution"
      ></HonorForm>

      <HonorEditableTable
        :prop-diff-honors="diffHonors"
        :prop-has-solution.sync="hasSolution"
      ></HonorEditableTable>
    </b-container>
  </div>
</template>

<script>
import AppNavbar from "./components/AppNavbar.vue";
import HonorForm from "./components/HonorForm.vue";
import HonorEditableTable from "./components/HonorEditableTable.vue";

export default {
  components: {
    AppNavbar,
    HonorForm,
    HonorEditableTable,
  },
  computed: {
    diffHonors() {
      return this.expectedHonors - this.currentHonors;
    },
  },
  data() {
    return {
      currentHonors: 0,
      expectedHonors: 0,
      hasSolution: false,
    };
  },
};
</script>

<style>
@import "./assets/styles/main.css";
</style>
