### vuex的详解

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

这个状态自管理应用包含以下几个部分：

- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。



使用顺序

+ 新建一个vuex 文件夹里面新建一个store.js

在 store.js 里

```js
// 导入Vue
import Vue from 'vue'
// 导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 仓库的逻辑
const store = new Vuex.Store({
  // 仓库数据
  state: {
    cartData: {}
  },
  // 方法  函数
  mutations: {
   }
  // 计算属性  类似计算属性
  getters: {
  
  },
  //可执行的异步操作在 actions 里
   actions: {   
    }
  
})

// 暴露出去
export default store;
```

+ 将vuex 挂载在全局vue实例上

+ 在mian.js 里进行导入挂载

  ```js
  // 导入抽取的仓库
  import store from './lib/store.js'   //store.js的路径
  
  new Vue({
    render: h => h(App),
    // 挂载到Vue实例上 把仓库
    router,
    // 挂载到顶级Vue实例上
    store
  }).$mount('#app')
  ```



+ 那么接下来开始细节讲解

  state:{

  }

  ```javascript
   /*
      1.用的时候先实例化
      2.数据通过state来定义
      3.设置到顶级Vue实例上
      4.所有组件都可以通过$store访问到这个共享的仓库
      5.通过$store.state.属性名可以获取数据
    */
     <div id="app">
        <h2>我是顶级的Vue实例{{ $store.state.info }}</h2>
        <com1></com1>
        <com2></com2>
      </div>
      
      const store = new Vuex.Store({
      // 仓库 数据定义在这个对象的内部
      // Vue实例的data属性
      state: {
        info: '感觉自己萌萌哒',
        num: 10
      }
    })
  
    // 新建2个组件
    Vue.component('com1', {
      template: `<div class='com1'>
          <input type="button" value="点我">
          {{$store.state.info}}
        </div>`
    })
    Vue.component('com2', {
      template: `<div class='com2'>
          <input type="button" value="点我">
          {{$store.state.info}}
        </div>`
    })
  
    let app = new Vue({
      el: '#app',
      // 设置到顶级Vue实例上（挂载 ）
      store
    })
  ```

+ mutations  提供一系类修改数据的 方法

  ```js
  // 提供的数据修改方法
   <div id="app">
        <h2>我是顶级的Vue实例{{ $store.state.info }}--{{ $store.state.num }}</h2>
        <com1></com1>
        <com2></com2>
      </div>
  const store = new Vuex.Store({
      // 仓库 数据定义在这个对象的内部
      // Vue实例的data属性
      state: {
        info: '感觉自己萌萌哒',
        num: 10
      },
      // 提供的数据修改方法
      mutations: {
        // 参数1 固定是state就是 仓库内部的 state
        addNum(state) {
          console.log(state)
          // 在这里直接修改数据
          state.num++
        },
        // 接收参数
        addNumPlus(state, num) {
          console.log(num)
          // 累加传过来的值
          state.num += num
        },
        // 除了state之外只能接收一个参数 多余部分会变成undefined
        // 如果传递多个参数呢？
        addNumPro(state, num1, num2, num3, num4) {
          console.log(num1, num2, num3, num4)
          // 累加传过来的值
          // state.num += num
        }
      }
    })
    // 新建2个组件
    Vue.component('com1', {
      template: `<div class='com1'>
          <input type="button" value="点我" @click='addNum'>
        </div>`,
      methods: {
        addNum() {
          // 调用仓库的方法
          // this.$store.commit('addNum')
          // this.$store.commit('addNumPlus', 10)
          this.$store.commit('addNumPro', 1, 2, 3, 4)
        }
      }
    })
    Vue.component('com2', {
      template: `<div class='com2'>
          <input type="button" value="点我" @click='addNum2'>
        </div>`,
      methods: {
        addNum2() {
          // 调用仓库方法
          this.$store.commit('addNum')
        }
      }
    })
  
    let app = new Vue({
      el: '#app',
      // 设置到顶级Vue实例上（挂载 ）
      store
    })
  ```

不是一个页面下.我们应该这样写

+ 在store.js 我们定义了一个方法

  ```js
  // 方法
  const store = new Vuex.Store({
    // 仓库数据
    state: {
      // 购物车数据 使用对象的方式来保存数据
      // 使用key 标记商品是否存在
      cartData: {}
    },
    mutations: {
      // 加入购物车的方法
      add2Cart(state, good) {            这个good 是传过来的参数
        // 判断对象中是否存在这个key
        if (state.cartData[good.title]) {     这个其实跟下面联系起来就是商品的名字是否存在
          // 存在                              新增的是不存在的
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
      }
      }
  ```

  在需要使用的页面   在定义的方法里面调用 this.store.commit('方法名',传参)

  ```js
   <ul>
        <li v-for="item in shopList" @click.prevent="add2Cart(item)">
          <a href="#">
            <img :src="item.path" alt>
            <p>商品名:{{item.title}}</p>
            <p>¥:{{item.price}}</p>
          </a>
        </li>
      </ul>
       // 方法
    methods: {
      add2Cart(item) {
        // 修改Vuex中的数据
        this.$store.commit("add2Cart", item);
      }
    }
  ```

+ 计算属性getters 在store.js里     取值就是$store.getters.属性名

  ```js
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
        return totalCount            //首先是获得总数量
      },
      // 把数据变为数组 并返回
      objtoArray(state) {      就是把每一个品名放在一个对象里,然后用数组把对象包起来
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
  ```

  目标页面取值   <p>总价:{{$store.getters.totalPrice}}</p>

+ Action 类似于 mutation，不同在于：
  - Action 提交的是 mutation，而不是直接变更状态。
  - Action 可以包含任意异步操作。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。

我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：

actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

