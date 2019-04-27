// 导入Vue
import Vue from 'vue'
// 导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 仓库的逻辑
const store = new Vuex.Store({
  // 仓库数据
  state: {
    // 购物车数据 使用对象的方式来保存数据
    // 使用key 标记商品是否存在
    cartData: {}
  },
  // 方法
  mutations: {
    // 加入购物车的方法
    add2Cart(state, good) {
      // 判断对象中是否存在这个key
      if (state.cartData[good.title]) {
        // 存在
        state.cartData[good.title].buycount++
      } else {
        // Vue之所以能够跟踪数据的改变本质是 对属性设置了一个 get 和set 这步操作默认会自动执行
        // 如果 data中的数据本身没有这个字段，人为的添加上去之后 Vue默认是不会跟踪数据改变的
        // 如果属性是动态增加的 必须人为的调用一个方法Vue.set()
        // 不存在
        // state.cartData[good.title] = good
        // 参数1 要添加属性的对象
        // 参数2 要添加的属性
        // 参数3 添加的属性值
        Vue.set(state.cartData, good.title, good)
        // 额外的增加一个购买个数 用来记录购买数量
        // state.cartData[good.title].buycount = 1
        Vue.set(good, 'buycount', 1)
      }
      // 打印数据
      console.log(state.cartData)
    },
    // 增加这个方法
    delOne(state, key) {
      // delete state.cartData[key]
      // 为了让Vue能够检测到数据的改变 删除属性时 通过Vue.delete来实现
      Vue.delete(state.cartData, key)
      console.log(state.cartData)
    },
    // 清空数据
    clear(state) {
      state.cartData = {}
    }
  },
  // 计算属性
  getters: {
    // 算个总数
    totalCount(state) {
      console.log('触发啦')
      let totalCount = 0
      for (const key in state.cartData) {
        totalCount += state.cartData[key].buycount
      }
      // 返回
      return totalCount
    },
    // 把数据变为数组 并返回
    objtoArray(state) {
      // 空数组
      let temArr = []
      // 遍历
      for (const key in state.cartData) {
        temArr.push(state.cartData[key])
      }
      // 返回
      return temArr
    },
    // 总价
    totalPrice(state) {
      let totalPrice = 0
      let data = state.cartData
      // 遍历
      for (const key in data) {
        // 累加
        totalPrice += data[key].buycount * data[key].price
      }
      // 返回
      return totalPrice
    }
  }
})

// 暴露出去
export default store;