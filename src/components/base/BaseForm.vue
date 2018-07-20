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
import deepCopy from "deepcopy";
import dotProp from "dot-prop";
export default {
  name: "form-wrapper",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newData: null,
      subscriber: []
    };
  },
  watch: {
    value: {
      handler(value) {
        this.subscriber.forEach(cb => {
          cb(deepCopy(value));
        });
      },
      deep: true
    }
  },
  methods: {
    submit() {
      // do some validation
      this.$emit("input", this.newData);
      // submit changed data
      console.log("submit data", this.newData);
    },
    subscribe(cb) {
      cb(deepCopy(this.value));
      this.subscriber.push(cb);
    },
    update(model, value) {
      dotProp.set(this.newData, model, value);
      console.log(this.newData);
    }
  },
  created() {
    // Subscribe to itself
    this.subscribe(data => {
      this.newData = data;
    });
  },
  provide() {
    return {
      subscribe: this.subscribe,
      update: this.update
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/common";

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
