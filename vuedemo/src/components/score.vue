<template lang="html">
<div class="score">
  <div class="scoreitems">
    <table class="scorecont" v-if="!(scorelist.all instanceof Array)"
      v-for="(group,index) in scorelist.all"
      :key="group.key"
      >
      <thead>
        <th>{{index}}组</th>
        <th>球队</th>
        <th>场</th>
        <th>胜</th>
        <th>平</th>
        <th>负</th>
        <th>进/失</th>
        <th>积分</th>
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
      </tbody>
    </table>
    <table class="scorecont" v-else-if="scorelist.all instanceof Array">
      <thead>
        <th>A组</th>
        <th>球队</th>
        <th>场</th>
        <th>胜</th>
        <th>平</th>
        <th>负</th>
        <th>进/失</th>
        <th>积分</th>
      </thead>
      <tbody>
        <tr v-for="mat in scorelist.all"
       :key="mat.key">
          <td>{{mat.ranking}}</td>
          <td>{{mat.team_name}}</td>
          <td>{{mat.played}}</td>
          <td>{{mat.played_won}}</td>
          <td>{{mat.played_drawn}}</td>
          <td>{{mat.played_lost}}</td>
          <td>{{mat.goals_for}}/{{mat.goals_against}}</td>
          <td>{{mat.points}}</td>
        </tr>
      </tbody>
    </table>
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
      scorelist:[]
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

<style lang="css">
.score{
  margin: 6px 9px;
  height: 100vh;
  overflow: scroll;
}
.scorecont{
  width: 100%;
  color: #fff;
}
.scorecont tbody{
  background-color: #28292e;
  border-radius: 8px;
}
.scorecont th{
  padding: 10px 0;
}
.win{
  color: #ff8087;
    font-weight: 700;
}
.scorecont td{
  padding: 16px 0;

}
</style>
