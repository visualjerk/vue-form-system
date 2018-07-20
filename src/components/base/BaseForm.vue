<template>
  <form
    @submit.prevent="submit"
    novalidate="true">
    <slot/>
    <slot name="footer">
      <button>submit</button>
    </slot>
  </form>
</template>

<script>
import { Validator } from 'vee-validate';
import cloneDeep from 'clone-deep';
import dotProp from 'dot-prop';

export default {
  name: 'BaseForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
    validation: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      newData: null,
      subscriber: [],
      errors: null,
    };
  },
  watch: {
    value: {
      handler(value) {
        this.notify(value, this.errors);
      },
      deep: true,
    },
  },
  methods: {
    async submit() {
      const validation = await this.validator.validateAll(this.newData);
      if (!validation) {
        this.notify(this.newData, this.errors);
        return;
      }
      this.$emit('input', this.newData);
      // submit changed data
      // eslint-disable-next-line
      console.log('submit data', this.newData);
    },
    subscribe(cb) {
      if (cb && typeof cb === 'function') {
        cb(cloneDeep(this.value));
        this.subscriber.push(cb);
      }
    },
    notify(data, errors) {
      this.subscriber.forEach((cb) => {
        cb(cloneDeep(data), errors);
      });
    },
    async update(model, value) {
      dotProp.set(this.newData, model, value);
      // await this.validator.validate(model, value);
      // this.notifyErrors();
    },
  },
  created() {
    // Todo: handle v-for validation
    // Todo: make validations reactive
    this.validator = new Validator(this.validation);
    this.$set(this, 'errors', this.validator.errors);
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
