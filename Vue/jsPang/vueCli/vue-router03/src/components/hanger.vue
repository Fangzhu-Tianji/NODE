<template>
<div>
    <h2>{{msg}}</h2>
    <p>{{$route.params.newsId}}</p>
</div>
</template>

<script>
export default {
    data () {
        return {
            msg: '我是路由中的钩子'
        }
    },
    beforeRouteEnter: (to, form, next) => {
        console.log("准备进入路由模板");
        console.log(to);
        console.log(form);
        next();
    },
    beforeRouteLeave: (to, form, next) => {
        console.log("准备离开路由模板");
        next();
    }
}
</script>

