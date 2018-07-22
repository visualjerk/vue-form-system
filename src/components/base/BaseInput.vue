<template>
  <form-item>
    <input
      :name="model"
      :type="type"
      :value="value"
      @input="input"
      :disabled="disabled">
  </form-item>
</template>

<script>
import inputMixin from './input-mixin';

export default {
  name: 'BaseInput',
  mixins: [inputMixin],
  props: {
    type: {
      type: String,
      default: 'text',
      validator: val => (
        ['url', 'text', 'password', 'email', 'search'].indexOf(val) !== -1
      ),
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  @include input;
}
</style>
