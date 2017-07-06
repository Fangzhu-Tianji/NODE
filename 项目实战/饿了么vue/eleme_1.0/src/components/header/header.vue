<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon">></i>
        </div>
      </div>
    </div>
    <div class="bulletn-wrapper"  @click="showDetail">
      <span class="bulletn-title"></span>
      <span class="bulletn-text">{{seller.bulletin}}</span>
      <i class="icon">></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon"  @click="hideDetail">×</i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      hideDetail () {
        this.detailShow = false;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      'star': star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/index"
.header
  background-color: rgba(7,17,27,0.5)
  overflow: hidden
  position: relative
  .content-wrapper
    padding: 24px 12px 18px 24px
    position: relative
    font-size: 0
    .avatar
      display: inline-block
      img
        border-radius: 2px
    .content
      display: inline-block
      margin-left: 16px 
      font-size: 14px
      vertical-align: top
      .title
        margin:2px 0 8px 0
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-img('./imgs/brand')
          background-size: 30px 18px
          background-repeat: no-repeat
          vertical-align: top
        .name
          font-size: 16px
          font-weight: bold
          line-height: 18px
          color: rgb(255, 255, 255)
          margin-left: 6px
          vertical-align: top
      .description
        font-size: 12px
        font-weight: normal
        line-height: 12px
        color: #fff
        margin-bottom: 10px
      .support
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          vertical-align: top
          &.decrease
            bg-img('./imgs/decrease_1')
          &.discount
            bg-img('./imgs/discount_1')
          &.guarantee
            bg-img('./imgs/guarantee_1')
          &.invoice
            bg-img('./imgs/invoice_1')
          &.special
            bg-img('./imgs/special_1')
        .text
          display: inline-block
          font-size: 10px
          font-weight: normal
          line-height: 12px
          color: #fff
          vertical-align: middle
      .support-count
        padding: 7px 8px
        background-color: rgba(0, 0, 0, 0.2)
        border-radius: 20px
        position: absolute
        bottom: 18px
        right: 12px
        .count
          display: inline-block
          font-size: 10px
          font-weight: normal
          line-height: 12px
          color: #fff
          margin-right: 2px
        .icon
          display: inline-block
          font-size: 12px
          line-height: 12px
          font-family: 'Arial'
          color: #fff
  .bulletn-wrapper
    height: 28px
    padding: 0 20px 0 12px
    font-size: 10px
    line-height: 28px
    color: #fff
    background: rgba(7, 17, 27, 0.2)
    font-size: 0
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden
    position: relative
    .bulletn-title
      display:inline-block
      width: 22px
      height: 12px
      bg-img('./imgs/bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
      vertical-align: top
      margin-top: 6px
    .bulletn-text
      font-size: 10px
      line-height: 28px
      margin: 0 8px
      color: #fff
      vertical-align: top
    .icon
      font-size: 14px
      font-family: 'arial'
      color: #fff
      position: absolute
      right: 12px
      top: 0
  .background
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    z-index: -1
    filter: blur(10px)
  .detail
    width: 100%;
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: rgba(7, 17, 27, 0.8)
    backdrop-filter: blur(10px)
    overflow: auto
    z-index: 100
    .detail-wrapper 
      width: 100%
      min-height: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          font-size: 16px
          font-weight: 700
          line-height: 16px
          text-align: center
          color: #fff
        .star-wrapper
          margin-top: 18px
          padding: 2px 0
          text-align: center
        .title
          margin: 28px auto 24px auto
          width: 80%
          display: flex
          .line
           flex: 1
           border-bottom: 1px solid rgba(255,255,255,0.2)
           position: relative
           top: -7px
          .text
            font-size: 14px
            font-weight: 700
            color: #fff
            padding: 0 12px
    .detail-close
      position: relative
      width: 100%
      height: 64px
      background: red
      margin-top: -64px
      text-align: center
      .icon
        font-size: 40px
        font-family: 'arial'
        font-style: normal
        line-height: 64px
        text-align: center
        color: rgba(255,255,255,0.5)
</style>
