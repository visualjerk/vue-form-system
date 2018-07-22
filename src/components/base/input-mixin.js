import dotProp from 'dot-prop';

export default {
  inject: ['subscribe', 'update'],
  provide() {
    return {
      inputField: this,
    };
  },
  props: {
    model: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: null,
      error: null,
    };
  },
  computed: {
    stateClasses() {
      return {
        'is-disabled': this.disabled,
        'has-error': !!this.error,
      };
    },
  },
  methods: {
    input(event) {
      this.update(this.model, event.target.value);
    },
  },
  created() {
    this.subscribe((data, errors) => {
      this.value = dotProp.get(data, this.model);
      this.error = errors ? errors[this.model] : null;
    });
  },
};
