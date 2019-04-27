<template>
  <div class="index-container">
    <ul>
      <li v-for="item in shopList" @click.prevent="add2Cart(item)">
        <a href="#">
          <img :src="item.path" alt>
          <p>商品名:{{item.title}}</p>
          <p>¥:{{item.price}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shopList: [
        {
          path:
            "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2221693651,1937536258&fm=58&bpow=2260&bpoh=1620",
          title: "大红袍",
          price: 1999
        },
        {
          path:
            "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1068452703,1866128940&fm=58&bpow=500&bpoh=500",
          title: "铁观音",
          price: 2999
        },
        {
          path:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3211981499,2601987179&fm=58&bpow=750&bpoh=563",
          title: "金骏眉",
          price: 4999
        },
        {
          path:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1821861833,1845861217&fm=85&app=57&f=JPEG?w=121&h=75&s=25AB63B31C23CEC4441CF47603005063",
          title: "卖茶的",
          price: 10000
        }
      ]
    };
  },
  // 方法
  methods: {
    add2Cart(item) {
      // 修改Vuex中的数据
      this.$store.commit("add2Cart", item);
    }
  }
};
</script>
<style >
.index-container {
}
.index-container ul {
  display: flex;
}
.index-container ul li {
  width: 200px;
  height: 250px;
  border: 1px solid #000;
  margin: 10px;
}
.index-container ul li a {
  display: block;
}
.index-container ul li a p {
  background-color: #0094ff;
  color: white;
  padding-left: 20px;
}

.index-container ul li img {
  width: 180px;
  height: 180px;
  display: block;
  margin: 10px auto 0;
}
</style>