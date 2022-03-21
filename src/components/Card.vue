<template>
  <div class="card_box" @click="navTo(url)">
    <img :src="src" alt="">
    <h2>{{title}}</h2>
  </div>
</template>

<script>
import { BASE_URL } from '../util'
export default {
  props: {
    title: {
      title: String,
      default: '超链接导航'
    },
    url: {
      type: String,
      default: '/apply'
    },
    src: {
      type: String,
      default: BASE_URL + '/myfiles/kechengbaoming.png'
    },
  },
  methods: {
    navTo(url) {
      window.location.href = url
    }
  },
}
</script>

<style lang="scss" scoped>
.card_box {
  width: 100%;
  height: 20rem;
  background-color: #fff;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 2px 2px 15px  rgba($color: #000000, $alpha: 0.01);
  margin-top: 2rem;

  img {
    width: 6rem;
    height: 6rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2rem;
  }
}
</style>