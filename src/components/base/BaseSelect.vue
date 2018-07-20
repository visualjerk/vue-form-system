<template>
  <div :class="stateClasses">
    <label v-if="label">
      {{ label }}:
    </label>
    <select @change="input">
      <option
        v-for="option in options"
        :value="option.value || option"
        :selected="option.value ? option.value === value : option === value"
        :key="option"
      >
        {{ option.label ? option.label : option }}
      </option>
    </select>
    <input-error :error="error" />
  </div>
</template>

<script>
import inputMixin from './input-mixin';

export default {
  name: 'BaseSelect',
  mixins: [inputMixin],
  props: {
    options: {
      type: [Array, Object],
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  @include input;
}
</style>
