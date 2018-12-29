<template>
  <div id="app">
    <el-container class="full-pre" v-if="isFramework">
      <!--<el-aside style="width:240px;height:710px;border-right: 1px solid;">-->
        <!--<LeftMenu></LeftMenu>-->
      <!--</el-aside>-->
      <el-container>
        <el-header height="49px">
          <Header></Header>
        </el-header>
        <el-main style="">
         <ContentTab></ContentTab>
        </el-main>
      </el-container>
    </el-container>
    <el-container class="full-pre" v-if="!isFramework">
      <ContentSingle></ContentSingle>
    </el-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  import '../../../theme/index.css' // 定制elment-ui主题

  import Header from './Header'
  import LeftMenu from './LeftMenu'
  import ContentTab from './ContentTab'
  import ContentSingle from './ContentSingle'
  import EventBus from '@/components/EventBus'


  Vue.use(ElementUI)

  export default {
    name: 'App',
    data() {
      return {
        isFramework: window.location.href.indexOf("isframe=0")!=-1?false:!process.env.isInPortal,
        isChangeWidth:false,
      }
    },
    components:{Header,LeftMenu,ContentTab,ContentSingle},
    beforeCreate:function(){
    },
    methods: {
      dispatch(){
        let url=window.location.href;
        if(url.indexOf("isframe=0")!=-1){
          this.isFramework=false;
        }else{
          this.isFramework=!process.env.isInPortal;
        }
      }
    },
    beforeDestroy(){
      // 销毁OpenMenuEvent事件
      EventBus.$off('OpenMenuEvent');
    },
    mounted:function(){
      let _this = this;
      this.dispatch();
      EventBus.$on('OpenMenuEvent', function(width){
        if(width == '50px'){
          _this.isChangeWidth = true
        }else if(width == '240px'){
          _this.isChangeWidth = false
        }
      });

    }
  }
</script>


