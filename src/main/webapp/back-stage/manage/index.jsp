<%--
  Created by IntelliJ IDEA.
  User: 胡桂榕
  Date: 2017/12/18
  Time: 9:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>HForum后台管理</title>
    <%@include file="/common/common.jsp" %>
    <%@include file="/common/back-common.jsp" %>
</head>
<body>
<div class="layui-layout layui-layout-admin" style="border-bottom: solid 5px #1aa094;">
    <div class="layui-header header header-demo">
        <div class="layui-main">
            <div class="admin-login-box">
                <a class="logo" style="left: 0;" href="http://beginner.zhengjinfan.cn/demo/beginner_admin/">
                    <span style="font-size: 18px; color: #1AA094"><i>HForum后台管理系统</i></span>
                </a>
                <div class="admin-side-toggle">
                    <i class="fa fa-bars" aria-hidden="true" style="margin-top: 7px;"></i>
                </div>
                <div class="admin-side-full">
                    <i class="fa fa-life-bouy" aria-hidden="true" style="margin-top: 7px;"></i>
                </div>
            </div>
            <ul class="layui-nav admin-header-item">
                <li class="layui-nav-item" id="pay">
                    <a href="javascript:;">系统消息</a>
                </li>
                <li class="layui-nav-item">
                    <a href="front-desk/index.jsp" target="_blank">浏览网站</a>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;" class="admin-header-user">
                        <img src="res/admin/my/images/admin.png"/>
                        <span><shiro:principal property="userName"/></span>
                    </a>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="javascript:;"><i class="fa fa-user-circle" aria-hidden="true"></i> 个人信息</a>
                        </dd>
                        <dd>
                            <a href="javascript:;"><i class="fa fa-gear" aria-hidden="true"></i> 设置</a>
                        </dd>
                        <dd id="lock">
                            <a href="javascript:;">
                                <i class="fa fa-lock" aria-hidden="true"
                                   style="padding-right: 3px;padding-left: 1px;"></i> 锁屏 (Alt+L)
                            </a>
                        </dd>
                        <dd>
                            <a href="javascript:;" id="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> 注销</a>
                        </dd>
                    </dl>
                </li>
            </ul>
            <ul class="layui-nav admin-header-item-mobile">
                <li class="layui-nav-item">
                    <a href="javascript:;"><i class="fa fa-sign-out" aria-hidden="true"></i> 注销</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="layui-side layui-bg-black" id="admin-side">
        <div class="layui-side-scroll" id="admin-navbar-side" lay-filter="side"></div>
    </div>
    <div class="layui-body" style="bottom: 0;border-left: solid 2px #1AA094;" id="admin-body">
        <div class="layui-tab admin-nav-card layui-tab-brief" lay-filter="admin-tab">
            <ul class="layui-tab-title">
                <li class="layui-this">
                    <i class="layui-icon">&#xe644;</i>
                   <%-- <i class="fa fa-dashboard" aria-hidden="true"></i>--%>
                    <cite>我的桌面</cite>
                </li>
            </ul>
            <div class="layui-tab-content" style="min-height: 150px; padding: 5px 0 0 0;">
                <div class="layui-tab-item layui-show">
                    <iframe src="back-stage/manage/welcome.jsp"></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="layui-footer footer footer-demo" id="admin-footer">
        <div class="layui-main">
            <p>2016 &copy;
                <a href="http://m.zhengjinfan.cn/">m.zhengjinfan.cn/</a> LGPL license
            </p>
        </div>
    </div>
    <div class="site-tree-mobile layui-hide">
        <i class="layui-icon">&#xe602;</i>
    </div>
    <div class="site-mobile-shade"></div>

    <!--锁屏模板 start-->
    <script type="text/template" id="lock-temp">
        <div class="admin-header-lock" id="lock-box">
            <div class="admin-header-lock-img">
                <img src="res/admin/plugins/beginner/images/0.jpg"/>
            </div>
            <div class="admin-header-lock-name" id="lockUserName">beginner</div>
            <input type="text" class="admin-header-lock-input" value="输入密码解锁.." name="lockPwd" id="lockPwd"/>
            <button class="layui-btn layui-btn-small" id="unlock">解锁</button>
        </div>
    </script>
    <!--锁屏模板 end -->
    <script type="text/javascript" src="res/admin/my/js/index.js"></script>
    <script type="text/javascript" src="res/admin/plugins/layui/layui.js"></script>
    <script type="text/javascript" src="res/admin/plugins/beginner_admin/datas/nav.js"></script>
    <script src="res/admin/plugins/beginner_admin/js/index.js"></script>
    <script>
        layui.use('layer', function () {
            var $ = layui.jquery,
                layer = layui.layer;

            $('#video1').on('click', function () {
                layer.open({
                    title: 'YouTube',
                    maxmin: true,
                    type: 2,
                    content: 'video.html',
                    area: ['800px', '500px']
                });
            });
            $('#pay').on('click', function () {
                layer.open({
                    title: false,
                    type: 1,
                    content: '<img src="res/admin/plugins/beginner_admin/images/xx.png" />',
                    area: ['500px', '250px'],
                    shadeClose: true
                });
            });


        });
    </script>
</div>
</body>

</html>
