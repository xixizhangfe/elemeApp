<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <!--router-link相当于是一个a标签，to指定链接-->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        
        <router-link to="/seller">商家</router-link>

      </div>
    </div>
    <!--路由出口，路由匹配到的组件在这里渲染，也就是当点击路由时对应的视图变化部分，我们这里点击上面的路由，变化的是页面内容部分，所以这里用router-view替换content-->
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header';
  import {urlParse} from 'common/js/urlParse.js';

  const ERR_OK = 0;

  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log('queryParam', queryParam);
            return queryParam.id;
          })()
        }
      };
    },
    components: {
      // 定义header为v-header，避免冲突
      'v-header': header
    },
    // 在生命周期钩子created时请求后台商家数据
    // 请求数据使用vue-resource插件
    created () {
      // GET /someUrl
      this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
        // get body data
        this.response = response.body;
        if (this.response.errno === ERR_OK) {
          this.seller = this.response.data;
          this.seller = Object.assign({}, this.seller, response.data);
          console.log('this.seller.id', this.seller.id);
        }
      }, response => {
        // error callback
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl"
  .tab 
    display: flex
    height: 40px
    width: 100%
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
