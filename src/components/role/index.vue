<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="$router.push('/role/add')">添加</el-button>
    <el-table :data="arr">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="rolename"></el-table-column>
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
            @click="$router.push('/role/' + item.row.id)"
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
    this.axios.get("/api/rolelist").then(res => {
      // console.log(res);
      this.arr = res.data.list;
    });
  },
  methods: {
    // 删除角色方法
    del(obj) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.post("/api/roledelete", { id: obj.row.id }).then(res => {
            if (res.data.code === 200) {
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
