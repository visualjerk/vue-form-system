// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import BaseForm from './components/base/BaseForm';
import BaseInput from './components/base/BaseInput';
import BaseSelect from './components/base/BaseSelect';
import ListInput from './components/base/ListInput';

Vue.config.productionTip = false;

Vue.component('BaseForm', BaseForm);
Vue.component('BaseInput', BaseInput);
Vue.component('BaseSelect', BaseSelect);
Vue.component('ListInput', ListInput);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
