<template>
  <div>
    <Header />
    <div class="my_container" style="min-height: 80vh;">
      <Title title="例年考试资料下载" style="margin-top: 2rem;" />
      <Files />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Files from '../components/Files.vue'
import Title from '../components/Title.vue'
import Footer from '../components/Footer.vue'
export default {
  components: {
    Header,
    Files,
    Title,
    Footer
  }
}
</script>