/**
 * @date    2017/03/28
 * @version 左工
 */
; (function (window, document, undefined) {
    window.T = {};
    // 通过ID获取标签
    T.$id = function(id){
        return document.getElementById(id);
    };
    //删除左边的空格
    T.ltrim = function(str) {
        return str.replace(/(^\s*)/g,'');
    };
    //删除右边的空格
    T.rtrim = function(str) {
        return str.replace(/(\s*$)/g,'');
    };
    //删除左右两端的空格
    T.trim = function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    };
    //正则
    T.RE = {
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

    /*
     * 用途：获取浏览器版本
     * 返回：{os:**,engine:**,browser:**,version:**}
     */
    T.getBrowser = function () {
        var ua = navigator.userAgent.toLowerCase(),
            re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;
        function toString(object) {
            return Object.prototype.toString.call(object);
        }
        function isString(object) {
            return toString(object) === "[object String]";
        }
        var ENGINE = [
            ["trident", re_msie],
            ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/],
            ["gecko", /\bgecko\/(\d+)/],
            ["presto", /\bpresto\/([0-9.]+)/]
        ];
        var BROWSER = [
            ["ie", re_msie],
            ["firefox", /\bfirefox\/([0-9.ab]+)/],
            ["opera", /\bopr\/([0-9.]+)/],
            ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
            ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//]
        ];
        // 操作系统信息识别表达式
        var OS = [
            ["windows", /\bwindows nt ([0-9.]+)/],
            ["ipad", "ipad"],
            ["ipod", "ipod"],
            ["iphone", /\biphone\b|\biph(\d)/],
            ["mac", "macintosh"],
            ["linux", "linux"]
        ];
        var IE = [
            [6, 'msie 6.0'],
            [7, 'msie 7.0'],
            [8, 'msie 8.0'],
            [9, 'msie 9.0'],
            [10, 'msie 10.0']
        ];
        var detect = function (client, ua) {
            for (var i in client) {
                var name = client[i][0],
                    expr = client[i][1],
                    isStr = isString(expr),
                    info;
                if (isStr) {
                    if (ua.indexOf(expr) !== -1) {
                        info = name;
                        return info
                    }
                } else {
                    if (expr.test(ua)) {
                        info = name;
                        return info;
                    }
                }
            }
            return 'unknow';
        };
        return {
            os: detect(OS, ua),
            browser: detect(BROWSER, ua),
            engine: detect(ENGINE, ua),
            //只有IE才检测版本，否则意义不大
            version: re_msie.test(ua) ? detect(IE, ua) : ''
        };
    };

    /*
     * 用途：获取浏览器类型
     */
    T.myBrowser = function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        }; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }; //判断是否IE浏览器
    };

    // 返回上一级
    T.GoBack = function () {
        if ("IE" == T.myBrowser() || "FF" == T.myBrowser()) {
            top.history.go() || top.history.back();
            //window.location.href = document.referrer;
        }
        else if ("Chrome" == T.myBrowser()) {
            parent.window.history.back(-1);
        }
    };

    /*
     * 用途：基于时间戳生成20位全局唯一标识（每一毫秒只对应一个唯一的标识，适用于生成DOM节点ID）
     */
    T.UUID = function (len) {
        var timestamp = new Date().getTime() || 0,
            chars = 'abcdefghijklmnopqrstuvwxyz',
            uuid = '';
        this.timestamp = this.timestamp == timestamp ? timestamp + 1 : timestamp;
        timestamp = '' + this.timestamp;
        len = len || 20;
        for (var i = 0; i < len; i++) {
            var k = timestamp.charAt(i);
            if (k == '') {
                k = Math.floor(Math.random() * 26);
            }
            uuid += chars.charAt(k) || 'x';
        }
        return uuid;
    };

    /*
     * 用途：生成GUID的方法
     */
    T.Guid = function () {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "-";
        }
        return guid;
    };

    /*
     * 用途：获取input输入的字符
     */
    T.GetInputWord = function (tag) {
        var NumLength = tag.attr('maxlength');
        var ValLength = tag.val().length;
        tag.parent().siblings('.prompt').children('.num').html(ValLength);
        if (ValLength > NumLength || ValLength == NumLength) {
            tag.parent().siblings('.prompt').addClass('red_num');
        }
        else {
            tag.parent().siblings('.prompt').removeClass('red_num');
        }
    };

    /*
     * 用途：获取textarea输入的字符
     */
    T.GetTextWord = function (tag) {
        var NumLength = tag.attr('maxlength');
        var ValLength = tag.val().length;
        tag.siblings('.prompt').children('.num').html(ValLength);
        if (ValLength > NumLength || ValLength == NumLength) {
            tag.siblings('.prompt').addClass('red_num');
        }
        else {
            tag.siblings('.prompt').removeClass('red_num');
        }
    };

    /*
     * 输入纯数字
     * 依赖layer.js
     */
    T.InputNum = function (obj) {
        obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
        if (obj.value === "") {
            layer.alert("请输入数字", { icon: 5 });
            return false;
        }
        //obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
        //obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
        //obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    }

    /*
     * 上传文件控件
     * 依赖WebUploader.js layer.js
     */
    T.UploadFile = function UploadFile(id, box, folder, ExtendFile) {
        var uploader = WebUploader.create({
            auto: true,
            swf: G.DOMAIN.PLANNER + 'lib/WebUploader/Uploader.swf',
            //server: G.DOMAIN.PLANNER + 'api/UpLoadApi/UploadSingleFile?type=' + type,
            server: G.DOMAIN.PLANNER + 'common/uploadifyhandler.ashx?folder=' + folder,
            fileSingleSizeLimit: 10 * 1024 * 1024,//限制大小10M，单文件
            pick: id
            //accept: {
            //    title: 'Applications',
            //    extensions: 'PDF,PPT,PNG,JPG,Word,Excel',
            //    mimeTypes: 'application/PDF,application/powerpoint,image/jpg,image/jpeg,image/png,application/msword,application/excel'   //修改这行
            //}
        });
        uploader.on("error", function (type) {
            if (type == "F_EXCEED_SIZE") {
                layer.alert('文件大小限10M以内', { icon: 5 });
                return false;
            }
        });
        uploader.on('uploadProgress', function (file, percentage) {
            loading = layer.load(2, {
                shade: [0.2, '#000'] //0.2透明度的白色背景
            });
        });
        uploader.on('uploadSuccess', function (file, res) {
            var html = '';
            //if (res.errno == 0) {
            //    layer.closeAll('loading');
            //    html += '<li>';
            //    html += '<a href="' + G.DOMAIN.FILES + ExtendFile + res.data + '" target="_blank" data-file="' + res.data + '">' + file.name + '</a>';
            //    html += '<i class="layui-icon">&#x1006;</i>';
            //    html += '</li>';
            //}
            //else {
            //    layer.closeAll('loading');
            //    layer.alert('上传文件错误', { icon: 5 });
            //}
            var DataUpload = res._raw;
            var DataPath = DataUpload.substr(0, DataUpload.indexOf('|'));
            layer.closeAll('loading');
            html += '<li>';
            html += '<a href="' + G.DOMAIN.FILES + DataPath + '" target="_blank" data-file="' + DataUpload + '">' + file.name + '</a>';
            html += '<i class="layui-icon">&#x1006;</i>';
            html += '</li>';
            box.append(html);
        });
        uploader.on('uploadError', function (file) {
            layer.closeAll('loading');
            layer.alert('上传失败', { icon: 5 });
        });
    };

    /*
     * 提交产品的提示文字
     * 依赖layer.js
     */
    T.UploadTip = function (callback) {
        layer.alert(
            '<p style="font-size:16px;">您已提交产品信息，将在<span style="color:red;">1个工作日内</span>进行审核</p><p style="font-size:12px;color:#777;">请耐心等候，审核结果及下一步操作说明将于站内信通知给您</p>',
            {
                area: ['420px', '180px'],
                title: '提示',
                icon: 1
            },
            function (index, layero) {
                $('#GoBack span').click();
            }
        );
    };

    /*
     * 刷新导航徽章
     */
    T.AgainBadge = function () {
        $.ajax({
            url: G.DOMAIN.PLANNERAPI + 'api/Product/GetProductList',
            type: "GET",
            xhrFields: { withCredentials: true },
            data: {
                statusFlag: 8
            },
            success: function (res) {
                if (res.data.TotalRecord == 0) {
                    $('#productBadge').hide();
                }
                else {
                    $('#productBadge').show();
                    $('#productBadge').html(res.data.TotalRecord);
                }
            },
            error: function (data) {
                layer.alert('提交错误', { icon: 5 });
            }
        });
        $.ajax({
            url: G.DOMAIN.PLANNERAPI + 'api/Subject/GetSubjectDraftList',
            type: "GET",
            xhrFields: { withCredentials: true },
            data: {
                statusFlag: 8
            },
            success: function (res) {
                if (res.data.TotalRecord == 0) {
                    $('#subjectBadge').hide();
                }
                else {
                    $('#subjectBadge').show();
                    $('#subjectBadge').html(res.data.TotalRecord);
                }
            },
            error: function (data) {
                layer.alert('提交错误', { icon: 5 });
            }
        });
    };
    T.AgainBadgeSub = function () {
        $.ajax({
            url: G.DOMAIN.PLANNERAPI + 'api/Product/GetProductList',
            type: "GET",
            xhrFields: { withCredentials: true },
            data: {
                statusFlag: 8
            },
            success: function (res) {
                if (res.data.TotalRecord == 0) {
                    window.parent.document.getElementById('productBadge').style.display = 'none';
                }
                else {
                    window.parent.document.getElementById('productBadge').style.display = 'inline-block';
                    window.parent.document.getElementById('productBadge').innerHTML = res.data.TotalRecord;
                }
            },
            error: function (data) {
                layer.alert('提交错误', { icon: 5 });
            }
        });
        $.ajax({
            url: G.DOMAIN.PLANNERAPI + 'api/Subject/GetSubjectDraftList',
            type: "GET",
            xhrFields: { withCredentials: true },
            data: {
                statusFlag: 8
            },
            success: function (res) {
                if (res.data.TotalRecord == 0) {
                    window.parent.document.getElementById('subjectBadge').style.display = 'none';
                }
                else {
                    window.parent.document.getElementById('subjectBadge').style.display = 'inline-block';
                    window.parent.document.getElementById('subjectBadge').innerHTML = res.data.TotalRecord;
                }
            },
            error: function (data) {
                layer.alert('提交错误', { icon: 5 });
            }
        });
    };

}(window, document));
