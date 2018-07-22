<template>
  <div class="input-item" :class="inputField.stateClasses">
    <input-label :label="inputField.label" />
    <slot></slot>
    <input-error :error="inputField.error" />
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  inject: ['inputField'],
};
</script>

<style lang="scss" scoped>
.input-item {
  padding-bottom: $space-base;
  position: relative;
}
</style>
