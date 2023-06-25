<template>
  <div class="title-container">
    <img src="@/assets/img/title-icon.webp" alt="" />
    <span class="title">运行数据</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  border-bottom: 1px solid rgba(25, 252, 222, 0.2);
  img {
    width: 20px;
    margin-left: 20px;
  }
  .title {
    margin-left: 10px;
    font-size: 22px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
