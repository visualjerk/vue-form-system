<template>
  <div>
    <label v-if="label">
      {{ label }}:
    </label>
    <input type="text"
      :value="value"
      @input="input" />
  </div>
</template>

<script>
import inputMixin from "./input-mixin";
export default {
  name: "base-input",
  mixins: [inputMixin]
};
</script>

<style lang="scss" scoped>
@import "../../assets/common";
input {
  @include input;
}
</style>
