import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import storeOptions from './stores/store'
import routersOptions from './router/router'


Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter(routersOptions);

const store = new Vuex.Store(storeOptions);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
