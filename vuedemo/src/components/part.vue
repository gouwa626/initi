<template lang="html">
  <div class="part">
    <div class="header">
      <i class="iconfont icon-zuo"></i>
      <span class="text">世界杯</span>
      <span class="select">18</span>
    </div>
    <div class="detail">
      <div class="tab">
        <div class="tab-items">
          <span>赛程</span>
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
            <th><span>上一轮</span></th>
            <th colspan="2" class="bs-th"><span>半决赛</span></th>
            <th><span>下一轮</span></th>
          </thead>
          <tr>
            <td width="25%">07.06 22:00</td>
            <td width="25%">乌拉圭</td>
            <td width="25%">VS</td>
            <td width="25%">法国</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  margin-left: 45px;
}
.select{
  float: right;
  width: 50px;
  height: 18px;
  margin: 10px;
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
  color: #fff;
}
.tab-active{
  padding-bottom: 3px;
  border-bottom: 2px solid #fff;
}
.sub{
  margin: 6px 9px;
}
.sheet{
  width: 100%;
}
.sheet thead th{
  padding:6px 0;
}
.sheet .bs-th{
  color: #8a8a8a;
}
.sheet th:first-child{
  text-align: left;
}
.sheet th:last-child{
  text-align:right;
}
.sheet th:first-child span,.sheet th:last-child span{
  display: inline-block;
  width: 70px;
  height: 16px;
  border: 1px solid #8a8a8a;
  border-radius: 4px;
  text-align: center;
  line-height: 16px;
  color: #8a8a8a;
}
.sheet tr {
  height: 30px;
}
</style>
