<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <div class="van-hairline--top"></div>
    <div class="van-ellipsis">这是一段宽度限制 250px 的文字，后面的内容会省略的文字，后面的内容会省略的文字，后面的内容会省略</div>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'Home',
  components: {
    [Button.name]: Button
  }
}
</script>

