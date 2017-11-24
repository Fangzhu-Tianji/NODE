layui.use('form', function () {
    var form = layui.form(),
        $ = layui.jquery;

    // 页面加载默认加入一个图片
    //updateVCode();
    //$("#validateimg").on("click", function () {
    //    updateVCode();
    //});
    
    //监听提交
    form.on('submit(login)', function (data) {
        loading = layer.load(2, {
            shade: [0.2,'#000'] //0.2透明度的白色背景
        });
        var param = data.field;
        param.UserPwd = hex_md5(param.UserPwd);
        param.EquipmentSource = 1;
        param.ChannelSource = 1;
        //$.post(G.DOMAIN.MEMBERAPI + 'api/MemberLogin/Login',param,function(data){
        //   //if(data.code == 200){
        //   //  layer.close(loading);
        //   //  layer.msg(data.msg, {icon: 1, time: 1000}, function(){
        //   //    location.href = '';
        //   //  });
        //   //}else{
        //   //  layer.close(loading);
        //   //  layer.msg(data.msg, {icon: 2, anim: 6, time: 1000});
        //   //  jq('.captcha img').attr('src','/captcha?id='+Math.random());
        //   //}
        //    console.log(data)
        // });
        $.ajax({
            url: G.DOMAIN.PLANNERAPI + "api/MemberLogin/Login",
            type: "POST",
            xhrFields: { withCredentials: true },
            data: param,
            success: function (data) {
                if (data.errno == 0) {
                    layer.close(loading);
                    G.cookie("__sid", data.data.Sid, 7);
                    G.cookie("__uname", data.data.UserName, 7);
                    G.cookie("__nickname", data.data.NickName, 7);
                    location.href = G.DOMAIN.PLANNER + 'index.html';
                }
                else {
                    layer.close(loading);
                    layer.alert(data.errmsg, { icon: 5 });
                }
            },
            error: function (data) {
                layer.close(loading);
                layer.alert('提交错误', { icon: 5 });
            }
        })
        return false;


       
    });
});

//更新图片验证码
//function updateVCode() {
//    $("#validateimg").attr("src", G.DOMAIN.MEMBERAPI + "api/MemberLogin/GetCheckCode?r=" + Math.random());
//}