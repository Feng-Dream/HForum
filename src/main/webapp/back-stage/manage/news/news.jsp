<%--
  Created by IntelliJ IDEA.
  User: 胡桂榕
  Date: 2017/12/18
  Time: 12:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>新闻管理</title>
    <%@include file="/common/common.jsp" %>
    <link rel="stylesheet" href="res/admin/plugins/layui-v2.2.45/css/layui.css" media="all">
</head>
<body style="margin: 15px">
<div class="admin-main">
    <blockquote class="layui-elem-quote">
        <form class="layui-form" action="">
            <input type="text" id="select-channelName" name="channelName" value=""
                   placeholder="请输入栏目名称"
                   class="layui-input"
                   style="width: 250px;float: left;margin-right: 10px;margin-left: 300px;">
            <a href="javascript:;" class="layui-btn" id="search">
                <i class="layui-icon">&#xe615;</i> 搜索</a>
        </form>
    </blockquote>

    <blockquote class="layui-elem-quote layui-quote-nm">
        <a href="javascript:;" id="add-news" class="layui-btn">
            <i class="layui-icon">&#xe654;</i> 添加新闻
        </a>
        <a href="#" class="layui-btn" id="import">
            从Excel表导入数据 <i class="layui-icon">&#xe602;</i>
        </a>
        <a href="#" class="layui-btn">
            <i class="layui-icon">&#xe603;</i> 导出为Excel表
        </a>
        <a href="javascript:;" class="layui-btn layui-btn-danger">
            <i class="layui-icon">&#xe640;</i>批量删除
        </a>
    </blockquote>

    <fieldset class="layui-elem-field">
        <legend>新闻数据</legend>
        <div class="layui-field-box layui-form">
            <table class="layui-hide" id="newsTable" lay-filter="newsTable">
            </table>
        </div>

    </fieldset>
    <script type="text/html" id="toolbar">
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon"
                                                                              style="font-size: 30px; color: #FFFFFF;">&#xe640;</i>
            删除</a>
    </script>
</div>
<script src="res/admin/plugins/layui-v2.2.45/layui.js" charset="utf-8"></script>
<script>
    layui.use('table', function () {
        var table = layui.table
            , form = layui.form;
        table.render({
            elem: '#newsTable'
            , url: "news/list.action",
            cols: [[
                 {type: 'checkbox'},
                 {type: 'numbers'},
                 { field: 'newsTitle', align: 'center', title: '新闻标题', edit: 'text'}
                , {field: 'createTime', align: 'center', title: '创建时间', sort: true}
                , {field: 'layoutType', align: 'center', title: '类型'}
                , {field: 'newsStatus', align: 'center', title: '状态'}
                , {fixed: 'right', title: '操作', align: 'center', toolbar: '#toolbar'}
            ]]
            ,   page: {
                limit: 4,
                limits: [4, 8, 16]
            }
        });
    });

    $("#add-news").click(function () {
        var data = {
            "title": "添加新闻",
            "icon": "&#xe61f;",
            "href": "back-stage/manage/news/add-news.jsp"
        }
        parent. tab.tabAdd(data);
    })
</script>

</body>
</html>
