<template lang="html">
  <div>
  <h1>condejs Api Test</h1>
  <ul>
      <li v-for="item in lists" v-bind:key="item.id">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      lists:[]
    }
  },
  created() {
    //do something after creating vue instance
    this.get_data()
  },
  methods: {
    get_data(params) {
      var v = this
      if(!params) params = {}
      v.$api.get('topics',params,function(r){
        v.lists = r.data
      })
    }
  }
}
</script>

<style lang="css">
</style>
