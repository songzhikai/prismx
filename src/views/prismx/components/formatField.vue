<template>
  <div>
    <el-dialog
      title="数字格式化"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      分类：
      <el-tabs v-model="activeTabName" @tab-click="tabClick">
        <el-tab-pane label="常规" name="0">
          <div>常规单元格格式不包含任何特定的数字格式</div>
          <div style="margin-top: 10px;font-weight: bold;">
            单位：
            <el-select v-model="format.unit" placeholder="请选择">
              <el-option
                v-for="(item, index) in units"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

        </el-tab-pane>
        <el-tab-pane label="数值" name="1">
          <div>
            小数数位：<el-input-number v-model="format.point" controls-position="right" :min="1" :max="10"></el-input-number>
          </div>
          <div style="margin-top: 5px;">数值格式用于一般数字的表示</div>
          <div style="margin-top: 10px;font-weight: bold;">
            单位：
            <el-select v-model="format.unit" placeholder="请选择">
              <el-option
                v-for="(item, index) in units"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-tab-pane>
        <el-tab-pane label="百分比" name="2">
          <div>
            小数数位：<el-input-number v-model="format.point" controls-position="right" :min="1" :max="10"></el-input-number>
          </div>
          <div style="margin-top: 5px;">百分比格式将单元格中数值乘以100，并以百分数形式显示</div>
          <div style="margin-top: 10px;font-weight: bold;">
            单位：
            <el-select v-model="format.unit" placeholder="请选择">
              <el-option
                v-for="(item, index) in units"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "format-field",
      components: {},
      data(){
        return {
          field: {},
          dialogVisible: false,
          activeTabName: '0', //数字格式化tab
          units: [
            { value: 'percent', label: '%' },
            { value: 'y', label: '元' },
            { value: 'wy', label: '万元' },
            { value: 'b', label: 'B' },
            { value: 'kb', label: 'KB' },
            { value: 'm', label: 'M' },
            { value: 'g', label: 'G' }
          ],
          format:{
            type: '', // 0 常规 / 1 数值 / 2 百分比
            unit: '',
            point: '',
          }
        }
      },
      methods: {
        show(obj){
          this.dialogVisible = true;
        },
        confirm(){
          this.dialogVisible = false;
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        tabClick(obj){
          this.activeTabName = obj.name
        }
      },
      mounted(){

      }
    }
</script>

<style scoped>

</style>
