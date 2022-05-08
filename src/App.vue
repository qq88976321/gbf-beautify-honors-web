<template>
  <div>
    <label for="basic-url">Current Honors</label>
    <div class="input-group mb-3">
      <input
        type="number"
        class="form-control"
        id="current-honor"
        v-model.lazy.number="current_honor"
      />
    </div>
    <label for="basic-url">Expected Honors</label>
    <div class="input-group mb-3">
      <input
        type="number"
        class="form-control"
        id="expected-honor"
        v-model.lazy.number="expected_honor"
      />
    </div>
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
    </div>
  </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import GLPK from "glpk.js";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    BEditableTable,
  },
  data() {
    return {
      solved: true,
      current_honor: 1398542611,
      expected_honor: 1400000000,
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
          id: uuidv4(),
          action: "Eyeball N (0 button)",
          honors: 4000,
          max_times: 10,
          optimal_times: 0,
        },
        {
          id: uuidv4(),
          action: "Eyeball H (0 button)",
          honors: 6000,
          max_times: 10,
          optimal_times: 0,
        },
        {
          id: uuidv4(),
          action: "Eyeball VH (0 button)",
          honors: 8000,
          max_times: 10,
          optimal_times: 0,
        },
        {
          id: uuidv4(),
          action: "Meat Beast VH (0 button)",
          honors: 21400,
          max_times: 30,
          optimal_times: 0,
        },
        {
          id: uuidv4(),
          action: "Meat Beast EX (0 button)",
          honors: 50578,
          max_times: 30,
          optimal_times: 0,
        },
        {
          id: uuidv4(),
          action: "Meat Beast EX+ (0 button)",
          honors: 80800,
          max_times: 30,
          optimal_times: 0,
        },
        {
          id: uuidv4(),
          action: "Meat Beast EX+ (1 summon +)",
          honors: 80810,
          max_times: 30,
          optimal_times: 0,
        },
        {
          id: uuidv4(),
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
    async solve() {
      const honor_diff = this.expected_honor - this.current_honor;

      const glpk = await GLPK();

      const lp = {
        name: "LP",
        generals: this.items.map((item) => item.action),
        objective: {
          direction: glpk.GLP_MIN,
          name: "obj",
          vars: this.items.map((item) => ({
            name: item.action,
            coef: 1,
          })),
        },
        subjectTo: [
          {
            name: "total",
            vars: this.items.map((item) => ({
              name: item.action,
              coef: item.honors,
            })),
            bnds: { type: glpk.GLP_FX, ub: honor_diff, lb: honor_diff },
          },
          ...this.items.map((item) => ({
            name: `max times of ${item.action}`,
            vars: [{ name: item.action, coef: 1 }],
            bnds: { type: glpk.GLP_DB, ub: item.max_times, lb: 0 },
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
              max_times: item.max_times,
              optimal_times: res.result.vars[item.action],
            }));
          } else {
            console.log(`No optimal solution, status = ${res.result.status}`);
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
    current_honor: function () {
      this.solved = false;
    },
    expected_honor: function () {
      this.solved = false;
    },
    items: async function () {
      this.solved = false;
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
