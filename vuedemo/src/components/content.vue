<template lang="html">
  <div>
    <router-link :to="{ name: 'HelloWorld', params: {} }">返回主页面</router-link>
    <div class="content" v-for="elem in lists.data" :key="elem.key">
      <div class="title">
        <span>{{elem.issue}}</span>
        <i class="ic iconfont icon-xiaosanjiao"></i>
        </div>
      <div class="items" v-for="addr in elem.contests" :key="addr.key">
        <div class="con-item">
          <div class="item-left">
              <p>{{addr.weekNo.slice(2)}}</p>
              <p :style="{color:addr.leagueEventsColor}">{{addr.leagueName}}</p>
              <p>{{addr.saleEndTimeStr|timestampToTime}}截期</p>
              <p>分析</p>
          </div>
          <div class="item-right">
            <div class="r-title">
              <span>{{addr.homeTeam}}</span>
              <span>VS</span>
              <span>{{addr.awayTeam}}</span>
            </div>
            <div class="r-cont">
                <div class="con-top">
                    <div class="z-num">0</div>
                        <div class="guess border js-guess" :class="[addr.spfSingleSale==1?'bor':'',addr.spfSaleStatus==1?'':'none']">
                        <span>胜 {{addr.spf.home_odds}}</span>
                        <span>平 {{addr.spf.draw_odds}}</span>
                        <span>负 {{addr.spf.away_odds}}</span>
                    </div>
                    <div class="guess border" :class="addr.spfSaleStatus==0?'no-m':'none'" >
                        <span>未开售</span>
                    </div>
                </div>
                <div class="con-top">
                    <div class="z-num"  :class="addr.rqspf.handicap > 0 ? 'z-red' : 'f-green'">{{addr.rqspf.handicap > 0 ? '+' + addr.rqspf.handicap : addr.rqspf.handicap}}</div>
                    <div class="guess border js-guess " :class="[addr.rqspfSingleSale==1?'bor':'',addr.spfSaleStatus==1?'':'none']">
                        <span>让胜 {{addr.rqspf.home_odds}}</span>
                        <span>让平 {{addr.rqspf.draw_odds}}</span>
                        <span>让负 {{addr.rqspf.away_odds}}</span>
                    </div>
                    <div class="guess border " :class="[addr.rqspfSingleSale==1?'bor':'' , addr.spfSaleStatus==0?'no-m':'none']" >
                        <span>未开售</span>
                    </div>
                </div>
                <div class="open border" @click = "seldata(addr)" v-on:click="show=!show">
                    <span>展开</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <zhangkai :sel="selzk"  v-if="show" @close='showzk'></zhangkai>
  </div>
</template>

<script>
import qs from 'qs'
import zhangkai from '@/components/zhangkai'
export default {
  components: {
    zhangkai
  },
  data() {
    return {
      lists: [],
      selzk:{},
      show:false
    }
  },
  mounted() {
    //do something after mounting vue instance
    // axios发送请求数据
    this.axios.post("https://trade-schedule.cp988.cn/api/v2/schedules/app/contest/list",
      qs.stringify({
        lotteryType: 'TC_JCZQ'
      })
    ).then(res => {
      this.lists = res.data
    }, res => {
      console.log("Error")
    })
  },
  methods: {
    seldata(addr){
      this.selzk = addr
    },
    showzk(){
      this.show = !this.show
    }
  },
  filters:{
    timestampToTime(timestamp){
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes();
        var s = ':' + date.getSeconds();
        return h + m;
    }
  }

}
</script>

<style lang="css" scoped>
html{
    background-color: #f2f2f2;
}
.container{
    width: 100%;
    padding: 0 0 60px 0;
}
.content{
    width: 100%;
}
.title{
    height: 26px;
    line-height: 26px;
    padding: 0 10px;
    color: #a7a7a7;
    background-color: #f2f2f2;
    text-align: left;
    font-size: 14px;
}
.ic{
    float: right;
    color: #c7c7c7;
}
.hidden{
    display: none;
}
.con-item{
    background-color: #fff;
    display: flex;
    padding: 0 10px 10px;
    margin-bottom: 10px;
}
.item-left{
    width: 78px;
    padding-top: 5px;
}
.item-left .it-color{
    color: #ff3333;
}
.item-left p{
    font-size: 12px;
    color: #333;
    font-weight: 300;
    text-align: center;
    margin-top: 12px;
}
.item-right{
    width: 80%;

}
.r-title{
    display: flex;
    height: 44px;
    line-height: 44px;
}
.r-title>span{
    color: #333;
    font-weight: 700;
}
.r-title>span:first-child{
    flex: 6;
    text-align: right;
}
.r-title>span:nth-child(2){
    flex: 0 0 60px;
    text-align: center;
}
.r-title>span:last-child{
    flex: 7;
    text-align: left;
}
.con-top{
    display: flex;
}
.r-cont{
    position: relative;
    padding-right: 35px;
    font-size: 12px;
}
.z-num{
    width: 18px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background-color: #ccc;
    border-radius: 6px 0 0 0;

}
.z-num .border:before{
    border-radius: 6px 0 0 0;
}
.f-green{
    border-radius: 0 0 0 6px;
    background-color: #50af10;
}
.z-red{
    border-radius: 0 0 0 6px;
    background-color: #f95858;
}
.guess{
    width: 100%;
    display: flex;
    align-items: center;
    margin-right: 2px;
    justify-content: center;
}
.guess span{
    display: block;
    width: 34%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    position: relative;
    z-index: 20;
}
.xz-red{
    color: #fff;
    background-color: #f21c0f;
}
.xz-zk-red,.cli-red{
    color: #fff ;
    background-color: #f95858;
}
.xz-zk-red>span:last-child,.cli-red>span:last-child{
    color: #fff !important;
}
.bor.border:before{
    border-color: #f95858;
}
.open{
    width: 37px;
    height: 60px;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    border-radius: 0 4px 4px 0;
}
.open span{
    display: block;
    margin: 0 auto;
    width: 14px;
    text-align: center;
    line-height: 13px;
    color: #f95858;
    font-size: 12px;
    z-index: 20;

}
.zk{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    overflow: hidden;
    display: none;
    overflow-y: hidden;
}
.zk-content{
    position: absolute;
    left: 15px;
    right: 15px;
    top: 50%;
    bottom: 0;
    transform: translateY(-50%);
    box-sizing: border-box;
    padding: 0 15px 55px;
    height: 500px;
    background: #fff;
    border-radius: 10px;

}
.top-team{
    width: 100%;
}
.team{
    width: 100%;
    display: flex;
    height: 45px;
    line-height: 30px;
}
.team>span{
    text-align: center;
    height: 30px;
    line-height: 30px;
}
.team>span:first-child{
    flex: 1;
}
.team>span:nth-child(2){
    flex: 1;
}
.team>span:last-child{
    flex: 1;
}
.top-team .team>span:nth-child(2){
    /* background: url(../assets/images/vs.png); */
    background-size: 45px 45px;
    width: 45px;
    height: 45px;
    position: absolute;
    left: 50%;
    top: -3%;
    z-index: 80;
    margin: 0 0 0 -22px;
}
.top-team>p{
    text-align: center;
    font-size: 12px;
    color: #333;
}
.cont-team{
    height: 380px;
    overflow: scroll;
}
.cont-team .log{
    width: 15px;
    height: 15px;
    text-align: center;
    background: #f95858;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
    margin-left: 5px;
}
.cont-team .logf1{
    width: 15px;
    height: 15px;
    text-align: center;
    color:  #f95858;
    font-size: 12px;
    border-radius: 2px;
    margin-left: 5px;
}
.cont-team h3{
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #333333;
}
table{
    width: 100%;
}
.cont-spf table td,.cont-rqspf table td,.cont-zjqs table td,.cont-bf table td,.cont-bqc table td{
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
}
.cont-bf table td span{
    display: block;
}
.cont-spf table td span,.cont-rqspf table td span,.cont-zjqs table td span,.cont-bqc table td span{
    display: inline-block;
    width: 47%;
}
.cont-bf table td span{
    height: 20px;
    line-height: 20px;
}
.cont-team table td>span:last-child{
    color: #c6c6c6;
}
.btn-team{
    display: flex;
    justify-content: space-around;
    padding-top: 15px;
}
.btn-team span{
    display: inline-block;
    width: 120px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    border-radius: 4px;
    font-size: 12px;
}
.btn-team span:last-child{
    background: #f21c0f;
    color: #ffffff;
}
.btn-team span:first-child{
    background: #cccccc;
    color: #333;
}
.shopcar{
    position: fixed;
    height: 50px;
    line-height: 50px;
    display: flex;
    text-align: center;
    background:#373b47;
    color: #ffffff;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 80;
}
.shopcar .cut{
    flex: 0 0 60px;
    width: 60px;
    height: 20px;
    line-height: 20px;
    margin: 15px 0;
}
.shopcar .cut i{
    width: 60px;
    padding-top: 5px;
    font-size: 30px;
    z-index: 21;
}
.shopcar .pitch{
    flex:1;
}
.shopcar .ensure{
    flex:0 0 105px;
    width: 105px;
    background: #f21c0f;

}
.none{
    display: none;
}
.no-m{
    pointer-events: none;
}
</style>
