<template>
  <div class="form-group-container">
    <b-form-group
      :state="honorsState"
      :invalid-feedback="honorsInvalidFeedback"
      :label="label"
      :label-for="label"
    >
      <b-form-input
        type="number"
        :id="label"
        :state="honorsState"
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
      if (this.propHonors >= 0 && this.propHonors < 100000000000) {
        return true;
      }
      return false;
    },
    honorsInvalidFeedback() {
      if (this.propHonors < 0) {
        return "Expected honors must be a positive integer.";
      }
      if (this.propHonors >= 100000000000) {
        return "Expected honors must be less than 100 billion.";
      }
      return "";
    },
  },
};
</script>
