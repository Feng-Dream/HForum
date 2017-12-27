$(document).ready(function() {
			// 轮播图
			// 专题切换//频道页banner轮播
			$(".focus").slide({
						titCell : ".tip li",
						mainCell : ".news_pic ul",
						effect : "left",
						autoPlay : true,
						delayTime : 200
					});
			// 专题文字切换
			$(".focus").slide({
						titCell : ".tip li",
						mainCell : ".ifocus_tx ul",
						effect : "left",
						autoPlay : true,
						delayTime : 200
					});
			// 搜索框
			$("input[name='keyword']").focus(function() {
						$("#hot_search").show();
					});
			$("input[name='keyword']").blur(function() {
						$("#hot_search").hide();
					});

			// iframe
			$('.dialog').hDialog({
				types : 2,
				iframeSrc : '/login',
				iframeId : 'iframeHBox',
				width : 600,
				height : 420,
				box : '#HBox',
				escHide : true,// false:按ESC不关闭弹框,反之关闭；
				modalHide : false
					// false:点击遮罩背景不关闭弹框,反之关闭；
				});
			// 刷新
			$('.refreshfeed').click(function() {
						window.location.reload();
					});
			$(window).scroll(function() {// 滚动时触发函数
						var top = $(document).scrollTop();
						if (top == 0) {
							$('.go-top').hide();
						} else {
							$('.go-top').show();
						}
					});

			// 回到顶部
			$('.go-top').click(function() {
						$("body,html").animate({
									scrollTop : 0
								}, 800);
					});

		});