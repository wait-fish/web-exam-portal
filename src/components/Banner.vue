<template>
  <div class="my_container" id="banner" v-if="banner.length">
    <el-carousel height="150px">
      <el-carousel-item v-for="item in banner" :key="item.id">
        <el-image :src="BASE_URL + item.url" fit="cover" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { BASE_URL } from '../util'
export default {
  data() {
    return {
      banner: [],
      BASE_URL: BASE_URL + '/'
    }
  },
  mounted() {
    this.getBanner()
  },
  methods: {
    async getBanner() {
      const { data } = await this.$http.get("/images?crop=1")
      this.banner = data.data
    }
  },
}
</script>
<style lang="scss">
#banner {
  width: 100%;
  margin-left: 0;

  .el-carousel {
    height: var(--h);
    border-radius: 0.5rem;

    .el-carousel__container {
      height: 100%!important;
    }
  }
  
  .el-carousel__item {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    height: 100%;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
}
@media screen and (max-width: 1200px) {
  #banner {
    height: 25rem;

    .el-carousel {
      height: 100%;

      .el-carousel__container {
        height: 100%!important;
      }
    }
  }
}
@media screen and (max-width: 550px) {
  #banner {
    height: 15rem;
  }
}
</style>