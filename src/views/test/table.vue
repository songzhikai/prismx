<template>
  <div>
    <div>element  table 动态表头</div>
    <el-table style="width: 100%">
      <el-table-column v-for="item in tableDatas" :key="item.id" label="Date" :prop="item.type" :render-header="renderHeader"></el-table-column>
    </el-table>

    <!--<div style="height:100px;">
      <p><span>名称</span><i class="el-icon-edit" style="margin-left: 10px;"></i>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>文本</el-dropdown-item>
            <el-dropdown-item>日期</el-dropdown-item>
            <el-dropdown-item>时间</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </p>

      <p>
        <el-dropdown style="float: left">
          <span class="el-dropdown-link">
            文本<i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>文本</el-dropdown-item>
            <el-dropdown-item>日期</el-dropdown-item>
            <el-dropdown-item>时间</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i class="iconfont icon-shaixuan" style="float:left;"></i>
      </p>
    </div>-->

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableDatas: [
          {id: '1', name: 'area_no111111', dataType: 'date', isFilter: true, editing: false},
          {id: '2', name: 'city_no', dataType: 'text', isFilter: false, editing: false},
          {id: '3', name: 'date', dataType: 'time', isFilter: true, editing: false},
          {id: '4', name: 'desc', dataType: 'text', isFilter: false, editing: false },
          {id: '5', name: 'time1', dataType: 'time', isFilter: false, editing: false },
        ],
        dataTypes: [
          {label: '文本', value: '1'},
          {label: '日期', value: '2'},
          {label: '时间', value: '3'},
        ]
      }
    },
    methods: {
      renderHeader(h,  { column, $index }){
        let _this = this
        let index = $index //当前第几列 从0开始
        let curtDataObj = this.tableDatas[index];

        return h('div', {
          style:{
            height: '80px',
            width: '200px'
          }
        },
        [
          h('p',{ style: { padding: '0px', margin: '0px' } }, [
            curtDataObj.editing == true
              ?
            h('input', { domProps: { value: curtDataObj.name }, style: { margin: '10px 0 0 10px', width: '90px', float: 'left' }, attrs: { size: 'mini' }, on: {
                input(e){
                  curtDataObj.name = e.target.value
                }
              }}, [])
              :
            h('span', {style: {width: '90px', margin: '0 0 0 10px', float:'left'}}, [curtDataObj.name.length > 10 ? curtDataObj.name.substring(0, 10)+'...' : curtDataObj.name]),
            curtDataObj.editing == false
              ?
            h('i', { class: 'el-icon-edit', style:{ padding: '0px', margin: '13px 0 0 10px', float:'left' },
              on: { click(e){
                  curtDataObj.editing = true
                }
              }
            })
            :
            h('i', { class: 'iconfont icon-baocun1', style:{ padding: '0px', margin: '0 0 0 6px', float:'left' },
              on: {
                click(){
                  curtDataObj.editing = false
                }
              }
            })
            ,
            h('el-dropdown',
              {
                style: {float: 'left'},
                on: {
                  command(command){
                    if(command == 'filter'){
                      curtDataObj.isFilter = true
                    }
                  }
                }
              },
              [
              h('span', { class: 'el-dropdown-link', },[
                  h('i', {
                    class: 'el-icon-caret-bottom',
                    style: {
                      margin: '0px',
                      padding: '0px'
                    }
                  })
                ]),
              h('el-dropdown-menu', {
                style: {
                  margin: '0px',
                  padding: '0px',
                },
                slot: 'dropdown'
              },[
                h('el-dropdown-item', { attrs: { command: 'bracket' }, }, ['分档']),
                h('el-dropdown-item', { attrs: { command: 'filter' }, }, ['筛选']),
                h('el-dropdown-item', { attrs: { command: 'group' }, }, ['分组']),
              ])
            ])
          ]),
          h('p', { style: {
              padding: '0px',
              margin: '0px',
              clear: 'both'
            }},[
            h('el-dropdown', {
              style: { float: 'left' },
              on: {
                command(command){
                  if(command == 'text'){
                    _this.tableDatas[index].dataType = 'text'
                  }else if(command == 'time'){
                    _this.tableDatas[index].dataType = 'time'
                  }else if(command == 'date'){
                    _this.tableDatas[index].dataType = 'date'
                  }
                }
              }
            },
            [
              h('span', { class: 'el-dropdown-link', },[ curtDataObj.dataType, h('i', { class: 'el-icon-caret-bottom' }) ]),
              h('el-dropdown-menu', { slot: 'dropdown' },[
                h('el-dropdown-item', { attrs: { command: 'text' }, }, ['文本']),
                h('el-dropdown-item', { attrs: { command: 'date' }, }, ['日期']),
                h('el-dropdown-item', { attrs: { command: 'time' }, }, ['时间']),
              ])
            ]),
            curtDataObj.isFilter == true? h('i', { class: 'iconfont icon-shaixuan', on:{
                click(){
                  alert(index);
                }
              }}): ''
          ])
        ]);
      }
    },
  }
</script>
