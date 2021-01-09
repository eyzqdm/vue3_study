<template>
  <div id="nav">
     <h3>{{num}}</h3>
     <h2>{{obj.age}}</h2>
     <button @click="add">add</button>
     <button @click="addObj">logobj</button>
     <Child :msg="msg" :msg1="msg1" @change="changMsg" />
     <Computed />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import Child from './components/Child.vue'
import Computed from './components/ComputedAndWatch.vue'
import useRequest from './hooks/useRequest'
// 定义接口,约束api返回数据的类型
interface AddressData {
  id: number;
  address: string;
  distance: string;
}

interface ProductsData {
  id: string;
}
export default {
  setup () {
    const num = ref<number>(0)
    const msg = ref<string>('耗子尾汁')
    const msg1 = ref<string>('年轻人')
    const obj = ref({
      count: 1,
      age: 8
    })
    const add = () => {
      num.value++
    }
    const addObj = () => {
      obj.value.age++
    }
    const changMsg = () => {
      msg.value += ',好好反思'
    }
    /* 响应式对象一般用reactive 用ref也可以 但在操作时要用obj.value.xxx  模板中不需要加value */
    // ref中如果放入的是一个对象,实际上是经过了reactive的处理,形成了一个Proxy类型的对象

    /* reactive接收一个普通对象然后返回该普通对象的响应式代理器对象
    如果操作代理对象,目标对象中的数据也会随之变化,同时如果想要在操作数据的时候,界面也要跟着重新更新渲染,
    那么也是操作代理对象。
    通过代理对象添加/删除属性也是响应式的。
     */

    const { loading, data, errorMsg } = useRequest<ProductsData[]>(
      'url'
    ) // 获取数组数据
    if (data.value) console.log(data.value.length)
    return {
      num,
      obj,
      add,
      msg,
      msg1,
      addObj,
      changMsg,
      loading,
      data,
      errorMsg
    }
  },
  components: {
    Child,
    Computed
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
