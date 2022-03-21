<template>
  <div class="files">
    <ul  v-for="item1 in fileList" :key="item1.year">
      <h1 @click="$router.push('/downloads')" class="files_title">{{item1.year}}年</h1>
      <li @click="downloadFile(BASE_URL + item2.data_url, item2.title)" class="files_item" v-for="item2 in item1.children" :key="item2.id">
        <span>{{item2.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { BASE_URL, downloadFile } from '../util'
export default {
  data() {
    return {
      fileList: [],
      downloadFile,
      BASE_URL: BASE_URL +  '/'
    }
  },
  mounted() {
    this.getFileList()
  },
  methods: {
    async getFileList() {
      const { data } = await this.$http.get("/data_files?crop=1")
      this.fileList = data.data;
    }
  },
}
</script>

<style lang="scss" scoped>
.files {
  background-color: var(--bgwhite);
  height: var(--h);
  border-radius: 0.5rem;
  padding: 0.5rem;

  .files_title {
    cursor: pointer;
    color: #333;
    padding: 0.2rem;
    font-size: 2.8rem;
    color: var(--bg);
    border-left: 0.5rem double var(--color);
    padding-left: 1rem;
    margin-left: 1rem;
  }
  .files_item {
    list-style: square;
    margin-left: 5rem;
    color: var(--bg);
    
    span {
      display: block;
      line-height: 1.8;
      width: 100%;
      color: #555;
      font-size: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>