<template lang="html">
  <div @touchmove.prevent>
    <div class="zk" v-if="show" ref="zk" @touchmove.prevent>
      <div class="zk-content" @touchmove.prevent>
          <div class="top-team">
              <div class="team">
                  <span>{{sel.homeTeam}}</span>
                  <span></span>
                  <span>{{sel.awayTeam}}</span>
              </div>
              <p>{{sel.weekNo}}</p>
          </div>
          <div class="conteam" ref="conteam">
            <div class="cont-team" >
              <div class="cont-spf">
                  <h3>胜平负<span class="log">单</span></h3>
                  <table class="border-topleft">
                      <tbody>
                      <tr :class="sel.spfSaleStatus==0?'no-m':''">
                          <td class="border-rightbottom">
                              <span>胜</span>
                              <span>{{sel.spf.home_odds}}</span>
                          </td>
                          <td class="border-rightbottom">
                              <span>平</span>
                              <span>{{sel.spf.draw_odds}}</span>
                          </td >
                          <td class="border-rightbottom">
                              <span>负</span>
                              <span>{{sel.spf.away_odds}}</span>
                          </td>
                      </tr>
                      </tbody>
                  </table>
              </div>
              <div class="cont-rqspf">
                  <!-- <h3>让球胜平负<span class="${f1=-1?'logf1':'log'}">-1</span></h3> -->
                  <h3>让球胜平负<span>-1</span></h3>
                  <table class="border-topleft">
                      <tbody  :class="sel.rqspfSaleStatus==0?'no-m':''">
                      <tr>
                          <td class="border-rightbottom">
                              <span>胜</span>
                              <span>{{sel.rqspf.home_odds}}</span>
                          </td>
                          <td class="border-rightbottom">
                              <span>平</span>
                              <span>{{sel.rqspf.draw_odds}}</span>
                          </td >
                          <td class="border-rightbottom">
                              <span>负</span>
                              <span>{{sel.rqspf.away_odds}}</span>
                          </td>
                      </tr>
                      </tbody>
                  </table>
              </div>
              <div class="cont-zjqs">
                  <h3>总进球数<span class="log">单</span></h3>
                  <table class="border-topleft">
                      <tbody :class="sel.jqsSaleStatus==0?'no-m':''">
                      <tr >
                          <td class="border-rightbottom">
                              <span>0球</span>
                              <span>{{sel.jqs.zero_odds}}</span>
                          </td>
                          <td class="border-rightbottom">
                              <span>1球</span>
                              <span>{{sel.jqs.one_odds}}</span>
                          </td>
                          <td class="border-rightbottom">
                              <span>2球</span>
                              <span>{{sel.jqs.two_odds}}</span>
                          </td>
                          <td class="border-rightbottom">
                              <span>3球</span>
                              <span>{{sel.jqs.three_odds}}</span>
                          </td>
                      </tr>
                      <tr>
                          <td class="border-rightbottom">
                              <span>4球</span>
                              <span>{{sel.jqs.four_odds}}</span>
                          </td>
                          <td class="border-rightbottom">
                              <span>5球</span>
                              <span>{{sel.jqs.five_odds}}</span>
                          </td>
                          <td class="border-rightbottom">
                              <span>6球</span>
                              <span>{{sel.jqs.six_odds}}</span>
                          </td>
                          <td class="border-rightbottom">
                              <span>7+球</span>
                              <span>{{sel.jqs.seven_odds}}</span>
                          </td>
                      </tr>

                      </tbody>
                  </table>
              </div>
              <div class="cont-bf">
                  <h3>比分<span class="log">单</span></h3>
                  <table class="border-topleft">
                      <!-- <tbody  :class="indexcontests.bfSaleStatus==0?'no-m':''"> -->
                      <tbody>
                      <tr>
                          <td class="border-rightbottom"><span>1:0</span><span>{{sel.bf.home_1v0_odds}}</span></td>
                          <td class="border-rightbottom"><span>2:0</span><span>{{sel.bf.home_2v0_odds}}</span></td>
                          <td class="border-rightbottom"><span>2:1</span><span>{{sel.bf.home_2v1_odds}}</span></td>
                          <td class="border-rightbottom"><span>3:0</span><span>{{sel.bf.home_3v0_odds}}</span></td>
                          <td class="border-rightbottom"><span>3:1</span><span>{{sel.bf.home_3v1_odds}}</span></td>
                          <td class="border-rightbottom"><span>3:2</span><span>{{sel.bf.home_3v2_odds}}</span></td>
                      </tr>
                      <tr>
                          <td class="border-rightbottom"><span>4:0</span><span>{{sel.bf.home_4v0_odds}}</span></td>
                          <td class="border-rightbottom"><span>4:1</span><span>{{sel.bf.home_4v1_odds}}</span></td>
                          <td class="border-rightbottom"><span>4:2</span><span>{{sel.bf.home_4v2_odds}}</span></td>
                          <td class="border-rightbottom"><span>5:0</span><span>{{sel.bf.home_5v0_odds}}</span></td>
                          <td class="border-rightbottom"><span>5:1</span><span>{{sel.bf.home_5v1_odds}}</span></td>
                          <td class="border-rightbottom"><span>5:2</span><span>{{sel.bf.home_5v2_odds}}</span></td>
                      </tr>
                      <tr>
                          <td class="border-rightbottom" colspan="6">
                              <span>其他胜</span>
                              <span>{{sel.bf.home_others_odds}}</span>
                          </td>
                      </tr>
                      <tr>
                          <td class="border-rightbottom"><span>0:0</span><span>{{sel.bf.draw_0v0_odds}}</span></td>
                          <td class="border-rightbottom"><span>1:1</span><span>{{sel.bf.draw_1v1_odds}}</span></td>
                          <td class="border-rightbottom"><span>2:2</span><span>{{sel.bf.draw_2v2_odds}}</span></td>
                          <td class="border-rightbottom"><span>3:3</span><span>{{sel.bf.draw_3v3_odds}}</span></td>
                          <td class="border-rightbottom" colspan="2"><span>其他平</span><span>{{sel.bf.draw_others_odds}}</span></td>
                      </tr>
                      <tr>
                          <td  class="border-rightbottom"><span>0:1</span><span>{{sel.bf.away_0v1_odds}}</span></td>
                          <td  class="border-rightbottom"><span>0:2</span><span>{{sel.bf.away_0v2_odds}}</span></td>
                          <td class="border-rightbottom"><span>1:2</span><span>{{sel.bf.away_1v2_odds}}</span></td>
                          <td class="border-rightbottom"><span>0:3</span><span>{{sel.bf.away_0v3_odds}}</span></td>
                          <td class="border-rightbottom"><span>1:3</span><span>{{sel.bf.away_1v3_odds}}</span></td>
                          <td class="border-rightbottom"><span>2:3</span><span>{{sel.bf.away_2v3_odds}}</span></td>
                      </tr>
                      <tr>
                          <td class="border-rightbottom"><span>0:4</span><span>{{sel.bf.away_0v4_odds}}</span></td>
                          <td class="border-rightbottom"><span>1:4</span><span>{{sel.bf.away_1v4_odds}}</span></td>
                          <td class="border-rightbottom"><span>2:4</span><span>{{sel.bf.away_2v4_odds}}</span></td>
                          <td class="border-rightbottom"><span>0:5</span><span>{{sel.bf.away_0v5_odds}}</span></td>
                          <td class="border-rightbottom"><span>1:5</span><span>{{sel.bf.away_1v5_odds}}</span></td>
                          <td class="border-rightbottom"><span>2:5</span><span>{{sel.bf.away_2v5_odds}}</span></td>
                      </tr>
                      <tr>
                          <td class="border-rightbottom" colspan="6">
                              <span>其他负</span>
                              <span>{{sel.bf.away_others_odds}}</span>
                          </td>
                      </tr>
                      </tbody>
                  </table>
              </div>
              <div class="cont-bqc">
                  <h3>半全场<span class="log">单</span></h3>
                  <table class="border-topleft">
                      <tbody :class="sel.bqcSaleStatus==0?'no-m':''">
                      <tr>
                          <td class="border-rightbottom"><span>胜胜</span><span>{{sel.bqc.home_home_odds}}</span></td>
                          <td class="border-rightbottom"><span>胜平</span><span>{{sel.bqc.away_draw_odds}}</span></td>
                          <td class="border-rightbottom"><span>胜负</span><span>{{sel.bqc.home_away_odds}}</span></td>
                      </tr>
                      <tr>
                          <td class="border-rightbottom"><span>平胜</span><span>{{sel.bqc.draw_home_odds}}</span></td>
                          <td class="border-rightbottom"><span>平平</span><span>{{sel.bqc.draw_draw_odds}}</span></td>
                          <td class="border-rightbottom"><span>平负</span><span>{{sel.bqc.draw_away_odds}}</span></td>
                      </tr>
                      <tr>
                          <td class="border-rightbottom"><span>负胜</span><span>{{sel.bqc.away_home_odds}}</span></td>
                          <td class="border-rightbottom"><span>负平</span><span>{{sel.bqc.away_draw_odds}}</span></td>
                          <td class="border-rightbottom"><span>负负</span><span>{{sel.bqc.away_away_odds}}</span></td>
                      </tr>
                      </tbody>
                  </table>
              </div>
            </div>
          </div>
          <div class="btn-team">
              <span @click="close" v-if="show">取消</span>
              <span>确定</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    sel: {
      typeof: Object
    }
  },
  data() {
    return {
      show: true
    }
  },
  created() {
    //do something after creating vue instance
    this.$nextTick(() => {
      console.log(this)
      this.conteamscroll = new BScroll(this.$refs.conteam, {
        click: true
      })
    })
  },
  methods: {
    close() {
      this.show = !this.show
      this.$emit('close')
    }
  }
}
</script>

<style lang="css" scoped>
.zk{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
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
.team>span:first-child, .team>span:nth-child(2), .team>span:last-child{
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
.conteam{
  height: 380px;
  overflow: hidden;
}
.cont-team{

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
</style>
