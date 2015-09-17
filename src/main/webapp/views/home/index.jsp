<%--
  Created by IntelliJ IDEA.
  User: wanghy
  Date: 2015/9/15
  Time: 21:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>管理系统V1.0</title>
    <style>
        body
        {
            min-width: 800px;
        }
    </style>
    <link type="text/css" href="/static/styles/style.css" rel="stylesheet" />
    <script type="text/javascript" src="/static/scripts/jquery.min.js"></script>

    <!--   EasyUI Start-->
    <link rel="stylesheet" type="text/css" href="/static/easyui/themes/default/easyui.css" />
    <link rel="stylesheet" type="text/css" href="/static/easyui/themes/icon.css" />
    <script type="text/javascript" src="/static/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="/static/easyui/locale/easyui-lang-zh_CN.js"></script>

       <script type="text/javascript" src="/static/scripts/nav.js"></script>
    <script src="/static/scripts/outlook2.js" type="text/javascript"></script>
    <script src="/static/scripts/admin.js" type="text/javascript"></script>
    <style type="text/css">
        .navlist
        {
            padding-left: 10px;
        }
        .tabs-icon
        {
            left: 0px !important;
        }
        .icon-nav
        {
            background: url("/static/images/icon.gif") no-repeat scroll 8px -824px transparent;
            display: -moz-inline-box;
            display: inline-block;
            width: 30px;
            height: 21px;
        }
    </style>


    <script type="text/javascript">
        //修改密码开始
        function bindWin() {
            $("[id$=window]").window({
                modal: true,
                collapsible: false,
                minimizable: false,
                maximizable: false,
                closed: true
            });
        }
        $(function () {
            bindWin();
        });
        function refresh() {
            var myiframe = document.getElementById("ifrname");
            myiframe.src = myiframe.src;
        }


    </script>

</head>
<body class="easyui-layout" style="overflow-y: hidden" scroll="no">
<form id="form1" runat="server">
    <noscript>
        <div style="position: absolute; z-index: 100000; height: 2046px; top: 0px; left: 0px;
            width: 100%; background: white; text-align: center;">
            <img src="Static/images/noscript.gif" alt='抱歉，请开启脚本支持！' />
        </div>
    </noscript>
    <div region="north" split="true" border="false" style="overflow: hidden; height: 60px;
        background: #385893 0 0 no-repeat; line-height: 60px; color: #fff; font-family: Verdana, 微软雅黑,黑体">
        <span style="padding-left: 30px; font-size: 20px; margin-top: 20px;">管理系统V1.0</span>
        <span style="float: right; padding-right: 20px;" class="head">欢迎
            管理员
            [<a href="Logout.aspx" id="loginOut" style="color: White; text-decoration: underline;">安全退出</a>]
        </span><span style="float: right; margin-right: 20px;" class="head"><a href="http://www.iezu.cn"
                                                                               target="_blank" id="A1" style="color: White; text-decoration: underline;">预览网站</a>
        </span><span style="float: right; margin-right: 20px;" class="head"><a href="javascript:updatepwd()"
                                                                               id="A2" style="color: White; text-decoration: underline;">修改密码</a> </span>


    </div>
    <div region="south" split="true" style="height: 30px; background: #D2E0F2;">
        <div class="footer" id="footer">
            Copyright © 2015</div>
    </div>
    <div region="west" split="true" title="导航菜单" style="width: 180px;" id="west">
        <div id="nav" class="easyui-accordion" fit="true" border="false">
            <!--  导航内容 -->
        </div>
    </div>
    <div id="mainPanle" region="center" style="background: #eee; overflow-y: hidden">
        <div id="tabs" class="easyui-tabs" fit="true" border="false">
            <div title="系统首页" style="overflow: hidden;" id="home">
                <iframe scrolling="auto" frameborder="0" style="width: 100%; height: 100%;" src="/main">
                </iframe>
            </div>
        </div>
    </div>
    <div id="mm" class="easyui-menu" style="width: 150px;">
        <div id="tabupdate">
            刷新</div>
        <div class="menu-sep">
        </div>
        <div id="close">
            关闭</div>
        <div id="closeall">
            全部关闭</div>
        <div id="closeother">
            除此之外全部关闭</div>
        <div class="menu-sep">
        </div>
        <div id="closeright">
            当前页右侧全部关闭</div>
        <div id="closeleft">
            当前页左侧全部关闭</div>
        <div class="menu-sep">
        </div>
        <div id="exit">
            退出</div>
    </div>
    <div id="n-masklayer" class="window-mask" style="display: none">
    </div>
    <div id="w-masklayer" class="window-mask" style="display: none">
    </div>
    <div id="s-masklayer" class="window-mask" style="display: none">
    </div>
    <div id="jplay">
    </div>
</form>
</body>
</html>
<script type="text/javascript" src="/static/scripts/Common.yui.js"></script>

<style>
    .someUL
    {
        margin: 0;
        padding: 0;
    }
    .someUL li
    {
        position: relative;
        float: left;
        width: 150px;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 22px;
        line-height: 22px;
        list-style: none;
        margin-right: 4px;
        overflow: hidden;
    }
</style>
