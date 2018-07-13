<template>
<div class="hello">
  <div class="navitems">
    <div class="jczq" @click="jumptojczq">
      <div class="jczqimg">
        <img src="@/assets/jczq-logo.png" alt="">
      </div>
      <p>竞彩足球</p>
    </div>
    <div class="ssq" @click="jumptossq">
      <div class="ssqimg">
        <img src="@/assets/ssq-logo.png" alt="">
      </div>
      <p>双色球</p>
    </div>
    <div class="dlt" @click="jumptodlt">
      <div class="dltimg">
        <img src="@/assets/dlt-logo.png" alt="">
      </div>
      <p>大乐透</p>
    </div>
  </div>
  <div class="baritems">
    <div class="sszx" @click="jumptosszx">
      <div class="sszximg">
        <img src="@/assets/sszz.png" alt="">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {

    }
  },
  methods: {
    jumptojczq() {
       this.$router.push('/content');
    },
    jumptossq() {
       this.$router.push('/ssq');
    },
    jumptodlt() {
       // this.$router.push('/content');
    },
    jumptosszx() {
       this.$router.push('/sszx');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.navitems{
  margin: 10px 10px 0;
  padding: 18px 0;
  background: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
}
.jczq,.ssq,.dlt{
  flex: 1;
}
.jczqimg img,.ssqimg img,.dltimg img{
  width: 60px;
}

a {
  color: #42b983;
}
</style>
