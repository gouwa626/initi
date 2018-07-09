<template lang="html">
<div class="shooter">
  <div>
    <table class="shootertab">
      <thead>
        <th>排名</th>
        <th>球员</th>
        <th>球队</th>
        <th>进球</th>
        <th>点球</th>
      </thead>
      <tbody>
        <tr v-for="(shooter,index) in shooterlist.res" :key="shooter.key">
          <td>
            <span :class="index<3?'rank':''">{{shooter.rank}}</span>
          </td>
          <td>{{shooter.player_name}}</td>
          <td>{{shooter.team_name}}</td>
          <td>{{shooter.goals}}</td>
          <td>{{shooter.penalties}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  props: {
    shooter: {
      typeof: Object
    },
    selval: {
      typeof:String
    }
  },
  data(){
    return{
      shooterlist:[]
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.axios.get("https://lu.cp988.cn/api/shootersranking?league_id=" + this.shooter.league_id +
    "&season_id=" + this.selval
    ).then(res => {
      this.shooterlist = res.data
    }, res => {
      console.log("Error")
    })
  }
}
</script>

<style lang="css" scoped>
.shooter{
  margin: 6px 9px;
  height: 86vh;
  overflow: scroll;
}
.shootertab{
  width: 100%;
}
.shootertab thead{
  line-height: 30px;
  color: #989898;
}
.shootertab tbody{
  color: #fff;
  background-color: #28292e;
}
.rank{
  display: block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  background-color: #ff737c;
  margin: 0 auto;
  border-radius: 100%;
}
.shootertab tbody tr{
  line-height: 41px;
}
</style>
