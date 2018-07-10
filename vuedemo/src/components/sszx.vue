<template lang="html">
  <div>
    <div class="leaguelist" >
      <div class="league" v-for="elem in league_list" :key="elem.key"
                @click="jump(elem,$event)">
        <div class="leagimg">
          <img :src="elem.logo_path">
        </div>
        <p>{{elem.league_name}}</p>
      </div>
    </div>
    <transition name="slide-fade">
      <part v-if="show"  :elem="league" @close='close'></part>
    </transition>
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
      show: false,
      pageScrollYoffset: 0 // 保存滚动条位置
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
    getScrollTop(){ // 获取滚动条位置
        let scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop){
            scrollTop=document.documentElement.scrollTop;
        }else if(document.body){
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    },
    jump(elem,e) {
      this.pageScrollYoffset = this.getScrollTop();
      this.show = !this.show
      this.league = elem
    },
    close(){
      this.show = !this.show
    }
  },
  watch:{
    show(newVal, oldVal){
      if (newVal == true) {
        let cssStr = "overflow-y: hidden; height: 100%;";
        document.getElementsByTagName('html')[0].style.cssText = cssStr;
        document.body.style.cssText = cssStr;
      } else {
        let cssStr = "overflow-y: auto; height: auto;";
        document.getElementsByTagName('html')[0].style.cssText = cssStr;
        document.body.style.cssText = cssStr;
      }

      // 下面需要这两行代码，兼容不同浏览器
      document.body.scrollTop = this.pageScrollYoffset;
      window.scroll(0, this.pageScrollYoffset);
      }
    }


}
</script>

<style lang="css" >
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
html,body{
  background: #eaeaea;
}
.leaguelist{
  background: #fff;
  margin:10px;
  display: flex;
  flex-wrap:wrap;
}
.open{
  position: fixed;
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
