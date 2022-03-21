<template>
  <div class="footer_box">
    <div class="left">
      <img src="../assets/logo.png" style="width: 4rem;height: 4rem;">
      1+X考试服务站
    </div>
    <div class="right">
      <h2>@广东工程职业技术学院 信息工程学院</h2>
      <h4>计算机应用技术 开发</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg);
  padding: 1rem 0;
  color: rgba($color: #fff, $alpha: 0.8);
  margin-top: 4rem;

  .left {
    flex: 3;
    display: flex;
    justify-content: flex-end;
    text-align: right;
    align-items: center; 
    font-size: 2rem;
  }
  .right {
    flex: 7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
@media screen and (max-width: 600px) {
  .footer_box {
    display: block;

    .left {
      display: none;
    }
  }
}
</style>