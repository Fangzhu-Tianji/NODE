function BindFileUpload(e,t,i,n,a){if(t){null==BindFileUpload.Count&&(BindFileUpload.Count=0),window["BindFileUpload_"+BindFileUpload.Count]=t;var o=G.DOMAIN.UPLOAD+a+".upload?fmt=3&callback=BindFileUpload_"+BindFileUpload.Count,l="";n=n||"";var r="",u="";"img"==a?(r="image/png,image/gif,image/jpg,image/jpeg,image/PNG,image/GIF,image/JPG,image/JPEG",u="图片"):"file"==a&&(r="application/pdf",u="文件"),i&&(l+='<form method="post" enctype="multipart/form-data" action="'+o+'"  target="uploadiframe_'+BindFileUpload.Count+'" style="padding:0px;margin:0px;">'),l+="<div id='divUploadFileContent"+BindFileUpload.Count+"'>",l+='<input type="hidden" name="siteName" value='+n+' style= "display:none"/>',l+='<a href="javascript:;" class="form_upload_file">',l+='<input type="file" name="uploadfile" onchange=BindFileUpload.OnUploadFile(this.form,\''+o+"',"+BindFileUpload.Count+","+i+') accept="'+r+'" autocomplete="off"/><span>上传'+u+"</span>",l+="</a>",l+="</div>",i&&(l+="</form>"),l+='<iframe name="uploadiframe_'+BindFileUpload.Count+'" scrolling="no" width="100" height="100" frameborder="1" style="display:none;width:0px;height:0px;" src="about:blank"></iframe> ',$("#"+e).html(l),BindFileUpload.Count++}else alert("请输入回调事件。")}function callbackUploadFile(e,t){if(0==e.errno){var i="";layer.closeAll("loading"),i+="<li>",i+='<a href="'+e.list[0].FullPath+'" target="_blank" data-file="'+e.list[0].FileName+"|"+e.list[0].ClientFileName+'">'+e.list[0].ClientFileName+"</a>",i+='<i class="layui-icon">&#x1006;</i>',i+="</li>",t.append(i)}else layer.alert(e.errmsg,{icon:5})}function getUploadFile(e,t){var i=e.split(","),n="";if(""==i[0])n="";else for(var a=0;a<i.length;a++){var o=i[a].split("|");n+="<li>",n+='<a href="'+G.DOMAIN.FILES+t+o[0]+'" target="_blank" data-file="'+i[a]+'">'+o[1]+"</a>",n+='<i class="layui-icon">&#x1006;</i>',n+="</li>"}return n}window.G=window.G||{},G.login=G.login||{},G.cookie=function(e,t,i){if(void 0!==e&&void 0!==t)i?$.cookie(e,t,{expires:i,path:"/",domain:G.DOMAIN.DOMAIN}):$.cookie(e,t,{path:"/",domain:G.DOMAIN.DOMAIN});else if(void 0!==e)return $.cookie(e)},G.bind=function(t,i,n){t&&(t.nodeType||1==t.nodeType||9==t.nodeType||t.top===e.top)&&(t.addEventListener?t.addEventListener(i,n,!1):t.attachEvent?t.attachEvent("on"+i,n):t["on"+i]=n)},G.uncookie=function(){$.cookie("__sid","",{expires:-1,path:"/",domain:G.DOMAIN.DOMAIN})},G.RE={number:/^\d+$/,mobile:/^1[3|4|5|6|7|8|9]\d{9}$/,tel:/^(\d{3,4}-)\d{7,8}$/,email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,mobile_email:/^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,mobile_email_uname:/^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^[_a-zA-Z0-9\-]{4,16}$/,code:/^[0-9]{6}$/,qq:/^[0-9]{5,12}$/,pwd:/^\S{6,16}$/,uri:/^[a-zA-z]+:\/\/[^\s]*$/,url:/^[a-zA-z]+:\/\/[\w-]+\.[\w-]+\.[\w-]+\S*$/,date:/^((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31))|(([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)$/,time:/sdf/,datetime:/asd/,uname:/^[a-zA-Z]\w{5,15}$/,nonempty:/\S/,size:/\d+[\d.]*[A-za-z]*\*+\d+[\d.]*[A-za-z]*|\d+[*×]\d+/i},G.login.checklogin=function(e){if(!G.login.isLogin){!1;var t=window.location.href;return-1==t.indexOf(G.DOMAIN.PASSPORT)&&(window.location.href=G.DOMAIN.PASSPORT+"login.html?backurl="+t),!1}e&&e()},G.login.linkname=G.cookie("__nickname")?G.cookie("__nickname"):G.cookie("__uname"),G.login.loginback=!0,$("#loginout").click(function(e){$.ajax({url:G.DOMAIN.PLANNERAPI+"api/MemberLogin/Logout",type:"POST",xhrFields:{withCredentials:!0},data:{},success:function(e){G.uncookie(),window.location.href=G.DOMAIN.PLANNER+"login.html"}})}),G.util=G.util||{parse:{url:function(){var e=function(e){for(var t=(e+"").replace(/(&amp;|\?)/g,"&").split("&"),i={},n=t.length,a=0;a<n;a++){var o=t[a].indexOf("=");-1!=o&&(i[t[a].substr(0,o).replace(/[^a-zA-Z0-9_]/g,"")]=decodeURI(t[a].substr(o+1)))}return i},t=location.href.toString().indexOf("#");return t=t<0?"":location.href.toString().substring(t,location.href.toString().length),{search:e(location.search.substr(1)),hash:e(t)}},_localurl:null,key:function(e){return null==this._localurl&&(this._localurl=G.util.parse.url()),this._localurl?this._localurl.search[e]||this._localurl.hash[e]||null:null},desItem:null,desKey:function(e){if(!this.desItem&&(null==this._localurl&&(this._localurl=G.util.parse.url()),this._localurl)){var t=this._localurl.search.q||this._localurl.hash.q||null;t&&(this.desItem=G.util.des(t))}if(this.desItem){return function(e){for(var t=(e+"").replace(/(&amp;|\?)/g,"&").split("&"),i={},n=t.length,a=0;a<n;a++){var o=t[a].indexOf("=");-1!=o&&(i[t[a].substr(0,o).replace(/[^a-zA-Z0-9_]/g,"")]=decodeURI(t[a].substr(o+1)))}return i}(this.desItem)[e]}return null},location:function(){var e=location.href.toString().indexOf("?");return e=e<0?location.href:location.href.toString().substring(0,e)},getQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),i=window.location.search.substr(1).match(t);return null!=i?decodeURI(i[2]):""},getRequest:function(){var e=location.search,t={};if(e.indexOf("?")<0)return t;var i=e.substr(1);strs=i.split("&");for(var n=0;n<strs.length;n++)t[strs[n].split("=")[0]]=decodeURI(strs[n].split("=")[1]);return t},geturl:function(){var e=G.util.parse.url();return e.search.backurl||e.hash.backurl||G.util.parse.location()},encodeHtml:function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#039;").replace(/"/g,"&quot;")},decodeHtml:function(e){return e.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#0?39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,"&")},timeFormat:function(e,t){var i=G.util.parse.getTimeInfo(e),n={y:i.year,m:i.month,d:i.date,h:i.hour,i:i.minute,s:i.sec,w:i.week};return G.forEach(n,function(e,t){"y"!=t&&e<10&&(n[t]="0"+e)}),t.replace(/(?!\\)(y|m|d|h|i|s|w)/gi,function(e,t){return n[t.toLowerCase()]})},getTimeInfo:function(e){var t=new Date(1e3*e);return{year:t.getFullYear(),month:t.getMonth()+1,date:t.getDate(),hour:t.getHours(),minute:t.getMinutes(),sec:t.getSeconds(),week:["星期天","星期一","星期二","星期三","星期四","星期五","星期六"][t.getDay()]}}}},$.fn.bindSelect=function(e,t,i,n){function a(e,t){$.each(e,function(e,l){var r=function(e){var t="";if(e>0){t="|-";for(var i=0;i<e;i++)t="&nbsp;&nbsp;"+t}return t}(t)+l.v;if(n&&$.isFunction(n)?n(l)&&o.append("<option enum='"+(l.e?l.e:"")+"' value='"+l.n+"'>"+r+"</option>"):o.append("<option enum='"+(l.e?l.e:"")+"' value='"+l.n+"'>"+r+"</option>"),i&&l[i]){a(l[i],t+1)}})}var o=$(this).html("");e&&o.html('<option value="">--请选择--</option>'),t&&a(t,0)},$.fn.bindSelectPro=function(e,t,i,n){function a(e,t){$.each(e,function(e,l){var r=function(e){var t="";if(e>0){t="|-";for(var i=0;i<e;i++)t="&nbsp;&nbsp;"+t}return t}(t)+l.v;if(n&&$.isFunction(n)?n(l)&&o.append("<option enum='"+(l.e?l.e:"")+"' value='"+l.n+"'>"+r+"</option>"):o.append("<option enum='"+(l.e?l.e:"")+"' value='"+l.n+"'>"+r+"</option>"),i&&l[i]){a(l[i],t+1)}})}var o=$(this).html("");e&&o.html("<option value=\"\">--请选择--</option><option value='all'>--全部--</option>"),t&&a(t,0)},String.prototype.format0=function(e){var t=this;if(arguments.length>0)if(1==arguments.length&&"object"==typeof e){for(var i in e)if(void 0!=e[i]){var n=new RegExp("({"+i+"})","g");t=t.replace(n,e[i])}}else for(var a=0;a<arguments.length;a++)void 0!=arguments[a]&&(n=new RegExp("({["+a+"]})","g"),t=t.replace(n,arguments[a]));return t},BindFileUpload.OnUploadFile=function(e,t,i,n){if(!n)if(null!=BindFileUpload.form)e=BindFileUpload.form;else{(e=$('<form enctype="multipart/form-data"></form>')).attr("action",t),e.attr("enctype","multipart/form-data"),e.attr("method","post"),e.attr("style","display:none"),e.attr("target","uploadiframe_"+i);var a=$("#divUploadFileContent"+i).children();e.append(a),e.appendTo("body"),e=e[0]}var o=e.action,l=e.method;e.target;e.setAttribute("method","post"),e.setAttribute("target","uploadiframe_"+i),e.setAttribute("action",t),e.submit(),e.reset(),n||($("#divUploadFileContent"+i).append(a),$(e).remove()),e.setAttribute("method",l),e.setAttribute("target",o),e.setAttribute("action",o)},$.fn.serializeJson=function(){var e={};return $(this.serializeArray()).each(function(){e[this.name]=this.value}),e};