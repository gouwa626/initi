<template lang="html">
  <div class="app" ref="app">
    <div class="container" ref="container" >
    <router-link :to="{ name: 'HelloWorld', params: {} }">返回主页面</router-link>
    <div class="content" v-for="elem in lists.data" :key="elem.key">
      <div class="title">
        <span>{{elem.issue}}</span>
        <i class="ic iconfont icon-xiaosanjiao" @click="toggle(elem)"></i>
        </div>
      <div class="items" v-for="addr in elem.contests" :key="addr.key" v-show="elem.show">
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
                    <div class="guess border js-guess " :class="[addr.rqspfSingleSale==1?'bor':'',addr.rqspfSaleStatus==1?'':'none']">
                        <span>让胜 {{addr.rqspf.home_odds}}</span>
                        <span>让平 {{addr.rqspf.draw_odds}}</span>
                        <span>让负 {{addr.rqspf.away_odds}}</span>
                    </div>
                    <div class="guess border " :class="[addr.rqspfSingleSale==1?'bor':'' , addr.rqspfSaleStatus==0?'no-m':'none']" >
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
    </div>
    <zhangkai :sel="selzk"  v-if="show" @close='showzk'></zhangkai>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import qs from 'qs'
import zhangkai from '@/components/zhangkai'
export default {
  components: {
    zhangkai
  },
  data() {
    return {
      lists: [],
      selzk: {},
      show: false,
    }
  },
  created() {
    // axios发送请求数据
    this.axios.post("https://trade-schedule.cp988.cn/api/v2/schedules/app/contest/list",
      qs.stringify({
        lotteryType: 'TC_JCZQ'
      })
    ).then(res => {
      // 给每一组比赛添加一个show属性,默认是true
      res.data.data.map(function(item) {
        item.show = true
      })
      this.lists = res.data
      this.$nextTick(() => {
        this._initScroll()
      })
    }, res => {
      console.log("Error")
    })

  },
  methods: {
    seldata(addr) {
      this.selzk = addr
    },
    showzk() {
      this.show = !this.show
      document.addEventListener('touchmove', function(e){e.preventDefault();}, false);
    },
    toggle(elem) {
      elem.show = !elem.show
    },
    _initScroll() {
      this.appscroll = new BScroll(this.$refs.app, {
        click:true
      })
      // this.containerscroll = new BScroll(this.$refs.container, {
      //   click:true
      // })
    }

  },

  filters: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
.app{
  height: 100vh;
  overflow: hidden;
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
