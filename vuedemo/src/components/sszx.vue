<template lang="html">
  <div>
    <div class="leaguelist">
      <div class="league" v-for="elem in league_list" :key="elem.key"
                @click="jump(elem,$event)">
        <div class="leagimg">
          <img :src="elem.logo_path">
        </div>
        <p>{{elem.league_name}}</p>
      </div>
    </div>
    <part v-if="show"  :elem="league" @close='close'></part>
</div>
</template>

<script>
import part from './part.vue'
import qs from 'qs'
export default {
  components: {
    part
  },
  data() {
    return {
      league_list: [],
      league:[],
      show: false
    }
  },
  created() {
    //do something after creating vue instance
    this.axios.get("https://lu.cp988.cn/api/leaguelist").then(res => {
      this.league_list = res.data.league_list
    }, res => {
      console.log("Error")
    })
  },
  methods: {
    jump(elem,e) {
      this.show = !this.show
      console.log(e)
      this.league = elem
      console.log(this.league)
    },
    close(){
      this.show = !this.show
    }
  }

}
</script>

<style lang="css">
html,body{
  background: #eaeaea;
}
.leaguelist{
  background: #fff;
  margin:10px;
  display: flex;
  flex-wrap:wrap;
}
.leaguelist>.league:nth-child(3n){

}
.league{
  width: 33.33%;
  font-size: 12px;
  padding: 0 0 6px 0;
  box-sizing: border-box;
}
.leagimg{
  width: 50px;
  height: 60px;
  margin: 15px auto;
}
.leagimg img{
  width: 100%;
}
.league p{
  color: #8a8a8a;
}
</style>
