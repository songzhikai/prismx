<template>
  <div class="parent-div">
    <div id="bracket-slider" @click="addSpan" class="bracket-slider" style="position: absolute;left: 300px;top: 200px;z-index: 1;">
      <span style="position:relative;top:50px;float:left;">最小值：300</span>
      <span style="position:relative;top:50px;float: right;">最大值：1100</span>
    </div>

    <div :id="item.id" v-for="(item, index) in pointList" :key="index" :style="'z-index: 2;position: absolute;top: 213px;left:'+item.left+'px'">
      <!--<el-tooltip class="item" effect="dark" :content="item.left+''" placement="top">-->
       <span @dblclick="delSpan(index)" class="point-class"></span>
      <!--</el-tooltip>-->
    </div>

    <div class="left-val-show" v-for="(item, index) in pointList" :key="item.id" :style="'z-index: 2;position: absolute;left:'+(item.left-6)+'px'">
      {{item.left}}
    </div>

  </div>
</template>

<script>
  import Util from '@/utils/Utils.js'
  import Draggable from 'draggable'
    export default {
      name: "bracket",
      components: { Draggable },
      data(){
        return {
          pointList:[],
          absoluteY: '213'
        }
      },
      methods: {
        addSpan(e){
          let uuid = Util.uuid()
          let _this = this
          this.pointList.push({id: uuid, left: e.clientX});
          // this.pointList = Object.assign(this.pointList.sort())
          //绑定拖拽
          this.$nextTick(function(){
            let pointList = _this.pointList;
            for(let index in pointList){
              let element = document.getElementById(pointList[index].id);
              let options = {
                onDrag: function(e){
                },
                onDragStart(){
                },
                onDragEnd(e){
                  let list = _this.pointList;
                  for(let akey in list){
                    if(list[akey].id == e.id){
                      list[akey].left = e.offsetLeft;
                      break;
                    }
                  }
                },
                limit: {
                  x: [300, 1100],
                  y: _this.absoluteY
                },
                setPosition: true,
                setCursor: true

              };
              new Draggable (element, options);
            }
          });


        },
        delSpan(index){
          this.pointList.splice(index, 1)
        },

      },
      mounted(){
      }
    }
</script>

<style scoped>
  .bracket-slider{
    border-bottom: 1px solid;
    border-width: 5px;
    font-weight: bold;
    width: 800px;
  }
  .point-class{
    border-style: solid;
    border-width: 3px;
  }
  .left-val-show:nth-child(odd){
    top: 193px;
  }
  .left-val-show:nth-child(even){
    top: 233px;
  }
</style>
