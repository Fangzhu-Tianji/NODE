<template>
    <div class="left_nav">
        <ul>
            <li>
                <i class="iconfont icon-goumai"></i>
                <div class="name">收银</div>
            </li>
            <li>
                <i class="iconfont icon-jinrudianpu"></i>
                <div class="name">店铺</div>
            </li>
            <li>
                <i class="iconfont icon-31gouwuche"></i>
                <div class="name">商品</div>
            </li>
            <li>
                <i class="iconfont icon-huiyuanqia"></i>
                <div class="name">会员</div>
            </li>
            <li>
                <i class="iconfont icon-gongnengjianyi"></i>
                <div class="name">统计</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'leftNav',
    data () {
        return {

        }
    }
}
</script>

<style scoped>
.left_nav { float: left; width: 5%; height: 100%; background-color: #1D8ce0; font-size: 10px; color: #fff; }
.left_nav ul { padding: 0; margin: 0; }
.left_nav ul li { list-style: none; text-align: center; padding: 10px; border-bottom: 1px solid #20a0ff; }
.left_nav .iconfont { font-size: 24px; }
.left_nav .name { font-size: 14px; line-height: 1; padding-top: 4px; }
</style>


