import Vue from 'vue'
import App from './App.vue'

// 饿了吗UI的导入 注册 已经使用CDN抽取
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入路由
import router from './lib/router'

Vue.config.productionTip = false

// 导入抽取的仓库
import store from './lib/store'

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上 把仓库
  router,
  // 挂载到顶级Vue实例上
  store
}).$mount('#app')
