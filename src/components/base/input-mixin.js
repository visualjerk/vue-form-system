// ToDo: provide validation
import dotProp from "dot-prop";
export default {
  inject: ["subscribe", "update"],
  props: {
    model: {
      type: String,
      required: true
    },
    label: {
      type: String
    }
  },
  data() {
    return {
      value: null
    };
  },
  methods: {
    input(event) {
      this.update(this.model, event.target.value);
    }
  },
  created() {
    this.subscribe(data => {
      this.value = dotProp.get(data, this.model);
    });
  }
};
