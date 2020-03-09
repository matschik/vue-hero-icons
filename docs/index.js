import Vue from 'vue'
//import 'vue-popperjs/dist/vue-popper.css';
//import "v-tippy/dist/tippy.css"
//import "prismjs/themes/prism.css"
import './main.css'
import App from './App.vue'

// Vue.use(Tippy, {
//   position: 'right',
//   theme: 'light',
//   size: 'small',
//   animation: 'perspective',
//   performance: true,
//   arrow: true,
//   trigger: 'click'
// })

new Vue({
  el: '#app',
  render: h => h(App)
})
