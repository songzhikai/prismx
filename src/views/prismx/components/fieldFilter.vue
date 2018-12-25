<template>
  <div>
    <el-dialog
      title="过滤"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div v-if="field.type == 'dim'">
        <el-select
          v-model="selectedDimList"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择" style="width: 350px;">
          <el-option
            v-for="item in dimList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div v-else-if="field.type == 'kpi'">
        <el-form label-width="90px">
          <el-form-item label="大于等于：">
            <el-input v-model="moreEqualThan"></el-input>
          </el-form-item>
          <el-form-item label="小于等于：">
            <el-input v-model="lessEqualThan"></el-input>
          </el-form-item>
        </el-form>
      </div>
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
      name: "field-filter",
      components:{  },
      data(){
        return {
          dialogVisible: false,
          field: {},
          dimList: [{
            value: 'HTML',
            label: 'HTML'
          }, {
            value: 'CSS',
            label: 'CSS'
          }, {
            value: 'JavaScript',
            label: 'JavaScript'
          }],
          selectedDimList: [],
          moreEqualThan: '', //指标过滤 大于等于
          lessEqualThan: '', //指标过滤 小于等于
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
          // this.field.type = 'kpi'
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
