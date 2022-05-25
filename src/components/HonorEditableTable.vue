<template>
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
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import { BButton, BIconTrash } from "bootstrap-vue";
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
];

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
      items: defaultItems,
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

      return this.glpk
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
        this.fields[this.fields.length - 1].variant = "info";
      } else {
        this.fields[this.fields.length - 1].variant = "danger";
      }
    },
  },
};
</script>
