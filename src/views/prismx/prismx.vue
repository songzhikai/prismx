<template>
  <div>
    <el-button @click="saveReport" style="float:right;margin-right: 5px;">保存</el-button>
    <el-container style="clear:both;">
      <el-aside style="border:1px solid;height: 545px;width: 680px;">

      </el-aside>
      <el-aside style="border:1px solid;height: 545px;width: 210px;">
        <div class="alternative">
          <Draggable :list="altercolumnList" :options="{group:{ name:'pivotModules',  pull:'clone', put:false },sort:false}" @start="startDrag">
              <li v-for="(item, index) in altercolumnList" :key="item.id" style="margin:5px;padding:0px;" :id="item.id" :type="item.type" :column="item.column" region="altercolumn" :label="item.label" :desc="item.desc">{{item.label}}
              </li>
          </Draggable>
        </div>
      </el-aside>
      <el-main style="border:1px solid;height: 545px;">
        <div>
          <span style="margin-left: 250px;">
            <el-tooltip  class="item" effect="dark" content="行列互换" placement="top">
             <i class="el-icon-sort" @click="swapRowColumn"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="rows" style="border: 1px solid;height: 30%;overflow-y:auto;">
          <Draggable :list="rowsList" :options="{group:{ name:'pivotModules'}}" @start="startDrag" @add="add" @end="drop" style="height: 95%">
              <li v-for="(item, index) in rowsList" :key="item.id" style="margin:5px;padding:0px;" :id="item.id" :type="item.type" region="rows" :column="item.column" :label="item.label" :desc="item.desc">
                {{item.label}}
                <el-dropdown @command="clickFieldAttrMenu" trigger="click" placement="bottom-end" style="float: right;margin-right: 10px;">
                  <i class="el-icon-caret-bottom" @click="fieldSetClick"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="name">名称设置</el-dropdown-item>
                    <el-dropdown-item command="fmt">数字格式化</el-dropdown-item>
                    <el-dropdown-item command="filter">过滤</el-dropdown-item>
                    <el-dropdown-item command="bracket">分档</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
          </Draggable>
        </div>
        <div class="columns"  style="border: 1px solid;height: 30%;overflow-y:auto;">
          <Draggable :list="columnsList" :options="{group:{ name:'pivotModules'}}" @start="startDrag" @add="add" @end="drop" style="height:95%;">
            <li v-for="(item, index) in columnsList" :key="item.id" style="margin:5px;padding:0px;" :id="item.id" :type="item.type" region="columns" :column="item.column" :label="item.label" :desc="item.desc">
              {{item.label}}
              <el-dropdown @command="clickFieldAttrMenu" trigger="click" placement="bottom-end" style="float: right;margin-right: 10px;">
                <i class="el-icon-caret-bottom" @click="fieldSetClick"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="name">名称</el-dropdown-item>
                  <el-dropdown-item command="fmt">数字格式化</el-dropdown-item>
                  <el-dropdown-item command="filter">过滤</el-dropdown-item>
                  <el-dropdown-item command="bracket">分档</el-dropdown-item>
                  <el-dropdown-item command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </Draggable>
        </div>
        <div class="values"  style="border: 1px solid;height: 30%;overflow-y:auto;">
          <Draggable :list="valuesList" :options="{group:{ name:'pivotModules'}}" @start="startDrag" @add="add" @end="drop" style="height:95%;">
            <li v-for="(item, index) in valuesList" :key="item.id" style="margin:5px;padding:0px;" :id="item.id" :type="item.type" region="values" :column="item.column" :label="item.label" :desc="item.desc">
              {{item.label}}
              <el-dropdown @command="clickFieldAttrMenu" trigger="click" placement="bottom-end" style="float: right;margin-right: 10px;">
                <i class="el-icon-caret-bottom" @click="fieldSetClick"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="name">名称</el-dropdown-item>
                  <el-dropdown-item command="fmt">数字格式化</el-dropdown-item>
                  <el-dropdown-item command="filter">过滤</el-dropdown-item>
                  <el-dropdown-item command="bracket">分档</el-dropdown-item>
                  <el-dropdown-item command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </Draggable>
        </div>
      </el-main>
    </el-container>
    <ChangeFieldLabel ref="fieldLabelRef"></ChangeFieldLabel>
    <SaveReportDialog ref="saveReportDialogRef"></SaveReportDialog>
    <FormatField ref="formatFieldRef"></FormatField>
    <FieldFilter ref="fieldFilterRef"></FieldFilter>
    <Bracket ref="bracketRef"></Bracket>

  </div>
</template>

<script>
  import Draggable from "vuedraggable";
  import ChangeFieldLabel from "@/views/prismx/components/changeFieldLabel";
  import SaveReportDialog from "@/views/prismx/components/saveReportDialog";
  import FormatField from "@/views/prismx/components/formatField";
  import FieldFilter from "@/views/prismx/components/fieldFilter";
  import Bracket from "@/views/prismx/components/bracket";
  import EventBus from '@/components/EventBus.js'
  import {mapMutations} from 'vuex'
    export default {
      components: { Draggable, ChangeFieldLabel, SaveReportDialog, FormatField, FieldFilter, Bracket},
      data(){
        return {
          altercolumnList:[
            {id: '1', column: '1', label: '维度1', type: 'dim', desc: '维度1'},
            {id: '2', column: '2', label: '维度2', type: 'dim', desc: '维度2'},
            {id: '3', column: '3', label: '维度3', type: 'dim', desc: '维度3'},
            {id: '4', column: '4', label: '维度4', type: 'dim', desc: '维度4'},
            {id: '5', column: '5', label: '维度5', type: 'dim', desc: '维度5'},
          ],
          rowsList:[],
          columnsList:[],
          valuesList:[],
          field: {id: '', type: '', label: '', desc: '', region: '', }, //当前点击下三角的字段

        }
      },
      methods:{
        ...mapMutations(['setPivot']),
        /**
         * 保存报表
         **/
        saveReport(){
          this.$refs.saveReportDialogRef.show();
        },
        startDrag(){
        },
        drop(){
        },
        add(index, element){
          let pivot = Object.assign({}, {rows: this.rowsList}, {columns: this.columnsList}, {values: this.valuesList} )
          this.setPivot(JSON.parse(JSON.stringify(pivot)))
        },
        /**
         * 点击下三角
         * @param event
         */
        fieldSetClick(event){
          //保存当前点击的下三角字段属性
          let id = event.target.parentElement.parentElement.attributes.id.value
          let region = event.target.parentElement.parentElement.attributes.region.value
          let type = event.target.parentElement.parentElement.attributes.type.value
          let label = event.target.parentElement.parentElement.attributes.label.value
          let desc = event.target.parentElement.parentElement.attributes.desc.value
          this.field = Object.assign({id, region, type, label, desc})
        },
        /**
         * 点击字段属性菜单
         * @param type
         */
        clickFieldAttrMenu(type){
          if(type == 'delete'){
            this.deleteField();
          }else if(type == 'name'){
            this.changeLabel()
          }else if(type == 'fmt'){
            this.formatField();
          }else if(type == 'filter'){
            this.fieldFilter()
          }else if(type == 'bracket'){
            this.bracket();
          }
        },
        /**
         * 字段删除
         */
        deleteField(){
          let _this = this
          this.$confirm('此操作将删除该字段, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //前台删除
            if(this.field.region == 'rows'){
              this.rowsList = Object.assign(this.rowsList.filter(item => item.id != this.field.id))
            }else if(this.field.region == 'columns'){
              this.columnsList = Object.assign(this.columnsList.filter(item => item.id != this.field.id))
            }else if(this.field.region == 'values'){
              this.valuesList = Object.assign(this.valuesList.filter(item => item.id != this.field.id))
            }
            let pivot = Object.assign({rows: this.rowsList, columns: this.columnsList, valuesList: this.valuesList})
            this.setPivot(pivot)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //后台删除

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        /**
         * 更改字段名称
         */
        changeLabel() {
          this.$refs.fieldLabelRef.show(this.field);
        },
        /**
         * 格式化数字
         */
        formatField(){
          this.$refs.formatFieldRef.show(this.field);
        },
        /**
         * 字段过滤
         */
        fieldFilter() {
          this.$refs.fieldFilterRef.show(this.field);
        },
        /**
         * 指标分档
         */
        bracket() {
          this.$refs.bracketRef.show(this.field);
        },
        /**
         * 从store中获取pivot
         */
        getPivotFromStore(){
          let pivot = this.$store.state.prismx.pivot;
          this.rowsList = Object.assign(pivot['rows'])
          this.columnsList = Object.assign(pivot['columns'])
          this.valuesList = Object.assign(pivot['values'])
        },
        /**
         * 交换行列
         */
        swapRowColumn(){
          let rowsList = JSON.parse(JSON.stringify(this.columnsList))
          let columnsList = JSON.parse(JSON.stringify(this.rowsList))
          this.rowsList = rowsList
          this.columnsList = columnsList
          let pivot = Object.assign({rows: rowsList, columns: columnsList, values: this.valuesList})
          this.setPivot(pivot)

        }
      },
      mounted(){
        let _this = this
        EventBus.$off('pivotChanged')
        EventBus.$on('pivotChanged', function(){
          _this.getPivotFromStore();
        })
      }
    }
</script>

<style scoped>
  ul{
    padding: 0px;
    margin: 0px;
  }
  li {
    list-style-type: none;
    border: 1px solid ;
    margin: 1px 0px;
    width: 180px;
  }
  .rows li, .columns li, .values li{
    width:248px;
  }
  .alternative li i{
    display: none;
  }
</style>
