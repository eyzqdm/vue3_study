<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>{{num}}</h2>
    <h3>{{msg}}</h3>
    <button @click="add">add</button>
  </div>
</template>

<script >
export default {
  props: ['msg'],
  data () {
    return {
      num: 1
    }
  },
  methods: {
    add () {
      this.num++
    }
  }
}
</script>
