<template>
  <div>
    <!-- As a heading -->
    <b-navbar variant="primary" type="dark">
      <b-navbar-brand tag="h1" class="mb-0"
        >Granblue Fantasy - Beautify Honors</b-navbar-brand
      >
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand
          href="https://github.com/qq88976321/gbf-beautify-honors-web"
        >
          <b-icon icon="github"></b-icon>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>

    <b-container>
      <div class="form-group-container">
        <b-form-group
          :state="currentHonorsState"
          :invalid-feedback="currentHonorsInvalidFeedback"
          label="Current Honors"
          label-for="current-honors"
        >
          <b-form-input
            type="number"
            id="current-honors"
            :state="currentHonorsState"
            v-model.lazy.number="currentHonors"
          />
        </b-form-group>
        <b-form-group
          :state="expectedHonorsState"
          :invalid-feedback="expectedHonorsInvalidFeedback"
          label="Expected Honors"
          label-for="expected-honors"
        >
          <b-form-input
            type="number"
            id="expected-honors"
            :state="expectedHonorsState"
            v-model.lazy.number="expectedHonors"
          />
        </b-form-group>
        <b-form-group
          :state="diffHonorsState"
          :invalid-feedback="diffHonorsInvalidFeedback"
          label="How many honors do you need to get"
          label-for="diff-honors"
        >
          <b-form-input
            disabled
            id="diff-honors"
            :state="diffHonorsState"
            :value="diffHonors"
          ></b-form-input>
        </b-form-group>
      </div>

      <div class="table-container">
        <b-button
          variant="primary"
          class="button-add-action"
          @click="handleAdd()"
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
          <!-- A virtual column to show delete button-->
          <template #cell(delete)="data">
            <BIconTrash
              class="remove-icon"
              @click="handleDelete(data)"
            ></BIconTrash>
          </template>

          <!-- A virtual column to show optimal value-->
          <template #cell(optimal)="data">
            {{ optimalTimes[data.index] }}
          </template>
        </b-editable-table>
      </div>
    </b-container>
  </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import { BButton, BIconTrash } from "bootstrap-vue";
import GLPK from "glpk.js";
import { v4 as uuidv4 } from "uuid";

export default {
  async created() {
    this.glpk = await GLPK();
    await this.solve();
  },
  components: {
    BEditableTable,
    BButton,
    BIconTrash,
  },
  computed: {
    diffHonors() {
      return this.expectedHonors - this.currentHonors;
    },
    currentHonorsState() {
      if (this.currentHonors >= 0 && this.currentHonors < 100000000000) {
        return true;
      }
      return false;
    },
    currentHonorsInvalidFeedback() {
      if (this.currentHonors < 0) {
        return "Expected honors must be a positive integer";
      }
      if (this.currentHonors >= 100000000000) {
        return "Expected honors must be less than 100 billion.";
      }
      return "";
    },
    expectedHonorsState() {
      if (this.expectedHonors >= 0 && this.expectedHonors < 100000000000) {
        return true;
      }
      return false;
    },
    expectedHonorsInvalidFeedback() {
      if (this.expectedHonors < 0) {
        return "Expected honors must be a positive integer";
      }
      if (this.expectedHonors >= 100000000000) {
        return "Expected honors must be less than 100 billion.";
      }
      return "";
    },
    diffHonorsState() {
      return this.hasSolution;
    },
    diffHonorsInvalidFeedback() {
      return "There is no solution to achieve the expected honors. Please relax the constraints and try again.";
    },
  },
  data() {
    return {
      glpk: null,
      hasSolution: false,
      currentHonors: 0,
      expectedHonors: 0,
      fields: [
        // A virtual column that doesn't exist in items
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
        // A virtual column that doesn't exist in items
        {
          key: "optimal",
          label: "Optimal times",
          type: "number",
          editable: false,
          class: "optimal-times-col",
          variant: "",
        },
      ],
      items: [
        {
          id: uuidv4(),
          action: "Eyeball N (0 button)",
          honors: 4000,
          maxTimes: 10,
        },
        {
          id: uuidv4(),
          action: "Eyeball H (0 button)",
          honors: 6000,
          maxTimes: 10,
        },
        {
          id: uuidv4(),
          action: "Eyeball VH (0 button)",
          honors: 8000,
          maxTimes: 10,
        },
        {
          id: uuidv4(),
          action: "Meat Beast VH (0 button)",
          honors: 21400,
          maxTimes: 30,
        },
        {
          id: uuidv4(),
          action: "Meat Beast EX (0 button)",
          honors: 50578,
          maxTimes: 30,
        },
        {
          id: uuidv4(),
          action: "Meat Beast EX+ (0 button)",
          honors: 80800,
          maxTimes: 30,
        },
        {
          id: uuidv4(),
          action: "Meat Beast EX+ (1 summon +)",
          honors: 80810,
          maxTimes: 30,
        },
        {
          id: uuidv4(),
          action: "Join raid and only use Break Assassin",
          honors: 1,
          maxTimes: 10,
        },
      ],
      // FIXME: don't hardcode length
      optimalTimes: Array(7).fill("-"),
      rowUpdate: {},
    };
  },
  methods: {
    handleInput() {},
    handleAdd() {
      const id = uuidv4();
      this.rowUpdate = {
        edit: false,
        id: id,
        action: "add",
        data: {
          id: id,
          action: "New Action",
          honors: 0,
          maxTimes: 10,
        },
      };
    },
    handleDelete(data) {
      this.rowUpdate = { id: data.id, action: "delete" };
    },
    async solve() {
      const honorDiff = this.expectedHonors - this.currentHonors;

      const lp = {
        name: "LP",
        generals: this.items.map((item) => item.id),
        objective: {
          direction: this.glpk.GLP_MIN,
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
            bnds: { type: this.glpk.GLP_FX, ub: honorDiff, lb: honorDiff },
          },
          ...this.items.map((item) => ({
            name: `max times of ${item.id}, action name=${item.action}`,
            vars: [{ name: item.id, coef: 1 }],
            bnds:
              // maxTimes is string
              item.maxTimes == 0
                ? { type: this.glpk.GLP_FX, ub: 0, lb: 0 }
                : {
                    type: this.glpk.GLP_DB,
                    ub: parseInt(item.maxTimes),
                    lb: 0,
                  },
          })),
        ],
      };

      return this.glpk
        .solve(lp)
        .then((res) => {
          if (res.result.status == this.glpk.GLP_OPT) {
            console.log("Optimal solution found");

            this.optimalTimes = this.items.map(
              (item) => res.result.vars[item.id]
            );
            this.hasSolution = true;
          } else {
            console.log(`No optimal solution, status = ${res.result.status}`);

            this.optimalTimes = this.items.map(() => "-");
            this.hasSolution = false;
          }
        })
        .catch((err) => console.log(err));
    },
  },
  watch: {
    currentHonors: async function () {
      await this.solve();
    },
    expectedHonors: async function () {
      await this.solve();
    },
    items: async function () {
      await this.solve();
    },
    hasSolution: function () {
      if (this.hasSolution) {
        this.fields[this.fields.length - 1].variant = "info";
      } else {
        this.fields[this.fields.length - 1].variant = "danger";
      }
    },
  },
};
</script>

<style>
.form-group-container {
  margin-top: 20px;
}

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
.action-col input {
  /* reset inherited width */
  width: 100%;
}

.honors-col {
  width: 20%;
  text-align: right;
}
.honors-col input {
  /* reset inherited width */
  width: 100%;
}

.max-times-col {
  width: 20%;
  text-align: right;
}
.max-times-col input {
  /* reset inherited width */
  width: 100%;
}

.optimal-times-col {
  width: 20%;
  text-align: right;
  font-weight: bold;
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
