<template>
  <label
    class="input-label"
    v-show="!!label">
    {{ label }}:
  </label>
</template>

<script>
export default {
  name: 'InputLabel',
  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.input-label {
  margin-bottom: $space-xx-small;
  display: block;
}
</style>
