<template>
  <div>
    <label v-if="label">
      {{ label }}:
    </label>
    <input type="text"
      :value="value"
      @input="input"
      invalid />
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
@import "../../assets/_variables";
input {
  font-size: 14px;
  height: 30px;
  padding: 0 10px;
  color: $color-dark;
  border: 1px solid $border-color;
  outline: none;

  &:focus {
    border-color: $border-color-focus;
  }
}
</style>
