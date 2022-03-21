import { removeToken } from './token'
export default  function outLogin(that) {
  removeToken();
  that.$router.replace('/login')
}