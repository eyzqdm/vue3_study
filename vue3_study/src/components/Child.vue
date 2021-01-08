<template>
  <h3>{{msg}}</h3>
  <button @click="change">change</button>
</template>

<script>
export default {
  props: ['msg'],
  setup (props, { attrs, emit, slots }) {
    console.log(props, attrs, emit, slots)
    /*
    props参数,是一个对象,里面有父级组件向子级组件传递的数据,并且是在子级组件中使用**props**接收到的所有的属性
    包含props配置声明且传入了的所有属性的对象
     */

    /* context参数,是一个对象,里面有attrs对象(包含父组件向子组件传入的，但没在props中声明的属性),
    emit方法(用来分发事件,即触发自定义事件。相当于v2的this.$emit()),slots对象(插槽) */
    const change = () => {
      emit('change')
    }

    return {
      change
    }
  }
}
</script>

<style>

</style>
