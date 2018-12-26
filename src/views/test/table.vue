<template>
  <div>
    <el-table style="width: 100%">
      <el-table-column v-for="item in tableDatas" :key="item.id" label="Date" :prop="item.type" :render-header="renderHeader"></el-table-column>
    </el-table>

    <!--<div style="height:100px;">-->
      <!--<div><span>名称</span><i class="el-icon-edit" style="margin-left: 10px;"></i>-->
        <!--<el-dropdown>-->
          <!--<span class="el-dropdown-link">-->
            <!--<i class="el-icon-caret-bottom"></i>-->
          <!--</span>-->
          <!--<el-dropdown-menu slot="dropdown">-->
            <!--<el-dropdown-item>文本</el-dropdown-item>-->
            <!--<el-dropdown-item>日期</el-dropdown-item>-->
            <!--<el-dropdown-item>时间</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
      <!--</div>-->

      <!--<div style="clear: both">-->
        <!--<el-dropdown>-->
          <!--<span class="el-dropdown-link">-->
            <!--文本<i class="el-icon-caret-bottom"></i>-->
          <!--</span>-->
          <!--<el-dropdown-menu slot="dropdown">-->
            <!--<el-dropdown-item>文本</el-dropdown-item>-->
            <!--<el-dropdown-item>日期</el-dropdown-item>-->
            <!--<el-dropdown-item>时间</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
      <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableDatas: [
          {id: '1', name: 'area_no', dataType: 'date' },
          {id: '2', name: 'city_no', dataType: 'text' },
          {id: '3', name: 'date', dataType: 'time' },
          {id: '4', name: 'desc', dataType: 'text' },
          {id: '5', name: 'time1', dataType: 'time' },
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
            height: '80px'
          }
        },
        [
          h('p',{
            style: {
              padding: '0px',
              margin: '0px'
            }
          }, [
            h('span', {}, [curtDataObj.name]),
            h('i', {
              class: 'el-icon-edit',
              style:{
                marginLeft: '10px'
              },
              on: {
                click(e){
                  alert('edit'+index);
                }
              }
            }),
            h('el-dropdown', {
              on: {
                command(command){
                  alert(command);
                }
              }
            }, [
              h('span', {
                class: 'el-dropdown-link',
              },[
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
                h('el-dropdown-item', {
                  attrs: {
                    command: 'bracket'
                  },
                }, ['分档']),
                h('el-dropdown-item', {
                  attrs: {
                    command: 'filter'
                  },
                }, ['筛选']),
                h('el-dropdown-item', {
                  attrs: {
                    command: 'group'
                  },
                }, ['分组']),
              ])
            ])
          ]),
          h('p', { style: {
              padding: '0px',
              margin: '0px',
            }},[
            h('el-dropdown', {
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
            }, [
              h('span', {
                  class: 'el-dropdown-link',
                },[
                  curtDataObj.dataType,
                  h('i', {
                    class: 'el-icon-caret-bottom'
                  })
                ]),
              h('el-dropdown-menu', {
                  slot: 'dropdown'
                },[
                  h('el-dropdown-item', {
                    attrs: {
                      command: 'text'
                    },
                  }, ['文本']),
                  h('el-dropdown-item', {
                    attrs: {
                      command: 'date'
                    },
                  }, ['日期']),
                  h('el-dropdown-item', {
                    attrs: {
                      command: 'time'
                    },
                  }, ['时间']),
                ])
            ]),
          ])
        ]);
      }
    },
  }
</script>
