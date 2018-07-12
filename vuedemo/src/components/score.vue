<template lang="html">
<div class="score">
  <div class="scoreitems">
    <table class="scorecont" v-if="!(scorelist.all instanceof Array)"
      v-for="(group,index) in scorelist.all"
      :key="group.key"
      >
      <thead>
        <th>{{index}}组</th>
        <th>{{thname.team}}</th>
        <th>{{thname.site}}</th>
        <th>{{thname.win}}</th>
        <th>{{thname.flat}}</th>
        <th>{{thname.negative}}</th>
        <th>{{thname.enterlose}}</th>
        <th>{{thname.intergral}}</th>
      </thead>
      <tbody>
        <tr v-for="match in group" :key="match.key">
          <td>{{match.ranking}}</td>
          <td>{{match.team_name}}</td>
          <td>{{match.played}}</td>
          <td class="win">{{match.played_won}}</td>
          <td>{{match.played_drawn}}</td>
          <td>{{match.played_lost}}</td>
          <td>{{match.goals_for}}/{{match.goals_against}}</td>
          <td>{{match.points}}</td>
        </tr>
        <tr v-if="scorelist.all==''">
          <td colspan="8">暂无数据</td>
        </tr>
      </tbody>
    </table>

    <table class="scorecontent" v-if="scorelist.all instanceof Array">
      <thead>
        <th>{{thname.group}}</th>
        <th>{{thname.team}}</th>
        <th>{{thname.site}}</th>
        <th>{{thname.win}}</th>
        <th>{{thname.flat}}</th>
        <th>{{thname.negative}}</th>
        <th>{{thname.enterlose}}</th>
        <th>{{thname.intergral}}</th>
      </thead>
      <tbody>
        <tr v-for="mat in scorelist.all"
       :key="mat.key">
          <td><span class="promotion" :style="{background:mat.promotion_color}">{{mat.ranking}}</span></td>
          <td>{{mat.team_name}}</td>
          <td>{{mat.played}}</td>
          <td>{{mat.played_won}}</td>
          <td>{{mat.played_drawn}}</td>
          <td>{{mat.played_lost}}</td>
          <td>{{mat.goals_for}}/{{mat.goals_against}}</td>
          <td>{{mat.points}}</td>
        </tr>
        <tr v-if="scorelist.all==''">
          <td colspan="8">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div class="footer" v-if="scorelist.all instanceof Array">
      <div class="fitems" v-for="(color,index) in scorelist.promotion_list" :key="color.key">
        <span :style="{background:color}"></span>
        <span>{{index}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    scores: {
      typeof: Object
    },
    selval: {
      typeof:String
    }
  },
  data(){
    return{
      scorelist:[],
      thname:{
        group:'A组',
        team:'球队',
        site:'场',
        win:'胜',
        flat:'平',
        negative:'负',
        enterlose:'进/失',
        intergral:'积分',
      }
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.axios.get("https://lu.cp988.cn/api/internalscore?league_id=" + this.scores.league_id +
    "&season_id=" + this.selval
    ).then(res => {
      this.scorelist = res.data
    }, res => {
      console.log("Error")
    })
  }
}
</script>

<style lang="css" scoped>
.score{
  margin: 6px 9px;
  height: 86vh;
  overflow: scroll;
}
.scoreitems{
  padding-bottom: 28%;
}
.scorecont,.scorecontent{
  width: 100%;
  color: #fff;
}
.scorecont tbody,.scorecontent tbody{
  background-color: #28292e;
  border-radius: 8px;
}
.scorecont th,.scorecontent th{
  padding: 10px 0;
  color: #989898;
}
.win{
  color: #ff8087;
  font-weight: 700;
}
.promotion{
  display: block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  margin: 0 auto;
  border-radius: 100%;
}
.scorecont td{
  padding: 16px 0;

}
.scorecontent td{
  padding: 6px 0;
}
.footer{
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 45px;
  color: #b4b4b4;
  background: #28292e;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}
.footer .fitems :first-child{
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  vertical-align: middle;
}
</style>
