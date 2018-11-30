<template>
  <div>
    <h1>mapState, mapMutations, mapGetters</h1>
    <div>{{info}}</div>
    <h2>{{pageType}}</h2>
    <h2>{{addition}}</h2>
    <h2>{{T.aaa(55)}}</h2>
    <h2>{{this.$store.state.demoType}}</h2>
    <button @click="changePage">改变页数类型</button>
    <button @click="SET_DEMO_TYPE(3333)">改变demo类型</button>
    <br>
    <br>
    <br>
    <h1>mapActions</h1>
  </div>
</template>

<script>
// tools的封装
import * as T from '@/common/tools'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
// mapState 数据的获取
// mapMutations 数据额提交
// mapGetters 数据的计算
// mapActions 数据的异步操作
export default {
  name: 'HelloWorld',
  data () {
    return {
      info: 'world',
      T: T
    }
  },
  computed: {
    ...mapState(['pageType']),
    ...mapGetters(['addition'])
  },
  mounted () {
    console.log(T.name)
  },
  methods: {
    changePage () {
      this.SET_PAGE_TYPE('第一页')
    },
    ...mapMutations(['SET_PAGE_TYPE', 'SET_DEMO_TYPE'])
  }
}
</script>
