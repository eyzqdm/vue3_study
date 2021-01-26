<template>
  <div class="home">
    <h2>{{num}}</h2>
    <button @click="add">add</button>
  </div>
</template>
<script >
export default {
  data () {
    return {
      num: 1
    }
  },
  methods: {
    add () {
      this.num = 10
    }
  }
}
</script>
