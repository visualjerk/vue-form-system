<template>
  <form @submit.prevent="submit">
    <slot></slot>
    <slot name="footer">
      <button>submit</button>
    </slot>
  </form>
</template>

<script>
// ToDo: provide validation
import cloneDeep from 'clone-deep';
import dotProp from 'dot-prop';

export default {
  name: 'form-wrapper',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newData: null,
      subscriber: [],
    };
  },
  watch: {
    value: {
      handler(value) {
        this.subscriber.forEach((cb) => {
          cb(cloneDeep(value));
        });
      },
      deep: true,
    },
  },
  methods: {
    submit() {
      // do some validation
      this.$emit('input', this.newData);
      // submit changed data
      // eslint-disable-next-line
      console.log('submit data', this.newData);
    },
    subscribe(cb) {
      cb(cloneDeep(this.value));
      this.subscriber.push(cb);
    },
    update(model, value) {
      dotProp.set(this.newData, model, value);
    },
  },
  created() {
    // Subscribe to itself
    this.subscribe((data) => {
      this.newData = data;
    });
  },
  provide() {
    return {
      subscribe: this.subscribe,
      update: this.update,
    };
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #eaeeef;
  background: #fff;
  margin: 0 auto;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 30px;
  font-size: 16px;
  background-color: $color-primary;
  color: $color-light;
}
</style>
