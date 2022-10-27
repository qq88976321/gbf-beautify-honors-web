<template>
  <div class="form-group-container">
    <b-form-group :label="label" :label-for="label">
      <!-- use text type and formatter to avoid scientific notification -->
      <b-form-input
        type="text"
        :id="label"
        :formatter="formatHonors"
        v-model.lazy.number="honors"
      />
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: {
    label: [String],
    propHonors: [Number, String],
  },
  methods: {
    formatHonors(e) {
      return String(e)
        .replace(/[^0-9]/g, "")
        .substring(0, 12);
    },
  },
  computed: {
    honors: {
      get() {
        return this.propHonors;
      },
      set(val) {
        this.$emit("update:propHonors", val);
      },
    },
    honorsState() {
      return /^\d+$/.test(this.propHonors);
    },
  },
};
</script>
