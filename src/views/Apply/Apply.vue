<template>
  <div>
    <Header />
    <div class="my_container" id="my_form">
      <el-form :model="userInfo" label-width="10rem" >
        <el-form-item style="display: flex;justify-content: center;">
          <h1>填写报名信息</h1>
        </el-form-item>
          <el-form-item  label="学生姓名" prop="name" >
            <el-input style="width: 20rem;" v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item  label="学号" prop="student_no">
            <el-input style="width: 20rem;" v-model="userInfo.student_no"></el-input>
          </el-form-item>
          <el-form-item  label="身份证" prop="id">
            <el-input style="width: 20rem;" v-model="userInfo.id"></el-input>
          </el-form-item>
          <el-form-item label="证件照">
            <el-upload
              action=""
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-exceed="changeFile"
              :on-change="changeFile"
              :on-remove="removeFile"
              :multiple=false
              :limit=1
              :file-list="fileList"
              :auto-upload="false"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="imgDialogVisible">
              <img width="100%" :src="imgDialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item  label="专业年级班级">
            <el-cascader
              v-model="class_info"
              :options="class_options"
            ></el-cascader>
          </el-form-item>
          <el-form-item  label="考试类型等级">
            <el-cascader
              v-model="exam_info"
              :options="exam_options"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button @click="editStudent" type="primary">{{type === 'edit'? '确定修改': '确认报名'}}</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="$router.replace('/apply_select');" class="toSelect" type="primary" plain>查看报名信息</el-button>
          </el-form-item>
        </el-form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
import Header from '../../components/Header.vue'
import { BASE_URL, getToken, isAuth, outLogin } from '../../util'
import {  findIndexs, findValues } from '../../util/find'
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      userInfo: {},
      BASE_URL: BASE_URL + '/',
      class_options: [],
      class_info: [], // 专业信息
      exam_options: [],
      exam_info: [],
      imgDialogImageUrl: '',
      imgDialogVisible: false,
      fileList: [],
      uploadfile: {},
      type: 'add',
      s_id: null
    }
  },
  mounted() {
    if (!isAuth()) return this.$router.push('/login')
    this.getData()
  },
  methods: {
    async getData() {
      const { type, id } = this.$route.query
      await this.getMenu()
      await this.ExamInfo()
      if (type !== 'edit') return this.getUserInfo()
      this.type = type
      this.s_id = id
      this.getUserInfoEdit()
    },
    // 报名时
    async getUserInfo() {
      const { data } = await this.$http.get(`/student_account?keywords=${getToken().student_no}&token=${getToken().token}`)
      // console.log(data)
      if (data.status === -1) return outLogin(this);
      this.userInfo = data.data[0]
      let { specialty, year } = this.userInfo
      this.class_info = findIndexs(this.class_options, [specialty, year, this.userInfo.class ])
    },
    // 审核失败修改时
    async getUserInfoEdit() {
      const { data } = await this.$http.post(`/student`, {
        s_id: this.s_id,
        token: getToken().token
      })
      // console.log(data)
      if (data.status === -1) return outLogin();
      this.userInfo = data.data[0]
      let { specialty, year, exam_type, exam_level } = this.userInfo
      this.class_info = findIndexs(this.class_options, [specialty, year, this.userInfo.class ])
      this.exam_info = findIndexs(this.exam_options, [exam_type, exam_level])
      this.fileList = [{
          name: new Date().getTime(),
          url: this.BASE_URL + this.userInfo.img_src
      }]

    },
     // 获取菜单
    async getMenu() {
      const { data } = await this.$http.get('/menu/select')
      this.class_options = data.data
    },
    async ExamInfo() {
      const { data } = await this.$http.get('/exam_type/select')
      // console.log(data);
      this.exam_options = data.data
    },
    // 预览图片
    handlePictureCardPreview (file) {
      this.imgDialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    // 更换图片时图片
    changeFile (file) {
      if (file.url !== undefined) {
        this.uploadfile = file.raw
        this.fileList = [{
          name: file.name,
          url: file.url
        }]
      } else {
        this.uploadfile = file[0]
        this.fileList = [{
          name: file[0].name,
          url: window.URL.createObjectURL(file[0])
        }]
      }
    },
    removeFile() {
      this.uploadfile = {}
      this.fileList = []
    },
    // 上传头像
    async upload () {
      let fd = new FormData()
      fd.append('file', this.uploadfile);
      const { data } = await this.$http.post('/upload', fd)
      return data.url
    },
    async editStudent() {
      const [specialty, year, className] = findValues(this.class_options, this.class_info)
      const [exam_type, exam_level] = findValues(this.exam_options, this.exam_info)
      this.userInfo.specialty = specialty
      this.userInfo.year = year
      this.userInfo.class = className
      this.userInfo.exam_type = exam_type
      this.userInfo.exam_level = exam_level
      this.userInfo.status = 2
      const url = await this.upload()
      this.userInfo.img_src = url
      delete this.userInfo.password
      if (this.studentIsEmptys()) return this.notNull()
      let { data } = await this.$http.post(`/student/${this.type}`, {
        token: getToken().token,
        ...this.userInfo
      })
      let { status, message } = data
      this.$message({
        type: status === 0 ? 'success' : 'error',
        message  
      })
      setTimeout(() => {
        this.$router.replace('/');
      }, 1000);
    },
    notNull(text = '') {
      this.$message({
        type: 'warning',
        message: text + '不能有值为空'
      })
    },
    studentIsEmptys() {
      let keys = Object.keys(this.userInfo)
      return keys.some(item => this.userInfo[item] === '' || this.userInfo[item] == undefined )
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
    .toSelect {
      width: 20rem;
      margin-top: 2rem;
    }
    .toSelect:hover {
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