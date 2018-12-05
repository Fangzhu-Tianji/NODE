<template>
  <div>
    <p>Hello World</p>
    <br>
    <p>{{aaa}}</p>
    <button @click="test1">按钮</button>
  </div>
</template>

<script>
import {helloWorldMixin} from '@/common/js/mixin'
export default {
  name: 'HelloWorld',
  mixins: [helloWorldMixin],
  methods: {
    test1 () {
      this.aaa = '我是helloWorld aaa'
    }
  }
}
</script>
