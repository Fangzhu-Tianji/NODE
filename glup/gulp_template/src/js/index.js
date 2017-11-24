$(function () {
    // 判断浏览器版本
    if (T.getBrowser().browser == "ie" && T.getBrowser().version < 10) {
        layer.alert('您的浏览器版本过低，可能存在安全隐患，点击下载高版本浏览器', { icon: 5 }, function () {
            window.open("https://browsehappy.commmmm/");
        });
    };
    // 刷新导航徽章
    // T.AgainBadge();
    $('body').css('display', 'block');
});

layui.use(['layer', 'element'], function () {
    var element = layui.element();
    var layer = layui.layer;
    var $ = layui.jquery;
    
    // 添加登录名
    $('#linkname').text(G.login.linkname);
    //更新缓存
    //$('.update_cache').click(function () {
    //    loading = layer.load(2, {
    //        shade: [0.2, '#000'] //0.2透明度的白色背景
    //    });
    //    $.post(G.DOMAIN.PLANNERAPI + 'api/Product/BuildEnumJs', function (data) {
    //        layer.close(loading);
    //        layer.msg('更新成功', { icon: 1, time: 1000 }, function () {
    //            //location.reload();//do something
    //        });
    //    });
    //});

    //左边菜单点击
    $('.left_menu_ul .layui-nav-item').click(function () {
        $('.left_menu_ul .layui-nav-item').removeClass('layui-this');
        $(this).addClass('layui-this');
        loading = layer.load(2, {
            shade: [0.2, '#000'] //0.2透明度的白色背景
        });
        //遮罩层消失
        $("#admin-iframe").load(function () {
            layer.close(loading);
        });
    });
});