<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <div class="van-hairline--top"></div>
    <div class="van-ellipsis">这是一段宽度限制 250px 的文字，后面的内容会省略的文字，后面的内容会省略的文字，后面的内容会省略</div>
    <van-icon name="password-view" />
    <div class="box"></div>
  </div>
</template>

<script>
import { Button, Icon } from 'vant'
export default {
  name: 'Home',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  }
}
</script>

<style scoped>
.box { width: 4rem; height: 200px; background-color: pink; margin: 0 auto; }
</style>


