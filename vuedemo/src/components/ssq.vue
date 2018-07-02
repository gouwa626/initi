<template>
<div class="d1">
  <router-link :to="{ name: 'HelloWorld', params: {} }">返回主页面</router-link>

  <div class="d2">
    <ul>
      <li v-for="elem in red_ball" :key="elem.key" @click="onclick(elem,sel_red)">
        <span :class="{cli:elem.oncli}">{{elem.content}}</span>
      </li>
    </ul>
  </div>
  <div class="d3">
    <ul>
      <li v-for="blue in blue_ball" :key="blue.key"  @click="onclick(blue,sel_blue)" >
        <span :class="{cli_blue:blue.oncli}">{{blue.content}}</span>
      </li>
    </ul>
  </div>
  <div class="footer">
    <div class="f-left" @click="qink">
      删除
    </div>
    <div class="f-bet">{{sel_ball}}
    </div>
    <div class="f-right">
      确定
    </div>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      red_ball: [],
      blue_ball: [],
      sel_red: [],
      sel_blue: [],
    }
  },
  mounted() {
    // 在渲染页面之前给data中添加33个红球和16个蓝球
    this.addred()
    this.addblue()
  },
  methods: {
    onclick(elem, sel) {
      elem.oncli = !elem.oncli
      if (elem.oncli) {
        sel.push(elem.content)
      } else {
        //找到取消的元素  删除
        for (let i = sel.length - 1; i >= 0; i--) {
          let index = sel[i]
          if (index == elem.content) {
            sel.splice(i, 1)
          }
        }
      }
      // bus.$emit('red', sel);
    },
    addred () {
      for (let i = 1; i < 34; i++) {
        this.red_ball.push({
          content: i,
          oncli: false
        })
      }
    },
    addblue () {
      for (let i = 1; i < 17; i++) {
        this.blue_ball.push({
          content: i,
          oncli: false
        })
      }
    },
    qink () {
      for (let i = 0; i < this.red_ball.length; i++) {
        if (this.red_ball[i].oncli) {
          this.red_ball[i].oncli = false
        }
      }
      for (let i = 0; i < this.blue_ball.length; i++) {
        if (this.blue_ball[i].oncli) {
          this.blue_ball[i].oncli = false
        }
      }
      this.sel_red = []
      this.sel_blue = []
    }
  },
  computed: {
    sel_ball () {
      if (this.sel_red.length >= 6) {
        if (this.sel_blue.length >= 1) {
          return this.sel_blue.length + '注' + this.sel_blue.length * 2 + '元'
        }
      }
      return '0注0元'
    }
  }
}
</script>

<style lang="stylus">
.d1
  ul li
    list-style: none
    width 9%
    height 30px
    line-height 30px
    text-align center
    margin 2% 2%
  li>span
    display block
    width 30px
    height 30px
    line-height 30px
    text-align center
    border-radius 15px
.d1 ul
  display flex
  flex-wrap wrap

.d2 li span
    border 1px solid red

.d3 li span
    border 1px solid blue

.cli
  background-color red
  color #f2f2f2

.cli_blue
  background-color blue
  color #f2f2f2
.footer
    position fixed
    height 50px
    line-height 50px
    display flex
    text-align center
    background #373b47
    color #ffffff
    bottom  0
    left 0
    right 0
    .f-bet
      flex 1
    .f-right
      flex 0 0 105px
      width 105px
      background #f21c0f

</style>
