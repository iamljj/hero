<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30px">
      <div class="px-2 flex-grow-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="bth bg-primary">立即下载</button>
   </div>
  <div class=" bg-primary py-2 pt-3">
    <div class="nav  text-white nav-inverse jc-around pt-1">
          <div class="nav-item active">
          <router-link  class="nav-link" tag="div" to="/">首页</router-link>
          </div>
          <div class="nav-item">
          <router-link  class="nav-link" tag="div" to="/">攻略中心</router-link>
          </div>
          <div class="nav-item">
          <router-link  class="nav-link" tag="div" to="/">赛事中心</router-link>
          </div>
    </div>

  </div>
  <router-view>

  </router-view>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
.topbar{
  position:sticky;
  top:0;
  z-index: 999;
}

</style>
