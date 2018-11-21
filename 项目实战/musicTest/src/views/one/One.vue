<template>
  <div>one</div>
</template>

<script>
import { getText } from '@/common/tools.js'
export default {
  name: 'One',
  mounted () {
    console.log(getText('this is goods'))
  }
}
</script>
