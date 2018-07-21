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
import Schema from 'async-validator';
import cloneDeep from 'clone-deep';
import dotProp from 'dot-prop';

export default {
  name: 'BaseForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
    schema: {
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
    submit() {
      this.validate(() => {
        this.$emit('input', this.newData);
        // submit changed data
        // eslint-disable-next-line
        console.log('submit data', this.newData);
      });
    },
    validate(cb) {
      const validator = new Schema(this.schema);
      validator.validate(this.newData, (errors) => {
        if (errors) {
          this.errors = errors.reduce((errorObj, error) => {
            const result = { ...errorObj };
            result[error.field] = error.message;
            return result;
          }, {});
        } else {
          this.errors = null;
        }
        this.notify(this.newData, this.errors);
        if (!errors && cb && typeof cb === 'function') {
          cb();
        }
      });
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
      this.validate();
    },
  },
  created() {
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
