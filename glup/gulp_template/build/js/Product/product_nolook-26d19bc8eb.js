$(function(){$("#ddProductStatusType").bindSelectPro(!0,enumClass.EnumProductStatusType,function(e){return!0});window.location.href}),layui.use(["element","form","layedit","laydate","laypage","laytpl","upload","jquery"],function(){layui.element();var e=layui.form(),a=(layui.layedit,layui.laydate),t=layui.laypage,n=(layui.laytpl,layui.jquery),o={min:"1900-01-01 23:59:59",max:"2099-06-16 23:59:59",istoday:!1,choose:function(e){l.min=e,l.start=e}},l={min:a.now(),max:"2099-06-16 23:59:59",istoday:!1,choose:function(e){o.max=e}};document.getElementById("start_date").onclick=function(){o.elem=this,a(o)},document.getElementById("end_date").onclick=function(){l.elem=this,a(l)},e.on("submit(search)",function(a){function i(a){n.ajax({url:G.DOMAIN.PLANNERAPI+"api/Product/GetProductList",type:"GET",xhrFields:{withCredentials:!0},data:{pageIndex:a||1,pageSize:15,statusFlag:0,categoryID:l,productName:c,productStatusType:r,publishTimeBeg:d,publishTimeEnd:u},success:function(o){if(0==o.errno){n("#page").empty();var l=o.data.TotalPage;t({cont:n("#page"),pages:l,skin:"molv",curr:a||1,jump:function(a,t){t||i(a.curr);var l=TrimPath.processDOMTemplate("product_list",o);n("#list").empty(),layer.close(loading),n("#list").append(l),n("#PageSum").html(o.data.TotalRecord),e.render()}})}},error:function(e){layer.alert("提交错误",{icon:5})}})}loading=layer.load(2,{shade:[.2,"#000"]});var o=a.field,l=o.categoryID,c=o.productName,r=o.productStatusType,d=o.publishTimeBeg,u=o.publishTimeEnd;return i(),!1}),e.on("checkbox(checkAll)",function(a){n(a.elem).parents("table").find('tbody input[type="checkbox"]').each(function(e,t){t.checked=a.elem.checked}),e.render("checkbox")}),e.on("submit(cancel)",function(e){var a=!1;return n("input[lay-filter='checkOne']").each(function(){n(this).prop("checked")&&(a=!0)}),a?(layer.confirm("确定撤销?",{title:"提示"},function(a){loading=layer.load(2,{shade:[.2,"#000"]});var t=e.field,o=[];for(i in t)"on"==t[i]||o.push(t[i]);var l=o.join(",");n.ajax({url:G.DOMAIN.PLANNERAPI+"api/Product/Revoke",type:"GET",xhrFields:{withCredentials:!0},data:{productIDs:l},success:function(e){0==e.errno?(layer.close(loading),layer.msg("撤销成功",{icon:1,time:1e3},function(){location.reload()})):(layer.close(loading),layer.msg("撤销不成功",{icon:2,anim:6,time:1e3}))},error:function(e){layer.close(loading),layer.msg("提交错误",{icon:2,anim:6,time:1e3})}})}),!1):(layer.msg("请选择需要撤销的产品",{icon:2,anim:6,time:1e3}),!1)}),n("#table").on("click",".odd_cancel",function(){var e=n(this).attr("data-id");layer.confirm("确定撤销?",{title:"提示"},function(a){loading=layer.load(2,{shade:[.2,"#000"]}),n.ajax({url:G.DOMAIN.PLANNERAPI+"api/Product/Revoke",type:"GET",xhrFields:{withCredentials:!0},data:{productIDs:e},success:function(e){0==e.errno?(layer.close(loading),layer.msg("撤销成功",{icon:1,time:1e3},function(){location.reload()})):(layer.close(loading),layer.msg("撤销不成功",{icon:2,anim:6,time:1e3}))},error:function(e){layer.close(loading),layer.msg("提交错误",{icon:2,anim:6,time:1e3})}})})}),n("#add_product").click(function(){var e=n("#add_product_div").html();layer.open({area:["500px","auto"],title:"请选择产品分类：",content:e,btn:["取消"],yes:function(e,a){layer.close(e)}})}),e.render()});