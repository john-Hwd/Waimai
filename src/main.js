import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
Vue.component(Button.name,Button)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
