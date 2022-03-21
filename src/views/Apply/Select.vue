<template>
  <div>
    <Header />
    <div class="my_container my_table">
      <el-table  
        :data="applyList"
        stripe
        style="width: 100%;"
        :border="true"
        >
          <el-table-column
            prop="name"
            label="姓名"
            width="100"
            >
          </el-table-column>
          <el-table-column
            prop="student_no"
            label="学号"
            width="110"
            >
          </el-table-column>
          <el-table-column
            prop="img_src"
            label="头像"
            width="105"
            >
            <template slot-scope="scope">
              <img width="80" height="106" :src="BASE_URL + scope.row.img_src" alt="暂无头像">
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="身份证"
            >
          </el-table-column>
          <el-table-column
            prop="specialty"
            label="专业"
            width="120"
            >
          </el-table-column>
          <el-table-column
            prop="year"
            label="年级"
            width="60"
            >
          </el-table-column>
          <el-table-column
            prop="class"
            label="班级"
            width="60"
            >
          </el-table-column>
          <el-table-column
            prop="exam_type"
            label="考试类型"
            width="120"
            >
          </el-table-column>
          <el-table-column
            prop="exam_level"
            label="考试等级"
            width="80"
            >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="80"
            >
            <template slot-scope="scope">
              <el-tag :type="status[scope.row.status].type">{{status[scope.row.status].value}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button 
              @click="$router.push('/apply?type=edit&id=' + scope.row.s_id)"
              :disabled="scope.row.status === 0" 
              type="primary" 
              icon="el-icon-edit" circle></el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-button style="margin-top: 1rem;" type="info" @click="$router.replace('/')">返回首页</el-button>
    </div>
    <Footer />  
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
import Header from '../../components/Header.vue'
import { BASE_URL, getToken, isAuth } from '../../util'
export default {
  components: { 
    Header, 
    Footer 
  },
  data() {
    return {
      applyList: [],
      BASE_URL: BASE_URL + '/',
      status: {
				0: {
					type: 'success',
					value: '通过'
				},
				1: {
					type: 'danger',
					value: '未通过'
				},
				2:{
					type: 'warning',
					value: '待审核'
				}
			},
    }
  },
  mounted() {
    if (!isAuth()) return this.$router.push('/login')
    this.getApplyList()
  },
  methods: {
    async getApplyList() {
      const { data } = await this.$http.post("/student", {
        student_no: getToken().student_no,
        token: getToken().token
      })
      this.applyList = data.data
    }
  }
}
</script>

<style lang="scss" scoped>
.my_table {
  width: 90%;
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding: 4rem 1rem;
  background-color: #fff;
}
</style>