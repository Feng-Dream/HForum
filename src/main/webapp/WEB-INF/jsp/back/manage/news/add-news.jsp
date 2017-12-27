<%--
  Created by IntelliJ IDEA.
  User: 胡桂榕
  Date: 2017/12/20
  Time: 21:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <%@include file="/WEB-INF/jsp/common/common.jsp" %>
    <link rel="stylesheet" type="text/css" href="res/admin/plugins/webuploader-0.1.5/css/webuploader.css">
    <link rel="stylesheet" type="text/css" href="res/admin/plugins/webuploader-0.1.5/css/style.css">
    <link rel="stylesheet" href="res/admin/plugins/layui-v2.2.45/css/layui.css" media="all">

    <script type="text/javascript" charset="utf-8" src="res/admin/plugins/ueditor-1.4.3.3/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="res/admin/plugins/ueditor-1.4.3.3/ueditor.all.js"></script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="res/admin/plugins/ueditor-1.4.3.3/lang/zh-cn/zh-cn.js"></script>

</head>
<body style="margin: 15px;">

<fieldset class="layui-elem-field layui-field-title">
    <legend>添加新闻</legend>
</fieldset>
<form class="layui-form layui-form-pane" action="" id="add-news-form">
    <input id="userId" name="createUserId" type="hidden" value="<shiro:principal property="userId"/>">
    <div class="layui-form-item">
        <label class="layui-form-label"><span style="color:#F00">*</span>文章标题</label>
        <div class="layui-input-block">
            <input type="text" name="title" autocomplete="off" lay-verify="required" , placeholder="请输入文章标题"
                   class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label"><span style="color:#F00">*</span>文章来源</label>
        <div class="layui-input-block">
            <input type="text" name="title" autocomplete="off" lay-verify="required" , placeholder="请输入文章来源"
                   class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label" style="width: 200px"><span style="color:#F00">*</span>分类栏目(最多可选3个)</label>
        <div class="layui-input-inline">
            <select name="channelId" id="channel-1" lay-verify="required" lay-filter="channel-1">
            </select>
        </div>
        <div class="layui-input-inline" style="display: none" id="channel-2-div">
            <select name="channelId" id="channel-2" lay-filter="channel-2">
            </select>
        </div>
        <div class="layui-input-inline" style="display: none" id="channel-3-div">
            <select name="channelId" id="channel-3" lay-filter="channel-3">
            </select>
        </div>
        <div class="layui-input-inline" id="add-channel-div">
            <a href="javascript:;" id="add-channel" class="layui-btn">
                <i class="layui-icon">&#xe654;</i></a>
        </div>
    </div>
    <div class="layui-form-item" pane="">
        <label class="layui-form-label">允许评论</label>
        <div class="layui-input-block">
            <input type="checkbox" lay-text="开|关" checked="" name="open" lay-skin="switch" lay-filter="switchTest"
                   title="评论开关">
        </div>
    </div>

    <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">&nbsp;&nbsp;&nbsp;文章封面(最多上传4张封面)</label>
        <div class="layui-input-block">
            <%--     <div id="wrapper"  class="layui-textarea">
                     <div id="container">--%>
            <!--头部，相册选择和格式选择-->
            <div id="uploader" class="layui-textarea">
                <div class="queueList">
                    <div id="dndArea" class="placeholder">
                        <div id="filePicker">
                            <span><i class="layui-icon" style="font-size: 18px;margin-right: 10px; ">&#xe60d;</i>点击选择文件</span>
                            <%--   <i class="layui-icon" style="font-size: 20px; ">&#xe60d;</i>--%>
                        </div>
                        <p style="font-family: STHupo;color: #60a3f5">或将图片拖拽到虚线框内，单次最多可选4张</p>
                    </div>
                </div>
                <div class="statusBar" style="display:none;">
                    <div class="progress">
                        <span class="text">0%</span>
                        <span class="percentage"></span>
                    </div>
                    <div class="info"></div>
                    <div class="btns">
                        <div id="filePicker2">
                        </div>
                        <div class="uploadBtn">开始上传
                            <%--<a href="javascript:;" class="layui-btn">
                                <i class="layui-icon">&#xe654;</i> 开始上传
                            </a>--%>
                        </div>
                    </div>
                </div>
                <%--  </div>
              </div>--%>
            </div>
        </div>
    </div>

    <div class="layui-form-item layui-form-text">
        <label class="layui-form-label"><span style="color:#F00">*</span>文章内容</label>
        <div class="layui-input-block">
            <%-- <div class="layui-textarea">
                 <script id="editor" type="text/plain" style="width:100%;height:500px;"></script>
           </div>--%>
            <textarea id="editor" class="layui-textarea" style="width:100%;height:100%;"></textarea>
        </div>
    </div>
    <div class="layui-form-item" style="float: right">
        <button class="layui-btn" lay-submit="" lay-filter="demo1"><i class="layui-icon">&#xe622;</i>保存草稿</button>
        <button class="layui-btn layui-btn-normal" lay-submit="" lay-filter="demo2"><i class="layui-icon">&#x1005;</i>保存并提交审核
        </button>
    </div>
</form>
<script type="text/javascript" src="res/admin/plugins/webuploader-0.1.5/js/webuploader.js"></script>
<script type="text/javascript" src="res/admin/my/js/upload.js"></script>
<script src="res/admin/plugins/layui-v2.2.45/layui.js" charset="utf-8"></script>
<script>
    layui.use(['form'], function () {
        var form = layui.form
            , layer = layui.layer

        //监听指定开关
        form.on('switch(switchTest)', function (data) {
            if (this.checked) {
                layer.tips('评论已开启', data.othis)
            }
            else {
                layer.tips('评论已关闭', data.othis)
            }
        });

        //监听提交
        form.on('submit(demo1)', function (data) {
            layer.alert(JSON.stringify(data.field), {
                title: '最终的提交信息'
            })
            return false;
        });

        form.on('select(channel-1)', function (data) {
            // console.log(data.elem); //得到select原始DOM对象
            // console.log(data.value); //得到被选中的值
            // console.log(data.othis); //得到美化后的DOM对象
            if (data.value == "") {
                $("#channel-2-div").hide();
                $("#channel-3-div").hide();
                $("#add-channel-div").show();
            }
        });
        form.on('select(channel-2)', function (data) {
            if (data.value == "") {
                $("#channel-3-div").hide();
                $("#add-channel-div").show();
            }
        });


    });
</script>
<script type="text/javascript" src="res/admin/my/js/channel-select.js"/>
<script type="text/javascript">
    //实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    var ue = UE.getEditor('editor');

</script>

</body>

</html>
