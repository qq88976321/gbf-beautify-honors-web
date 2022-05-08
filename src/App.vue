<template>
  <b-container>
    <div class="form-group-container">
      <b-form-group label="Current Honors" label-for="current-honor">
        <b-form-input id="current-honor" v-model.lazy.number="currentHonor" />
      </b-form-group>
      <b-form-group label="Expected Honors" label-for="expected-honor">
        <b-form-input id="expected-honor" v-model.lazy.number="expectedHonor" />
      </b-form-group>
    </div>

    <div class="table-container">
      <b-button variant="primary" class="button-add-action" @click="handleAdd()"
        >Add Action</b-button
      >
      <b-editable-table
        :rowUpdate="rowUpdate"
        bordered
        class="editable-table"
        v-model="items"
        :fields="fields"
        @input-change="handleInput"
      >
        <template #cell(delete)="data">
          <BIconTrash
            class="remove-icon"
            @click="handleDelete(data)"
          ></BIconTrash>
        </template>
      </b-editable-table>
    </div>
  </b-container>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import { BButton, BIconTrash } from "bootstrap-vue";
import GLPK from "glpk.js";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    BEditableTable,
    BButton,
    BIconTrash,
  },
  data() {
    return {
      solved: true,
      currentHonor: 0,
      expectedHonor: 0,
      fields: [
        { key: "delete", label: "" },
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
          key: "maxTimes",
          label: "Max times",
          type: "number",
          min: "0",
          max: "1000",
          editable: true,
          placeholder: "Enter Max times...",
          class: "max-times-col",
        },
        {
          key: "optimalTimes",
          label: "Optimal times",
          type: "number",
          editable: false,
          class: "optimal-times-col",
        },
      ],
      items: [
        {
          id: uuidv4(),
          action: "Eyeball N (0 button)",
          honors: 4000,
          maxTimes: 10,
          optimalTimes: "-",
          _cellVariants: { optimalTimes: "warning" },
        },
        {
          id: uuidv4(),
          action: "Eyeball H (0 button)",
          honors: 6000,
          maxTimes: 10,
          optimalTimes: "-",
          _cellVariants: { optimalTimes: "warning" },
        },
        {
          id: uuidv4(),
          action: "Eyeball VH (0 button)",
          honors: 8000,
          maxTimes: 10,
          optimalTimes: "-",
          _cellVariants: { optimalTimes: "warning" },
        },
        {
          id: uuidv4(),
          action: "Meat Beast VH (0 button)",
          honors: 21400,
          maxTimes: 30,
          optimalTimes: "-",
          _cellVariants: { optimalTimes: "warning" },
        },
        {
          id: uuidv4(),
          action: "Meat Beast EX (0 button)",
          honors: 50578,
          maxTimes: 30,
          optimalTimes: "-",
          _cellVariants: { optimalTimes: "warning" },
        },
        {
          id: uuidv4(),
          action: "Meat Beast EX+ (0 button)",
          honors: 80800,
          maxTimes: 30,
          optimalTimes: "-",
          _cellVariants: { optimalTimes: "warning" },
        },
        {
          id: uuidv4(),
          action: "Meat Beast EX+ (1 summon +)",
          honors: 80810,
          maxTimes: 30,
          optimalTimes: "-",
          _cellVariants: { optimalTimes: "warning" },
        },
        {
          id: uuidv4(),
          action: "Join raid and only use Break Assassin",
          honors: 1,
          maxTimes: 10,
          optimalTimes: "-",
          _cellVariants: { optimalTimes: "warning" },
        },
      ],
      rowUpdate: {},
    };
  },
  methods: {
    handleInput() {},
    handleAdd() {
      const id = uuidv4();
      this.rowUpdate = {
        edit: true,
        id: id,
        action: "add",
        data: {
          id: id,
          action: "New Action",
          honors: 0,
          maxTimes: 10,
          optimalTimes: "-",
          _cellVariants: { optimalTimes: "info" },
        },
      };
    },
    handleDelete(data) {
      this.rowUpdate = { id: data.id, action: "delete" };
    },
    async solve() {
      const honorDiff = this.expectedHonor - this.currentHonor;

      const glpk = await GLPK();

      const lp = {
        name: "LP",
        generals: this.items.map((item) => item.id),
        objective: {
          direction: glpk.GLP_MIN,
          name: "obj",
          vars: this.items.map((item) => ({
            name: item.id,
            coef: 1,
          })),
        },
        subjectTo: [
          {
            name: "total",
            vars: this.items.map((item) => ({
              name: item.id,
              coef: item.honors,
            })),
            bnds: { type: glpk.GLP_FX, ub: honorDiff, lb: honorDiff },
          },
          // FIXME: allow maxTimes=0
          ...this.items.map((item) => ({
            name: `max times of ${item.id}, action name=${item.action}`,
            vars: [{ name: item.id, coef: 1 }],
            bnds: { type: glpk.GLP_DB, ub: item.maxTimes, lb: 0 },
          })),
        ],
      };

      return glpk
        .solve(lp)
        .then((res) => {
          if (res.result.status == glpk.GLP_OPT) {
            console.log("Optimal solution found");

            // TODO: Can we do in place update? Learn how vue do list rendering.
            this.items = this.items.map((item) => ({
              id: item.id,
              action: item.action,
              honors: item.honors,
              maxTimes: item.maxTimes,
              optimalTimes: res.result.vars[item.id],
              _cellVariants: { optimalTimes: "info" },
            }));
          } else {
            console.log(`No optimal solution, status = ${res.result.status}`);
            this.items = this.items.map((item) => ({
              id: item.id,
              action: item.action,
              honors: item.honors,
              maxTimes: item.maxTimes,
              optimalTimes: "-",
              _cellVariants: { optimalTimes: "warning" },
            }));
          }
        })
        .catch((err) => console.log(err));
    },
  },
  watch: {
    solved: async function (newValue) {
      if (newValue === false) {
        await this.solve();
        this.solved = true;
      }
    },
    currentHonor: function () {
      this.solved = false;
    },
    expectedHonor: function () {
      this.solved = false;
    },
    items: async function () {
      this.solved = false;
    },
  },
};
</script>

<style>
.table-container {
  margin-top: 20px;
}

table.editable-table {
  margin-top: 10px;
}

table.editable-table thead {
  background-color: aliceblue;
  font-weight: bold;
}

table.editable-table td {
  vertical-align: middle;
}

.editable-table .data-cell {
  padding: 8px;
  display: block;
}

.remove-icon {
  color: red;
  cursor: pointer;
  font-size: 20px;
}

.action-col {
  width: 40%;
}

.honors-col {
  width: 20%;
  text-align: right;
}

.max-times-col {
  width: 20%;
  text-align: right;
}

.optimal-times-col {
  width: 20%;
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
