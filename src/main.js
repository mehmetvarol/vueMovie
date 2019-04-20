import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import storeOptions from './stores/store'
import routersOptions from './router/router'


Vue.use(Vuex);
Vue.use(VueRouter);

//Router
const router = new VueRouter(routersOptions); // router işlemleri -> router.js

// Storu ayağa kaldırma
const store = new Vuex.Store(storeOptions); // store işlemleri -> store.js
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
