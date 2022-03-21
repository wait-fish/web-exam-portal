<template>
  <div class="header">
    <header class="my_container">
      <div class="logo_box">
        <img src="../assets/logo.png" />
        <h2 @click="$router.replace('/')">1+X考试服务站</h2>
      </div>
      <div class="login_info">
        <div v-if="userInfo" @click="toApplySelect" class="news">
            <img src="../assets/youjian.png" alt="">
            <span v-if="newsCount" class="news_count">{{newsCount}}</span>
        </div>
        <button v-if="!userInfo" class="go_login" @click="$router.push('/login')">去登录</button>
        <div class="info" @click="toUserInfo" v-else>
          <div  class="info_img" >{{userInfo.name[userInfo.name.length - 1]}}</div>
          <span class="info_no">{{userInfo.student_no}}</span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { getToken, isAuth } from '../util'
export default {
  data() {
    return {
      userInfo: null,
      newsCount: 0
    }
  },
  mounted() {
    this.userInfo = getToken();
    this.getNewsCount();
  },
  methods: {
      toUserInfo() {
        if (this.$router?.history?.current?.name === 'user_info') return
        this.$router.push('/user_info')
      },
      async toApplySelect() {
        if (!isAuth()) return
        if (this.$router?.history?.current?.name === 'apply_select') return
        this.$router.push('/apply_select')
        await this.$http.post("/news/remove", {
          student_no: this.userInfo.student_no
        });
        // console.log(data);
        this.newsCount = 0
      },
      async getNewsCount() {
        if (!isAuth()) return
        const { data } = await this.$http.get("/news/count?student_no=" + this.userInfo.student_no);
        // console.log(data);
        this.newsCount = data.data.count
      }
  },
}
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--bg);
  padding: 10px;

  .my_container {
    display: flex;
    justify-content: space-between;
  }

  img {
    width: 3rem;
    height: 3rem;
    margin-right: 2rem;
  }

  .logo_box {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 1.4rem;
    cursor: pointer;
  }
}
.login_info {
  display: flex;
  align-items: center;

  .go_login {
    border: none;
    outline: none;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #fff;
    color: var(--color);
    font-size: 1.6rem;
    font-weight: 550;
    cursor: pointer;
  }

  .info {
    display: flex;
    font-size: 1.6rem;
    align-items: center;
    color: #fff;
    cursor: pointer;

    .info_img {
      border-radius: 50%;
      width: 3.5rem;
      height: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      font-size: 1.8rem;
      font-weight: 550;
      color: var(--color);
      line-height: 1;
      margin-right: 1rem;
    }

  }

  .news {
    cursor: pointer;
    position: relative;

    .news_count {
      display: block;
      text-align: center;
      position: absolute;
      top: -0.5rem;
      right: 1.5rem;
      width: 1.8rem;
      height: 1.8rem;
      line-height: 1.8rem;
      background-color: rgb(241, 24, 68);
      color: #fff;
      border-radius: 999rem;
    }
  }
}
@media screen and (max-width: 500px) {
  .info_no {
    display: none;    
  }
}
</style>