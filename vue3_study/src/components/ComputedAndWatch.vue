<template>
<h2>计算属性</h2>

    姓:<input
      type="text"
      placeholder="请输入姓氏"
      v-model="userName.first"
    /><br />
    名:<input
      type="text"
      placeholder="请输入名字"
      v-model="userName.last"
    /><br />
    姓名:<input type="text" placeholder="显示姓名" v-model="fullName1" /><br />
    姓名:<input type="text" placeholder="显示姓名" v-model="fullName2" /><br />
    姓名:<input type="text" placeholder="显示姓名" v-model="fullName3" /><br />
</template>

<script lang="ts">
import {
  reactive,
  computed,
  watch,
  ref,
  watchEffect
} from 'vue'
export default {
  setup () {
    const userName = reactive({
      first: '李',
      last: '云龙'
    })
    // computed只传入一个回调,表示get。 返回的是一个Ref类型的对象
    const fullName1 = computed(() => {
      return userName.first + '_' + userName.last
    })
    // 当需要get和set时，需要传入对象。分别定义get和set
    const fullName2 = computed({
      get () {
        return userName.first + '_' + userName.last
      },
      set (val: string) {
        // val是get的返回值
        const names = val.split('_')
        userName.first = names[0]
        userName.last = names[1]
      }
    })
    const fullName3 = ref('')
    watch(userName, ({ first, last }) => {
      fullName3.value = first + '_' + last
    }, { immediate: true, deep: true })
    // immediate 默认会执行一次watch,deep 深度监视

    watchEffect(() => { // 监听Full3
      const names = fullName3.value.split('_')
      userName.first = names[0]
      userName.last = names[1]
    })
    // watch监听多个数据
    watch([() => userName.first, () => userName.last], () => {
      // 这里的代码就没有执行,fullName3是响应式的数据,但是,user.firstName,user.lastName不是响应式的数据
      console.log('====')
    })

    // 问题 watchEffect什么时候触发？为什么不用指定被监听者?
    // 答:因为watchEffect会自动收集依赖，只要在其回调中用到的属性发生改变，该回调就会执行。
    // watchEffect无法拿到旧值，watch可以
    // watchEffect在组件初始化时就会执行一次，watch不行，需要配置immediate
    // watch可以监听多个数据
    // 根据需求灵活使用watch,watchEffect,computed

    // watch监听多个数据时，非响应化对象（响应化对象的基本类型属性）需要写成回调函数形式？
    return {
      userName,
      fullName1,
      fullName2,
      fullName3
    }
  }
}
</script>

<style>

</style>
