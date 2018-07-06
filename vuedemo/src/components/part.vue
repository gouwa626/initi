<template lang="html">
  <div class="part" v-if="show">
    <div class="header">
      <i class="iconfont icon-zuo" @click="close"></i>
      <span class="text">{{elem.league_name}}</span>
      <span class="select">
        <select class="seasons" name="" v-model="selval">
          <option :value="val" v-for="(val,index) in list.season_list" :key="val.key">{{index}}</option>
        </select>
      </span>
    </div>
    <div class="detail">
      <div class="tab">
        <div class="tab-items">
          <span class="tab-active">赛程</span>
        </div>
        <div class="tab-items">
          <span>积分</span>
        </div>
        <div class="tab-items">
          <span>射手</span>
        </div>
      </div>
      <div class="sub">
        <table class="sheet">
          <thead>
            <th>
              <span class="lastround" :class="[list.last_section_id==''?' ':'active']"
                @click = "getround(list.last_section_id,list.last_turn_id)"
              >上一轮</span>
            </th>
            <th colspan="2" class="bs-th">
              <span v-if="list.turn_name!=''">第{{list.turn_name}}轮</span>
              <span v-else-if="list.curr_section_name!=''">{{list.curr_section_name}}</span>
              <span v-else>第{{list.turn_name}}轮</span>
            </th>
            <th>
              <span class="nextround" :class="list.next_section_id==''?' ':'active'"
                @click = "getround(list.next_section_id,list.next_turn_id)"
              >下一轮</span>
            </th>
          </thead>
          <tbody>
            <tr v-for="match in list.match_list" :key="match.key"  v-if="!list.match_list==''">
              <td width="25%">{{match.match_time|timestampToTime}}</td>
              <td width="25%">{{match.home_name}}</td>
              <td width="25%" v-if="match.score==''">VS</td>
              <td width="25%" v-else>{{match.score}}</td>
              <td width="25%">{{match.guest_name}}</td>
            </tr>
            <tr v-if="list.match_list==''" class="listnull">
              <td colspan="4">暂无数据</td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    elem: {
      typeof: Object
    }
  },
  data() {
    return {
      show: true,
      list: [],
      selval: ''
    }
  },
  created() {
    //do something after creating vue instance
    this.axios.get("https://lu.cp988.cn/api/matchlist?league_id=" + this.elem.league_id + "").then(res => {
      console.log(res)
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
    getround(section_id,trunid){
      console.log(this.elem.league_id)
      console.log(section_id)
      console.log(trunid)
      this.axios.get("https://lu.cp988.cn/api/matchlist?league_id=" + this.elem.league_id +
      "&season_id=" + this.selval + "&section_id=" + section_id+ "&turn_id=" + trunid
      ).then(res => {
        console.log(res)
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

<style lang="css">
.part{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #1e2126;
  z-index: 20;
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
  border: 1px solid #fff;
  border-radius: 4px;
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
.sub{
  margin: 6px 9px;
  height: 100vh;
  overflow: scroll;
}
.sheet{
  width: 100%;
}
.sheet thead th{
  padding:6px 0;
}
.sheet .bs-th,.sheet tr td:nth-child(1){
  color: #8a8a8a;
}
.sheet th:first-child{
  text-align: left;
}
.sheet th:last-child{
  text-align:right;
}
.lastround,.nextround{
  display: inline-block;
  width: 70px;
  height: 16px;
  border: 1px solid #8a8a8a;
  border-radius: 4px;
  text-align: center;
  line-height: 16px;
  color: #8a8a8a;
}
.active{
  color: #58cfaf;
  border: 1px solid #58cfaf;
}
.sheet tr {
  height: 30px;
  background-color: #28292e;
}
.sub .sheet .listnull td{
  color: #fff;
}
.sheet td{
  padding:10px 0;
  vertical-align: middle;
}
.sheet tr td:nth-child(2),.sheet tr td:nth-child(4){
  color:#fff;
}
.sheet tr td:nth-child(3){
  color: #ff8087;
  font-weight: 700;
}
</style>
