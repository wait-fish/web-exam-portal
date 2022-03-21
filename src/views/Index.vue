<template>
  <div>
    <Header />
    <header class="header_bg"></header>
    <div class="my_container index_box" >
      <div class="banner_box">
        <Title title="1+X考试展示图"/>
        <Banner />
      </div>
      <div class="data_box">
        <Title :more="true" title="例年考试资料下载" type="left" url="/downloads" />
        <Files />
      </div> 
    </div>
    <div class="my_container nav_box">
      <Title title="一站直达" url="/" />
      <Cards />
    </div>
    <Footer /> 
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import Files from '../components/Files.vue'
import Title from '../components/Title.vue'
import Cards from '../components/Cards.vue'
import Footer from '../components/Footer.vue'


export default {
  components: {
    Header,
    Banner,
    Files,
    Title,
    Cards,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.header_bg {
  height: 15rem;
  width: 100%;
  background-image: url("../assets/header.jpg");
  background-size: 100%;
}
.index_box {
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;

  .banner_box {
    width: 55%;
    margin-bottom: 1rem;
  }

  .data_box {
    width: 40%;
  }

}
@media screen and (max-width: 650px) {
  .header_bg {
    display: none;
  }
}
@media screen and (max-width: 900px) {
  .index_box {
    display: block;

    .banner_box {
      width: 100%;
    }

    .data_box {
      width: 100%;
    }
  }
 
}
.nav_box {
  margin-top: 2rem;
}
</style>