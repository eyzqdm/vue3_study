<template>
  <div id="nav">
     <h3>{{num}}</h3>
     <h2>{{obj.age}}</h2>
     <button @click="add">add</button>
     <button @click="addObj">logobj</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const num = ref(0)
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
    /* 响应式对象一般用reactive 用ref也可以 但在操作时要用obj.value.xxx  模板中不需要加value */
    return {
      num,
      obj,
      add,
      addObj
    }
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
