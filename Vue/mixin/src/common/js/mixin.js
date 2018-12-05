export const helloWorldMixin = {
  data () {
    return {
      aaa: '我是默认aaa'
    }
  },
  methods: {
    test1 () {
      this.aaa = '我是mixin aaa'
    }
  }
}
