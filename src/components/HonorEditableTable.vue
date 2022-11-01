<template>
  <div class="table-container">
    <b-row align-h="between">
      <b-col>
        <b-button variant="primary" @click="handleAdd()"> Add Action </b-button>
      </b-col>
      <b-col>
        <b-button
          class="float-right"
          variant="danger"
          v-b-modal.confirm-restore-default-modal
        >
          Restore Default Actions
        </b-button>
      </b-col>
    </b-row>
    <b-modal
      id="confirm-restore-default-modal"
      centered
      title="Confirmation"
      ok-variant="danger"
      ok-title="Yes"
      cancel-title="No"
      @ok="handleRestoreDefault()"
    >
      This action cannot be undone. Are you sure you want to restore to the
      default actions?
    </b-modal>

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
        <b-icon
          icon="trash"
          class="remove-icon"
          @click="handleDelete(data)"
        ></b-icon>
      </template>

      <!-- A custom formatted header cell for field 'honors' -->
      <template #head(honors)="data">
        <span
          v-b-tooltip.hover
          title="The exact honor earned from this action."
          style="text-decoration: underline dotted"
          >{{ data.label }}</span
        >
      </template>

      <!-- TODO: how to better show user what is max times? -->
      <!-- A custom formatted header cell for field 'maxTimes' -->
      <template #head(maxTimes)="data">
        <span
          v-b-tooltip.hover
          title="Max acceptable times of this action."
          style="text-decoration: underline dotted"
          >{{ data.label }}</span
        >
      </template>

      <!-- A virtual column to show optimal value-->
      <template #cell(optimal)="data">
        {{ optimalTimes[data.index] }}
      </template>
    </b-editable-table>
  </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import GLPK from "glpk.js";
import { v4 as uuidv4 } from "uuid";

let defaultItems = [
  {
    id: uuidv4(),
    action: "Eyeball N (0 button)",
    honors: 4000,
    maxTimes: 10,
  },
  {
    id: uuidv4(),
    action: "Eyeball H (0 button)",
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
    action: "Meat Beast EX+ (1 summon + attack only)",
    honors: 80810,
    maxTimes: 30,
  },
  {
    id: uuidv4(),
    action: "Join raid and only use Break Assassin",
    honors: 1,
    maxTimes: 10,
  },
];

export default {
  async created() {
    this.glpk = await GLPK();
    await this.solve();
  },
  components: {
    BEditableTable,
  },
  props: {
    propDiffHonors: [Number, String],
    propHasSolution: Boolean,
  },
  computed: {
    hasSolution: {
      get() {
        return this.propHasSolution;
      },
      set(val) {
        this.$emit("update:propHasSolution", val);
      },
    },
  },
  data() {
    return {
      glpk: null,
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
          type: "text",
          formatter: this.formatPositiveInteger,
          editable: true,
          class: "honors-col",
        },
        {
          key: "maxTimes",
          label: "Max times",
          type: "text",
          editable: true,
          formatter: this.formatPositiveInteger,
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
      items: defaultItems,
      // FIXME: don't hardcode length
      optimalTimes: Array(7).fill("-"),
      rowUpdate: {},
    };
  },
  methods: {
    formatPositiveInteger(e) {
      return String(e)
        .replace(/[^0-9]/g, "")
        .substring(0, 9);
    },
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
    handleRestoreDefault() {
      this.items = defaultItems;
    },
    handleDelete(data) {
      this.rowUpdate = { id: data.id, action: "delete" };
    },
    async solve() {
      if (!this.glpk) {
        // FIXME: still initializing glpk
        return;
      }

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
            bnds: {
              type: this.glpk.GLP_FX,
              ub: this.propDiffHonors,
              lb: this.propDiffHonors,
            },
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

      this.glpk
        .solve(lp)
        .then((res) => {
          if (res.result.status == this.glpk.GLP_OPT) {
            this.optimalTimes = this.items.map(
              (item) => res.result.vars[item.id]
            );
            this.hasSolution = true;
          } else {
            this.optimalTimes = this.items.map(() => "-");
            this.hasSolution = false;
          }
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    if (localStorage.items) {
      try {
        this.items = JSON.parse(localStorage.items);
      } catch (e) {
        console.error(e);
      }
    }
  },
  watch: {
    propDiffHonors: async function () {
      await this.solve();
    },
    items: async function (newItem) {
      const jsonItems = JSON.stringify(newItem);
      localStorage.items = jsonItems;

      await this.solve();
    },
    hasSolution: function () {
      if (this.hasSolution) {
        this.fields[this.fields.length - 1].variant = "success";
      } else {
        this.fields[this.fields.length - 1].variant = "danger";
      }
    },
  },
};
</script>
