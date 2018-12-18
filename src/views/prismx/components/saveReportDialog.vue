<template>
    <div>
      <el-dialog
        title="保存报表信息"
        :visible.sync="dialogVisible"
        width="30%"
        left>
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="报表名称">
            <el-input v-model="formData.reportName"></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="formData.userId"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="formData.desc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "save-report-dialog",
      data(){
        return {
          dialogVisible: false,
          formData: {reportName: 'szk1218test', userId: '101', desc: '测试报表测试报表测试报表测试报表测试报表'}
        }
      },
      methods:{
        show(){
          this.dialogVisible = true
        },
        onSubmit(){
          this.dialogVisible = false;
        }
      }
    }
</script>

<style scoped>

</style>
