<template>
  <div class="cards_box">
    <card title="报名信息查询" url="/apply_select" :src="BASE_URL + '/myfiles/chaxun.png'" />
    <Card title="考试报名" />
    <Card 
    v-for="item in list" 
    :key="item.id" 
    :title="item.title" 
    :url="item.path" 
    :src="BASE_URL + item.img_url" />
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import { BASE_URL } from '../util'
export default {
  components: {
    Card
  },
  data() {
    return {
      list: [],
      BASE_URL: BASE_URL + '/'
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data } = await this.$http.get("/expand")
      // console.log(data);
      this.list = data.data 
    }
  },
}
</script>

<style lang="scss" scoped>
.cards_box {
  display: grid;
  grid-template-columns: repeat(auto-fill, 25rem);
  justify-content: space-evenly;
}
@media screen and (max-width: 600px) {
  .cards_box {
   grid-template-columns: repeat(auto-fill, 90%);
  }
}
</style>