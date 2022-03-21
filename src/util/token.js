const RECEPTION_TOKEN = 'WEB_EXAM_MANAGEMENT_CLIENT'

const getToken = () => JSON.parse(localStorage.getItem(RECEPTION_TOKEN))
const setToken = token => localStorage.setItem(RECEPTION_TOKEN, JSON.stringify(token))
const removeToken = () => localStorage.removeItem(RECEPTION_TOKEN)
const isAuth = () => !!getToken()

export { getToken, setToken, removeToken, isAuth }
