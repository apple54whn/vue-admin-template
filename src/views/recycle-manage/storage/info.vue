<template>
  <div>
    <div class="search-wrapper">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate-wrapper">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="edit">编辑</el-button>
      <el-button type="primary" size="small" icon="el-icon-check">审核</el-button>
      <el-button type="info" size="small" icon="el-icon-info">查看</el-button>
      <el-button type="danger" size="small" icon="el-icon-minus">删除</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      stripe
      highlight-current-row
      :border="true"
      height="400"
    >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="序号" width="50" align="center" v-slot="{$index}">{{$index + 1}}</el-table-column>
      <el-table-column prop="action" label="操作" width="50" align="center">
        <template v-slot="{row}">
          <el-button type="text" icon="el-icon-setting" @click="actions(row)"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" width="700" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" width="180" align="center">
        <template v-slot="{row}">
          <el-tag :type="statusObj[row.status].type">{{statusObj[row.status].value}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="other1" label="其他1" width="180" align="center"></el-table-column>
      <el-table-column prop="other2" label="其他2" width="180" align="center"></el-table-column>
      <el-table-column prop="other2" label="其他2" width="180" align="center"></el-table-column>
      <el-table-column prop="other2" label="其他2" width="180" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" align="center" fixed="right"></el-table-column>

      <el-table-column label="操作" width="200" align="center" fixed="right">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      :page-sizes="[20, 50, 100, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      background
    ></el-pagination>

    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="物流图" name="1">
          <p>这是图</p>
        </el-collapse-item>
        <el-collapse-item title="物流表" name="2">
          <el-table :data="gridData" height="300">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/recycle-manage'
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      // 已选择复选框值
      multipleSelection: [],
      statusObj: {
        '1': {
          type: 'success',
          color: '#ecf5ff',
          value: '状态一'
        },
        '2': {
          type: 'info',
          color: '#f0f9eb',
          value: '状态二'
        },
        '3': {
          type: 'warning',
          color: '#f4f4f5',
          value: '状态三'
        },
        '4': {
          type: 'danger',
          color: '#fdf6ec',
          value: '状态四'
        },
        '5': {
          type: '',
          color: '#fef0f0',
          value: '状态五'
        }
      },
      dialogTableVisible: false,
      title: '',
      activeNames: ['1', '2'],
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      page: {
        // 当前页
        currentPage: 1,
        // 每页显示记录数
        pageSize: 20,
        // 总记录数
        total: 0
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getList({
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize
      }).then(res => {
        this.tableData = res.data.items
        this.page.total = res.data.total
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.getList()
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    // 新增
    add() {
      this.$emit('addComponent', '2')
    },
    // 编辑
    edit() {
      this.$emit('addComponent', '3')
    },
    // 复选框选择事件
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('已选择复选框值', this.multipleSelection)
    },
    // actions事件
    actions(row) {
      console.log('行：', row)
      this.dialogTableVisible = true
      this.title = `单号：${row.id}`
    }
  }
}
</script>
<style>
body .el-table th.gutter {
  display: table-cell !important;
}
th .cell {
  /* 有border就不需要了 */
  /* padding-left: 14px !important; */
}
</style>
