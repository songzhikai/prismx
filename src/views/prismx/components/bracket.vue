<template>
  <div>
    <el-dialog
      title="分档"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <div class="parent-div" style="height: 150px;">
        <div id="bracket-slider" @click="addSpan" class="bracket-slider" style="position: absolute;left: 50px;top: 100px;z-index: 1;">
          <span style="position:relative;top:50px;float:left;">最小值：0</span>
          <span style="position:relative;top:50px;float: right;">最大值：800</span>
        </div>

        <div :id="item.id" v-for="(item, index) in pointList" :key="index" :style="'z-index: 2;position: absolute;top: 110px;left:'+(item.left+50)+'px'">
          <!--<el-tooltip class="item" effect="dark" :content="item.left+''" placement="top">-->
          <span @dblclick="delSpan(index)" class="point-class"></span>
          <!--</el-tooltip>-->
        </div>

        <div class="left-val-show" v-for="(item, index) in pointList" :key="item.id" :style="'z-index: 2;position: absolute;left:'+(item.left+50)+'px'">
          {{item.left}}
        </div>

      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
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
        dialogVisible: false,
        field: {},
        pointList:[],
        absoluteY: '110'
      }
    },
    methods: {
      show(){
        this
        this.dialogVisible = true;
      },
      addSpan(e){
        let uuid = Util.uuid()
        let _this = this
        this.pointList.push({id: uuid, left: e.offsetX});
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
                    list[akey].left = e.offsetLeft-50;
                    break;
                  }
                }
              },
              limit: {
                x: [50, 850],
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      confirm(){
        if(this.label == ''){
          this.$message({
            message: '请输入字段名称',
            type: 'warning'
          });
        }else{
          let list = this.$store.state.prismx.pivot[this.field.region]
          for(let [i, v] of list.entries()){
            if(v.id == this.field.id){
              v.label = this.field.label
              break;
            }
          }
          this.setPivot(this.$store.state.prismx.pivot);
          this.dialogVisible = false;
          EventBus.$emit('pivotChanged')
        }
      }
    },
    mounted(){
    }
  }
</script>

<style scoped>
  /*.parent-div{*/
    /*margin:0px;*/
    /*padding:0px;*/
  /*}*/
  .bracket-slider{
    margin:0px;
    padding:0px;
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
    top: 90px;
  }
  .left-val-show:nth-child(even){
    top: 133px;
  }
</style>
