<template>
  <div>
    <p
      v-for="(item, index) in value"
      :key="index">
      <base-input :model="`${model}.${index}`" />
      <button
        @click="remove(index)"
        type="button">x</button>
    </p>
    <button
      @click="add"
      type="button">add {{ label }}</button>
  </div>
</template>

<script>
import inputMixin from './input-mixin';

export default {
  name: 'ListInput',
  mixins: [inputMixin],
  methods: {
    remove(index) {
      this.value.splice(index, 1);
      this.update(this.model, this.value);
    },
    add() {
      this.value.push('');
      this.update(this.model, this.value);
    },
  },
};
</script>

<style scoped>
p {
  display: flex;
  justify-content: center;
}
</style>
