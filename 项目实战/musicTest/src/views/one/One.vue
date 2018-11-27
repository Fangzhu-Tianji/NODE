<template>
  <div>
    <p>one</p>
    <router-link to="/one/oneContent">内容</router-link>
    <div class="list" v-for="item in list" :key="item">
      <img v-lazy="item" alt="">
    </div>
    <loading v-show="!list.length" title="哈喽，您的内容正在加载"></loading>
  </div>
</template>

<script>
import axios from 'axios'
import { getText } from '@/common/tools.js'
import Loading from '@/components/loading/loading'
export default {
  name: 'One',
  data () {
    return {
      list: []
    }
  },
  components: {
    Loading
  },
  mounted () {
    this.getInfo()
    console.log(getText('this is goods'))
  },
  methods: {
    getInfo () {
      axios.get('/api/bins/titdi')
        .then(this.getInfoSucc)
    },
    getInfoSucc (res) {
      const ress = res.data.photo2
      this.list = ress
      console.log(ress)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  width 200px
  height 200px
  margin 0 auto 10px
  img
    display block
    width 100%
    height 100%
</style>

