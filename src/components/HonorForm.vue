<template>
  <div class="form-group-container">
    <HonorFormInput label="Current Honors" :prop-honors.sync="currentHonors">
    </HonorFormInput>
    <HonorFormInput label="Expected Honors" :prop-honors.sync="expectedHonors">
    </HonorFormInput>

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
</template>

<script>
import HonorFormInput from "./HonorFormInput.vue";

export default {
  components: {
    HonorFormInput,
  },
  props: {
    propCurrentHonors: [Number, String],
    propExpectedHonors: [Number, String],
    propHasSolution: Boolean,
  },
  computed: {
    currentHonors: {
      get() {
        return this.propCurrentHonors;
      },
      set(val) {
        this.$emit("update:propCurrentHonors", val);
      },
    },
    expectedHonors: {
      get() {
        return this.propExpectedHonors;
      },
      set(val) {
        this.$emit("update:propExpectedHonors", val);
      },
    },
    diffHonors() {
      return this.expectedHonors - this.currentHonors;
    },
    diffHonorsState() {
      return this.propHasSolution;
    },
    diffHonorsInvalidFeedback() {
      return "There is no solution to achieve the expected honors. Please relax the constraints and try again.";
    },
  },
};
</script>
