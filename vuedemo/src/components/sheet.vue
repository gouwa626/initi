<template lang="html">
  <div class="sub">
    <ul class="title">
      <li>
        <span class="lastround" :class="[sheetlist.last_section_id==''?' ':'active']"
          @click = "getround(sheetlist.last_section_id,sheetlist.last_turn_id)"
        >上一轮</span>
      </li>
      <li>
        <span v-if="sheetlist.turn_name!=''">第{{sheetlist.turn_name}}轮</span>
        <span v-else-if="sheetlist.curr_section_name!=''">{{sheetlist.curr_section_name}}</span>
        <span v-else>第{{sheetlist.turn_name}}轮</span>
      </li>
      <li>
        <span class="nextround" :class="[sheetlist.next_section_id==''?' ':'active']"
          @click = "getround(sheetlist.next_section_id,sheetlist.next_turn_id)"
        >下一轮</span>
      </li>
    </ul>
    <table class="sheet" v-if="sheetlist.match_list instanceof Array">
      <tbody>
        <tr v-for="match in sheetlist.match_list"
          :key="match.key"
          v-if="!sheetlist.match_list==''">
          <td width="25%">{{match.match_time|timestampToTime}}</td>
          <td width="25%">{{match.home_name}}</td>
          <td width="25%" v-if="match.score==''">VS</td>
          <td width="25%" v-else>{{match.score}}</td>
          <td width="25%">{{match.guest_name}}</td>
        </tr>
        <tr v-if="sheetlist.match_list==''" class="listnull">
          <td colspan="4">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <table class="sheet" v-else-if="sheetlist.match_list instanceof Object&&!sheetlist.match_list==''"
      v-for="(matchs,index) in sheetlist.match_list"
      :key="matchs.key"
      >
      <thead >
        <th>{{index}}组时间</th>
        <th>主队</th>
        <th>比分</th>
        <th>客队</th>
      </thead>
      <tbody>
        <tr v-for="match in matchs" :key="match.key">
          <td width="25%">{{match.match_time|timestampToTime}}</td>
          <td width="25%">{{match.home_name}}</td>
          <td width="25%" v-if="match.score==''">VS</td>
          <td width="25%" v-else>{{match.score}}</td>
          <td width="25%">{{match.guest_name}}</td>
        </tr>
        <tr v-if="sheetlist.match_list==''" class="listnull">
          <td colspan="4">暂无数据</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    schedule: {
      typeof: Object
    },
    selval: {
      typeof:String
    },
    elem: {
      typeof: Object
    }
  },
  data(){
    return{
      sheetlist:{}
    }
  },
  watch: {
    //获取到父组件的数据后保存
   schedule: function (newQuestion, oldQuestion) {
     this.sheetlist = newQuestion
   }
 },
  methods: {
    getround(section_id,trunid){
      this.axios.get("https://lu.cp988.cn/api/matchlist?league_id=" + this.elem.league_id +
      "&season_id=" + this.selval + "&section_id=" + section_id+ "&turn_id=" + trunid
      ).then(res => {
        this.sheetlist = res.data
      }, res => {
        console.log("Error")
      })
    },

  },
  filters: {
    timestampToTime(timestamp) {
      var timestemp = timestamp.replace(/\s+/g,'T');
      var date = new Date(timestemp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      var D = '.' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':';
      var m = date.getMinutes() == 0 ? date.getMinutes() + '0' : date.getMinutes();
      var s = ':' + date.getSeconds();
      return M + D + '' + h + m;
    }
  }

}
</script>

<style lang="css" scoped>
.sub{
  margin: 6px 9px;
  height: 86vh;
  overflow: scroll;
}
.sheet{
  width: 100%;
}
.title{
  display: flex;
  justify-content: center;
  padding: 6px 0;
}
.sheet .bs-th,.sheet tr td:nth-child(1){
  color: #8a8a8a;
}
.title li{
  flex: 1;
  color: #8a8a8a;
}
.title :first-child{
  text-align: left;
}
.sub .title li span{
  display: inline-block;
  width: 70px;
  height: 16px;
  line-height: 16px;
  text-align: center;
}
.title :last-child{
  text-align: right;
}
.title .lastround,.title .nextround{
  border: 1px solid #8a8a8a;
  border-radius: 4px;
  color: #8a8a8a;
}
.title .active{
  color: #58cfaf;
  border: 1px solid #58cfaf;
}
.sheet tr,.sheet thead {
  height: 30px;

}
.sub .sheet .listnull td,.sheet th{
  color: #fff;
}
.sheet td,.sheet th{
  padding:12px 0;
  vertical-align: middle;
}
.sheet{
  margin-bottom: 3px;
  background-color: #28292e;
  border-radius: 8px;
}
.sheet tr td:nth-child(2),.sheet tr td:nth-child(4){
  color:#fff;
}
.sheet tr td:nth-child(3){
  color: #ff8087;
  font-weight: 700;
}
</style>
