import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Router from './router'
import BaiduMap from 'vue-baidu-map'
import vuescroll from 'vuescroll';
Vue.use(vuescroll);
Vue.use(BaiduMap, {
  ak: 'AspB1GVzlPA53GfOtyh7ta22nIaN3FzZ'
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
   router:Router
}).$mount('#app')

