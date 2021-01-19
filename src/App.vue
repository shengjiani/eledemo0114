<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.el-breadcrumb{
  margin-bottom: 20px;
}
.el-pagination{
  margin-top: 30px;
  float: right;
}
</style>
