<template>
  <div class="my_page">
     <div class="input-box">
       <div class="logo_info">
         <img src="../assets/logo.png" alt="">
         <h3>1+X考试服务站</h3>
       </div>
      <form class="form_box" @submit="login" method="post">
          <h2>账号密码登录</h2>
          <input type="text" placeholder="账号/学号"><br />
          <input class="last_input" type="password" placeholder="请输入密码">
        <div class="btns_box">
          <button class="login">登录</button>
          <button @click="$router.replace('/')" class="cancel">取消</button>
        </div>
        <p @click="reset" class="forget">忘记密码？</p>
      </form>
    </div>
  </div>
</template>

<script>
import { isAuth, setToken } from '../util'
export default {
  created() {
    this.isLogin()
  },
  methods: {
    async login(e) {
      e.preventDefault()
      const student_no = e.target[0].value
      const password = e.target[1].value
       if (student_no.trim() === '') return this.$message({
        type: 'warning',
        message: '账号不能为空'
      })
      if (password.trim() === '') return this.$message({
        type: 'warning',
        message: '密码不能为空'
      })
      const { data } = await this.$http.post("/student_account/login", {
        student_no,
        password
      })
      this.$message({
        type: data.status === -1 ? 'error' : 'success',
        message: data.message
      })
      if (data.status === -1) return 
      setToken(data?.data)
      setTimeout(() => {
        this.$router.replace('/')
      }, 1500);
    },
    reset() {
      window.alert('请联系专业老师重置密码')
    },
    isLogin() {
      if (isAuth()) return this.$router.replace('/')
    }
  },
}
</script>

<style lang="scss" scoped>
.my_page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.input-box {
  width: 30rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.03);
  padding: 4rem;
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: center;

  .logo_info {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: var(--color);

    img {
      width: 5rem;
      height: 5rem;
      margin-right: 1rem;
    }
  }
}
.form_box {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  
  h2 {
    font-size: 2rem;
  }

  input {
    width: 25rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    background-color: rgb(240, 240, 240);
    margin-top: 2rem;
    font-size: 1.4rem;
    padding: 1.2rem;
  }

  .last_input {
     margin-top: 1rem;
  }

  .forget {
    margin-top: 2rem;
    cursor: pointer;
    align-items: start;
  }
}

.btns_box {
  margin-top: 2rem;

  button {
    outline: none;
    border: none;
    margin-right: 2rem;
    padding: 1rem 2rem;
    border-radius: 1rem;
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
  }
  .login {
    background-color: var(--color);
    color: #fff;
  }
  .cancel {
    color: #555;
  }
}
@media screen and (max-width: 500px) {
 .input-box {
   box-sizing: border-box;
   width: 100%;
   height: 100vh;
   padding: 0;
 } 
 .logo_info h3 {
   display: none;
 }
 .form_box {
   width: 100vw;

   input {
    width: 60vw;
  }
 }
}
</style>