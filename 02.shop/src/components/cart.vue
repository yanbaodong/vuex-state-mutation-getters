<template>
  <div class="cart-container">
    <el-table :data="$store.getters.objtoArray" style="width: 100%">
      <el-table-column prop="title" label="名字" width="180"></el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="prop">
          <img class="icon" :src="prop.row.path" alt>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="180">
        <template slot-scope="prop">
          <el-input-number :min="1" v-model="prop.row.buycount" label="描述文字"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价" width="180"></el-table-column>
      <el-table-column label="总价" width="180">
        <template slot-scope="prop">{{prop.row.buycount * prop.row.price}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="prop">
          <el-button @click="delOne(prop.$index,prop.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 总价 -->
    <p>总价:{{$store.getters.totalPrice}}</p>
    <!-- 结算 -->
    <el-button @click="clear" type="success">结算</el-button>
  </div>
</template>
<script>
// 进入购物车页面 获取Vuex的数据 渲染到页面上
export default {
  methods: {
    delOne(index, good) {
      // console.log(index);
      // console.log(good);
      //  this.$store.getters.objtoArray.splice(index,1)

      // 修改仓库的数据
      this.$store.commit("delOne", good.title);
    },
    clear() {
      // 清空数据
      this.$store.commit("clear");
    }
  }
};
</script>
<style >
.icon {
  width: 150px;
  height: 150px;
}
</style>