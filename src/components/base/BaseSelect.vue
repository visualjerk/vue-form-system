<template>
  <div>
    <label v-if="label">
      {{ label }}:
    </label>
    <select type="text" @change="input">
      <option
        v-for="option in options"
        :value="option.value || option"
        :selected="option.value ?  option.value === value : option === value"
        :key="option"
      >
        {{ option.label ? option.label : option }}
      </option>
    </select>
  </div>
</template>

<script>
import inputMixin from "./input-mixin";
export default {
  name: "base-select",
  mixins: [inputMixin],
  props: {
    options: {
      type: [Array, Object],
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/common";
select {
  @include input;
}
</style>
