!function() {
	function set(str, value) {
		for (var p, cur = VARS.source, ps = str.split("."), ks = [], fns = "", i = 0, len = ps.length; len > i; i++)
			p = ps[i], cur = cur[p], ks.push('["' + ps[i] + '"]');
		fns = "VARS.source" + ks.join("") + '="' + value + '"', eval("(" + fns
				+ ")")
	}
	function get(e) {
		for (var o = VARS.source, i = e.split("."), n = 0, a = i.length; a > n; n++)
			if (o = o[i[n]], void 0 === o)
				return;
		return o
	}
	for (var VARS = {
		prefix : "$",
		keys : ["SYS", "ROOM", "PAGE"],
		source : {},
		scope : window
	}, i = 0; i < VARS.keys.length; i++) {
		var key = VARS.keys[i], fkey = VARS.prefix + key, obj = VARS.scope[fkey];
		obj && (VARS.source[key.toLowerCase()] = obj)
	}
	define("dypassport/context", ["shark/util/cookie/1.0"], function(e) {
				location.host;
				e.config("keypre", get("sys.cookie_pre") || "");
				var o = {
					set : set,
					get : get
				};
				return o
			})
}(), shark.config({
			resolve : function(e) {
				if (shark.helper.file.isAbsolute(e))
					return !1;
				var o = e.split("/"), i = o[0], n = shark.helper.file.isCss(e)
						? "css/"
						: "js/";
				switch (i) {
					case "dypassport" :
						e = "app/douyu-passport/" + n + o.slice(1).join("/");
						break;
					case "dypassport-activity" :
						e = "app/douyu-passport/activity/" + n
								+ o.slice(1).join("/")
				}
				return e
			}
		}), shark.on("createNode", function(e, o) {
			var i, n = shark.helper.file, a = "2.0.37";
			i = o.url, n.isCss(i) ? i.indexOf("?") > 0
					? e.href = i + "&" + a
					: e.href = i + "?" + a : i.indexOf("?") > 0 ? e.src = i
					+ "&" + a : e.src = i + "?" + a
		}), shark.on("saved", function(e) {
			var o = new RegExp("^dypassport//*");
			o.test(e.id) && shark.helper.domReady(function() {
						define([e.id], function(e) {
									e && "function" == typeof e.application
											&& e.application.call(e)
								})
					})
		}), define("dypassport/com/vcode-user-v3", ["jquery", "shark/class"],
		function(e, o) {
			var i = {
				input : {
					codesrc : "/member/task/captcha"
				},
				fast : {
					idpre : "gt-captcha-",
					count : 0
				}
			}, n = o({
				init : function(o) {
					this.config = e.extend(!0, {}, {
								target : null
							}, o), this.render()
				},
				nextId : function() {
					var e = this.config.idpre || i.fast.idpre;
					return e + ++i.fast.count
				},
				getResult : function() {
					return this.config.result
				},
				check : function(o) {
					var i = e.isFunction(o.error) ? o.error : function() {
					}, n = function(o) {
						0 === o.error && e.isPlainObject(o.data) ? this
								.buildAsync(o.data) : i()
					}, a = function() {
						i()
					};
					e.ajax("/iframe/checkGeeTest", {
								type : "post",
								dataType : "json",
								timeout : 5e3,
								success : e.proxy(n, this),
								error : e.proxy(a, this)
							})
				},
				render : function() {
					this.config.$el = this.config.target
				},
				build : function(o) {
					var i = this.nextId(), n = this, a = e
							.isFunction(n.config.success)
							? n.config.success
							: function() {
							}, t = e.isFunction(n.config.error)
							? n.config.error
							: function() {
							}, c = "zh-cn";
					if ("en" === $SYS.lang && (c = $SYS.lang), this.config.$el
							.append('<div id="' + i + '"></div>'), this.config.result = null, !window.initGeetest)
						return t(), !1;
					var s = {
						gt : o.gt,
						challenge : o.challenge,
						offline : !o.success,
						new_captcha : o.new_captcha,
						product : "float",
						lang : c
					};
					this.config.gtObj && this.config.gtObj.product
							&& (s = e.extend(!0, s, this.config.gtObj)), window
							.initGeetest(s, function(e) {
								e.appendTo("#" + i), e.onSuccess(function() {
									n.config.result = n.plugin.getValidate(), a(n.config.result)
								}), e.onError(function() {
											n.config.result = null
										}), n.plugin = e
							})
				},
				buildAsync : function(e) {
					var o = this, i = location.protocol;
					require.use(
							[i + "//static.geetest.com/static/tools/gt.js"],
							function() {
								o.build(e)
							})
				},
				refresh : function() {
					this.plugin.reset(), this.config.result = null
				},
				show : function() {
					this.config.$el.show()
				},
				hide : function() {
					this.config.$el.hide()
				},
				destroy : function() {
					this.plugin && this.plugin.destroy()
				}
			}), a = {
				init : function(o, i, a) {
					var t = {
						product : "custom",
						width : "100%",
						area : "#loginbox-con",
						next_width : "260px",
						bg_color : "transparent"
					}, c = i || {}, s = e.extend(!0, {
								target : o,
								gtObj : a || t
							}, c), r = new n(s);
					return r.check(c), {
						refresh : function() {
							r.refresh()
						},
						getResult : function() {
							return r.getResult()
						},
						destroy : function() {
							return r.destroy()
						}
					}
				}
			};
			return a
		}), define("dypassport/com/user-control", ["jquery",
				"shark/util/lang/1.0", "shark/util/cookie/1.0",
				"shark/util/flash/bridge/1.0", "shark/ext/swfobject"],
		function(e, o, i, n, a) {
			var t = ({
				client_id : window.client_id || 1,
				hmac_flash_ready : !1,
				salt : null
			}, {});
			return t.control = {}, t.control.API = {
				auth : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax({
								url : passport_host + "iframe/auth",
								type : "GET",
								data : o,
								dataType : "jsonp",
								jsonp : "callback",
								callback : "json_callback",
								success : i,
								error : n
							})
				},
				iframeLogin : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, $SYS.lang
							&& (o.lang = $SYS.lang), e.ajax({
								url : "/iframe/loginNew",
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				cpsReward : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax({
								url : "/api/cpsReward",
								type : "GET",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				login : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax({
								url : "/api/passport/login",
								type : "GET",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				reg : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax(
							"/member/register/ajax_new", {
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				iframeReg : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, $SYS.lang
							&& (o.lang = $SYS.lang), e.ajax({
								url : "/iframe/registerNew",
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				subSiteLogin : function(o, i, n, a) {
					o && (n = n || e.noop, a = a || e.noop, e.ajax({
								url : o,
								type : "GET",
								data : i,
								dataType : "jsonp",
								jsonp : "callback",
								callback : "json_callback",
								success : n,
								error : a
							}))
				},
				qrGenerateCode : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax(
							"/scan/generateCode", {
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				qrCheckScan : function(o, i, n) {
					var a = (new Date).getTime();
					i = i || e.noop, n = n || e.noop, e.ajax({
								url : "/lapi/passport/qrcode/check?time=" + a,
								type : "GET",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				qrDeleteCode : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax(
							"/scan/deleteCode ", {
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				getCPS : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax({
								url : "/member/register/getCpsId?v="
										+ (new Date).getTime(),
								type : "GET",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				checkUserStatus : function(o, i, n) {
					o = o || {}, i = i || e.noop, n = n || e.noop, e.ajax({
								url : "/member/cp/phone_anchor_status",
								type : "GET",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				checkNickName : function(o, i, n) {
					o = o || {}, i = i || e.noop, n = n || e.noop, $SYS.lang
							&& (o.lang = $SYS.lang), e.ajax({
								url : "/api/nicknameCheck",
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				verifyPhone : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, $SYS.lang
							&& (o.lang = $SYS.lang), e.ajax(
							"/user/bindphone/sendPhoneVoice", {
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				bindPhone : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, $SYS.lang
							&& (o.lang = $SYS.lang), e.ajax(
							"/user/bindphone/bindPhone", {
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				loginVerifyPhone : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax(
							"/iframe/loginCaptcha", {
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				regVerifyPhone : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax(
							"/iframe/registerCaptcha", {
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				regByPhone : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax({
								url : "/iframe/register",
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				submitNickname : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, e.ajax({
								url : "/iframe/updateNickname",
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				}
			}, t.control
		}), define("dypassport/com/user-view-common", ["jquery",
				"shark/util/cookie/1.0"], function(e, o) {
			var i = {
				init : function() {
					if (e.fn.placeholder
							&& e("input[placeholder], textarea[placeholder]")
									.each(function() {
												e(this).placeholder()
											}), e.dialog.tips_black
							&& e.dialog.through)
						try {
							var i = e.dialog.tips_black;
							e.dialog.tips_black = function(o, i) {
								var n = {}, a = e(".loginbox-con");
								a.size() > 0
										&& (n.left = a.offset().left + 90, n.top = a
												.offset().top
												+ 140);
								var t = {
									id : "Tips",
									zIndex : e.dialog.defaults.zIndex,
									title : !1,
									cancel : !1,
									fixed : !0,
									lock : !1,
									padding : 0,
									margin : 0
								}, i = 3;
								return t = e.extend(!0, t, n), e.dialog
										.through(t)
										.content('<div class="infodrmation">'
												+ o + "</div>").time(i)
							}
						} catch (n) {
							e.dialog.tips_black = i
						}
					try {
						window.SMSdk
								&& SMSdk.getDeviceId
								&& o.set("sm_did", encodeURIComponent(SMSdk
												.getDeviceId()), 864e5)
					} catch (n) {
					}
					window.return_loadhmOk = function() {
						hmac_flash_ready = !0
					}
				}
			};
			return i
		}), define("dypassport/com/user-view-dp", ["jquery", "shark/observer"],
		function(e, o) {
			function i(e, o) {
				o ? DYS.sub({
							kernelFlag : !0,
							realTime : !0
						}, e) : DYS.sub(e)
			}
			var n = {};
			o.on("dys.com.user.view.dpdata", function(e) {
						n = e || {};
						try {
							DYS.sub.setPageCode(n.page_code)
						} catch (o) {
						}
					});
			var a = function(o, i) {
				n.ext && (n.ext = {});
				var a = e.extend(!0, {}, n, {
							action_code : i,
							ext : o
						});
				return a
			}, t = {
				"dys.com.user.login.show" : function(e) {
					i(a(e, "show_login"), !0)
				},
				"dys.com.user.login.vcode.show" : function(e) {
					i(a(e, "show_login_code"))
				},
				"dys.com.user.login.input.change" : function(e) {
					var o;
					switch (e.name) {
						case "phoneNum" :
							o = "click_login_phone_number";
							break;
						case "phoneNum-password" :
							o = "click_login_phone_pw";
							break;
						case "username" :
							o = "click_login_name";
							break;
						case "password" :
							o = "click_login_pw";
							break;
						case "phoneCaptcha" :
							o = "click_login_fastphone_codein"
					}
					e && delete e.name, i(a(e, o))
				},
				"dys.com.user.login.password.forget" : function(e) {
					i(a(e, "click_login_forgpass"), !0)
				},
				"dys.com.user.login.submit.click" : function(e) {
					i(a(e, "click_login_tologin"))
				},
				"dys.com.user.login.submit.success" : function(e) {
					i(a(e, "show_login_succ"), !0)
				},
				"dys.com.user.login.submit.fail" : function(e) {
					i(a(e, "show_login_fail"))
				},
				"dys.com.user.login.close.click" : function(e) {
					i(a(e, "click_login_close"))
				},
				"dys.com.user.login.thirds.click" : function(e) {
					i(a(e, "click_login_other"), !0)
				},
				"dys.com.user.reg.show" : function(e) {
					i(a(e, "show_sign"), !0)
				},
				"dys.com.user.reg.input.change" : function(e) {
					var o;
					switch (e.name) {
						case "phoneNum" :
							o = "click_sign_phones_number";
							break;
						case "nickname" :
							o = "click_sign_name";
							break;
						case "password" :
							o = "click_sign_pw";
							break;
						case "password2" :
							o = "click_sign_pw2";
							break;
						case "protocol" :
							o = "click_sign_agree";
							break;
						case "phoneCaptcha" :
							o = "click_sign_phones_codein";
							break;
						case "reName" :
							o = "click_sign_phones_succ_modname"
					}
					e && delete e.name, i(a(e, o))
				},
				"dys.com.user.reg.input.change.realtime" : function(o) {
					var n;
					if (o && !e.isEmptyObject(o)) {
						switch (o.name) {
							case "nickname" :
								n = "click_sign_name";
								break;
							case "password" :
								n = "click_sign_pw";
								break;
							case "password2" :
								n = "click_sign_pw2"
						}
						o && delete o.name, i(a(o, n), !0)
					}
				},
				"dys.com.user.reg.submit.click" : function(e) {
					i(a(e, "click_sign_tosign"), !0)
				},
				"dys.com.user.reg.submit.success" : function(e) {
					i(a(e, "show_sign_succ"), !0)
				},
				"dys.com.user.reg.login.fail" : function(e) {
					i(a(e, "show_sign_fail"), !0)
				},
				"dys.com.user.reg.close.click" : function(e) {
					i(a(e, "click_sign_close"))
				},
				"dys.com.user.reg.thirds.click" : function(e) {
					i(a(e, "click_sign_other"), !0)
				},
				"dys.com.user.phone.show" : function(e) {
					i(a(e, "show_sign_phone"), !0)
				},
				"dys.com.user.phone.input.change" : function(e) {
					var o;
					switch (e.name) {
						case "selectCountry" :
							o = "click_sign_phone_cou";
							break;
						case "bindphonenum" :
							o = "click_sign_phone";
							break;
						case "phonenum_captcha" :
							o = "click_sign_phone_code";
							break;
						case "change_captcha" :
							o = "click_sign_phone_newcode";
							break;
						case "yzphonenum" :
							o = "click_sign_phone_codein";
							break;
						case "get_yzphonenum" :
							o = "click_sign_phone_get_code"
					}
					e && delete e.name, "click_sign_phone" == o
							? i(a(e, o), !0)
							: i(a(e, o))
				},
				"dys.com.user.phone.submit.click" : function(e) {
					i(a(e, "click_sign_phone_tophone"))
				},
				"dys.com.user.phone.submit.success" : function(e) {
					i(a(e, "show_sign_phone_succ"), !0)
				},
				"dys.com.user.phone.submit.fail" : function(e) {
					i(a(e, "show_sign_phone_fail"), !0)
				},
				"dys.com.user.phone.close.click" : function(e) {
					i(a(e, "click_sign_phone_close"))
				},
				"dys.com.user.login.jyyz_reg.click" : function(e) {
					i(a(e, "click_sign_code"), !0)
				},
				"dys.com.user.login.jyyz_reg_img.click" : function(e) {
					i(a(e, "click_sign_code"), !0)
				},
				"dys.com.user.login.jyyz_login.click" : function(e) {
					i(a(e, "click_login_code"), !0)
				},
				"dys.com.user.login.jyyz_login_img.click" : function(e) {
					i(a(e, "click_login_code"), !0)
				},
				"dys.com.user.login.phonelogin.click" : function(e) {
					i(a(e, "click_login_phonelogin"))
				},
				"dys.com.user.login.nnamelogin.click" : function(e) {
					i(a(e, "click_login_nnamelogin"))
				},
				"dys.com.user.login.login_phone_country.click" : function(e) {
					i(a(e, "click_login_phone_country"))
				},
				"dys.com.user.login.login_phone_fail.show" : function(e) {
					i(a(e, "show_login_phone_fail"))
				},
				"dys.com.user.login.login_phone_succ.show" : function(e) {
					i(a(e, "show_login_phone_succ"))
				},
				"dys.com.user.login.login_qrcodelogin.click" : function(e) {
					i(a(e, "click_login_qrcodelogin"))
				},
				"dys.com.user.login.login_norlogin.click" : function(e) {
					i(a(e, "click_login_norlogin"))
				},
				"dys.com.user.login.login_qrcodelogin_refresh" : function(e) {
					i(a(e, "click_login_qrcodelogin_refresh"))
				},
				"dys.com.user.login.qrcodelogin_succ.show" : function(e) {
					i(a(e, "show_qrcodelogin_succ"))
				},
				"dys.com.user.login.qrcodelogin_fail.show" : function(e) {
					i(a(e, "show_qrcodelogin_fail"))
				},
				"dys.com.user.verify.show_login_remote_verify" : function(e) {
					i(a(e, "show_login_remote_verify"))
				},
				"dys.com.user.verify.click_login_remote_code" : function(e) {
					i(a(e, "click_login_remote_code"))
				},
				"dys.com.user.verify.click_login_remote_code_confirm" : function(
						e) {
					i(a(e, "click_login_remote_code_confirm"))
				},
				"dys.com.user.verify.click_login_remote_code_cancel" : function(
						e) {
					i(a(e, "click_login_remote_code_cancel"))
				},
				"dys.com.user.verify.show_login_remote_code_succ" : function(e) {
					i(a(e, "show_login_remote_code_succ"))
				},
				"dys.com.user.verify.show_login_remote_code_fail" : function(e) {
					i(a(e, "show_login_remote_code_fail"))
				},
				"dys.com.user.reg.sms.click" : function(e) {
					i(a(e, "click_sign_phones_get_code"))
				},
				"dys.com.user.reg.succ.login" : function(e) {
					i(a(e, "click_sign_phones_succ_login"))
				},
				"dys.com.user.login.sms.click" : function(e) {
					i(a(e, "click_login_fastphone_get_code"))
				},
				"dys.com.user.login.login_sms_succ.show" : function(e) {
					i(a(e, "show_login_fastphone_succ"))
				},
				"dys.com.user.login.login_sms_fail.show" : function(e) {
					i(a(e, "show_login_fastphone_fail"))
				},
				"dys.com.user.login.phoneNumlogin.click" : function(e) {
					i(a(e, "click_login_fastphone_paslogin"))
				},
				"dys.com.user.login.smslogin.click" : function(e) {
					i(a(e, "click_login_phone_fastphone"))
				}
			};
			for (var c in t)
				!function(e) {
					var i = t[e];
					o.on(e, function(e) {
								i.call(this, e)
							})
				}(c)
		}), define("dypassport/com/location-log-verify", ["jquery",
				"shark/class", "shark/util/lang/1.0",
				"shark/util/template/1.0", "shark/observer",
				"dypassport/com/user-view-dp", "dypassport/com/user-control"],
		function(e, o, i, n, a, t, c) {
			var s = {
				v_type : "mes",
				logBox : e("#loginbox-con"),
				CALLBACK : {
					login : "passport_login_callback"
				},
				client_id : window.client_id || 1
			}, r = {
				remoteLogin : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, $SYS.lang
							&& (o.lang = $SYS.lang), e.ajax({
								url : "/iframe/remoteLogin",
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				},
				sendPhoneCaptcha : function(o, i, n) {
					i = i || e.noop, n = n || e.noop, $SYS.lang
							&& (o.lang = $SYS.lang), e.ajax({
								url : "/iframe/sendPhoneCaptcha",
								type : "post",
								data : o,
								dataType : "json",
								success : i,
								error : n
							})
				}
			}, l = {
				getLocationParam : function(e) {
					var o = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), i = window.location.search
							.substr(1).match(o);
					return null != i ? decodeURIComponent(i[2]) : null
				}
			}, d = function(o) {
				var i = "";
				try {
					i = e.i18n.prop(o)
				} catch (n) {
				}
				return i
			}, u = o({
				init : function(o) {
					var i = this;
					i.options = e.extend({}, {
								phonenum : ".js-verify-phonenum",
								iptcode : ".js-verify-iptcode",
								voicebtn : ".js-verify-voicebtn",
								submit : ".js-verify-submit",
								cancel : ".js-verify-cancel",
								close : ".js-verify-close",
								info : ".js-verify-info",
								onSubmit : e.noop,
								onCancel : e.noop,
								data : {
									isForeignTel : 0,
									phonenum : ""
								}
							}, o || {}), i.voicetext = "短信验证", i.isoutside = !1, i.countTimer = null, i.sendvoicetime = 0, 1 === parseInt(
							i.options.data.isForeignTel, 10)
							&& (i.voicetext = "语音验证", i.isoutside = !0), i
							.show(), i.getDoms(), i.bindEvt()
				},
				render : function(e) {
					var o, a, t = i.string
							.join(
									'<div class="location-verify-wrap" id="location-verify-wrap">',
									'<div class="location-verify-mask"></div>',
									'<div class="location-verify-content">',
									'<h3 class="location-verify-title">登录验证</h3>',
									'<div class="location-verify-close js-verify-close" data-verify="close">&times</div>',
									'<div class="location-verify-bd">',
									'<p class="location-verify-tip">为了保证您的账号安全，本次登录需进行安全信息验证</p>',
									'<p class="location-verify-tip location-verify-phone" data-verify="phone-number"><label>密保手机：</label>',
									'<span class="js-verify-phonenum"><%= phonenum %></span>',
									"</p>",
									'<input class="location-verify-phone-input js-verify-iptcode" type="text" maxlength="6" placeholder="验证码">',
									'<input type="submit" class="location-verify-vbtn js-verify-voicebtn" data-sms-isoutside="<%= isoutside %>" value="<%= voicetext %>" />',
									'<div class="location-verify-info js-verify-info">您将会接到一个电话，电话中会语言告知您的验证码，验证过程不收取任何费用</div>',
									'<div class="location-verify-ft">',
									'<button class="location-verify-submit js-verify-submit">确定</button>',
									'<button class="location-verify-cancel js-verify-cancel">取消</button>',
									"</div>", "</div>", "</div>", "</div>");
					return o = n.compile(t), a = o(e)
				},
				getDoms : function() {
					var o = e("#location-verify-wrap");
					this.doms = {
						logBox : s.logBox,
						wrap : o,
						close : o.find('[data-verify="close"]'),
						phonenum : o.find(".js-verify-phonenum"),
						code : o.find(".js-verify-iptcode"),
						submit : o.find(".js-verify-submit"),
						voicebtn : o.find(".js-verify-voicebtn"),
						cancel : o.find(".js-verify-cancel")
					}
				},
				show : function() {
					var o, i = this;
					e("#location-verify-wrap").size() > 0
							&& e("#location-verify-wrap").off(".verifyPhone")
									.remove(), o = e.extend({}, i.options.data,
							{
								voicetext : i.voicetext
							}), s.logBox.append(i.render(o)), i.isoutside
							&& (e(i.options.info).show(), s.v_type = "voice"), a
							.trigger(
									"dys.com.user.verify.show_login_remote_verify",
									{
										v_type : s.v_type
									})
				},
				hide : function() {
					var e = this.doms;
					e.wrap.off(".verifyPhone").fadeOut().remove()
				},
				clearTimer : function() {
					this.countTimer && clearTimeout(this.countTimer)
				},
				countDown : function(e, o, i) {
					var n = this;
					o >= 0
							? (e.attr("disabled", !0).addClass("disabled"), e
									.val(i + "(" + o + ")"), o--, n.countTimer = setTimeout(
									function() {
										n.countDown(e, o, i)
									}, 1e3))
							: (e.attr("disabled", !1).removeClass("disabled"), e
									.val("重新获取"))
				},
				resetText : function() {
					this.doms.voicebtn.val(this.voicetext).attr("disabled", !1)
							.removeClass("disbaled")
				},
				validateCodeHandler : function() {
					var o = this, i = function(i) {
						switch (i.error) {
							case 0 :
								o.countDown(o.doms.voicebtn, 60, o.voicetext);
								break;
							case 1 :
								i.msg && e.dialog.tips_black(i.msg)
						}
						o.sendvoicetime = 0
					}, n = function() {
						o.sendvoicetime = 0
					};
					r.sendPhoneCaptcha({}, i, n)
				},
				submitHandler : function() {
					var o, i = this, n = i.doms.code.val(), t = function(o) {
						if (0 !== o.error)
							return e.dialog.tips_black(o.msg), void a
									.trigger(
											"dys.com.user.verify.show_login_remote_code_fail",
											{
												v_type : s.v_type,
												em : o.msg
											});
						if (a
								.trigger(
										"dys.com.user.verify.show_login_remote_code_succ",
										{
											v_type : s.v_type
										}), o.data.url) {
							var i = function(o) {
								if (0 !== o.error)
									return void e.dialog.tips_black(o.msg);
								var i = l.getLocationParam(s.CALLBACK.login);
								if (i && window.parent && window.parent[i]) {
									var n = window.parent[i];
									if (n && e.isFunction(n))
										return o.client_id = s.client_id, o.passport_callback = window.passport_callback
												|| "", void n.call(
												window.parent, o)
								}
								var a = window.passport_callback;
								setTimeout(function() {
											location.replace(a)
										})
							}, n = function() {
								e.dialog.tips_black(d("编码.登录过程中发生错误，请稍候再试")
										|| "登录过程中发生错误，请稍候再试")
							};
							c.API.subSiteLogin(o.data.url, o.data, i, n)
						}
					}, u = function() {
						e.dialog.tips_black("验证过程发生错误")
					};
					return n ? (o = {
						phoneCaptcha : n,
						client_id : s.client_id
					}, void r.remoteLogin(o, t, u)) : void e.dialog
							.tips_black("请输入验证码")
				},
				bindEvt : function() {
					var e = this, o = e.doms;
					o.wrap.on("click.verifyPhone.close", e.options.close,
							function() {
								e.hide(), e.options.onCancel()
							}), o.wrap.on("click.verifyPhone.voicebtn",
							e.options.voicebtn, function() {
								e.sendvoicetime > 0
										|| (a
												.trigger(
														"dys.com.user.verify.click_login_remote_code",
														{
															v_type : s.v_type
														}), e
												.validateCodeHandler(), e.sendvoicetime++)
							}), o.wrap.on("click.verifyPhone.submit",
							e.options.submit, function() {
								a
										.trigger(
												"dys.com.user.verify.click_login_remote_code_confirm",
												{
													v_type : s.v_type
												}), e.submitHandler()
							}), o.wrap.on("click.verifyPhone.cancel",
							e.options.cancel, function() {
								a
										.trigger(
												"dys.com.user.verify.click_login_remote_code_cancel",
												{
													v_type : s.v_type
												}), e.hide(), e.options
										.onCancel()
							})
				}
			});
			return u.create = function(e) {
				return new u(e)
			}, {
				init : function(e) {
					return u.create(e)
				}
			}
		}), define("dypassport/com/scan-qrcode", ["jquery",
				"shark/util/lang/1.0", "shark/util/cookie/1.0",
				"dypassport/com/user-control", "shark/observer",
				"dypassport/com/user-view-dp"], function(e, o, i, n, a, t) {
			var c = {
				client_id : window.client_id || 1,
				step : 1,
				fac : "",
				CALLBACK : {
					reg : "passport_reg_callback",
					login : "passport_login_callback",
					close : "passport_close_callback",
					dp : "passport_dp_callback"
				},
				DP : {
					phone_verify_type : "mes"
				}
			}, s = {
				serialize : function(e) {
					var o = "", i = [];
					try {
						for (var n in e)
							i.push(n + "=" + decodeURIComponent(e[n]));
						o = i.join("&")
					} catch (a) {
					}
					return o
				},
				formatDate : function(e, o) {
					try {
						var i = {
							"M+" : e.getMonth() + 1,
							"d+" : e.getDate(),
							"h+" : e.getHours(),
							"m+" : e.getMinutes(),
							"s+" : e.getSeconds(),
							"q+" : Math.floor((e.getMonth() + 3) / 3),
							S : e.getMilliseconds()
						};
						/(y+)/.test(o)
								&& (o = o.replace(RegExp.$1,
										(e.getFullYear() + "").substr(4
												- RegExp.$1.length)));
						for (var n in i)
							new RegExp("(" + n + ")").test(o)
									&& (o = o
											.replace(
													RegExp.$1,
													1 == RegExp.$1.length
															? i[n]
															: ("00" + i[n])
																	.substr(("" + i[n]).length)))
					} catch (a) {
					}
					return o
				},
				getLocationParam : function(e) {
					var o = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), i = window.location.search
							.substr(1).match(o);
					return null != i ? decodeURIComponent(i[2]) : null
				}
			}, r = {
				init : function(o) {
					this.$scancodeBox = e(".js-scancode-box"), this.$normalLoginBox = e(".js-login-normal"), this.$qrCon = this.$scancodeBox
.find(".js-qrcode-con"),this.$qrRefreshbtn=this.$scancodeBox.find(".js-qrcode-refresh"),this.$qrBackbtn=this.$scancodeBox.find(".js-qrcode-back"),this.$qrSwitch=e(".js-qrcode-switch"),this.$toLink=this.$scancodeBox.find(".js-to-link"),this.$loginClose=e(".loginbox-close"),this.status="scan-init",this.qrcode="",this.loopCheckTimer=null,this.dpCache={},this.cbInit=!0,this.callback=o,this.initQrLoginCode(),this.evt()},initQrLoginCode:function(){var e=this,o={client_id:c.client_id},i=function(o){0===o.error&&(e.qrcode=o.data.code,e.makeQrCode(o.data.url),e.loopCheck(o.data.code))};n.API.qrGenerateCode(o,i)},checkCanvasSupport:function(){var e=!0;try{e=!!document.createElement("canvas").getContext}catch(o){e=!1}return e},makeQrCode:function(e){this.$qrCon.html("");var o="canvas",i=this.checkCanvasSupport();i||(o="table"),this.$qrCon.qrcode({render:o,width:156,height:156,correctLevel:0,text:e})},loopCheck:function(o){var i=this,a=1e3;return this.status&&e.inArray(this.status,["scan-fail","scan-hide","scan-reg"])>-1?void this.clearLoopCheckTimer():void(this.loopCheckTimer=setTimeout(function(){var e={code:o},a=function(e){switch(e.error){case 0:return i.clearLoopCheckTimer(),void i.appClientSuccessHandler(e.data);case 1:i.switchQrViewByStatus("scan-success"),i.DP("dys.com.user.login.qrcodelogin_succ.show");break;case-1:i.resetQrView(),i.clearLoopCheckTimer(),i.switchQrViewByStatus("scan-fail")}e=null,i.loopCheck(o)},t=function(){i.clearLoopCheckTimer()};n.API.qrCheckScan(e,a,t)},a))},clearLoopCheckTimer:function(){clearTimeout(this.loopCheckTimer),this.loopCheckTimer=null},getAppClientSuccessJSONP:function(o,i,n,a){o&&(n=n||e.noop,a=a||e.noop,e.ajax({url:o,type:"GET",data:i,dataType:"jsonp",jsonp:"callback",jsonpCallback:"appClient_json_callback",success:n,error:a}))},appClientSuccessHandler:function(e){var o=this;if(e.url){var i=function(e){o.qrLoginSuccessCallback(e)};o.getAppClientSuccessJSONP(e.url,{},i)}},qrLoginSuccessCallback:function(o){if(0!==o.error)return e.dialog.tips_black(o.msg),void this.DP("dys.com.user.login.qrcodelogin_fail.show",{em:o.msg});var i=s.getLocationParam(c.CALLBACK.login);if(i&&window.parent&&window.parent[i]){var n=window.parent[i];if(n&&e.isFunction(n))return o.client_id=c.client_id,o.passport_callback=window.passport_callback||"",void n.call(window.parent,o)}var a=window.passport_callback;setTimeout(function(){location.replace(a)})},switchQrViewByStatus:function(o){var i="status-scan status-scansucceed status-scanfail hide";switch(o){case"scan-init":this.$normalLoginBox.addClass("hide"),this.$scancodeBox.removeClass(i).addClass("status-scan"),this.status="scan-init";break;case"scan-fail":this.$scancodeBox.removeClass(i).addClass("status-scan status-scanfail"),this.status="scan-fail";break;case"scan-success":this.$scancodeBox.removeClass(i).addClass("status-scansucceed"),this.status="scan-success";break;case"scan-hide":this.cbInit&&(e.isFunction(this.callback)&&this.callback(),this.cbInit=!1),this.$scancodeBox.removeClass(i).addClass("hide"),this.$normalLoginBox.removeClass("hide"),this.status="scan-hide"}},toggleLoginQrView:function(){"scan-hide"===this.status||"scan-reg"===this.status?(this.switchQrViewByStatus("scan-init"),this.DP("dys.com.user.login.login_qrcodelogin.click")):(this.switchQrViewByStatus("scan-hide"),this.DP("dys.com.user.login.login_norlogin.click"))},resetQrView:function(){this.dpCache={},this.clearLoopCheckTimer()},evt:function(){this.$qrRefreshbtn.on("click.qrcode.refresh",e.proxy(this.qrRefreshHandler,this)),this.$qrBackbtn.on("click.qrcode.back",e.proxy(this.qrBackHandler,this)),this.$qrSwitch.on("click.qrcode.switch",e.proxy(this.qrSwitchHandler,this)),this.$toLink.on("click.qrcode.tolink",e.proxy(this.qrToLink,this)),this.$loginClose.on("click.qrcode.close",e.proxy(this.qrDeleteCode,this))},qrRefreshHandler:function(){this.switchQrViewByStatus("scan-init"),this.initQrLoginCode(),this.DP("dys.com.user.login.login_qrcodelogin_refresh")},qrBackHandler:function(){this.qrDeleteCode(),this.switchQrViewByStatus("scan-init"),this.resetQrView(),this.initQrLoginCode()},qrSwitchHandler:function(){this.toggleLoginQrView(),"scan-init"===this.status&&this.initQrLoginCode(),"scan-hide"===this.status&&this.resetQr()},qrToLink:function(o){var i=e(o.target),n=i.data("type");this.status="scan-hide",this.resetQr(),a.trigger("qrcode.clicl.toLink.loginOrReg",n)},qrDeleteCode:function(){var e=this;if(this.qrcode){var o={code:this.qrcode},i=function(){e.qrcode=""},a=function(){e.qrcode=""};n.API.qrDeleteCode(o,i,a)}},resetQr:function(){this.resetQrView(),this.qrDeleteCode()},DP:function(o,i){if(!this.dpCache[o]||"dys.com.user.login.qrcodelogin_succ.show"!==o){var n={step:c.step++,fac:c.fac};n=e.extend(!0,n,i||{}),a.trigger(o,n),this.dpCache[o]=n}}};return r}),define("dypassport/com/user-view-util",["jquery"],function(e){function o(o){var i="";try{i=e.i18n.prop(o)}catch(n){}return i}var i={countTimer:null,isTimer:!1,serialize:function(e){var o="",i=[];try{for(var n in e)i.push(n+"="+decodeURIComponent(e[n]));o=i.join("&")}catch(a){}return o},formatDate:function(e,o){try{var i={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};/(y+)/.test(o)&&(o=o.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in i)new RegExp("("+n+")").test(o)&&(o=o.replace(RegExp.$1,1==RegExp.$1.length?i[n]:("00"+i[n]).substr((""+i[n]).length)))}catch(a){}return o},getLocationParam:function(e){var o=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),i=window.location.search.substr(1).match(o);return null!=i?decodeURIComponent(i[2]):null},addParam:function(o,i){var n=e(".loginbox-con"),a=n.find('.third-icon-qq[data-point-2="qq"]'),t=n.find('.third-icon-wx[data-point-2="wx"]'),c=n.find('.third-icon-wb[data-point-2="wb"]'),s=n.find('.third-icon-fb[data-point-2="fb"]'),r=function(e){e.length&&(e.attr("href").indexOf("?")>-1?e.attr("href",e.attr("href")+"&fac="+i.fac+"&type="+o):e.attr("href",e.attr("href")+"?fac="+i.fac+"&type="+o))};r(a,o),r(t,o),r(c,o),s.length&&r(s,o)},countDown:function(e,n,a){this.second||(this.second=a),this.second>=0?(e.attr("disabled",!0),e.val(n+"("+this.second+")"),e.addClass("long"),this.second--,i.countTimer=setTimeout(function(){i.countDown(e,n)},1e3)):(i.countTimer=null,e.removeClass("long"),e.attr("disabled",!1),e.val(o("编码.重新获取")||"重新获取"))},resetCountDown:function(e){i.countTimer&&(i.countTimer=null,this.second=0)}};return i}),define("dypassport/com/user-view-iframe",["jquery","dypassport/com/user-view-util"],function(e,o){var i={init:function(){i.resetDomain()},resetDomain:function(){var e=document.domain;try{e=e.split(".").slice(-2).join(".")}catch(o){console.log&&console.log(o)}document.domain=e},checkLoginnedUserAuthData:function(){var e={};return window.passport_code&&"0"!=window.passport_uid?(e.passport_callback=window.passport_callback,e.code=window.passport_code,e.uid=window.passport_uid,e):!1},apiLoginCallback:function(i){var n=o.getLocationParam(Vars.CALLBACK.login);if(n&&window.parent&&window.parent[n]){var a=window.parent[n];a&&e.isFunction(a)&&a.call(window.parent,i)}},dpCallback:function(i){var n=o.getLocationParam(Vars.CALLBACK.dp);if(n&&window.parent&&window.parent[n]){var a=window.parent[n];a&&e.isFunction(a)&&a.call(window.parent,i)}}};return i}),define("dypassport/com/static-config",[],function(){var e={areaConfig:[{area:"中国大陆",code:"86"},{area:"中国澳门",code:"853"},{area:"中国香港",code:"852"},{area:"中国台湾",code:"886"},{area:"阿尔巴尼亚",code:"355"},{area:"阿尔及利亚",code:"213"},{area:"阿富汗",code:"93"},{area:"阿根廷",code:"54"},{area:"阿拉伯联合酋长国",code:"971"},{area:"阿鲁巴岛",code:"297"},{area:"阿曼",code:"968"},{area:"阿塞拜疆",code:"994"},{area:"阿森松岛",code:"247"},{area:"埃及",code:"20"},{area:"埃塞俄比亚",code:"251"},{area:"爱尔兰",code:"353"},{area:"爱沙尼亚",code:"372"},{area:"安道尔",code:"376"},{area:"安哥拉",code:"244"},{area:"安圭拉岛",code:"1264"},{area:"安提瓜和巴布达",code:"1268"},{area:"奥地利",code:"43"},{area:"澳大利亚",code:"61"},{area:"巴巴多斯",code:"1246"},{area:"巴布亚新几内亚",code:"675"},{area:"巴哈马",code:"1242"},{area:"巴基斯坦",code:"92"},{area:"巴拉圭",code:"595"},{area:"巴勒斯坦",code:"970"},{area:"巴林",code:"973"},{area:"巴拿马",code:"507"},{area:"巴西",code:"55"},{area:"白俄罗斯",code:"375"},{area:"百慕大",code:"1441"},{area:"保加利亚",code:"359"},{area:"北马里亚纳群岛",code:"1"},{area:"贝宁",code:"229"},{area:"比利时",code:"32"},{area:"冰岛",code:"354"},{area:"波多黎各",code:"1787"},{area:"波黑",code:"387"},{area:"波兰",code:"48"},{area:"玻利维亚",code:"591"},{area:"伯利兹",code:"501"},{area:"博茨瓦纳",code:"267"},{area:"博奈尔岛、圣尤斯特歇斯和萨巴岛",code:"599"},{area:"不丹",code:"975"},{area:"布基纳法索",code:"226"},{area:"布隆迪",code:"257"},{area:"朝鲜",code:"850"},{area:"赤道几内亚",code:"240"},{area:"丹麦",code:"45"},{area:"德国",code:"49"},{area:"迪戈加西亚岛",code:"246"},{area:"东帝汶",code:"670"},{area:"多哥",code:"228"},{area:"多米尼加",code:"1767"},{area:"多米尼加共和国",code:"1809"},{area:"俄罗斯",code:"7"},{area:"厄瓜多尔",code:"593"},{area:"厄立特里亚",code:"291"},{area:"法国",code:"33"},{area:"法罗群岛",code:"298"},{area:"法属波利尼西亚",code:"689"},{area:"法属圭亚那",code:"594"},{area:"梵蒂冈",code:"379"},{area:"菲律宾",code:"63"},{area:"斐济",code:"679"},{area:"芬兰",code:"358"},{area:"佛得角",code:"238"},{area:"福克兰群岛",code:"500"},{area:"冈比亚",code:"220"},{area:"刚果",code:"242"},{area:"刚果民主共和国",code:"243"},{area:"哥伦比亚",code:"57"},{area:"哥斯达黎加",code:"506"},{area:"格林纳达",code:"1473"},{area:"格陵兰",code:"299"},{area:"格鲁吉亚",code:"995"},{area:"古巴",code:"53"},{area:"瓜德罗普",code:"590"},{area:"关岛",code:"1671"},{area:"圭亚那",code:"592"},{area:"哈萨克斯坦",code:"7"},{area:"海地",code:"509"},{area:"韩国",code:"82"},{area:"荷兰",code:"31"},{area:"荷属圣马丁",code:"1721"},{area:"黑山",code:"382"},{area:"洪都拉斯",code:"504"},{area:"基里巴斯",code:"686"},{area:"吉布提",code:"253"},{area:"吉尔吉斯斯坦",code:"996"},{area:"几内亚",code:"224"},{area:"几内亚比绍",code:"245"},{area:"加拿大",code:"1"},{area:"加纳",code:"233"},{area:"加蓬",code:"241"},{area:"柬埔寨",code:"855"},{area:"捷克共和国",code:"420"},{area:"津巴布韦",code:"263"},{area:"喀麦隆",code:"237"},{area:"卡塔尔",code:"974"},{area:"开曼群岛",code:"1345"},{area:"科摩罗和马约特岛",code:"269"},{area:"科特迪瓦",code:"225"},{area:"科威特",code:"965"},{area:"克罗地亚",code:"385"},{area:"肯尼亚",code:"254"},{area:"库克群岛",code:"682"},{area:"库拉索",code:"599"},{area:"拉脱维亚",code:"371"},{area:"莱索托",code:"266"},{area:"老挝",code:"856"},{area:"黎巴嫩",code:"961"},{area:"立陶宛",code:"370"},{area:"利比里亚",code:"231"},{area:"利比亚",code:"218"},{area:"列支敦士登",code:"423"},{area:"留尼旺岛",code:"262"},{area:"卢森堡",code:"352"},{area:"卢旺达",code:"250"},{area:"罗马尼亚",code:"40"},{area:"马达加斯加",code:"261"},{area:"马尔代夫",code:"960"},{area:"马耳他",code:"356"},{area:"马拉维",code:"265"},{area:"马来西亚",code:"60"},{area:"马里",code:"223"},{area:"马其顿",code:"389"},{area:"马绍尔群岛",code:"692"},{area:"马提尼克岛",code:"596"},{area:"毛里求斯",code:"230"},{area:"毛里塔尼亚",code:"222"},{area:"美国",code:"1"},{area:"美属萨摩亚",code:"1684"},{area:"美属维尔京群岛",code:"1340"},{area:"蒙古",code:"976"},{area:"蒙特塞拉特岛",code:"1664"},{area:"孟加拉国",code:"880"},{area:"秘鲁",code:"51"},{area:"密克罗尼西亚",code:"691"},{area:"缅甸",code:"95"},{area:"摩尔多瓦",code:"373"},{area:"摩洛哥",code:"212"},{area:"摩纳哥",code:"377"},{area:"莫桑比克",code:"258"},{area:"墨西哥",code:"52"},{area:"纳米比亚",code:"264"},{area:"南非",code:"27"},{area:"南苏丹",code:"211"},{area:"瑙鲁",code:"674"},{area:"尼加拉瓜",code:"505"},{area:"尼泊尔",code:"977"},{area:"尼日尔",code:"227"},{area:"尼日利亚",code:"234"},{area:"纽埃岛",code:"683"},{area:"挪威",code:"47"},{area:"诺福克岛",code:"6723"},{area:"帕劳",code:"680"},{area:"葡萄牙",code:"351"},{area:"日本",code:"81"},{area:"瑞典",code:"46"},{area:"瑞士",code:"41"},{area:"萨尔瓦多",code:"503"},{area:"萨摩亚",code:"685"},{area:"塞尔维亚",code:"381"},{area:"塞拉利昂",code:"232"},{area:"塞内加尔",code:"221"},{area:"塞浦路斯",code:"357"},{area:"塞舌尔",code:"248"},{area:"沙特阿拉伯",code:"966"},{area:"圣巴泰勒米岛",code:"590"
},{area:"圣多美和普林西比",code:"239"},{area:"圣赫勒拿岛",code:"290"},{area:"圣基茨和尼维斯",code:"1869"},{area:"圣卢西亚",code:"1758"},{area:"圣马丁",code:"590"},{area:"圣马力诺",code:"378"},{area:"圣皮埃尔和密克隆群岛",code:"508"},{area:"圣文森特和格林纳丁斯",code:"1784"},{area:"斯里兰卡",code:"94"},{area:"斯洛伐克",code:"421"},{area:"斯洛文尼亚",code:"386"},{area:"斯威士兰",code:"268"},{area:"苏丹",code:"249"},{area:"苏里南",code:"597"},{area:"所罗门群岛",code:"677"},{area:"索马里",code:"252"},{area:"塔吉克斯坦",code:"992"},{area:"泰国",code:"66"},{area:"坦桑尼亚",code:"255"},{area:"汤加",code:"676"},{area:"特克斯和凯科斯群岛",code:"1649"},{area:"特立尼达和多巴哥",code:"1868"},{area:"突尼斯",code:"216"},{area:"图瓦卢",code:"688"},{area:"土耳其",code:"90"},{area:"土库曼斯坦",code:"993"},{area:"托克劳",code:"690"},{area:"瓦利斯和富图纳群岛",code:"681"},{area:"瓦努阿图",code:"678"},{area:"危地马拉",code:"502"},{area:"委内瑞拉",code:"58"},{area:"文莱",code:"673"},{area:"乌干达",code:"256"},{area:"乌克兰语",code:"380"},{area:"乌拉圭",code:"598"},{area:"乌兹别克斯坦",code:"998"},{area:"希腊",code:"30"},{area:"西班牙",code:"34"},{area:"新加坡",code:"65"},{area:"新喀里多尼亚",code:"687"},{area:"新西兰",code:"64"},{area:"匈牙利",code:"36"},{area:"叙利亚",code:"963"},{area:"牙买加",code:"1876"},{area:"亚美尼亚",code:"374"},{area:"也门",code:"967"},{area:"伊拉克",code:"964"},{area:"伊朗",code:"98"},{area:"以色列",code:"972"},{area:"意大利",code:"39"},{area:"印度",code:"91"},{area:"印度尼西亚",code:"62"},{area:"英国",code:"44"},{area:"英属维尔京群岛",code:"1284"},{area:"约旦",code:"962"},{area:"越南",code:"84"},{area:"赞比亚",code:"260"},{area:"乍得",code:"235"},{area:"直布罗陀",code:"350"},{area:"智利",code:"56"},{area:"中非共和国",code:"236"}]};return e}),define("dypassport/com/select-area",["jquery","shark/class","shark/util/lang/1.0","shark/util/template/2.0","dypassport/com/static-config","dypassport/com/i18n"],function(e,o,i,n,a,t){var c=a.areaConfig,s=o({init:function(o){this.config=e.extend(!0,{container:null,target:null,isEnglish:0,selectClass:"selectCountry-avtive",trigonUp:"selectCountry-san1",extFnObj:{clickParent:e.noop,selectLi:e.noop}},o||{}),this.config.target&&(this.render(),this.getDoms(),this.bindEvent(),this.config.isEnglish&&t.interprete())},render:function(){var e=this,o=i.string.join('<div class="select-area-wrap">','<input class="selectCountry-box-code js-selectCountry-box-code" type="text" name="areaCode" value="+86" readonly ="true" />','<div class="selectCountry-san-box">','<span class="selectCountry-san js-selectCountry-san"></span>',"</div>",'<ul class="select-country-list js-select-country-list clearfix">',"{{ each list as item index }}",'<li value="00{{ item.code }}">','<span class="fl selectCountry-country" ','{{ if isEnglish }} data-i18n="{{ item.area }}" {{ /if }}>{{ item.area }}',"</span>",'<span class="fr selectCountry-value">+{{ item.code }}</span>',"</li>","{{ /each }} ","</ul>","</div>"),a=n.compile(o),t=a({list:c,isEnglish:e.config.isEnglish});this.config.target.append(t)},getDoms:function(){var e=this.config.target;this.doms={target:e,selectUl:e.find(".js-select-country-list"),codeInput:e.find(".js-selectCountry-box-code"),triangle:e.find(".js-selectCountry-san")}},bindEvent:function(){var o=this.config,i=this.doms,n=function(e){e.stopPropagation(),e.preventDefault()};o.container&&o.container.length&&o.container.on("click",function(){e(this).closest(".js-select-country-list").length||(i.selectUl.hide(),i.triangle.removeClass(o.trigonUp))}),i.target.on("click",function(e){n(e),i.selectUl.toggle(),i.triangle.toggleClass(o.trigonUp),o.extFnObj.clickParent&&o.extFnObj.clickParent()}),i.selectUl.on("click","li",function(a){n(a),i.selectUl.find("li").removeClass(o.selectClass),e(this).addClass(o.selectClass),i.selectUl.hide(),i.triangle.toggleClass(o.trigonUp);var t=i.selectUl.find("."+o.selectClass+" .selectCountry-value").text()||"+86";i.codeInput.val(t),o.extFnObj.selectLi&&o.extFnObj.selectLi(t)})}});return{init:function(e){return new s(e)}}}),define("dypassport/com/user-view-login",["jquery","shark/observer","shark/util/cookie/1.0","dypassport/com/vcode-user-v3","dypassport/com/user-control","dypassport/com/user-view-common","dypassport/com/user-view-dp","dypassport/com/location-log-verify","dypassport/com/scan-qrcode","dypassport/com/user-view-util","dypassport/com/user-view-iframe","dypassport/com/select-area"],function(e,o,i,n,a,t,c,s,r,l,d,u){function p(o){var i="";try{i=e.i18n.prop(o)}catch(n){}return i}t.init();var g={view:{el:{pop:"pop",shadow:"shadow",logform:"logform"},type:{login:"login",reg:"reg"},subLoginType:"login-by-phoneNum",currentView:null},isInit:!1,client_id:window.client_id||1,lang:window.$SYS?$SYS.lang:"cn",hmac_flash_ready:!1,step:1,fac:"",salt:null,CALLBACK:{reg:"passport_reg_callback",login:"passport_login_callback",close:"passport_close_callback",dp:"passport_dp_callback"},areaCode:"0086",lock:{sms:!1}},f={},h={},m={};f.control=a,f.init=function(){d.init(),h.init(),f.view.initEvt(),r.init(f.view.init)},f.view={init:function(){g.view.isInit||(g.view.isInit=!0,f.view.$pop=e(".loginbox-con"),g.view.currentView=f.view.$pop.find(".loginbox-bd[data-type=login]"),f.view.$logform=f.view.$pop.find(".loginbox-login form"),f.view.$voiceBtn=f.view.$pop.find(".js-sendvoice"),f.view.$thirds=f.view.$pop.find(".third-list a"),f.view._is_show=!1,setTimeout(function(){f.view.checkStkToLogin(),f.view.evt()},50),u.init({container:e("#loginbox"),target:e(".js-selectCountry-box"),isEnglish:"en"===g.lang,extFnObj:{clickParent:function(){o.trigger("dys.com.user.login.login_phone_country.click",{step:g.step++,fac:g.fac})},selectLi:function(e){var o=f.view.$voiceBtn,i=o.val();g.areaCode=String(e).replace("+","00"),o.length&&!o.hasClass("long")&&("0086"===g.areaCode?o.val(i.replace("语音","短信")):o.val(i.replace("短信","语音")))}}}),f.SubLoginType.init(),m.init())},el:function(e){return e===g.view.el.pop?f.view.$pop:e===g.view.el.logform?f.view.$logform:void 0},loginTip:function(o){var i,n,a,t=o.type?".login-cheak-"+o.type:"",c=o.iconType||"",s=o.cont||"",r=1e3*o.delay||1500;return i=g.view.currentView.find(t),n='<span class="myuser-tip-icon myuser-tip-icon'+c+'"></span><span class="myuser-tip-text'+c+'">'+s+"</span>",a=e(n),f.view.hideTips(),i.html(a),setTimeout(function(){a.fadeOut("fast",function(){a.remove()})},r),a},errorPopTip:function(o){var i,n=o.username||"",a=o.userState,t=o.userStateStr||"",c=o.timeStr||"",s=o.backTime||"",r=o.enMsg||"";if(0===a){var l=o.reasonStr;i='<p>封禁原因：<span class="ellipsis forbiddenReason" title='+l+">"+l+"</span></p>"}else i="";"en"===g.lang?render=['<div class="userForbidden">','<div class="forbiddenClose">&times;</div>','<div class="userForbiddenBox">',"<p>"+r+"</p><br>","</div>","</div>","</div>"].join(""):render=['<div class="userForbidden">','<div class="forbiddenClose">&times;</div>','<div class="userForbiddenBox">','<p class="forbiddenUsername" title='+n+'><span class="ellipsis forbiddenUserName">'+n+"</span>"+t+"</p>",i,"<p>"+c+s+"</p>",'<p>如有疑问请&nbsp<a target="_blank" href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&amp;key=XzgwMDAwMDE1Ml80MjM1NTFfODAwMDAwMTUyXzJf" class="forbiddenServer">联系客服</a>',"&nbsp处理</p>","</div>","</div>"].join(""),$html=e(render),f.view.$logform.append($html),f.view.$logform.find("input.loginbox-sbt").val("登录"),$html.on("click",".forbiddenClose",function(o){f.view._evt_stop(o),e(this).closest("div.userForbidden").hide()})},hideTips:function(){g.view.currentView.find("p.myuser-tip").empty()},make:function(){return{pop:e.trim(e("#dytemp-loginbox").html()),shadow:e.trim(e("#dytemp-loginbox-shadow").html())}},checkStkToLogin:function(){i.get("ltkid")&&i.get("nickname")&&i.get("uid")&&!i.get("stk")&&this.show()},show:function(i,n){o.trigger("dys.com.user.login.show",{step:g.step++,fac:g.fac});var a=g.view.showParam;a&&a.source&&(g.fac=a.source),a=e.isPlainObject(a)?a:{},e.extend(!0,g,a),g.callback||(g.callback=a.callback),l.addParam(g.view.type.login,{fac:g.fac})},hide:function(){f.view.$pop.fadeOut(function(){f.view._is_show=!1})},toggle:function(){f.view._is_show?f.view.hide():f.view.show()},redirect:function(e){var o=f.view._redirect;return o?(f.view._redirect=void 0,setTimeout(function(){location.href=o},e||50),!0):!1},callback:function(o){if(e.isFunction(g.callback))try{g.callback(o)}catch(i){}},initEvt:function(){var i=e(".loginbox-con"),n=i.find(".js-login-normal"),a=i.find(".js-scancode-box");i.on("click",".loginbox-close",function(i){o.trigger("dys.com.user.login.close.click",{step:g.step++,fac:g.fac}),f.view._evt_stop(i),f.view.$bd=e(".loginbox-bd:not(.hide)");var n=l.getLocationParam(g.CALLBACK.close);if(n&&window.parent&&window.parent[n]){var a=window.parent[n];a&&e.isFunction(a)&&a.call(window.parent,0)}}),o.on("qrcode.clicl.toLink.loginOrReg",function(e){return a.addClass("hide"),n.removeClass("hide"),f.view.init(),!1})},evt:function(){var i=f.view.$pop,n=f.view.$logform,a=f.view.$thirds,t={};n.on("click",".captcha-gt",function(){o.trigger("dys.com.user.login.jyyz_login.click",{step:g.step++,fac:g.fac,type:1})}).on("click",".captcha",function(){o.trigger("dys.com.user.login.jyyz_login_img.click",{step:g.step++,fac:g.fac,type:2})}),i.on("change","input ,select",function(i){var n=e(this),a=n.data("modified");if(!a)return!1;try{switch(!0){case n.is('[data-type="login"] [name="phoneNum"]'):o.trigger("dys.com.user.login.input.change",{name:"phoneNum",step:g.step++,fac:g.fac});break;case n.is('[data-type="login"] [name="password"]'):"login-by-phoneNum"===g.view.subLoginType&&o.trigger("dys.com.user.login.input.change",{name:"phoneNum-password",step:g.step++,fac:g.fac});break;case n.is('[data-type="login"] [name="username"]'):o.trigger("dys.com.user.login.input.change",{name:"username",step:g.step++,fac:g.fac});break;case n.is('[data-type="login"] [name="password"]'):o.trigger("dys.com.user.login.input.change",{name:"password",step:g.step++,fac:g.fac});break;case n.is('[data-type="login"] [name="phoneCaptcha"]'):o.trigger("dys.com.user.login.input.change",{v_type:"0086"===g.areaCode?"mes":"voice",name:"phoneCaptcha",step:g.step++,fac:g.fac})}a=!1,n.data("modified",!1)}catch(t){}}).on("keyup mouseup","input ,select",function(){e(this).data("modified",!0)}),a.on("mousedown",function(){var i=e(this),n=g.view.currentView.data("type"),a=i.attr("data-point-2"),t="";switch(a){case"qq":t="qq";break;case"wx":t="weixin";break;case"wb":t="sinawb";break;case"fb":t="facebook"}"login"===n&&o.trigger("dys.com.user.login.thirds.click",{step:g.step++,type:t,fac:g.fac})}),e(".forget-pwd").on("click",function(){o.trigger("dys.com.user.login.password.forget",{step:g.step++,fac:g.fac})}),i.on("change","input",function(){f.validate.check(this,"login")}),n.on("keyup change",'input[name="password"]',function(){t.same(e(this))}).on("click","span.pw-span",function(){t.show(e(this))}),n.on("click",".js-sendvoice",function(){f.view.loginCaptcha(),o.trigger("dys.com.user.login.sms.click",{v_type:"0086"===g.areaCode?"mes":"voice",step:g.step++,fac:g.fac})}),n.submit(function(){return f.view.submitLog(),o.trigger("dys.com.user.login.submit.click",{step:g.step++,fac:g.fac}),!1}),t.same=function(e){var o=e.val();"password"===e.attr("type")&&e.next('input[type="text"]').val(o),"text"===e.attr("type")&&e.prev('input[type="password"]').val(o)},t.show=function(e){var o=e.closest("div");e.hasClass("pw-hide")?(e.removeClass("pw-hide").addClass("pw-show"),o.find('input[type="text"]').val(o.find('input[type="password"]').val()).css({zIndex:1})):(e.removeClass("pw-show").addClass("pw-hide"),o.find('input[type="text"]').css({zIndex:-1}))}},_evt_stop:function(e){e.stopPropagation(),e.preventDefault()},submitLog:function(){var i=f.view.$logform,n=i.find(".btn-sub"),a=[],t=!0,c=null,s={};if(!i.data("submit")){switch(g.view.subLoginType){case"login-by-nickname":a=i.find(".login-by-nickname [name]:not(.notsub)");break;case"login-by-phoneNum":a=i.find(".login-by-phoneNum [name]:not(.notsub)");break;case"login-by-sms":a=i.find(".login-by-sms [name]:not(.notsub)")}if(a.each(function(){return(t=f.validate.check(this,"login"))?void("areaCode"===this.name?s[this.name]=g.areaCode:s[this.name]=this.value):!1}),t){if(m.instance&&!(c=m.instance.getResult()))return e.dialog.tips_black(p("编码.请先点按钮验证再获取验证码")||"请先点按钮验证再获取验证码"),void o.trigger("dys.com.user.login.submit.fail",{step:g.step++,em:"请先点按钮验证再获取验证码",fac:g.fac});s=e.extend({},s,c,g.salt),i.data("submit",!0),n.val(p("编码.提交中…")||"提交中…"),f.view.enter(s,function(e){f.view.callback(e),i.data("submit",e),n.val(p("编码.登录")||"登录")})}}},enter:function(e,o){f.view._enter(e,o)},_enter:function(n,a){var t=function(i){var n=i.error,t="";switch(n){case 0:if(i.data.url){var c=function(i){if(0!==i.error)return void e.dialog.tips_black(i.msg);o.trigger("dys.com.user.login.submit.success",{step:g.step++,em:"",fac:g.fac});var n=l.getLocationParam(g.CALLBACK.login);if(n&&window.parent&&window.parent[n]){var a=window.parent[n];if(a&&e.isFunction(a))return i.client_id=g.client_id,i.passport_callback=window.passport_callback||"",void a.call(window.parent,i)}var t=window.passport_callback;setTimeout(function(){t?location.replace(t):location.reload()})},r=function(){e.dialog.tips_black(p("编码.登录过程中发生错误，请稍候再试")||"登录过程中发生错误，请稍候再试"),o.trigger("dys.com.user.login.submit.fail",{step:g.step++,em:"登录过程中发生错误，请稍候再试！",fac:g.fac})};f.control.API.subSiteLogin(i.data.url,i.data,c,r)}break;case 3:var d=i.data,u={username:d.nick_name,backTime:d.operate_time};0===parseInt(d.has_recharge,10)?(u.userState=0,u.userStateStr="&nbsp;已被封禁",u.timeStr="封禁时间：",u.reasonStr=d.reason):(u.userState=1,u.userStateStr="&nbsp;因账号异常已被冻结",u.timeStr="冻结时间："),"en"===g.lang?(t=p("编码.因违规操作，您的账号被冻结/被封禁")||"因违规操作，您的账号被冻结/被封禁",f.view.errorPopTip({enMsg:t})):f.view.errorPopTip(u),o.trigger("dys.com.user.login.submit.fail",{step:g.step++,em:"封禁",fac:g.fac});break;case 130014:s.init({data:{isForeignTel:i.data.isForeignTel,phonenum:i.data.hidePhone||""},onCancel:function(){f.view.$logform.data("submit",!1),f.view.$logform.find(".btn-sub").val(p("编码.登录")||"登录")}});break;default:l.resetCountDown(f.view.$voiceBtn),t=i.msg,e.dialog.tips_black(t),o.trigger("dys.com.user.login.submit.fail",{step:g.step++,em:i.msg,fac:g.fac})}f.SubLoginType.DP.LoginSuccess(n,t),a(!1),m.instance&&m.instance.refresh()},c=function(){a(!1),f.SubLoginType.DP.LoginError(null,"登录过程中发生错误，请稍候再试"),o.trigger("dys.com.user.login.submit.fail",{step:g.step++,em:"登录过程中发生错误，请稍候再试！",fac:g.fac}),e.dialog.tips_black(p("编码.登录过程中发生错误，请稍候再试")||"登录过程中发生错误，请稍候再试"),m.instance&&m.instance.refresh()},r=n.password;r&&(g.md5_m=CryptoJS.MD5(r).toString(),n.password=g.md5_m),n.redirect_url=location.href,n.t=(new Date).getTime(),n.client_id=g.client_id;try{n.sm_did=SMSdk.getDeviceId()||""}catch(d){}n.did=i.get("did")||"",n.lang=g.lang,f.control.API.iframeLogin(n,t,c)},loginCaptcha:function(){var o=f.view.$logform,i=f.view.$voiceBtn,n=o.find(".login-by-phoneNum.login-by-sms input[name]"),a=o.find('input[name="phoneNum"]'),t=m.instance?m.instance.getResult():{};if(!g.lock.sms&&(n.each(function(){return(flag=f.validate.check(this,"phoneCaptcha"))?void 0:!1}),flag)){if(m.instance&&!(fast=m.instance.getResult()))return void e.dialog.tips_black(p("编码.请先点按钮验证再获取验证码")||"请先点按钮验证再获取验证码");var c=e.extend(!0,{phoneNum:a.val(),areaCode:g.areaCode,lang:g.lang},t),s=function(o){0===+o.error?l.countDown(i,i.val(),60):(m.instance&&m.instance.refresh(),o.msg&&e.dialog.tips_black(o.msg)),g.lock.sms=!1},r=function(){e.dialog.tips_black("请求错误"),g.lock.sms=!1};g.lock.sms=!0,f.control.API.loginVerifyPhone(c,s,r)}}},f.SubLoginType={init:function(){this.doms={loginForm:f.view.$logform,subLoginTypeBtn:e(".loginbox-login .loginbox-bd-container").find("[data-subtype]")},this.evt()},evt:function(){var i=this.doms;i.subLoginTypeBtn.on("click",function(){if(g.view.subLoginType=e(this).data("subtype"),i.loginForm.removeClass().addClass("login-form "+g.view.subLoginType),m.instance&&m.instance.refresh(),e(this).hasClass("login-type-enter"))switch(g.view.subLoginType){case"login-by-sms":o.trigger("dys.com.user.login.smslogin.click",{step:g.step++,fac:g.fac});break;case"login-by-phoneNum":o.trigger("dys.com.user.login.phoneNumlogin.click",{step:g.step++,fac:g.fac})}else switch(i.subLoginTypeBtn.removeClass("active"),g.view.subLoginType){case"login-by-nickname":o.trigger("dys.com.user.login.nnamelogin.click",{step:g.step++,fac:g.fac});break;case"login-by-phoneNum":o.trigger("dys.com.user.login.phonelogin.click",{step:g.step++,fac:g.fac})}e(this).addClass("active")})},DP:{LoginSuccess:function(e,i){switch(g.view.subLoginType){case"login-by-phoneNum":0===e?o.trigger("dys.com.user.login.login_phone_succ.show",{step:g.step++,fac:g.fac}):o.trigger("dys.com.user.login.login_phone_fail.show",{step:g.step++,fac:g.fac});break;case"login-by-sms":0===e?o.trigger("dys.com.user.login.login_sms_succ.show",{step:g.step++,fac:g.fac}):o.trigger("dys.com.user.login.login_sms_fail.show",{step:g.step++,fac:g.fac,em:i})}},LoginError:function(e){switch(g.view.subLoginType){case"login-by-phoneNum":o.trigger("dys.com.user.login.login_phone_fail.show",{step:g.step++,fac:g.fac});break;case"login-by-sms":o.trigger("dys.com.user.login.login_sms_fail.show",{step:g.step++,fac:g.fac,em:e})}}}},f.validate={check:function(o,i){var n=e(o),a=n.attr("name"),t=e.trim(n.val());if(n.attr("placeholder")||n.val(t),"geetest_challenge"===a||"geetest_validate"===a||"geetest_seccode"===a)return!0;if("captcha_word"===a&&m.instance)return!0;if(""===t)return f.validate._fx_err_ipt(o),!1;var c=!0;if("login"===i)switch(g.view.subLoginType){case"login-by-nickname":"username"===a?c=f.validate._ck_login_username(o):"password"===a&&(c=f.validate._ck_login_password(o));break;case"login-by-phoneNum":"phoneNum"===a?c=f.validate._ck_login_phoneNum(o):"password"===a&&(c=f.validate._ck_login_password(o));break;case"login-by-sms":"phoneNum"===a?c=f.validate._ck_login_phoneNum(o):"phoneCaptcha"===a&&(c=f.validate._ck_yzphonenum(o))}else"phoneCaptcha"===i&&"phoneNum"===a&&(c=f.validate._ck_reg_phoneNum(o));return c?(f.validate._fx_rig_ipt(o),!0):!1},_ck_reg_phoneNum:function(o){var i=e(o).val();return!!i},_showerr:function(e,o,i,n){f.view.loginTip({type:o,iconType:i,cont:e}),f.validate._fx_err_ipt(n)},_showinfo:function(e,o){f.view.errorTip({element:o,cont:e,type:"info",delay:2})},_fx_rig_ipt:function(o){e(o).removeClass("ipt-err")},_fx_err_ipt:function(o){var i=e(o),n=i,a=null;i.hasClass("ipt-err")||(i.hasClass("ipt-need-parent")&&(i.parent().addClass("ipt-parent-err"),setTimeout(function(){i.parent().removeClass("ipt-parent-err")},1500)),(i.is(":text")||i.is(":password"))&&("password"!==i.attr("name")&&"password2"!==i.attr("name")||(i.hasClass("notsub")?(n=i.prev("input"),a=i):a=i.next("input")),n.addClass("ipt-err"),a&&a.addClass("ipt-err"),i.parent().find("span.pw-span").addClass("ipt-err-span"),setTimeout(function(){n.removeClass("ipt-err"),a&&a.removeClass("ipt-err"),i.parent().find("span.pw-span").removeClass("ipt-err-span")},1500)))},_ck_login_captcha:function(o){var i=e(o).val();return 4!=i.length?(e.dialog.tips_black(p("编码.验证码不正确")||"验证码不正确"),!1):!0},_ck_login_phoneNum:function(o){var i=e(o).val();return i.length>11?(e.dialog.tips_black(p("编码.最大能输入11位字符")||"最大能输入11位字符"),!1):!0},_ck_phonenum:function(o){function i(e,o){var i=/^((13|15|18)[0-9]{9}|(176|177|178)[0-9]{8})$/;return!("0086"==e&&!i.test(o))}var n=e(o).val(),a=!!/^[^0]\d{6,}$/.test(n);if(!a)return e.dialog.tips_black(p("编码.手机号码不正确")||"手机号码不正确"),!1;var t=e.trim(f.view.$pop.find('.loginbox-bd[data-type="phone"] form .js-country-code').text());return i(t,n)===!1?(e.dialog.tips_black(p("编码.请勿使用网络手机进行绑定")||"请勿使用网络手机进行绑定"),!1):!0},_ck_yzphonenum:function(o){var i=e(o).val();return 6!=i.length?(e.dialog.tips_black(p("编码.校验码格式不正确")||"校验码格式不正确"),!1):!0},_ck_login_username:function(o){var i=e(o).val();return""==i?(e.dialog.tips_black(p("编码.昵称不能为空")||"昵称不能为空"),!1):!0},_ck_login_password:function(o){var i=e(o).val(),n=i.length;return n>30?(f.validate._showerr(p("编码.密码长度不正确")||"密码长度不正确，仅限30个字符","pw",1,o),!1):!0}},h.init=function(){var i,n,a,t;try{window.top&&window.top.DYS&&window.top.DYS.sub&&e.isPlainObject(window.top.DYS.sub.getDefaultFied())&&(a=window.top.DYS.sub.getDefaultFied()||{},o.trigger("dys.com.user.view.dpdata",a)),window.top&&window.top.UserJsSDK&&(n=window.top.UserJsSDK.POSSPORT||{},n&&(g.view.showParam=n.get("param","show")||{},g.view.cpsDirthName=n.get("cpsDirthName","cps")||"",t=g.view.showParam.source||"")),f.REGPageData={room_id:0,cate_id:0,tag_id:0,child_id:0,vid:0,fac:t},window.top&&window.top.$ROOM&&(i=window.top.$ROOM,f.REGPageData.room_id=i.room_id||0,f.REGPageData.cate_id=i.category_id||0,f.REGPageData.tag_id=i.cate_id||0,f.REGPageData.child_id=i.child_id||0,f.REGPageData.vid=i.vid||0),f.view.$pop.find(".third-list a").attr("href",function(){var o=e(this).attr("href"),i=e.extend({},f.REGPageData);return delete i.fac,o+="&",o+=e.param(i)})}catch(c){}},m._is_init=!1,m.init=function(e){if(!m._is_init){var o=f.view.el(g.view.el.logform).find(".captcha-gt"),i=!!o.length;i&&(m._is_init=!0,m.instance=n.init(o))}};var v={init:function(o){o=o||{},e.isFunction(o.onAuto)&&(f.control._on_auto_login=o.onAuto),f.init()},show:f.view.show,hide:f.view.hide,toggle:f.view.toggle,exitif:f.view.exitif,enter:f.view.enter,IFRAME:d,util:l};return v}),define("dypassport/com/i18n",["jquery"],function(e){var o=[];return{init:function(o){var i=this;i.language=o,e.i18n.properties({name:"translations",path:"/i18n/",mode:"map",checkAvailableLanguages:!1,language:o,cache:!0,async:!1,callback:function(){i.interprete(),i.addClass(),i.hideNoInterEl()}})},interprete:function(){var o=e("[data-i18n]");try{o.each(function(o,i){var n=e(i),a=n.html(),t=n.data("i18n"),c=e.i18n.prop(t);n.attr("title")&&n.attr("title",c),n.attr("placeholder")&&n.attr("placeholder",c);var s=n.is("h1,h2,h3,h4,h5,h6,div,p,span,a,option");s&&e.trim(a)&&n.html(c);var r=n.is("input,select,button"),l=n.val();r&&l&&!n.attr("placeholder")&&n.val(c)})}catch(i){}},addClass:function(){e("body").addClass("lang_"+this.language)},hideNoInterEl:function(){try{e.each(o,function(o,i){var n="[data-i18n='"+i+"']";e(n).addClass("hide")})}catch(i){}}}}),define("dypassport/page/login/app",["jquery","dypassport/com/user-view-login","dypassport/com/i18n"],function(e,o,i){var n={language:{en:"en_us"}};e(function(){var e=o.util.getLocationParam("type"),a={};a&&"en"===a&&i.init(n.language[a]),o.init(),e?o.show(e):o.show("login")})});