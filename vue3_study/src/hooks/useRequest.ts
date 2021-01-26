import { reactive, ref } from 'vue'
// 引入axios
import axios from 'axios'
// 发送ajax的请求
// 使用泛型约束返回数据data的类型,使用时传入interface接口
export default function <T> (url: string) {
  // 加载的状态
  const loading = ref(true)
  // 请求成功的数据
  const data = ref<T | null>(null) // 坑
  // 错误信息
  const errorMsg = ref('')
  // 发送请求
  // @ts-ignore
  axios.get(url).then(response => {
    // 改变加载状态
    loading.value = false
    data.value = response.data
    // @ts-ignore
  }).catch(error => {
    // 改变加载状态
    loading.value = false
    errorMsg.value = error.message || '未知错误'
  })
  return {
    loading,
    data,
    errorMsg
  }
}
