<template>
  <div id="tabbox">
    <el-tabs class="demo-tabs">
    <el-tab-pane label="查看报名人数" name="first"><router-link to="/backPage/viewsighup"></router-link></el-tab-pane>
    <el-tab-pane label="预约面试" name="second"><router-link to="/backPage/viewsighup"></router-link></el-tab-pane>
  </el-tabs>
  </div>
</template>


<script lang="ts" setup>

</script>
<style>
#tabbox {
    position: fixed;
    left: 0px;
    top: 0;
    height: 39px;
    width: 1550px;
    background-color: #f5f5f5;
    padding-left: 25px;
    z-index: 100;
}

.demo-tabs > .el-tabs__content {
  padding: 0px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
