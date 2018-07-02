<template>
  <div class="hello">
    <router-link :to="{ name: 'content', params: {} }">content</router-link>
    <router-link :to="{ name: 'ssq', params: {} }">ssq</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
a {
  color: #42b983;
}
</style>
