$(document).ready(function () {
    // 轮播图
    // 专题切换//频道页banner轮播
    $(".focus").slide({
        titCell: ".tip li",
        mainCell: ".news_pic ul",
        effect: "left",
        autoPlay: true,
        delayTime: 200
    });
    // 专题文字切换
    $(".focus").slide({
        titCell: ".tip li",
        mainCell: ".ifocus_tx ul",
        effect: "left",
        autoPlay: true,
        delayTime: 200
    });
    // 搜索框
    $("input[name='keyword']").focus(function () {
        $("#hot_search").show();
    });
    $("input[name='keyword']").blur(function () {
        $("#hot_search").hide();
    });

    // iframe
    $('.dialog').hDialog({
        types: 2,
        iframeSrc: '/login',
        iframeId: 'iframeHBox',
        width: 600,
        height: 420,
        box: '#HBox',
        escHide: true,// false:按ESC不关闭弹框,反之关闭；
        modalHide: false
        // false:点击遮罩背景不关闭弹框,反之关闭；
    });
    // 刷新
    $('.refreshfeed').click(function () {
        window.location.reload();
    });
    $(window).scroll(function () {// 滚动时触发函数
        var top = $(document).scrollTop();
        if (top == 0) {
            $('.go-top').hide();
        } else {
            $('.go-top').show();
        }
    });

    // 回到顶部
    $('.go-top').click(function () {
        $("body,html").animate({
            scrollTop: 0
        }, 800);
    });
    //栏目数据
    var aData1 = [];
    var aData2 = [];
    $.ajax({
        type: "POST",
        url: "channel/list",
        async: false,
        data: {paginate: false},
        success: function (result) {
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].selected) {
                    aData1[aData1.length] = result.data[i];
                }
                else {
                    aData2[aData2.length] = result.data[i];
                }
            }
            createElem();
        }
    });

    function createElem() {
        var ele = "<ul>";
        $.each(aData1, function (i) {
            if (i == 0) {
                ele += "<li><a class='wchannel-item active' href= '/'><span>"+this.channelName+"</span></a></li>";
            }
            else {
                ele +="<li><a class='wchannel-item ' href='/channel/"+this.channelId +"'><span>"+this.channelName+"</span></a></li>"
            }
        });
        ele +="<li class='wchannel-more'><a  href='javascript:;' class='wchannel-item'><span>更多</span></a>"
        ele += "<div class='wchannel-more-layer'><ul>"


        $.each(aData2, function (i) {
            ele +="<li><a class='y-left wchannel-item' href='/channel/"+this.channelId +"'><span>"+this.channelName+"</span></a></li>"
        });
        ele += "</ul></div></li></ul>"
        $(".wchannel").append(ele);
    }
});