<template>
    <div class="left_nav">
        <ul>
            <li>
                <router-link to="/">
                    <i class="iconfont icon-goumai"></i>
                    <div class="name">收银</div>
                </router-link>
            </li>
            <li>
                <router-link to="/page/shop">
                    <i class="iconfont icon-jinrudianpu"></i>
                    <div class="name">店铺</div>
                </router-link>
            </li>
            <li>
                <router-link to="/page/goods">
                    <i class="iconfont icon-31gouwuche"></i>
                    <div class="name">商品</div>
                </router-link>
            </li>
            <li>
                <router-link to="/page/member">
                    <i class="iconfont icon-huiyuanqia"></i>
                    <div class="name">会员</div>
                </router-link>
            </li>
            <li>
                <router-link to="/page/count">
                    <i class="iconfont icon-gongnengjianyi"></i>
                    <div class="name">统计</div>
                </router-link>
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
.left_nav .iconfont { font-size: 24px; color: #fff; }
.left_nav .name { font-size: 14px; line-height: 1; padding-top: 4px; color: #fff; }
</style>


