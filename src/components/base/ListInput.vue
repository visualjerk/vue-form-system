<template>
  <div>
    <div
      class="list-input-item"
      v-for="(item, index) in value"
      :key="index">
      <div class="input">
        <base-input
          :model="`${model}.${index}`" />
      </div>
      <div class="actions">
        <button
          @click="remove(index)"
          type="button">&ndash;</button>
      </div>
    </div>
    <button
      class="add"
      @click="add"
      type="button">+ add {{ label }}</button>
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

<style lang="scss" scoped>
.list-input-item {
  display: flex;
  justify-content: center;
}

.input {
  flex: 1 1 0;
}

.actions {
  height: $input-height;
  display: flex;
  align-items: center;
  button {
    margin-left: $space-x-small;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-danger;
    color: $color-light;
    border: 0;
    box-shadow: none;
    outline: none;
    transition: $transition-short;
    cursor: pointer;

    &:hover {
      background: lighten($color-danger, 10%);
    }
  }
}

.add {
  background: $color-light;
  color: $color-primary;
  border: 0;
  box-shadow: none;
  outline: none;
  transition: $transition-short;
  cursor: pointer;
  padding: $space-x-small $space-base;
  margin-bottom: $space-base;
  &:hover {
    background: darken($color-light, 10%);
  }
}
</style>
