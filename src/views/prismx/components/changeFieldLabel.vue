<template>
  <div>
    <el-dialog
      title="更改字段名称"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="field" label-width="100px" label-position="right">
        <el-form-item label="源名称：" >{{field.desc}}</el-form-item>
        <el-form-item label="自定义名称：" ><el-input size="mini" v-model="field.label" style="width: 200px;"></el-input></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import EventBus from '@/components/EventBus.js'

    export default {
      name: "change-field-label",
      components:{  },
      data(){
        return {
          dialogVisible: false,
          field: {}
        }
      },
      methods:{
        ...mapMutations(['setPivot']),
        /**
         *  包含 id, type...
         * @param obj
         */
        show(obj){
          this.field = Object.assign(obj)

          this.dialogVisible = true;
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

</style>
