<template lang="html">
  <div class="part" v-if="show">
    <div class="header">
      <i class="iconfont icon-zuo" @click="close"></i>
      <span class="text">{{elem.league_name}}</span>
      <span class="select" >
        <select class="seasons" name="" v-model="selval" v-show="selecttab=='sheet'">
          <option :value="val" v-for="(val,index) in list.season_list" :key="val.key">{{index}}</option>
        </select>
      </span>
    </div>
    <div class="detail">
      <div class="tab">
        <div class="tab-items" @click="pictab('sheet')">
          <span :class="selecttab=='sheet'?'tab-active':''">赛程</span>
        </div>
        <div class="tab-items" @click="pictab('score')">
          <span :class="selecttab=='score'?'tab-active':''">积分</span>
        </div>
        <div class="tab-items" @click="pictab('shooter')">
          <span :class="selecttab=='shooter'?'tab-active':''">射手</span>
        </div>
      </div>
      <sheet :schedule="list,elem,selval" v-show="selecttab=='sheet'"></sheet>
      <score :scores="elem,selval" v-show="selecttab=='score'"></score>
      <shooter :shooter="elem,selval" v-show="selecttab=='shooter'"></shooter>
    </div>
  </div>
</template>

<script>
import sheet from './sheet'
import score from './score'
import shooter from './shooter'
export default {
  components: {
    sheet,
    score,
    shooter
  },
  props: {
    elem: {
      typeof: Object
    }
  },
  data() {
    return {
      show: true,
      list: [],
      selval: '',
      selecttab:'sheet'
    }
  },
  created() {
    //do something after creating vue instance
    this.axios.get("https://lu.cp988.cn/api/matchlist?league_id=" + this.elem.league_id + "").then(res => {
      this.list = res.data
      this.selval = res.data.curr_season_id
    }, res => {
      console.log("Error")
    })
  },
  watch: {
    selval: function(val, oldVal) {
      this.axios.get("https://lu.cp988.cn/api/matchlist?league_id=" + this.elem.league_id + "&season_id=" + val + ""
      ).then(res => {
        this.list = res.data
      }, res => {
        console.log("Error")
      })
    }
  },
  methods: {
    close() {
      this.show = !this.show
      this.$emit('close')
    },
    pictab(e){
      this.selecttab=e
    },
    getround(section_id,trunid){
      this.axios.get("https://lu.cp988.cn/api/matchlist?league_id=" + this.elem.league_id +
      "&season_id=" + this.selval + "&section_id=" + section_id+ "&turn_id=" + trunid
      ).then(res => {
        this.list = res.data
      }, res => {
        console.log("Error")
      })

    }
  },

  filters: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      var D = '.' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() == 0 ? date.getMinutes() + '0' : date.getMinutes();
      var s = ':' + date.getSeconds();
      return M + D + '' + h + m;
    }
  }
}
</script>

<style lang="css" scoped>
.part{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #1e2126;
  z-index: 998;
  font-size: 12px;
  overflow: hidden;
}
.header{
  width: 100%;
  height: 40px;
  text-align: center;
  background-color: #2f2f2f;
}
.header i{
  font-size: 20px;
  color: #fff;
  line-height: 40px;
  font-weight: 700;
  float: left;
}
.text{
  color: #fff;
  font-size: 16px;
  line-height: 40px;
  font-weight: 300;
  margin-left: 50px;
}
.select{
  float: right;
  width: 50px;
  height: 18px;
  margin: 10px;

}
.selectnone{
    float: right;
    width: 50px;
    height: 18px;
    margin: 10px;
}
.seasons{
  width: 100%;
  height: 100%;
  appearance:none;
  border:none;
  background: transparent;
  color: #fff;
  padding-left: 4px;
  outline: none;
  border: 1px solid #fff;
  border-radius: 4px;
}
.tab{
  background-color: #56cfb0;
  height: 37px;
  display: flex;
}
.tab-items{
  flex:1;
  text-align: center;
  line-height: 37px;
  font-size: 14px;
}
.tab-items span{
  color: #297380;
}
.tab-items .tab-active{
  padding-bottom: 3px;
  border-bottom: 2px solid #fff;
  color: #fff;
}

</style>
