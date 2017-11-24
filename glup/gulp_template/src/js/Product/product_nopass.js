$(function () {
    // 刷新导航徽章
    T.AgainBadgeSub();
    // 绑定下拉
    $("#ddProductStatusType").bindSelectPro(true, enumClass.EnumProductStatusType, function (item) { return true; });
    var urlSelf = window.location.href;
    //取所有类
    $.ajax({
        url: G.DOMAIN.PLANNERAPI + 'api/Product/GetProductCategoryList',
        type: "GET",
        async: false,
        xhrFields: { withCredentials: true },
        data: {},
        success: function (res) {
            if (res.errno == 0) {
                var inithtml = "";
                var categoryID = "";
                categoryID += '<option value="">--请选择--</option>';
                categoryID += '<option value="all">--全部分类--</option>';
                for (var i = 0; i < res.data.length; i++) {
                    inithtml += ("<div class='layui-form-item'>");
                    inithtml += ("<label class='layui-form-label' >" + res.data[i].CategoryName + "：</label >");
                    inithtml += (" <div class='layui-input-block'>");
                    categoryID += '<option value="' + res.data[i].CategoryID + '">' + '>' + '&nbsp;' + res.data[i].CategoryName + '</option>';
                    for (var j = 0; j < res.data[i].ChildList.length; j++) {
                        switch (res.data[i].ChildList[j].CategoryName) {
                            case "私募股权": inithtml += ("<a href='product_add_1.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=1' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                            case "阳光私募": inithtml += ("<a href='product_add_1.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=2' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                            case "信托": inithtml += ("<a href='product_add_1.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=3' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                            case "资管": inithtml += ("<a href='product_add_1.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=4' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                            case "私募债权": inithtml += ("<a href='product_add_1.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=5' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                            case "公募基金": inithtml += ("<a href='product_add_1.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=6' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                            case "寿险": inithtml += ("<a href='product_add_2.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=7' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                            case "医疗险": inithtml += ("<a href='product_add_2.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=7' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                            case "理财险": inithtml += ("<a href='product_add_2.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=7' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                            case "财产险": inithtml += ("<a href='product_add_2.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=7' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                            case "银行理财": inithtml += ("<a href='product_add_3.html?" + "name=" + res.data[i].ChildList[j].CategoryName + "&key=" + res.data[i].ChildList[j].CategoryKey + "&url=" + urlSelf + "&ProductType=9' class='layui-btn layui-btn-primary btn-bottom'>" + res.data[i].ChildList[j].CategoryName + "</a>"); break;
                        };
                        categoryID += '<option value="' + res.data[i].ChildList[j].CategoryID + '">' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + res.data[i].ChildList[j].CategoryName + '</option>';
                    }
                    inithtml += ("</div>");
                    inithtml += ("</div>");
                }
                $("#add_product_div").empty();
                $("#add_product_div").html(inithtml);
                $("#ddcategoryID").empty();
                $("#ddcategoryID").html(categoryID);
            }
            else {
                parent.location.href = G.DOMAIN.PLANNER + 'login.html';
            }
        },
        error: function (data) {
            alert('提交错误');
        }
    })

});

layui.use(['element', 'form', 'layedit', 'laydate', 'laypage', 'laytpl', 'upload', 'jquery'], function () {
    var element = layui.element(),
        form = layui.form(),
        layedit = layui.layedit,
        laydate = layui.laydate,
        laypage = layui.laypage,
        laytpl = layui.laytpl,
        $ = layui.jquery;

    //分页
    function initPage(curr) {
        $.ajax({
            url: G.DOMAIN.PLANNERAPI + 'api/Product/GetProductList',
            type: "GET",
            xhrFields: { withCredentials: true },
            data: {
                pageIndex: curr || 1,
                pageSize: 15,
                statusFlag: 5
            },
            success: function (res) {
                var TotalPage = res.data.TotalPage;
                //console.log(TotalPage);
                //显示分页
                laypage({
                    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: TotalPage, //通过后台拿到的总页数
                    skin: 'molv',
                    curr: curr || 1, //当前页
                    jump: function (obj, first) { //触发分页后的回调
                        if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                            initPage(obj.curr);
                        }
                        var html = TrimPath.processDOMTemplate("product_list", res);
                        $("#list").empty();
                        $("#list").append(html);
                        $("#PageSum").html(res.data.TotalRecord);
                        form.render();//更新全部
                    }
                });
            },
            error: function (data) {
                layer.alert('提交错误', { icon: 5 });
            }
        })
    };
    //运行
    initPage();

    //日期选择
    var start = {
        min: '1900-01-01 23:59:59'
        , max: '2099-06-16 23:59:59'
        , istoday: false
        , choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        }
    };

    var end = {
        min: laydate.now()
        , max: '2099-06-16 23:59:59'
        , istoday: false
        , choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };

    document.getElementById('start_date').onclick = function () {
        start.elem = this;
        laydate(start);
    }
    document.getElementById('end_date').onclick = function () {
        end.elem = this
        laydate(end);
    }
    
    //监听提交
    form.on('submit(search)', function (data) {
        loading = layer.load(2, {
            shade: [0.2, '#000'] //0.2透明度的白色背景
        });
        var param = data.field;
        var categoryID = param.categoryID;
        var productName = param.productName;
        var productStatusType = param.productStatusType;
        var publishTimeBeg = param.publishTimeBeg;
        var publishTimeEnd = param.publishTimeEnd;
        function pageSearch(curr) {
            $.ajax({
                url: G.DOMAIN.PLANNERAPI + 'api/Product/GetProductList',
                type: "GET",
                xhrFields: { withCredentials: true },
                data: {
                    pageIndex: curr || 1,
                    pageSize: 15,
                    statusFlag: 5,
                    categoryID: categoryID,
                    productName: productName,
                    productStatusType: productStatusType,
                    publishTimeBeg: publishTimeBeg,
                    publishTimeEnd: publishTimeEnd
                },
                success: function (res) {
                    $("#page").empty();
                    var TotalPage = res.data.TotalPage;
                    //显示分页
                    laypage({
                        cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                        pages: TotalPage, //通过后台拿到的总页数
                        skin: 'molv',
                        curr: curr || 1, //当前页
                        jump: function (obj, first) { //触发分页后的回调
                            if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                                pageSearch(obj.curr);
                            }
                            var html = TrimPath.processDOMTemplate("product_list", res);
                            $("#list").empty();
                            layer.close(loading);
                            $("#list").append(html);
                            $("#PageSum").html(res.data.TotalRecord);
                            form.render();//更新全部
                        }
                    });
                },
                error: function (data) {
                    layer.alert('提交错误', { icon: 5 });
                }
            })
        };
        pageSearch();
        return false;
    });

    //全选
    form.on('checkbox(checkAll)', function (data) {
        var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
        child.each(function (index, item) {
            item.checked = data.elem.checked;
        });
        form.render('checkbox');
    });

    //监听提交
    form.on('submit(submits)', function (data) {
        //判断是否有选项
        var is_check = false;
        $("input[lay-filter='checkOne']").each(function () {
            if ($(this).prop('checked')) { is_check = true; }
        });
        if (!is_check) {
            layer.msg('请选择需要提交的产品', { icon: 2, anim: 6, time: 1000 });
            return false;
        };
        //确认提交
        layer.confirm('确定提交?', { title: '提示' }, function (index) {
            loading = layer.load(2, {
                shade: [0.2, '#000'] //0.2透明度的白色背景
            });
            var param = data.field;
            var p = [];
            for (i in param) {
                if (param[i] == "on") {
                }
                else {
                    p.push(param[i]);
                }
            }
            var paramdata = p.join(',');
            $.ajax({
                url: G.DOMAIN.PLANNERAPI + 'api/Product/SubmitProduct',
                type: "GET",
                xhrFields: { withCredentials: true },
                data: {
                    productIDs: paramdata
                },
                success: function (res) {
                    if (res.errno == 0) {
                        layer.close(loading);
                        layer.msg("提交成功", { icon: 1, time: 1000 }, function () {
                            location.reload();
                        });
                    }
                    else {
                        layer.close(loading);
                        layer.msg("提交错误", { icon: 2, anim: 6, time: 1000 });
                    }
                },
                error: function (res) {
                    layer.close(loading);
                    layer.msg("提交错误", { icon: 2, anim: 6, time: 1000 });
                }
            })
        });
        return false;
    });
    //监听单个提交
    $('#table').on('click', '.odd_cancel', function () {
        var paramdata = $(this).attr('data-id');
        layer.confirm('确定提交?', { title: '提示' }, function (index) {
            loading = layer.load(2, {
                shade: [0.2, '#000'] //0.2透明度的白色背景
            });
            $.ajax({
                url: G.DOMAIN.PLANNERAPI + 'api/Product/SubmitProduct',
                type: "GET",
                xhrFields: { withCredentials: true },
                data: {
                    productIDs: paramdata
                },
                success: function (res) {
                    if (res.errno == 0) {
                        layer.close(loading);
                        layer.msg("提交成功", { icon: 1, time: 1000 }, function () {
                            location.reload();
                        });
                    }
                    else {
                        layer.close(loading);
                        layer.msg("提交错误", { icon: 2, anim: 6, time: 1000 });
                    }
                },
                error: function (res) {
                    layer.close(loading);
                    layer.msg("提交错误", { icon: 2, anim: 6, time: 1000 });
                }
            })
        });
    });

    //添加产品
    $('#add_product').click(function () {
        var divs = $('#add_product_div').html();
        layer.open({
            area: ['500px', 'auto'],
            title: '请选择产品分类：',
            content: divs
            , btn: ['取消'],
            yes: function (index, layero) {
                layer.close(index);
            }
        });
    });

    // 查看原因
    $('body').on('click', '.LookCause', function () {
        var vals = $(this).siblings('.LookCausePop').val();
        layer.alert(vals, {
            title: '未通过原因',
            icon: 5
        })
    });

    form.render();//更新全部

});

