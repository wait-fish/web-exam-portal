<template>
  <div>
    <Header />
    <div class="my_container" id="my_form">
      <el-form :model="userInfo" label-width="10rem" >
        <el-form-item style="display: flex;justify-content: center;">
          <h1>个人中心</h1>
        </el-form-item>
          <el-form-item  label="学生姓名" prop="name" >
            <el-input style="width: 20rem;" :disabled="notDisabled" v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item  label="学号" prop="student_no">
            <el-input style="width: 20rem;" :disabled="true" v-model="userInfo.student_no"></el-input>
          </el-form-item>
           <el-form-item  label="密码" prop="password">
            <el-input style="width: 20rem;" :type="notDisabled ? 'password' : 'text'" :disabled="notDisabled" v-model="userInfo.password"></el-input>
          </el-form-item>
          <el-form-item  label="身份证" prop="id">
            <el-input style="width: 20rem;" :disabled="notDisabled" v-model="userInfo.id"></el-input>
          </el-form-item>
          <el-form-item  label="专业年级班级">
            <el-cascader
              :disabled="notDisabled"
              v-model="class_info"
              :options="class_options"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button v-if="notDisabled" @click="notDisabled = false" type="primary" >编辑</el-button>
            <el-button v-else @click="editInfo" type="primary">确定</el-button>
            <el-button @click="$router.replace('/')">返回</el-button>
          </el-form-item>
           <el-form-item>
            <el-button 
            @click="$router.push('/apply_select')" 
            class="outLogin" 
            type="primary" 
            plain
            style="margin-top: 1rem;"
            >查看报名信息</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="outLogin" class="outLogin" type="info">退出登录</el-button>
          </el-form-item>
        </el-form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import { getToken, isAuth, outLogin, removeToken } from '../util'
import {  findIndexs, findValues } from '../util/find'

var formerInfo = {} // 原来的信息
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      class_options: [],
      userInfo: {},
      class_options: [],
      class_info: [], // 专业信息
      notDisabled: true
    }
  },
  mounted() {
    if (!isAuth()) return this.$router.push('/login')
    this.getData()
  },
  methods: {
    async getData() {
      this.getMenu()
      this.getUserInfo()
    },
    async getUserInfo() {
      const { data } = await this.$http.get(`/student_account?keywords=${getToken().student_no}&token=${getToken().token}`)
      if (data.status == -1) return outLogin(this)
      this.userInfo = data.data[0]
      let { specialty, year } = this.userInfo
      this.class_info = findIndexs(this.class_options, [specialty, year, this.userInfo.class ])
      formerInfo = JSON.parse(JSON.stringify(data.data[0]))
    },
     // 获取菜单
    async getMenu() {
      const { data } = await this.$http.get('/menu/select');
      this.class_options = data.data
    }, 
    async editInfo() {
      const [ specialty, year, ...rest ] = findValues(this.class_options, this.class_info)
      this.userInfo.specialty = specialty
      this.userInfo.year = year
      this.userInfo.class = rest[0]
      if(this.Equal(this.userInfo, formerInfo)) {
        this.$message({
          type:  'warning',
          message: "没有修改数据"
        })
        return this.notDisabled = true
      }
      const { data } = await this.$http.post("/student_account/edit", {
        ...this.userInfo,
        token: getToken().token,
      })
      // console.log(this.userInfo);
      this.$message({
        type: data.status === 0 ? 'success' : 'error',
        message: data.message
      })
      this.getUserInfo()
      this.notDisabled = true
    },
    outLogin() {
      removeToken();
      this.$router.replace('/');
    },
    Equal(val1, val2) {
      return JSON.stringify(val1) === JSON.stringify(val2)
    }
  }
}
</script>

<style lang="scss" >
#my_form {
  background-color: #fff;
  .el-form {
    margin: 0 auto;
    padding: 6rem 6rem;
    padding-right: 10rem;
    width: 35rem;

    .el-form-item {
      
      h1 {
        margin-right: 6rem;
      }
      
      .el-form-item__label {
        font-size: 1.4rem;
        font-weight: bold;
        color: #333;
      }
    }

    input {
      border-radius: 1rem;
    }

    button {
      width: 10rem;
      border-radius: 1rem;
    }
    button:hover {
      width: 10rem;
    }
    .outLogin {
      width: 20rem;
      margin-top: 1rem;
    }
    .outLogin:hover {
       width: 20rem;
    }
  }
}
@media screen and (max-width: 650px) {
  #my_form {
  background-color: #fff;
  .el-form {
    margin: 0 auto;
    padding: 6rem;
    width: auto;

    .el-form-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-bottom: 1rem;

      h1 {
        margin-right: 0;
      }

      .el-form-item__label {
        width: 20rem!important;
        text-align: left;
      }

      .el-form-item__content {
        margin-left: 0!important;
      }
    }
  }
}
}
</style>