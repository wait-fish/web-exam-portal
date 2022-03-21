import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import { 
  Button,
  Message,
  Form,
  FormItem,
  Select,
  Option,
  Cascader,
  Input,
  Carousel,
  CarouselItem,
  Image,
  Upload,
  Dialog,
  Table,
  TableColumn,
  Tag
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Input)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)

Vue.prototype.$message = Message