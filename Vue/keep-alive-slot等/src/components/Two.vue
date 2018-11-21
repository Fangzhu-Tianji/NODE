<template>
  <div>
    <div v-for="item in iconList" :key="item.desc">
      <p>{{item.desc}}</p>
      <img :src="item.imgUrl" alt="">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Two',
  data () {
    return {
      iconList: [],
      recommendList: [],
      swiperList: [],
    }
  },
  methods: {
    getInfo () {
      axios.get('/api/bins/1e0czu')
        .then(this.getInfoSucc)
    },
    getInfoSucc (res) {
      const ress = res.data.data
      this.iconList = ress.iconList
      console.log(ress)
    }
  },
  mounted () {
    this.getInfo()
    console.log('two-' + 'mounted')
  },
  activated () {
    console.log('two-' + 'activated')
  },
  deactivated () {
    console.log('two-' + 'deactivated')
  }
}
</script>
