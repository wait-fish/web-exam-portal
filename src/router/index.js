import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import UserInfo from '../views/UserInfo.vue'
import Downloads from '../views/Downloads.vue'
import Apply from '../views/Apply/Apply.vue'
import ApplySelect from '../views/Apply/Select.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Index, redirect: '/index' },
  { path: '/index', name: 'index', component: Index },
  { path: '/login', name: 'login', component: Login },
  { path: '/user_info', name: 'user_info', component: UserInfo }, // 编辑用户信息
  { path: '/downloads', name: 'downloads', component: Downloads }, // 资料下载
  { path: '/apply', name: 'apply', component: Apply }, // 报名
  { path: '/apply_select', name: 'apply_select', component: ApplySelect }, // 报名查询
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
