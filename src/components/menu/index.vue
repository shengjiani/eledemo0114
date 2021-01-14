<template>
  <div>
    <h1>菜单表格页</h1>
    <el-button @click="$router.push('/menu/add')">添加</el-button>
    <el-table :data='arr'>
        <el-table-column label='编号' prop='id' width='50'></el-table-column>
        <el-table-column label='菜单名称' prop='title'></el-table-column>
        <el-table-column label='菜单类型'>
          <template slot-scope="item">
              <el-tag v-if="item.row.type==1">目录</el-tag>
              <el-tag v-else>菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column label='菜单图标' prop='icon'></el-table-column>
        <el-table-column label='菜单地址' prop='url'></el-table-column>
        <el-table-column label='状态'>
          <template slot-scope="item">
              <el-tag v-if="item.row.status==1">启用</el-tag>
              <el-tag v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label='操作' width='150'>
          <template slot-scope="item">
             <el-button size='mini' type="primary">编辑</el-button>
             <el-button size='mini' type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      arr: []
    };
  },
  mounted() {
    axios.get("/api/menulist").then(res => {
      // console.log(res);
      this.arr = res.data.list;
    });
  }
};
</script>

<style></style>
