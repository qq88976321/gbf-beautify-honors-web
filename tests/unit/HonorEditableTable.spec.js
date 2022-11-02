import flushPromises from "flush-promises";
import { shallowMount } from "@vue/test-utils";
import HonorEditableTable from "@/components/HonorEditableTable.vue";

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

import { v4 as uuidv4 } from "uuid";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

describe("HonorEditableTable.vue", () => {
  it("default items without solution", async () => {
    const propDiffHonors = 100;
    const wrapper = shallowMount(HonorEditableTable, {
      propsData: { propDiffHonors },
    });

    // wait until all promises in created() hook are resolved
    await flushPromises();

    expect(wrapper.vm.optimalTimes).toStrictEqual([
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ]);
  });

  it("default items with solution", async () => {
    const propDiffHonors =
      4000 * 10 +
      8000 * 10 +
      21400 * 30 +
      50578 * 30 +
      80800 * 30 +
      80810 * 30 +
      1 * 10;
    const wrapper = shallowMount(HonorEditableTable, {
      propsData: { propDiffHonors },
    });

    // wait until all promises in created() hook are resolved
    await flushPromises();

    expect(wrapper.vm.optimalTimes).toStrictEqual([10, 10, 30, 30, 30, 30, 10]);
  });

  it("default items with solution", async () => {
    const propDiffHonors = 4000 * 10 + 3;
    const wrapper = shallowMount(HonorEditableTable, {
      propsData: { propDiffHonors },
    });

    // wait until all promises in created() hook are resolved
    await flushPromises();

    expect(wrapper.vm.optimalTimes).toStrictEqual([0, 5, 0, 0, 0, 0, 3]);
  });

  it("random custom items with solution", async () => {
    const maxTimes = 99;
    const sparseHonors = [1, 100, 10000, 1000000];

    const expectOptimalTimes = sparseHonors.map(() => getRandomInt(maxTimes));

    var propDiffHonors = 0;
    for (var j = 0; j < sparseHonors.length; j++) {
      propDiffHonors += sparseHonors[j] * expectOptimalTimes[j];
    }

    const wrapper = shallowMount(HonorEditableTable, {
      propsData: { propDiffHonors },
    });

    // use some primes as actions
    wrapper.setData({
      items: sparseHonors.map((prime) => {
        return {
          id: uuidv4(),
          action: "",
          honors: prime,
          maxTimes: maxTimes,
        };
      }),
    });

    // wait until all promises in created() hook are resolved
    await flushPromises();

    expect(wrapper.vm.optimalTimes).toStrictEqual(expectOptimalTimes);
  });
});
