<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="$router.push('/menu/add')">添加</el-button>
    <el-table :data="arr" row-key="id">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="菜单名称" prop="title"></el-table-column>
      <el-table-column label="菜单类型">
        <template slot-scope="item">
          <el-tag v-if="item.row.type == 1">目录</el-tag>
          <el-tag v-else>菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="item">
          <i :class="item.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="菜单地址" prop="url"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="item">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push('/menu/' + item.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="del(item)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: []
    };
  },
  mounted() {
    this.axios.get("/api/menulist", { params: { istree: true } }).then(res => {
      // console.log(res);
      this.arr = res.data.list;
    });
  },
  methods: {
    // 删除菜单方法
    del(obj) {
      // 使用element-ui中的$confirm方法给出弹窗提示
      // .then 是点击确定触发的事件
      // .catch 是点击取消触发的代码
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // post提交的数据一般是对象类型或者是表单类型，包括  {键名：键值}
          this.axios.post("/api/menudelete", { id: obj.row.id }).then(res => {
            if (res.data.code === 200) {
              // 删除成功后，接口会返回最新的数据，直接把最新数据赋值给表格使用的数据就可以实现页面的变化
              this.arr = res.data.list;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style></style>
