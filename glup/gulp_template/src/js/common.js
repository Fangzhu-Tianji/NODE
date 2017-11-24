window.G = window.G || {},
G.login = G.login || {};
// 当前域名，得到如：www.cst58.cn
// var _HOSTNAME = location.hostname,
//     // 最后一个点号的位置 15 - 5 = 10 ，截取从第10个字符到最后字符 得到当前域：cst58.cn  
//     _DOMAIN = _HOSTNAME.slice(parseInt(_HOSTNAME.lastIndexOf(".") - 7));
// 域名配置
// G.DOMAIN = {
//     WWW: 'http://www.' + _DOMAIN + '/',
//     PASSPORT: 'http://passport.' + _DOMAIN + '/',
//     BASE: 'http://base.' + _DOMAIN + '/',
//     PAY: 'http://pay.' + _DOMAIN + '/',
//     MEMBER: 'http://member.' + _DOMAIN + '/',
//     IMGS: 'http://imgs.' + _DOMAIN,
//     FILES: 'http://files.' + _DOMAIN,
//     PORTALAPI: 'http://portalapi.' + _DOMAIN + '/',
//     MEMBERAPI: 'http://memberapi.' + _DOMAIN + '/',
//     PLANNERAPI: 'http://planner.' + _DOMAIN + '/',
//     PLANNER: 'http://planner.' + _DOMAIN + '/',
//     UPLOAD: 'http://upload.' + _DOMAIN + '/',
//     DOMAIN: _DOMAIN
// };
// 跨域配置 设置跨域的基域名称必须与后台一致
// document.domain = G.DOMAIN.DOMAIN;

/* * 用途：设置cookie 依赖 jquery.cookie.js*/
G.cookie = function (key, value, day) { if (typeof (key) != "undefined" && typeof (value) != "undefined") { if (day) { $.cookie(key, value, { expires: day, path: "/", domain: G.DOMAIN.DOMAIN }) } else { $.cookie(key, value, { path: "/", domain: G.DOMAIN.DOMAIN }) } } else { if (typeof (key) != "undefined") { return $.cookie(key) } } };
G.bind = function (t, n, o) { t && (t.nodeType || 1 == t.nodeType || 9 == t.nodeType || t.top === e.top) && (t.addEventListener ? t.addEventListener(n, o, !1) : t.attachEvent ? t.attachEvent("on" + n, o) : t["on" + n] = o) };
G.uncookie = function () { $.cookie("__sid", "", { expires: -1, path: "/", domain: G.DOMAIN.DOMAIN }) };
G.RE = {
    number: /^\d+$/,
    mobile: /^1[3|4|5|6|7|8|9]\d{9}$/,
    tel: /^(\d{3,4}-)\d{7,8}$/,
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    mobile_email: /^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    mobile_email_uname: /^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^[_a-zA-Z0-9\-]{4,16}$/,
    code: /^[0-9]{6}$/,
    qq: /^[0-9]{5,12}$/,
    pwd: /^\S{6,16}$/,
    uri: /^[a-zA-z]+:\/\/[^\s]*$/,
    url: /^[a-zA-z]+:\/\/[\w-]+\.[\w-]+\.[\w-]+\S*$/,
    date: /^((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31))|(([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)$/,
    time: /sdf/,
    datetime: /asd/,
    uname: /^[a-zA-Z]\w{5,15}$/,
    nonempty: /\S/,
    size: /\d+[\d.]*[A-za-z]*\*+\d+[\d.]*[A-za-z]*|\d+[*×]\d+/i
};
// G.login.isLogin = $.cookie("__sid");
// G.login.showLogin = function () {
//     if (window.location.pathname.split("/")[1] == "login.html") {
//         $('body').css('display', 'block');
//     }
//     else {
//         // 页面加载判断是否登录
//         if (!G.login.isLogin) {
//             location.href = G.DOMAIN.PLANNER + 'login.html';
//         }
//         else {
//             $('body').css('display', 'block');
//         }
//     }
// };
// G.login.showLogin();
G.login.checklogin = function (fn) {
    var checklogin_flag;
    if (!G.login.isLogin) {
        checklogin_flag = false;
        var href = window.location.href;
        if (href.indexOf(G.DOMAIN.PASSPORT) == -1) {
            window.location.href = G.DOMAIN.PASSPORT + "login.html?backurl=" + href;
        }
        return false;
    }
    else { checklogin_flag = true; fn && fn() }
};
G.login.linkname = G.cookie("__nickname") ? G.cookie("__nickname") : G.cookie("__uname");
G.login.loginback = true;
// G.login.update = function () {
//     if (G.login.isLogin) {
//         $("#loginInfo").html('<li>您好！<a href="' + G.DOMAIN.MEMBER + '" class="num-col">' + G.login.linkname + '</a><span class="vertical-line">|</span></li><li><a id="loginout" href="javascript:void(0)" class="logout-col">退出</a><span class="vertical-line">|</span></li>');
//         $("#AccountSet").html('<a href="' + G.DOMAIN.MEMBER + 'accountmanager.html" class="logo-sets">账户设置</a>');
//     } else {
//         var url = G.DOMAIN.PASSPORT;
//         $("#loginInfo").html('<li><a href="' + url + 'login.html?backurl=' + window.location.href + '" class="log-col">登录</a><span class="vertical-line">|</span></li><li><a href="' + url + 'register.html?backurl=' + window.location.href + '" class="sign-col">注册</a><span class="vertical-line">|</span></li>');
//         $("#AccountSet").remove();
//     }
// };
// G.login.update();
$("#loginout").click(function (e) {
    $.ajax({
        url: G.DOMAIN.PLANNERAPI + "api/MemberLogin/Logout",
        type: "POST",
        xhrFields: { withCredentials: true },
        data: {},
        success: function (data) {
            G.uncookie();
            window.location.href = G.DOMAIN.PLANNER + 'login.html';
        }
    });
});
G.util = G.util || {
    parse: {
        /**
        * 解析URL中的参数 
        * @return {Object} url中参数的键值对形式 {search: Object, hash: Object}
       
        */
        url: function () {
            var a = function (q) {
                var f = (q + "").replace(/(&amp;|\?)/g, "&").split("&");
                var g = {};
                var j = f.length;
                for (var d = 0; d < j; d++) {
                    var h = f[d].indexOf("=");
                    if (-1 == h) {
                        continue
                    }
                    g[f[d].substr(0, h).replace(/[^a-zA-Z0-9_]/g, "")] = decodeURI(f[d].substr(h + 1))
                }
                return g
            };
            var b = location.href.toString().indexOf("#");
            if (b < 0) {
                b = ""
            } else {
                b = location.href.toString().substring(b, location.href.toString().length)
            }
            return {
                search: a(location.search.substr(1)),
                hash: a(b)
            }
        },
        _localurl: null,
        /* 获取URL中的参数值 */
        key: function (str) {
            if (this._localurl == null) {
                this._localurl = G.util.parse.url();
            }
            if (this._localurl) {
                return this._localurl.search[str] || this._localurl.hash[str] || null;
            }
            return null;
        },
        desItem: null,
        desKey: function (str) {
            if (!this.desItem) {
                if (this._localurl == null) {
                    this._localurl = G.util.parse.url();
                }
                if (this._localurl) {
                    var item = this._localurl.search["q"] || this._localurl.hash["q"] || null;
                    if (item) {
                        this.desItem = G.util.des(item);
                    }
                }
            }
            if (this.desItem) {
                var a = function (q) {
                    var f = (q + "").replace(/(&amp;|\?)/g, "&").split("&");
                    var g = {};
                    var j = f.length;
                    for (var d = 0; d < j; d++) {
                        var h = f[d].indexOf("=");
                        if (-1 == h) {
                            continue
                        }
                        g[f[d].substr(0, h).replace(/[^a-zA-Z0-9_]/g, "")] = decodeURI(f[d].substr(h + 1))
                    }
                    return g
                };
                return a(this.desItem)[str];
            }
            return null;
        },
        //获取问号前面部分的url地址
        location: function () {
            var b = location.href.toString().indexOf("?");
            if (b < 0) {
                b = location.href
            } else {
                b = location.href.toString().substring(0, b)
            }
            return b
        },
        /**
	     * 获取URL参数
	     * @param {String} name 必选参数
	     * Return 对应的参数值
	     */
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]); return '';
        },
        /**
	     * 获取URL参数
	     * Return 参数集合
	     */
        getRequest: function () {
            var url = location.search;//获取url中'?'符后的字符串
            var theRequest = {};
            if (url.indexOf('?') < 0) return theRequest;
            var str = url.substr(1);
            strs = str.split('&');
            for (var i = 0; i < strs.length; i++)
                theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
            return theRequest;
        },
        /* 获取页面的跳转链接 即 ?url=后面的URL地址 */
        geturl: function () {
            var b = G.util.parse.url();
            var url = b.search.backurl || b.hash.backurl || G.util.parse.location();
            return url
        },
        /**
        * 对目标字符串进行html编码
        * @name G.util.parse.encodeHtml
        * @function
        * @grammar G.util.parse(a)
        * @param {string} a 目标字符串
        * @remark
        * 编码字符有5个：&<>"'           
        * @returns {string} html编码后的字符串
        */
        encodeHtml: function (a) {
            return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;")
        },
        /**
        * 对目标字符串进行html解码
        * @name G.util.parse.decodeHTML
        * @function
        * @grammar G.util.parse.decodeHTML(a)
        * @param {string} a 目标字符串
        *             
        * @returns {string} html解码后的字符串
        */
        decodeHtml: function (a) {
            return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
        },
        /**
        * 格式化时间戳
        * @param {Integer} ts 待转换时间戳 
        * @param {String} fstr 格式串如y-m-d h:i:s 不区分大小写
        */
        timeFormat: function (c, a) {
            var f = G.util.parse.getTimeInfo(c);
            var b = {
                y: f.year,
                m: f.month,
                d: f.date,
                h: f.hour,
                i: f.minute,
                s: f.sec,
                w: f.week
            };
            G.forEach(b, function (d, g) {
                if (g != "y" && d < 10) {
                    b[g] = "0" + d
                }
            });
            return a.replace(/(?!\\)(y|m|d|h|i|s|w)/gi,
        function (g, d) {
            return b[d.toLowerCase()]
        })
        },
        /**
        * 时间戳转换成时间对象 G.util.parse.getTimeInfo(1293072805) 
        * @remark (new Date()).getTime();生成的是13位的，13位的与10位的区别是13位的包含毫秒数，所以转换是应除以1000 ,G.util.parse.getTimeInfo(1381976597791/1000)
        */
        getTimeInfo: function (b) {
            var a = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            var c = new Date(b * 1000);
            return {
                year: c.getFullYear(),
                month: c.getMonth() + 1,
                date: c.getDate(),
                hour: c.getHours(),
                minute: c.getMinutes(),
                sec: c.getSeconds(),
                week: a[c.getDay()]
            }
        }
    }
};
/*
* @constructor $.fn.bindSelect 
* @description 提示信息集合
* @example $("#ddlUserType").bindSelect(true,enumClass.EnumStatusFlag,function(item){return true;});
* @param 参数 empty:是否加上请选择,data:enumClass对象参数,child: dict, predicate:过滤方法,可以为空
*/
$.fn.bindSelect = function (empty, data, child, predicate) {
    var query = $(this).html("");
    if (empty) {
        query.html("<option value=\"\">--请选择--</option>");
    }
    function levelStr(level) {
        var s = "";
        if (level > 0) {
            s = "|-";
            for (var i = 0; i < level; i++) {
                s = "&nbsp;&nbsp;" + s;
            }
        }
        return s;
    }
    function render(data, level) {
        $.each(data, function (i, item) {
            var value = levelStr(level) + item["v"];
            if (predicate && $.isFunction(predicate)) {
                if (predicate(item)) {
                    query.append("<option enum='" + (item["e"] ? item["e"] : "") + "' value='" + item["n"] + "'" + ">" + value + "</option>");
                }
            } else {
                query.append("<option enum='" + (item["e"] ? item["e"] : "") + "' value='" + item["n"] + "'" + ">" + value + "</option>");
            }
            if (child && item[child]) {
                var d = item[child];
                render(d, level + 1);
            }
        });
    }
    if (data) {
        render(data, 0);
    }
};
//$.fn.bindSelect = function (empty, data, removetag, child, predicate) {
//    var query = $(this).html("");
//    if (empty) {
//        query.html("<option value=\"\">--请选择--</option>");
//    }
//    function levelStr(level) {
//        var s = "";
//        if (level > 0) {
//            s = "|-";
//            for (var i = 0; i < level; i++) {
//                s = "&nbsp;&nbsp;" + s;
//            }
//        }
//        return s;
//    }
//    function render(data, level) {
//        $.each(data, function (i, item) {
//            var value = levelStr(level) + item["v"];
//            if (predicate && $.isFunction(predicate)) {
//                if (predicate(item)) {
//                    query.append("<option enum='" + (item["e"] ? item["e"] : "") + "' value='" + item["n"] + "'" + ">" + value + "</option>");
//                }
//            } else {
//                query.append("<option enum='" + (item["e"] ? item["e"] : "") + "' value='" + item["n"] + "'" + ">" + value + "</option>");
//            }
//            if (child && item[child]) {
//                var d = item[child];
//                render(d, level + 1);
//            }
//        });
//    }
//    if (data) {
//        render(data, 0);
//        for (var i = 0; i < removetag.length; i++) {
//            $(this).children('option[value="' + removetag[i] + '"]').remove();
//        }
//    }
//};
$.fn.bindSelectPro = function (empty, data, child, predicate) {
    var query = $(this).html("");
    if (empty) {
        query.html("<option value=\"\">--请选择--</option>" + "<option value='all'>--全部--</option>");
    }
    function levelStr(level) {
        var s = "";
        if (level > 0) {
            s = "|-";
            for (var i = 0; i < level; i++) {
                s = "&nbsp;&nbsp;" + s;
            }
        }
        return s;
    }
    function render(data, level) {
        $.each(data, function (i, item) {
            var value = levelStr(level) + item["v"];
            if (predicate && $.isFunction(predicate)) {
                if (predicate(item)) {
                    query.append("<option enum='" + (item["e"] ? item["e"] : "") + "' value='" + item["n"] + "'" + ">" + value + "</option>");
                }
            } else {
                query.append("<option enum='" + (item["e"] ? item["e"] : "") + "' value='" + item["n"] + "'" + ">" + value + "</option>");
            }
            if (child && item[child]) {
                var d = item[child];
                render(d, level + 1);
            }
        });
    }
    if (data) {
        render(data, 0);
    }
};

String.prototype.format0 = function (args) {
    var result = this; if (arguments.length > 0) { if (arguments.length == 1 && typeof (args) == "object") { for (var key in args) { if (args[key] != undefined) { var reg = new RegExp("({" + key + "})", "g"); result = result.replace(reg, args[key]) } } } else { for (var i = 0; i < arguments.length; i++) { if (arguments[i] != undefined) { reg = new RegExp("({[" + i + "]})", "g"); result = result.replace(reg, arguments[i]) } } } } return result;
};

/*
* 绑定上传控件
* @parameter (string)   wrapId      应用的容器id
*            (function) callback    回调函数
*            (bool)     notForm     是否存在表单，若存在则必须在Form中加上 enctype="multipart/form-data"
*            (string)   siteName    上传服务分配的siteName，用于确定存储路径
*            (string)   fileType    上传的是文件还是图片
*/
function BindFileUpload(wrapId, callback, notForm, siteName, fileType) {
    if (!callback) {
        alert("请输入回调事件。");
        return;
    }

    if (BindFileUpload.Count == null) BindFileUpload.Count = 0;
    window["BindFileUpload_" + BindFileUpload.Count] = callback;
    var uploadPath = G.DOMAIN.UPLOAD + fileType + '.upload?fmt=3&callback=BindFileUpload_' + BindFileUpload.Count;
    var html = "";
    siteName = siteName || "";

    var accepts = "";    //储存上传文件类型
    var type = "";       //文件类型
    if (fileType == "img") {
        accepts = "image/png,image/gif,image/jpg,image/jpeg,image/PNG,image/GIF,image/JPG,image/JPEG";
        type = "图片";
    }
    else if (fileType == "file") {
        //accepts = "image/png,image/gif,image/jpg,image/jpeg,image/PNG,image/GIF,image/JPG,image/JPEG,application/msword,application/vnd.ms-powerpoint,application/vnd.ms-excel,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        accepts = "application/pdf";
        type = "文件";
    }

    if (notForm) html += "<form method=\"post\" enctype=\"multipart/form-data\" action=\"" + uploadPath  + "\"  target=\"uploadiframe_" + BindFileUpload.Count + "\" style=\"padding:0px;margin:0px;\">";
    html += "<div id='divUploadFileContent" + BindFileUpload.Count + "'>";
    html += '<input type="hidden" name="siteName" value=' + siteName + ' style= "display:none"/>';
    html += '<a href="javascript:;" class="form_upload_file">';
    //html += "<input type=\"file\" id=\"uploadfile\" name=\"uploadfile\" onchange=\"BindFileUpload.OnUploadFile(this.form, \'" + uploadPath+"\' ," + BindFileUpload.Count + "," + notForm + ");\"  multiple='false' accept='image/png,image/gif,image/jpg,image/jpeg,image/PNG,image/GIF,image/JPG,image/JPEG' autocomplete='off'/><span>上传图片</span>";
    html += '<input type="file" name="uploadfile" onchange=BindFileUpload.OnUploadFile(this.form' + ',' + '\'' + uploadPath + '\'' + ',' + BindFileUpload.Count + ',' + notForm + ') accept="' + accepts + '" autocomplete="off"/><span>上传' + type + '</span>';
    html += '</a>';
    html += "</div>";
    if (notForm) html += "</form>";
    html += "<iframe name=\"uploadiframe_" + BindFileUpload.Count + "\" scrolling=\"no\" width=\"100\" height=\"100\" frameborder=\"1\" style=\"display:none;width:0px;height:0px;\" src=\"about:blank\"></iframe> ";
    $("#" + wrapId).html(html);

    BindFileUpload.Count++;
}

/*
* 上传控件的事件
* @parameter (object)   form    表单
*            (number)   number  表单编号
*/
BindFileUpload.OnUploadFile = function (form, uploadPath, number, notForm) {
    if (!notForm) {
        if (BindFileUpload.form != null) {
            form = BindFileUpload.form;
        }
        else {
            form = $("<form enctype=\"multipart/form-data\"></form>")
            form.attr('action', uploadPath)
            form.attr('enctype', 'multipart/form-data')
            form.attr('method', 'post')
            form.attr('style', 'display:none')
            form.attr('target', 'uploadiframe_' + number)

            var formContent = $("#divUploadFileContent" + number).children()
            form.append(formContent);
            form.appendTo("body")
            form = form[0];
        }
    }

    var _action = form.action;
    var _method = form.method;
    var _target = form.target;
    form.setAttribute("method", "post");
    form.setAttribute("target", "uploadiframe_" + number);
    form.setAttribute("action", uploadPath);
    form.submit();
    form.reset();

    if (!notForm) {
        $("#divUploadFileContent" + number).append(formContent);
        $(form).remove();
    }
    form.setAttribute("method", _method);
    form.setAttribute("target", _action);
    form.setAttribute("action", _action);
}

/*
* 上传文件控件回调
* @parameter (object)   res            回调的JSON
*            (string)   appendContent  需要添加的UL
*            (string)   splitPath      拼接的路径
*/
function callbackUploadFile(res, appendContent) {
    if (res.errno == 0) {
        var html = '';
        layer.closeAll('loading');
        html += '<li>';
        html += '<a href="' + res.list[0].FullPath + '" target="_blank" data-file="' + res.list[0].FileName + '|' + res.list[0].ClientFileName + '">' + res.list[0].ClientFileName + '</a>';
        html += '<i class="layui-icon">&#x1006;</i>';
        html += '</li>';
        appendContent.append(html);
    }
    else {
        //alert(res.errmsg);
        layer.alert(res.errmsg, { icon: 5 });
    }
}

/*
* 获取文件控件回调
* @parameter (object)   res            回调的数组
*/
function getUploadFile(resStr, saveFilePath) {
    var arr = resStr.split(',');
    var html = '';
    if (arr[0] == '') {
        html = '';
    }
    else {
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i].split('|');
            html += '<li>';
            html += '<a href="' + G.DOMAIN.FILES + saveFilePath + str[0] + '" target="_blank" data-file="' + arr[i] + '">' + str[1] + '</a>';
            html += '<i class="layui-icon">&#x1006;</i>';
            html += '</li>';
        }
    }    
    return html;
}

/*
* 表单序列化对象
* @example $('form').serializeJson()
*/
$.fn.serializeJson = function () {
    var serializeObj = {};
    $(this.serializeArray()).each(function () {
        serializeObj[this.name] = this.value;
    });
    return serializeObj;
};