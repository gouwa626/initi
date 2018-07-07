<template lang="html">
<div class="score">
  <div class="scoreitems">
    <table class="scorecont" v-for="(group,index) in scorelist.all" :key="group.key">
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
          <td>{{match.played_won}}</td>
          <td>{{match.played_drawn}}</td>
          <td>{{match.played_lost}}</td>
          <td>{{match.goals_for}}/{{match.goals_against}}</td>
          <td>{{match.points}}</td>
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
    console.log(this.scores)
    this.axios.get("https://lu.cp988.cn/api/internalscore?league_id=" + this.scores.league_id +
    "&season_id=" + this.selval
    ).then(res => {
      console.log("111111111111")
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
.scorecont th{
  padding: 10px 0;
}
.scorecont td{
  padding: 12px 0;
  background-color: #28292e;
}
</style>
