<template>
  <div id="app">
    <header>
      <h1>Concept: Vue Form System</h1>
      <p>
        The goal is to provide standardized form and input components.<br />
        They should be easy to use, yet not limiting.
      </p>
      <p>
        This is <strong>not</strong> a plugin.<br />
        Use it as a starter framework for building your own form system.
      </p>
    </header>
    <h2>Form Data</h2>
    <p>Name: {{ formData.name }}</p>
    <p>Gender: {{ formData.gender }}</p>
    <p>Email: {{ formData.email }}</p>
    <p v-for="(address, index) in formData.addresses" :key="index">
      Addresses {{index}}: {{address}}
    </p>

    <h2>Minimal Example</h2>
    <base-form v-model="formData">
      <base-input model="name" />
      <base-input model="email" />
    </base-form>

    <h2>Complex Example</h2>
    <base-form v-model="formData">
      <h3>Basic Info</h3>
      <base-input model="name" label="Name" />
      <base-input model="email" label="Email" />
      <base-select model="gender" label="Gender" :options="['male','female']" />
      <h3>Address Book</h3>
      <list-input model="addresses" label="address" />
    </base-form>

    <h2>Dynamic Form Component</h2>
    <p>
      <button @click="showFormA">show formA</button>
      <button @click="showFormB">show formB</button>
      <button @click="setDataExternally">set data externally</button>
    </p>
    <base-form v-model="formData">
      <component :is="formComponent" />
    </base-form>
  </div>
</template>

<script>
import FormA from './components/FormA';
import FormB from './components/FormB';

export default {
  name: 'App',
  components: {
    FormA,
    FormB,
  },
  data() {
    return {
      formData: {
        name: 'peter',
        gender: 'male',
        email: 'peter@maffay.com',
        addresses: [
          'Peterstr. 2, 90502 City',
          'Maffayplatz 11, 8888 City',
          'Maxpowerstr. 33, 23459 City',
        ],
      },
      formComponent: FormA,
    };
  },
  methods: {
    showFormA() {
      this.formComponent = FormA;
    },
    showFormB() {
      this.formComponent = FormB;
    },
    setDataExternally() {
      this.formData = {
        name: 'john',
        gender: 'male',
        email: 'john@lennon.com',
        addresses: ['Johnstr. 2, 90502 City', 'Lennonplatz 85, 8888 City'],
      };
    },
  },
};
</script>

<style lang="scss">
body {
  background: $color-light;
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-dark;
  padding-bottom: 60px;
}

header {
  background: $color-dark;
  color: $color-light;
  padding: 40px 20px;
  margin-bottom: 40px;

  h1 {
    color: $color-primary;
    margin-top: 0;
  }
}
</style>
