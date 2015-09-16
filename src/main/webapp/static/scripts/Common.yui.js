/*
 * 功能：公共函数库
 * 作者：梁鸿茂(redcapliang@163.com)
 * 日期：2007-10-22
 */
//window.document.domain = 'hzins.com';
$.ajaxSettings.contentType = "application/x-www-form-urlencoded; charset=utf-8";

// 产生随机数
function Rand(num) {
    if (num == null) num = 9999;
    return Math.floor(Math.random() * num) + Math.random();
}

// 组装地址栏参数
var Request = new Object();
function LoadQueryString() {
    var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1)     // 去掉?号
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
}
LoadQueryString();

/*
 * 消息对象
 * @parameter (object)   data    对象，下面是参数说明
 *            (string)   text    提示信息
 *            (number)   delay   N毫秒后隐藏
 *            (string)   icon    是否验证表单，默认为true
 *            (string)   select  元素ID-触发此元素的select事件-为空则触发最后一个text元素
 */
var Message = {
    show: function (data) {
        if (data == undefined) return false;
        data = (typeof (data) == "string") ? {text: data} : data;
        var msg = Message.Instance;
        if (!msg) {
            msg = Message.Instance = $("#divMessage");
            var strHtml = '<div style="background:white;color:#444;font:12px tahoma,arial,helvetica;padding:10px;margin:0;height:auto;">';
            strHtml += '    <img id="imgMsgIcon" src="http://images.hzins.com/long/k/Dialog/loading.gif" style="margin-right:8px;float:left;vertical-align:top;" />';
            strHtml += '    <img src="http://images.hzins.com/long/k/Dialog/off.gif" style="float:right;vertical-align:top;cursor:pointer" onclick="Message.hide();" title="关闭" />';
            strHtml += '    <div id="divMsgContent" style="padding:6px; padding-left:41px;font-weight:bold"></div>';
            strHtml += '</div>';
            msg.attr("style", "padding:2px;border:1px solid #ccc;");
            msg.attr("class", "divMessage");
            msg.html(strHtml);
        }

        var message = data.text || data.Message;
        message = message || (data.IsSuccess ? "操作成功！" : "很抱歉，系统繁忙，请您稍候再尝试！");
        $("#divMsgContent").html(message);
        msg.fadeIn("slow");
        icon = data.icon || (data.IsSuccess ? 'success' : 'warning');
        this.icon(icon);
        //this.select(data.select);
        if (data.delay) this.hide(data.delay);
        if (data.position) {
            msg.css("width", "400px");
            UserLoginPanelStyle(".divMessage");
        }
    },
    hide: function (delay) {
        if (delay) {
            setTimeout(function () {
                Message.hide();
            }, delay);
            return false;
        }
        if (Message.Instance) Message.Instance.fadeOut("slow");
    },
    icon: function (name) {
        name = name || "info";
        $("#imgMsgIcon").attr("src", "http://images.hzins.com/long/k/Dialog/" + name + ".gif");
    },
    select: function (id) {
        id = id == undefined ? "input[type=text]:last" : "#" + id;
        $(id).trigger("select");
    },
    loading: function () {
        this.show({
            icon: 'loading',
            text: '正在处理中，请稍候......<br /><span style="color:#c0c0c0;font-weight:normal">长时间没有响应?请<a href="http://www.hzins.com/help/" target="_blank" style="color:#c0c0c0;text-decoration:none;">联系客服中心</a>.</span>'
        });
    },
    error: function (xml) {
        // Login timeout
        if (xml.statusText === "OK") {
            eval(xml.responseText);
            return false;
        }

        var obj = (typeof (xml) == "string") ? {icon: 'error', text: xml} : {
            icon: 'error',
            text: "很抱歉，本次操作遇到问题，请尝试以下方法：<br/>● 清除浏览网页的缓存<br/>&nbsp;● 清除浏览网页的Cookies<br/>&nbsp;● Ctrl+F5 强制刷新页面<br/>&nbsp;● 可能网络问题，过5分钟后再尝试<br/>[" + xml.statusText + "]"
        };
        this.show(obj);

        if (Request["debug"] == "true") {
            var errorHtml = "<b>AajxStatus:</b>" + status + "<br/><b>responseText:</b>" + xml.responseText + "<br/><b>readyState:</b>";
            errorHtml += xml.readyState + "<br/><b>statusText:</b>" + xml.statusText;
            $("body").append(errorHtml);
        }
    }
}

// 登录框样式
function UserLoginPanelStyle(className) {
    // if IE 6
    if (typeof document.body.style.maxHeight === "undefined") {
        $("body", "html").css({height: "100%", width: "100%"});
    }

    className = className || ".popup-login";
    var obj = $('[@class="' + className.replace('.', '') + '"]');
    var left = (document.documentElement.clientWidth - obj.attr("clientWidth")) / 2 + document.documentElement.scrollLeft + "px";
    setTimeout(function () {
        var top = (document.documentElement.clientHeight - obj.attr("clientHeight")) / 2 + document.documentElement.scrollTop + "px";
        obj.css({zIndex: 101, top: top, left: left, position: "absolute"});
    }, 100);
}

/*
 * 执行业务逻辑
 * @parameter (object)   params      对象，下面是参数说明
 *            (string)   formId      回调函数，默认为form
 *            (string)   url         请求地址
 *            (bool)     isValidate  是否验证表单，默认为true
 *            (function) callback    回调函数
 *            (string)   dataType    返回的数据类型，默认为script
 *            (string)   data        要提交的数据，默认为表单中的数据
 * @return (bool) false
 */
function ProcessExecute(params) {
    params = (typeof (params) == "string") ? {url: params} : params;
    var isValidate = (params.isValidate == undefined) ? true : params.isValidate;
    var formId = params.formId || "form";
    if (isValidate && !$("#" + formId).form('validate')) {    // JQuery验证方式
        //if (isValidate && !$("#" + formId).validate().form()) {     // MVC 验证方式
        return false;
    }

    $.ajax({
        cache: false,
        async: false,
        type: "POST",
        dataType: (params.dataType || "script"),
        data: (params.data || $("#" + formId).serialize()),
        url: params.url,
        beforeSend: function () {
            Message.loading();
        },
        success: function (result) {
            if (params.callback) params.callback(result);
        },
        error: function (xml, status, e) {
            Message.error(xml);
        }
    });
    return false;
}

/*
 * 绑定上传控件
 * @parameter (string)   panel       应用的容器id
 *            (function) callback    回调函数
 *            (bool)     notForm     是否存在表单，若存在则必须在Form中加上 enctype="multipart/form-data"
 (string)   siteName    上传服务分配的key，用于确定存储路径
 */
var uploadPath = uploadPath || "upload";
function BindFileUpload(panel, callback, notForm, siteName, beforeUpload, limit) {
    if (!callback) {
        alert("请输入回调事件。");
        return;
    }
    if (BindFileUpload.Count == null) BindFileUpload.Count = 0;
    window["BindFileUpload_" + BindFileUpload.Count] = callback;
    window["BindFileUpload_Before_" + BindFileUpload.Count] = beforeUpload;
    var html = "";
    var path = "http://" + location.host + "/upload_callback.html";
    siteName = siteName || "";
    if (notForm) html += "<form method=\"post\" enctype=\"multipart/form-data\" action=\"" + uploadPath + "\"  target=\"uploadiframe_" + BindFileUpload.Count + "\" style=\"padding:0px;margin:0px;\">";
    html += "<div id='divUploadFileContent" + BindFileUpload.Count + "' class='t-button t-upload-button ' style='width:78px;margin:0px'><span>上传文件</span>";
    html += "<textarea name=\"response\" style=\"display:none;\">location.href='" + path + "?callback=" + "BindFileUpload_" + BindFileUpload.Count + "&fileid={id}&clientfilename='+escape(\"{clientfilename}\")+'&mfullpath={filepath}&filesize={filesize}&message='+escape(\"{message}\")+'';</textarea>";
    html += "<input name=\"sitename\" type=\"text\" value=\"" + siteName + "\" style=\"display:none;\"/>";
    if (limit) {
        html += "<textarea name=\"limit\" style=\"display:none;\">" + limit + "</textarea>";
    }
    html += "<input type=\"file\" id=\"uploadfile\" name=\"uploadfile\" onchange=\"BindFileUpload.BeforeUpload(this.form, " + BindFileUpload.Count + "," + notForm + ");\"  multiple='false' autocomplete='off'/>";
    html += "</div>";
    if (notForm) html += "</form>";
    html += "<iframe name=\"uploadiframe_" + BindFileUpload.Count + "\" scrolling=\"no\" width=\"100\" height=\"100\" frameborder=\"1\" style=\"display:none;width:0px;height:0px;\" src=\"about:blank\"></iframe> ";
    $("#" + panel).html(html);

    BindFileUpload.Count++;
}

BindFileUpload.BeforeUpload = function (form, id, notForm) {
    var beforeUpload = window["BindFileUpload_Before_" + id];
    if (beforeUpload && typeof(beforeUpload) == "function") {
//        var src = $("#uploadfile").val();
//        if (IsImage(src)) {
//            var img = new Image();
//            img.onreadystatechange = function () {
//                if (img.readyState == "complete") {
//                    alert("complete");
//                    //alert("width:" + img.width + " height:" + img.height);
//                    initFileSize = img.fileSize;
//                    var imgInfo = "{\"width\":" + img.width + ",\"height\":" + img.height + ",\"size\":" + img.fileSize + "}";
//                    if (beforeUpload.call(imgInfo)) {
//                        BindFileUpload.OnUploadFile(form, id, notForm);
//                    }
//                    else {
//                        window["BindFileUpload_" + id].call({ "success": false, "message": "" });
//                    }
//                }
//            };
//            $("#imgTest").attr("src", src);
//            alert($("#imgTest").attr("src"));
//            //img.src = src;
//            //alert(img.src);
//        }
//        else {
        if (beforeUpload.call()) {
            BindFileUpload.OnUploadFile(form, id, notForm);
        }
        else {
            ////window["BindFileUpload_" + id].call({ "success": false, "message": "" });
        }
//        }

    }
    else {
        BindFileUpload.OnUploadFile(form, id, notForm);
    }
}

/*
 * 上传控件的事件
 * @parameter (object)   form    表单
 *            (number)   id      表单编号
 */
BindFileUpload.OnUploadFile = function (form, id, notForm, beforeUpload) {
    if (!notForm) {
        if (BindFileUpload.form != null) {
            form = BindFileUpload.form;
        }
        else {
            if ($.browser.msie) {
                form = $("<form enctype=\"multipart/form-data\"></form>")
            } else {
                form = $("<form></form>")
            }
            form.attr('action', uploadPath)
            form.attr('enctype', 'multipart/form-data')
            form.attr('method', 'post')
            form.attr('style', 'display:none')
            form.attr('target', 'uploadiframe_' + id)

            var formContent = $("#divUploadFileContent" + id).children()
            form.append(formContent);
            form.appendTo("body")
            form = form[0];
        }
    }

    var _action = form.action;
    var _method = form.method;
    var _target = form.target;
    form.setAttribute("method", "post");
    form.setAttribute("target", "uploadiframe_" + id);
    form.setAttribute("action", uploadPath);
    form.submit();

    if (!notForm) {
        $("#divUploadFileContent" + id).append(formContent);
        $(form).remove();
    }
    $("#uploadfile").remove();
    $("#divUploadFileContent" + id).append("<input type=\"file\" id=\"uploadfile\" name=\"uploadfile\" onchange=\"BindFileUpload.BeforeUpload(this.form, " + id + "," + notForm + ");\"  multiple='false' autocomplete='off'/>");
    form.setAttribute("method", _method);
    form.setAttribute("target", _target);
    form.setAttribute("action", _action);
}

function IsImage(s) {
    var i = s.lastIndexOf(".");
    var ext = s.substring(i + 1).toLowerCase();
    if (ext == "jpg" || ext == "jpeg" || ext == "bmp" || ext == "png" || ext == "gif" || ext == "tiff") {
        return true;
    }
    return false;
}

/*
 * 绑定上传控件
 * @parameter (string)   panel       应用的容器id
 *            (function) callback    回调函数
 */
function BindFileUploadControl(panelId, callback) {
    BindFileUpload(panelId, callback, true, "file");
}

/*
 * 绑定上传控件
 * @parameter (string)   panel       应用的容器id
 *            (function) callback    回调函数
 */
function BindImageUploadControl(panelId, callback) {
    BindFileUpload(panelId, callback, true, "image");
}
/*
 * 绑定上传控件:保密文件
 * @parameter (string)   panel       应用的容器id
 *            (function) callback    回调函数
 */
function BindFileSecrecyUpload(panel, callback) {
    BindFileUploadControl(panel, function () {
        if (!this.success) {
            alert("上传文件失败：" + this.message);
            return;
        }
        callback(this);
    });
}

/*
 * 绑定图片文件上传控件
 * @parameter (string)   controlName    控件名称
 *(bool)     notForm     是否存在表单，若存在则必须在Form中加上 enctype="multipart/form-data"
 */
function GenerateImageUploadControl(controlName, notForm) {
    if (notForm == null || typeof (notForm) == "undefined") {
        notForm = true;
    }

    BindFileUpload("panel" + controlName, function () {
        if (!this.success) {
            alert("上传图片失败：" + this.message);
            return;
        }
        $("#img" + controlName).attr("src", this.mfullpath);
        $("#" + controlName).val(this.mfullpath);
    }, false, "image");
}

/*
 * 绑定Select控件
 * @parameter (string)   controlId   应用的容器
 *            (string)   url         加载的数据的地址，Ajax方式加载
 */
function BindSelect(controlId, url) {
    var obj = $("#" + controlId);
    obj.empty();

    $.getJSON(url, null, function (result) {
        var html = '<option value="{Value}">{Text}</option>';
        obj.append(html.replace("{Value}", "0").replace("{Text}", "请选择…"));
        $.each(result, function (index, item) {
            obj.append(html.replace("{Value}", item.id).replace("{Text}", item.text));
        });
    });
}

// Cookie读写
function Cookie(name, value, expires) {
    if (value === undefined) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        return arr != null ? unescape(arr[2]) : null;
    }

    expires = expires || 1;     // 默认保存1天
    var date = expires;
    if (typeof expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
    }
    document.cookie = name + "=" + escape(value) + ";expires=" + date.toGMTString();
}

//公共的且常规的Grid的操作结果处理方法
function CommonGridRequestCompeted(e) {
    CloseWaiting();
    if (e.name != 'dataBinding') {
        //获得回发信息
        var msg = e.response.aggregates;
        if (msg == null) {
            msg = e.response.Aggregates;
        }

        //显示操作成功
        if (msg == "") {
            ProcessSuccessful();
        }
        else {
            ProcessSuccessful(msg);
        }
        return e;
    }
}


//显示Grid的操作结果
function CommonGridRequestErrorForJson(e) {
    //关闭“正在处理”窗口
    CloseWaiting();

    var title = e.XMLHttpRequest.statusText;
    if (title == null || title == "") {
        title = "操作失败！";
    }

    var data;
    try {
        var result = eval("(" + e.XMLHttpRequest.responseText + ")");
        if (result.IsSuccess != null && result.Message != null) {
            data = result.Message;
        }
    }
    catch (ex) {
        data = e.XMLHttpRequest.responseText;
    }

    ProcessErrer(title, data)

    return false;
}

//显示Grid的操作结果
function CommonGridRequestError(e) {
    //关闭“正在处理”窗口
    CloseWaiting();

    var title = e.XMLHttpRequest.statusText;
    if (title == null || title == "") {
        title = "操作失败！";
    }

    ProcessErrer(title, e.XMLHttpRequest.responseText)

    return false;
}

//禁用所以控件,显示指定等待信息
function OpenWaiting() {
    top.$.Processing("<div class='alert-form-border'><div class='alert-form-content'><img alt='loading' src='http://images.hzins.com/long/k/Dialog/Loading.gif'/><br><br>正在处理...<div></div>", 100, 100);
}

function OnDeleteWaiting() {
    if (confirm("确定要删除吗？")) {
        OpenWaiting();
        return true;
    }
    return false;
}

//关闭等待信息
function CloseWaiting() {
    try {
        top.$.unblockUI();
    }
    catch (e) {
        $.unblockUI();
    }
}

function ProcessSuccessful(msg, width, height) {
    width = width ? width : 120;
    height = height ? height : 120;
    if (!msg) {
        msg = "操作成功";
    }
    CloseWaiting();
    try {
        top.$.MessageBox(
            "<div class='alert-form-border' style='width:" + (width - 12) + "px;height:" + (height - 12) + "px'>"
            + "<div class='alert-form-content' style='width:" + (width - 26) + "px;height:" + (height - 33) + "px'>"
            + "<img alt='loading' src='http://images.hzins.com/long/k/Dialog/Success.gif'/><br><br>"
            + msg
            + "<div>"
            + "</div>", height, width);
    }
    catch (e) {
        $.MessageBox(
            "<div class='alert-form-border' style='width:" + (width - 12) + "px;height:" + (height - 12) + "px'>"
            + "<div class='alert-form-content' style='width:" + (width - 26) + "px;height:" + (height - 33) + "px'>"
            + "<img alt='loading' src='http://images.hzins.com/long/k/Dialog/Success.gif'/><br><br>"
            + msg
            + "<div>"
            + "</div>", height, width);
    }
}

function ProcessErrer(msg, detial, width, height) {
    CloseWaiting();
    width = width ? width : 100;
    height = height ? height : 115;
    if (!msg) {
        msg = "操作失败";
    }

    //根据错误代码显示中文
    switch (msg) {
        case "TitleRepeated":
            msg = "标题重名";
            break;
    }

    if (detial) {
        msg += "<br />[<a herf='javascript:' style='color:blue' onclick='alert(\"" + detial.replace(/\'/g, "＇").replace(/\"/g, "＂").replace(/\n/g, "<br>").replace(/\r/g, "<br>").replace(/>/g, "＞").replace(/</g, "＜").substring(0, 500) + "\")'>详情<a>]"
    }
    //显示提示信息
    top.$.MessageBox(
        "<div class='alert-form-border' style='width:" + (width - 12) + "px;height:" + (height - 12) + "px'>"
        + "<div class='alert-form-content' style='width:" + (width - 26) + "px;height:" + (height - 33) + "px'>"
        + "<img alt='loading' src='http://images.hzins.com/long/k/Dialog/Error.gif'/><br><br>"
        + msg
        + "<div>"
        + "</div>", height, width);
}

//给Telerik表格添加双击行进行编辑的功能,表格需要将OnDataBound事件绑定此函数
function AddDblClickEvtForGrid(gridName) {
    var grid = $("#" + gridName + " tbody tr")
    if (grid) {
        grid.bind(
            "dblclick",
            function () {
                var grid = $("#" + gridName).data("tGrid");
                grid.editRow($(this));
            }
        );
    }
}


/*
 * HTML解码
 * @parameter (string)   str    HTML字符串
 */
function HtmlDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    //s = s.replace(/&nbsp;/g, "    ");
    return s;
}

//HTML 转换成TEXT 并截取字符串
/*
 * HTML解码
 * @parameter (string)   str    HTML字符串
 *            (number)   length      截取字符长度，如果不传值，默认40
 */
function HtmlToText(str, length) {
    str = HtmlDecode(str);
    if (typeof (length) == "undefined") length = 40;

    str = str.replace(/<br>/gi, "\n");
    str = str.replace(/<p.*>/gi, "\n");
    str = str.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 (Link->$1) ");
    str = str.replace(/<(?:.|\s)*?>/g, "");

    return str.length > length ? str.substring(0, length) : str;
}

//去年HTML代码和空格
String.prototype.NoHtml = function () {
    var str = this.replace(/<(?:.|\s)*?>/g, "");
    str = str.replace(/&nbsp;/g, "");
    return str;
}

//把json时间转换成js时间对象
/*
 * 例子 /Date(1332172800000)/ 转换成 JS Object Date
 */
String.prototype.ToDateTime = function () {
    var reg = /\/Date\((-?\d+)\)\//;
    if (this.search(reg) == -1)
        return this;
    var str = this.replace(reg, '$1');
    var dt = new Date(parseInt(str));
    return dt;
}
//元素是否存在true:存在，false:不存在
Array.prototype.exist = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

//日期格式化如：yyyy-MM-dd HH:mm:ss
Date.prototype.format = function (format) {
    if (typeof (format) == "undefined") {
        return;
    }

    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

//强制两位小数，四舍五入
function ForcePrecision(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
};

//只能输入数字的方法，在输入筐Keypress事件中使用此方法
//canNegative是否可为负数
//canDecimal是否可为小数
//DecimalDigits小数位数限制
function keyPress(el, canNegative, canDecimal, DecimalDigits) {
    var keyCode = event.keyCode;

    if (DecimalDigits == null) {
        DecimalDigits = 2;
    }

    if (canNegative == true && keyCode == 45 && GetInputPos(el).start == 0 && el.value.indexOf("-") == -1) {
        event.returnValue = true;
        return;
    }

    if (canDecimal == true && keyCode == 46 && el.value.indexOf(".") == -1) {
        event.returnValue = true;
        return;
    }

    var surcorIndex;
    if ((keyCode >= 48 && keyCode <= 57)) {
        if (DecimalDigits != undefined) {
            var index = el.value.indexOf(".");
            if (index > -1) {
                surcorIndex = GetInputPos(el).start
                if (el.value.length - index - 1 >= DecimalDigits && surcorIndex > index) {
                    event.returnValue = false;
                    return;
                }
            }
        }
        event.returnValue = true;
    } else {
        event.returnValue = false;
    }
}

//获得输入筐的光标位置
function GetInputPos(textBox) {
    //如果是Firefox(1.5)的话，方法很简单
    if (typeof (textBox.selectionStart) == "number") {
        start = textBox.selectionStart;
        end = textBox.selectionEnd;
    }
    else if (document.selection) {//下面是IE(6.0)的方法，麻烦得很，还要计算上'\n'   
        var range = document.selection.createRange();
        if (range.parentElement().id == textBox.id) {
            // create a selection of the whole textarea   
            var range_all = document.body.createTextRange();
            range_all.moveToElementText(textBox);
            //两个range，一个是已经选择的text(range)，一个是整个textarea(range_all)   
            //range_all.compareEndPoints()比较两个端点，如果range_all比range更往左(further to the left)，则
            //返回小于0的值，则range_all往右移一点，直到两个range的start相同。   
            // calculate selection start point by moving beginning of range_all to beginning of range   
            for (start = 0; range_all.compareEndPoints("StartToStart", range) < 0; start++)
                range_all.moveStart('character', 1);
            // get number of line breaks from textarea start to selection start and add them to start   
            // 计算一下\n   
            for (var i = 0; i <= start; i++) {
                if (textBox.value.charAt(i) == '\n')
                    start++;
            }
            // create a selection of the whole textarea   
            var range_all = document.body.createTextRange();
            range_all.moveToElementText(textBox);
            // calculate selection end point by moving beginning of range_all to end of range   
            for (end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; end++)
                range_all.moveStart('character', 1);
            // get number of line breaks from textarea start to selection end and add them to end   
            for (var i = 0; i <= end; i++) {
                if (textBox.value.charAt(i) == '\n')
                    end++;
            }
        }
    }

    return {start: start, end: end};
}

//导出功能 获得选中项
function GetSelectedIds(containerId) {
    var ids = "";
    var chks = $("#" + containerId + " tr:gt(0)").find("input[type='checkbox']:checked");
    $.each(chks, function (index, item) {
        ids += "," + $(item).val();
    });
    if (ids != "") {
        ids = ids.substr(1);
    }
    return ids;
}

function SetSelectedIds(containerId, el) {
    var $form = null;
    if (el) {
        $form = $($(el).parents("form")[0]);
    }

    var grid = $("#" + containerId).data("tGrid");
    if (grid != null) {
        if ($form) {
            $form.find('[name="OrderBy"]').val(grid.orderBy);
            $form.find('[name="Filter"]').val(grid.filterBy);
            $form.find('[name="size"]').val(grid.pageSize);
            $form.find('[name="page"]').val(grid.currentPage);
        }
        else {
            $('#OrderBy').val(grid.orderBy);
            $('#Filter').val(grid.filterBy);
            $('#size').val(grid.pageSize);
            $('#page').val(grid.currentPage);
        }
    }

    var ids = GetSelectedIds(containerId);
    if (ids == "") {
        alert("未选中任何项");
        return false;
    }

    if ($form) {
        $form.find('[name="ExportType"]').val(1);
        $form.find('[name="Ids"]').val(ids);
    }
    else {
        $('#ExportType').val(1);
        $('#Ids').val(ids);
    }
    return true;
}

function setTelectFilter(containerId, el) {
    var $form = null;
    if (el) {
        $form = $($(el).parents("form")[0]);
    }

    var isOrderPage = typeof (OBS_OrderPage) != 'undefined';
    if (isOrderPage) {
        var gridFilterBy = OBS_OrderPage.GetCurrentGrid().filterBy;
        OBS_OrderPage.GetCurrentGridHelper().ProcAttachFilter();
    }

    var grid = $("#" + containerId).data("tGrid");
    if (grid != null) {
        if ($form) {
            $form.find('[name="OrderBy"]').val(grid.orderBy);
            $form.find('[name="Filter"]').val(grid.filterBy);
            $form.find('[name="size"]').val(grid.pageSize);
            $form.find('[name="page"]').val(grid.currentPage);
        }
        else {
            $('#OrderBy').val(grid.orderBy);
            $('#Filter').val(grid.filterBy);
            $('#size').val(grid.pageSize);
            $('#page').val(grid.currentPage);
        }
    }
    if ($form) {
        $form.find('[name="ExportType"]').val(0);
    }
    else {
        $('#ExportType').val(0);
    }

    //还原查询条件,即移出附搜索栏中的附加查询条件
    if (isOrderPage) {
        OBS_OrderPage.GetCurrentGrid().filterBy = gridFilterBy;
    }
}

/********************************************************************
 * 函数名:GetCookie
 *
 * 参数:
 * c_name  - Cookie名称
 *
 * 返回值:Cookie内容
 ********************************************************************/
function GetCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return null
}
/********************************************************************
 * 函数名:SetCookie
 *
 * 参数:
 * c_name  - Cookie名称
 *   value  - Cookie内容
 *   expiredays - Cookie日期
 *
 * 返回值:空
 ********************************************************************/
function SetCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    // 使设置的有效时间正确。增加toGMTString()
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=.hzins.com";
}

//自动移除特殊字符
function AutoRemoveSpecialCharacter() {
    $("input:text,textarea").live("blur", function () {
        var val = $(this).val();
        val = val.replace(/</ig, "");
        val = val.replace(/&/ig, "");
        val = val.replace(/>/ig, "");
        val = val.replace(/"/ig, "");
        $(this).val(val);
    });
}