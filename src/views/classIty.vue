<template>
  <div class="mwz_classIty_container">
    <div class="top">
      <img src="../img/01.png" alt />
    </div>
    <div class="header">
      <input
        type="text"
        placeholder="搜索商品"
        v-model="inputValue"
        @input="empty()"
        @keydown.enter="toSearch()"
      />
    </div>
    <!-- 这个是历史记录 -->
    <div  v-show="showHistory">
      <div>
        <h3>历史记录</h3>
        <button @click="del">清空</button>
      </div>

      <div class="history">
        <div v-for="(item,index) in this.historyList" :key="index" class="history_mwz">{{item}}</div>
      </div>
    </div>
    <div class="mwz_content" v-show="showCart">
      <div class="middle">
        <div
          v-for="(item,index) in this.item"
          :key="index"
          class="mwz_item_title"
          @click="search(item._id)"
        >{{item.title}}</div>
      </div>
      <div class="mwz_bottom">
        <div>综合</div>
        <div>销量</div>
        <div>新品</div>
        <div :class="this.cut?'el-icon-bottom':'el-icon-top'" @click="cutSort">价格</div>
      </div>
      <!-- 这是我们购物车筛选出来的商品  -->
      <div class="mwz_classity_shop">
        <div v-for="(shop,index) in this.shopList" :key="index" class="mwz_shop">
          <!-- {{shop.title}} -->
          <div class="mwz_img">
            <img :src="shop.s_pic" alt />
          </div>
          <div class="mwz_shop_title">{{shop.title}}</div>
          <div class="mwz_haha">
            <div class="mwz_content_p">￥{{shop.price}}</div>
            <div class="shop_cart" @click="addCart(shop)">加入购物车</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      inputValue: "",
      cut: false,

      showHistory: false,
      historyList: ["女装", "男装", "婴幼儿", "运动", "女鞋", "笔记本"], //历史搜索

      showCart: true,
      item: [],
      list: [],
      shopList: []
    };
  },
  methods: {
    search(item) {
      var temp = [];
      window.console.log(item);
      this.list.forEach(e => {
        if (item == e.cid) {
          temp.push(e);
        }
        // window.console.log(e.class);
        this.shopList = temp;
        // window.console.log(this.shopList)
      });
    },
    cutSort() {
      // 在这里我们实现排序功能
      this.cut = !this.cut;
      window.console.log(this.cut);
      // this.$store.dispatch("cutSort", this.cut);
      // 当我们点击到的这个状态是true机试从低到高 反之从高到低
      if (this.cut == true) {
        this.shopList.sort(function(a, b) {
          return b.price - a.price;
        });
      } else {
        this.shopList.sort(function(a, b) {
          return a.price - b.price;
        });
      }
    },
    addCart(shop) {
      window.console.log(shop);
      this.$confirm("加入购物车成功", "加入购物车", {
        confirmButtonText: "查看购物车",
        cancelButtonText: "继续购物",
        type: "warning"
      }).then(() => {
        // this.$router.push({
        //   name:'shopCart',
        //   params:{
        //     data:shop
        //   }
        // });
      });
    },
    del() {
      this.historyList = [];
    },
    empty() {
      if (this.inputValue == "") {
        this.showHistory = false;
        this.showCart = true;
      } else {
        this.showHistory = true;
        this.showCart = false;
      }
    },
    toSearch() {
      var index = this.historyList.findIndex(e => e == this.inputValue);

      // window.console.log(this.inputValue)
      if (this.historyList.length <= 8) {
        if (index == -1) {
          this.historyList.unshift(this.inputValue);
        } else {
          this.historyList.splice(index, 1);

          this.historyList.unshift(this.inputValue);
        }
      } else {
        if (index == -1) {
          this.historyList.unshift(this.inputValue);
          this.historyList.pop();
        } else {
          this.historyList.splice(index, 1);
          this.historyList.unshift(this.inputValue);
        }
      }

      this.list.forEach(e => {
        var temp = [];
        if (e.class.includes(this.inputValue)) {
          temp.push(e);
        }
        this.shopList = temp;
      });
    }
  },
  mounted() {
    axios
      .get("http://localhost:8080/list.json")
      .then(res => {
        this.list = res.data.result;
        window.console.log(res.data.result);
      })
      .catch(err => {
        window.console.log(err);
      });
    axios
      .get("http://localhost:8080/fenlei.json")
      .then(res => {
        this.item = res.data.result;
        window.console.log(res.data.result);
      })
      .catch(err => {
        window.console.log(err);
      });
  }
};
</script>
<style scoped>
.history {
  width: 100%;
  height: 300px;
  /* background-color: aqua; */
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}
.mwz_classIty_container {
  width: 100%;
  height: 800px;
  /* background-color: pink; */
}
.top {
  width: 100%;
  height: 40px;
  /* background-color: antiquewhite;  */
}
.header {
  width: 100%;
  height: 40px;
  /* background-color: aqua; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.mwz_item_title {
  width: 20%;
  font-size: 10px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.mwz_item_title:hover {
  border-bottom: 1px solid gray;
}
.header input {
  width: 80%;
  height: 25px;
  border-radius: 15px;
  border: 0px;
  text-indent: 25px;
  border: 1px solid gray;
  border-radius: 20px;
}
.middle {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: gray;
}

.mwz_bottom {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.mwz_bottom > div {
  font-size: 10px;
}
.mwz_classity_shop {
  width: 100%;
  /* height: 600px; */
  /* background-color: blueviolet; */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  /* border: 1px solid gray; */
}
.mwz_haha {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.mwz_shop {
  width: 45%;
  height: 280px;
  border: 1px solid lightgray;
}
.mwz_img img {
  width: 100%;
  height: 200px;
}
.mwz_shop_title {
  font-size: 12px;
  color: gray;
}
.mwz_content_p {
  color: red;
}
.shop_cart {
  font-size: 12px;
  color: gray;
}
.history_mwz {
  width: 20%;
  height: 30px;
  border: 1px solid red;
  text-align: center;
}
</style>