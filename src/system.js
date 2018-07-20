// Defines contexts to require
const context = require.context('./components/base/', true, /\.vue$/);

const components = [];
context.keys().forEach(key => components.push(context(key).default));

export default {
  install(Vue) {
    components.forEach(c => Vue.component(c.name, c));
  },
};
