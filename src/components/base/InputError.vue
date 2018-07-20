<template>
  <transition name="input-error">
    <div
      class="input-error"
      v-show="!!error">
      {{ error }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'InputError',
  props: {
    error: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.input-error {
  color: $color-danger;
  padding: $space-x-small;
}

.input-error-enter-active, {
  transition: all $transition-long;
}

.input-error-enter, .input-error-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}
</style>
