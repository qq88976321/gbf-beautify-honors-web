<template>
  <div>
    <b-editable-table
      bordered
      class="editable-table"
      v-model="items"
      :fields="fields"
      @input-change="handleInput"
    >
      <template #cell(isActive)="data">
        <span v-if="data.value">Yes</span>
        <span v-else>No</span>
      </template>
    </b-editable-table>
    <pre>{{ pretty(items) }}</pre>
  </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
export default {
  components: {
    BEditableTable,
  },
  data() {
    return {
      fields: [
        {
          key: "action",
          label: "Action",
          type: "text",
          editable: true,
          placeholder: "Enter Action...",
          class: "action-col",
        },
        {
          key: "honors",
          label: "Honors",
          type: "number",
          min: "0",
          max: "5000000",
          editable: true,
          class: "honors-col",
        },
        {
          key: "max_times",
          label: "Max times",
          type: "number",
          min: "0",
          max: "1000",
          editable: true,
          placeholder: "Enter Max times...",
          class: "max-times-col",
        },
        {
          key: "optimal_times",
          label: "Optimal times",
          type: "number",
          editable: false,
          class: "optimal-times-col",
        },
      ],
      items: [
        {
          id: 1,
          action: "Eyeball N (0 button)",
          honors: 4000,
          max_times: 10,
          optimal_times: 0,
        },
        {
          id: 2,
          action: "Eyeball H (0 button)",
          honors: 6000,
          max_times: 10,
          optimal_times: 0,
        },
        {
          id: 3,
          action: "Eyeball VH (0 button)",
          honors: 8000,
          max_times: 10,
          optimal_times: 0,
        },
        {
          id: 4,
          action: "Meat Beast VH (0 button)",
          honors: 21400,
          max_times: 30,
          optimal_times: 0,
        },
        {
          id: 5,
          action: "Meat Beast EX (0 button)",
          honors: 50578,
          max_times: 30,
          optimal_times: 0,
        },
        {
          id: 6,
          action: "Meat Beast EX+ (0 button)",
          honors: 80800,
          max_times: 30,
          optimal_times: 0,
        },
        {
          id: 7,
          action: "Meat Beast EX+ (1 summon +)",
          honors: 80810,
          max_times: 30,
          optimal_times: 0,
        },
        {
          id: 8,
          action: "Join raid and only use Break Assassin",
          honors: 1,
          max_times: 10,
          optimal_times: 0,
        },
      ],
    };
  },
  methods: {
    handleInput() {},
    pretty(value) {
      return JSON.stringify(value, undefined, 2);
    },
  },
};
</script>

<style>
table.editable-table {
  margin: auto;
}

table.editable-table td {
  vertical-align: middle;
}

.editable-table .data-cell {
  padding: 8px;
  display: block;
}

.editable-table .custom-checkbox {
  width: 50px;
}

.action-col {
  width: 400px;
}

.honors-col {
  width: 150px;
  text-align: right;
}

.max-times-col {
  width: 150px;
  text-align: right;
}

.optimal-times-col {
  width: 150px;
  text-align: right;
}

/* Remove Arrows/Spinners */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
