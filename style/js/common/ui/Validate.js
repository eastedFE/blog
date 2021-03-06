!function(t, e) {
    "function" == typeof define && (define.amd || define.cmd) ? define(e) : t.Validate = e()
}(this, function(require) {
    if ("function" == typeof require)
        require("common/ui/ErrorTip");
    else if (!$().follow)
        return window.console && console.error("need ErrorTip.js"),
        {};
    $.fn.validate = function(e, r) {
        return $(this).each(function() {
            $(this).data("validate", new t($(this),e,r))
        })
    }
    ,
    $.fn.selectRange = function(t, e) {
        var r = $(this).get(0);
        if (r.createTextRange) {
            var a = r.createTextRange();
            a.collapse(!0),
            a.moveEnd("character", e),
            a.moveStart("character", t),
            a.select()
        } else
            r.focus(),
            r.setSelectionRange(t, e);
        return $(this)
    }
    ,
    $.fn.isProp = function(t) {
        var e = $(this).prop(t) || $(this).attr(t);
        return !(!e && "string" != typeof e)
    }
    ,
    $.dbc2sbc = function(t) {
        var e, r, a = "";
        for (e = 0; e < t.length; e++)
            r = t.charCodeAt(e),
            a += r >= 65281 && r <= 65373 ? String.fromCharCode(t.charCodeAt(e) - 65248) : 12288 == r ? String.fromCharCode(t.charCodeAt(e) - 12288 + 32) : t.charAt(e);
        return a
    }
    ,
    $.getType = function(t) {
        var e = t.getAttribute("type")
          , r = e || t.type || "";
        if (r = r.toLowerCase().replace(/\W+$/, ""),
        e && e != r && $('<input type="' + r + '">').attr("type") == r)
            try {
                t.type = r
            } catch (t) {}
        return r.replace(/_/g, "")
    }
    ,
    $.getLength = function(t, e) {
        if ("password" == t.type)
            return e ? e : t.value.length;
        var r = t.getAttribute("lang")
          , a = $.trim(t.value);
        if (!r)
            return e ? e : a.length;
        if ("" == a)
            return 0;
        var i = 1
          , n = 1;
        if (/zh/i.test(r) ? n = .5 : /en/i.test(r) && (i = 2),
        e) {
            var o = 0
              , l = e;
            return $.each(a.split(""), function(t, r) {
                o >= e || (o += /[\x00-\xff]/.test(r) ? n : i,
                o >= e && (l = t + 1))
            }),
            l
        }
        var s = a.replace(/[\x00-\xff]/g, "").length
          , u = a.length - s;
        return Math.ceil(u * n) + Math.ceil(s * i)
    }
    ,
    $.validate = function() {
        return {
            reg: {
                email: "^[a-z0-9._%-]+@([a-z0-9-]+\\.)+[a-z]{2,4}$",
                number: "^\\-?\\d+(\\.\\d+)?$",
                url: "^(http|https)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\:\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$",
                tel: "^1\\d{10}$",
                zipcode: "^\\d{6}$",
                date: "^\\d{4}\\-(0\\d|1[0-2])\\-([0-2]\\d|3[0-1])$",
                time: "^[0-2]\\d\\:[0-5]\\d$",
                hour: "^[0-2]\\d\\:00$",
                minute: "^[0-2]\\d\\:[0-5]\\d$",
                "date-range": "^\\d{4}(\\-\\d{2}){2}\\s至\\s\\d{4}(\\-\\d{2}){2}$",
                "month-range": "^\\d{4}\\-\\d{2}\\s至\\s\\d{4}\\-\\d{2}$"
            },
            prompt: function(t, e, r) {
                var a = {
                    name: $.extend({}, {
                        email: "邮箱",
                        tel: "手机号码",
                        url: "网址",
                        zipcode: "邮编",
                        password: "密码",
                        number: "数值",
                        range: "数值",
                        date: "日期",
                        year: "年份",
                        month: "月份",
                        hour: "小时",
                        minute: "分钟",
                        time: "时间",
                        datetime: "日期时间",
                        "date-range": "日期范围",
                        "month-range": "月份范围"
                    }, $.validate.name || {}),
                    ignore: {
                        radio: "请选择一个选项",
                        checkbox: "如果要继续，请选中此框",
                        select: "请选择列表中的一项",
                        "select-one": "请选择列表中的一项",
                        empty: "请填写此字段"
                    },
                    unmatch: {
                        pattern: "内容格式不符合要求",
                        multiple: "某项内容格式不符合要求"
                    },
                    out: {
                        min: "值偏小",
                        max: "值偏大",
                        step: "值不符合要求"
                    },
                    overflow: {
                        minlength: "内容长度偏小",
                        maxlength: "内容长度偏大"
                    }
                };
                if (t) {
                    var i = ""
                      , n = e.id
                      , o = ""
                      , l = t.error;
                    e && (o = e.getAttribute("type") || e.type || "",
                    o = $.trim(o),
                    "select-one" == o && (o = "select")),
                    r = r || {};
                    var s = r.prompt || r;
                    n && $.isArray(r) && $.each(r, function(t, e) {
                        e.id == n && (s = e.prompt)
                    });
                    var u = a.name[o] || function() {
                        if (r.label && n && !/checkbox|radio/.test(o)) {
                            var t = "";
                            return $("label[for=" + n + "]").each(function() {
                                var e = $(this).clone();
                                e.children().remove(),
                                labelText = $.trim(e.html()).replace(/\d/g, ""),
                                labelText.length > t.length && (t = labelText)
                            }),
                            t.length >= 2 ? t : void 0
                        }
                    }();
                    switch (t.type) {
                    case "ignore":
                        i = s.ignore,
                        i || (i = o && u ? "select" != o ? u + "不能为空" : a.ignore[o] = "您尚未选择" + u : a.ignore[l],
                        i = i || a.ignore.empty);
                        break;
                    case "unmatch":
                        (i = s.unmatch) || (i = o && u ? u + "格式不符合要求" : a.unmatch[l] || a.unmatch.pattern,
                        i = i || a.ignore.empty);
                        break;
                    case "out":
                        if (i = s.out && s.out[l],
                        !i)
                            if (o && u) {
                                var d = e.getAttribute("min")
                                  , c = e.getAttribute("max")
                                  , h = 1 * e.getAttribute("step") || 1;
                                "month-range" == o && (d = d.slice(0, 7),
                                c = c.slice(0, 7));
                                var f = "必须要大于或等于" + d
                                  , p = "必须要小于或等于" + c;
                                "min" == l ? (i = u + f,
                                "-range" == o.slice(-6) && (i = "起始日期" + f)) : "max" == l ? (i = u + "必须要小于或等于" + c,
                                "-range" == o.slice(-6) && (i = "结束日期" + p)) : "min-max" == l ? i = "起始日期" + f + "，结束日期" + p : "step" == l && (i = "number" == o || "range" == o ? "请输入有效的值。两个最接近的有效值是" + function() {
                                    d *= 1,
                                    c *= 1;
                                    for (var t = 1 * $.trim(e.value), r = d, a = d; a += h; a < c)
                                        if (a < t && a + h > t) {
                                            r = a;
                                            break
                                        }
                                    return [r, r + h].join("和")
                                }() : "请选择有效的值。" + u + "间隔是" + h)
                            } else
                                i = a.out[l];
                        i = i || a.out.step;
                        break;
                    case "overflow":
                        if (i = s.overflow && s.overflow[l],
                        !i) {
                            var m = e.getAttribute("minlength")
                              , g = e.maxlength || e.getAttribute("maxlength")
                              , v = e.getAttribute("lang")
                              , b = "";
                            /zh/i.test(v) ? b = "个汉字(2字母=1汉字)" : /en/i.test(v) && (b = "个字符(1汉字=2字符)"),
                            "minlength" == l ? i = "内容长度不能小于" + m + b : "maxlength" == l && (i = "内容长度不能大于" + g.replace(/\D/g, "") + b)
                        }
                        i = i || a.overflow[l]
                    }
                    return $.isFunction(i) && (i = i.call(e, $(e))),
                    i
                }
            },
            isIgnore: function(t) {
                if (!t || t.disabled)
                    return !1;
                var e = $.getType(t)
                  , r = $(t)
                  , a = t.value;
                if (r.isProp("required")) {
                    if ("radio" == e) {
                        var i, n = self;
                        t.name && (i = r.parents("form")).length && (n = i.find("input[type='radio'][name='" + t.name + "']"));
                        var o = !1;
                        return n.each(function() {
                            0 == o && $(this).prop("checked") && (o = !0)
                        }),
                        0 == o && {
                            type: "ignore",
                            error: "radio"
                        }
                    }
                    if ("checkbox" == e)
                        return 0 == r.prop("checked") && {
                            type: "ignore",
                            error: "checkbox"
                        };
                    if (/select/.test(e) && "" == a)
                        return {
                            type: "ignore",
                            error: "select"
                        };
                    if ("password" != e && (a = $.trim(a)),
                    "" == a)
                        return history.pushState && (t.value = ""),
                        {
                            type: "ignore",
                            error: "empty"
                        }
                }
                return !1
            },
            isUnmatch: function(t, e, r) {
                if (!t || t.disabled)
                    return !1;
                var a = $(t)
                  , i = t.value
                  , n = i
                  , o = $.getType(t);
                if (/^radio|checkbox|select$/i.test(o))
                    return !1;
                if ("password" != o && (n = $.trim(i)),
                0 == /^text|textarea|password$/i.test(o) && (n = $.dbc2sbc(n)),
                $.validate.focusable !== !1 && 0 !== $.validate.focusable && n != i && (t.value = n),
                "" == n)
                    return !1;
                if (e = e || function() {
                    return a.attr("pattern")
                }() || function() {
                    return o && $.map(o.split("|"), function(t) {
                        var e = $.validate.reg[t];
                        if (e)
                            return e
                    }).join("|")
                }(),
                !e)
                    return !1;
                var l = a.isProp("multiple")
                  , s = new RegExp(e,r || "i");
                if (l && 0 == /^number|range$/i.test(o)) {
                    var u = !0;
                    if ($.each(n.split(","), function(t, e) {
                        e = $.trim(e),
                        u && !s.test(e) && (u = !1)
                    }),
                    u = !1)
                        return {
                            type: "unmatch",
                            error: "multiple"
                        }
                } else if (0 == s.test(n))
                    return {
                        type: "unmatch",
                        error: "pattern"
                    };
                return !1
            },
            isOut: function(t) {
                if (!t || t.disabled || /^radio|checkbox|select$/i.test(t.type))
                    return !1;
                var e = $(t)
                  , r = e.attr("min")
                  , a = e.attr("max")
                  , i = Number($(t).attr("step")) || 1
                  , n = $.getType(t)
                  , o = t.value;
                if ("-range" != n.slice(-6)) {
                    if ("0" != o && Number(o) != o || (o *= 1),
                    r && o < r)
                        return {
                            type: "out",
                            error: "min"
                        };
                    if (a && o > a)
                        return {
                            type: "out",
                            error: "max"
                        };
                    if (("number" == n || "range" == n) && i && r && !/^\d+$/.test(Math.abs(o - r) / i))
                        return {
                            type: "out",
                            error: "step"
                        };
                    if (("hour" == n || "minute" == n || "time" == n) && r && i) {
                        var l = o.split(":")[1]
                          , s = r.split(":")[1];
                        if ("hour" == n && (l != s || (o.split(":")[0] - r.split(":")[0]) % i != 0))
                            return {
                                type: "out",
                                error: "step"
                            };
                        if ((l - s) % i !== 0)
                            return {
                                type: "out",
                                error: "step"
                            }
                    }
                } else {
                    var u = o.split(" ")
                      , d = [];
                    if ("month-range" == n && (r = r && r.slice(0, 7),
                    a = a && a.slice(0, 7)),
                    3 == u.length && (r && u[0] < r && d.push("min"),
                    a && u[2] > a && d.push("max"),
                    d.length))
                        return {
                            type: "out",
                            error: d.join("-")
                        }
                }
                return !1
            },
            isOverflow: function(t) {
                if (!t || t.disabled || /^radio|checkbox|select$/i.test(t.type))
                    return !1;
                var e = $(t)
                  , r = e.attr("minlength")
                  , a = t.maxlength || e.attr("maxlength")
                  , i = t.value;
                if ("" == i)
                    return !1;
                var n = $.getLength(t);
                return r && n < r ? {
                    type: "overflow",
                    error: "minlength"
                } : !!(a && (a = a.replace(/\D/g, "")) && n > a) && {
                    type: "overflow",
                    error: "maxlength"
                }
            },
            isError: function(t) {
                if (!t || t.disabled)
                    return !1;
                var e = t.getAttribute("type") || t.type
                  , r = t.tagName.toLowerCase();
                return 1 != /^button|submit|reset|file|image$/.test(e) && "button" != r && ($.validate.isIgnore(t) || $.validate.isUnmatch(t) || $.validate.isOut(t) || $.validate.isOverflow(t) || !1)
            },
            isAllPass: function(t, e) {
                if (!t)
                    return !0;
                t = $(t),
                t.is("form") && (t = t.find(":input"));
                var r = !0;
                return t.each(function() {
                    var t = this
                      , a = t.getAttribute("type") || t.type
                      , i = t.getAttribute("pattern");
                    if (!i && a && (i = $.validate.reg[a]) && t.setAttribute("pattern", i),
                    0 != r && !t.disabled && "submit" != a && "reset" != a && "file" != a && "image" != a) {
                        var n = $.validate.isError(t);
                        n && ($.validate.errorTip(t, $.validate.prompt(n, t, e)),
                        r = !1)
                    }
                }),
                r
            },
            count: function(t) {
                if (!t)
                    return this;
                var e;
                t.get ? e = t.get(0) : (e = t,
                t = $(t));
                var r = e.tagName.toLowerCase();
                if ("input" != r && "textarea" != r)
                    return this;
                var a = t.attr("minlength") || 0
                  , i = e.maxlength || t.attr("maxlength");
                if (!a && !i)
                    return this;
                i = i.replace(/\D/g, "");
                var n, o, l = "ui-", s = l + r, u = s + "-x", d = s + "-count";
                if (t.hasClass(s))
                    return this;
                if (0 == t.parent("." + u).length)
                    return this;
                var c = e.id;
                c || (c = "id" + (Math.random() + "").replace(/\D/g, ""),
                e.id = c),
                n = t.parent().find("." + d),
                0 == n.length ? (n = $('<label for="' + c + '" class="ui-' + r + '-count">\t\t\t\t        <span>' + a + "</span>/<span>" + i + "</span>\t\t\t\t    </label>"),
                t.parent().append(n)) : n.attr("for", c),
                o = n.find("span").eq(0);
                var h = function() {
                    var t = $.getLength(e);
                    o.html(t),
                    t > i ? o.addClass("red") : o.removeClass("red")
                }
                  , f = "countBind";
                return t.data(f) || ("oninput" in document.createElement("div") ? t.bind("input", function() {
                    h()
                }) : e.attachEvent("onpropertychange", function(t) {
                    t && "value" == t.propertyName && h()
                }),
                t.data(f, !0)),
                h(),
                this
            },
            errorTip: function(t, e) {
                var r = $.validate.getTarget(t);
                if (0 == r.length)
                    return this;
                var a = function() {
                    if (r.errorTip(e, {
                        onShow: function(t) {
                            var e = .5 * (t.width() - r.width());
                            e < 0 ? t.css("margin-left", .5 * (t.width() - r.width())) : t.css("margin-left", 0),
                            $.validate.focusable === !1 ? t.addClass("none") : t.removeClass("none")
                        },
                        onHide: function() {
                            if (r.parents("form").data("immediate")) {
                                var t = $.validate.el.control.data("customValidate")
                                  , e = t && t($.validate.el.control);
                                ($.validate.isError($.validate.el.control.get(0)) || "string" == typeof e && e.length) && $.validate.el.target.addClass("error")
                            }
                        }
                    }),
                    $.validate.focusable !== !1 && 0 !== $.validate.focusable) {
                        $.validate.focusable = null ;
                        var t = $.validate.el.control
                          , a = t.get(0)
                          , i = a.getAttribute("type") || a.type;
                        if (i)
                            if (e.indexOf("内容长度") != -1 && e.indexOf("大") != -1) {
                                var n = t.val()
                                  , o = n.length
                                  , l = t.attr("lang")
                                  , s = 1
                                  , u = 1;
                                /zh/i.test(l) ? u = .5 : /en/i.test(l) && (s = 2);
                                var d = a.maxlength || t.attr("maxlength").replace(/\D/g, "");
                                o && d && t.selectRange($.getLength(a, d), o)
                            } else
                                t.select()
                    }
                }
                ;
                $.validate.el = {
                    control: $(t),
                    target: r
                };
                var i = r.get(0).getBoundingClientRect();
                return i.top < 50 ? $("html, body").animate({
                    scrollTop: $(window).scrollTop() - (50 - i.top)
                }, 200, a) : i.bottom > $(window).height() ? $("html, body").animate({
                    scrollTop: $(window).scrollTop() + (i.bottom - $(window).height())
                }, 200, a) : a(),
                this
            },
            getTarget: function(t) {
                var e = t;
                if (!t)
                    return $();
                if (t.get ? e = t.get(0) : t = $(t),
                0 != t.length) {
                    var r = t
                      , a = e.getAttribute("type") || e.type
                      , i = e.id
                      , n = e.tagName.toLowerCase();
                    return "radio" == a ? r = t.parent().find("label.ui-radio[for=" + i + "]") : "checkbox" == a ? r = t.parent().find("label.ui-checkbox[for=" + i + "]") : "select" == a || "select" == n ? r = t.next(".ui-select") : "range" == a ? r = t.prev(".ui-range") : "hidden" == a || "none" == t.css("display") ? t.data("target") && t.data("target").size && (r = t.data("target")) : "textarea" == a || "textarea" == n ? t.nextAll(".ui-textarea").length ? r = t.nextAll(".ui-textarea").eq(0) : !document.querySelector && t.parent(".ui-textarea").length && (r = t.parent(".ui-textarea")) : "input" == n && (t.nextAll(".ui-input").length ? r = t.nextAll(".ui-input").eq(0) : !document.querySelector && t.parent(".ui-input").length && (r = t.parent(".ui-input"))),
                    r
                }
            }
        }
    }();
    var t = function(t, e, r) {
        t.eq || (t = $()),
        e = e || $.noop,
        t.attr("novalidate", "novalidate");
        var a = {
            multiple: !0,
            immediate: !0,
            label: !1,
            validate: [],
            onError: $.noop,
            onSuccess: $.noop
        }
          , i = $.extend({}, a, r || {});
        t.find(":disabled").each(function() {
            /^image|submit$/i.test(this.type) && $(this).removeAttr("disabled")
        });
        var n = this;
        return t.bind("submit", function(t) {
            return t.preventDefault(),
            n.isAllPass() && $.isFunction(e) && e.call(this),
            !1
        }),
        this.el = {
            form: t
        },
        this.callback = {
            error: i.onError,
            success: i.onSuccess
        },
        this.data = i.validate,
        this.boo = {
            multiple: i.multiple,
            immediate: i.immediate,
            label: i.label
        },
        this.count(),
        this
    }
    ;
    return t.prototype.count = function() {
        var t = this.el.form;
        t.find(".ui-input-x > input, .ui-textarea-x > textarea").each(function() {
            var t = $(this)
              , e = t.attr("maxlength");
            if (e)
                try {
                    t.attr("maxlength", "_" + e + "_")
                } catch (r) {
                    t.removeAttr("maxlength")[0].maxlength = e
                }
            $.validate.count(t)
        })
    }
    ,
    t.prototype.immediate = function() {
        var t = this
          , e = this.el.form;
        return e.data("immediate") ? this : (e.find(":input").each(function() {
            var e = this
              , r = $(this)
              , a = e.type
              , i = e.getAttribute("type");
            "button" != a && "submit" != a && "reset" != a && "file" != a && "image" != a && ("radio" == a || "checkbox" == a ? r.on("click", function() {
                if (0 != t.boo.immediate) {
                    var e = t.isPass($(this));
                    e && t.isError($(this), !1)
                }
            }) : /select/.test(a) || /range|date|time|hour|minute|hidden/.test(i) ? r.on("change", function() {
                if (0 != t.boo.immediate) {
                    var e = t.isPass($(this));
                    e && t.isError($(this), !1)
                }
            }) : (r.on({
                focus: function(e) {
                    t.boo.immediate && setTimeout(function() {
                        $.validate.focusable = 0;
                        var e = t.isPass(r);
                        e && t.isError(r, !1)
                    }, 20)
                },
                input: function(e) {
                    if (0 != t.boo.immediate) {
                        if (void 0 != document.msHidden && "" == this.value && !this.lastvalue && $(this).attr("placeholder"))
                            return void (this.lastvalue = this.value);
                        $.validate.focusable = !1;
                        var r = t.isPass($(this));
                        r && (t.isError($(this), !1),
                        window.errorTip && errorTip.hide()),
                        this.lastvalue = this.value
                    }
                }
            }),
            "oninput" in document.createElement("div") == 0 && e.attachEvent("onpropertychange", function(r) {
                if (r && "value" == r.propertyName && t.boo.immediate) {
                    $.validate.focusable = !1;
                    var a = t.isPass($(e));
                    a && t.isError($(e), !1),
                    $.validate.focusable = !0
                }
            })))
        }),
        e.data("immediate", !0),
        this)
    }
    ,
    t.prototype.isError = function(t, e) {
        if (!t || !t.get || !t.length)
            return this;
        var r = t.get(0)
          , a = e;
        if ("undefined" == typeof e && 0 == t.is(":disabled")) {
            var i = t.data("customValidate");
            a = $.validate.isError(r) || i && i(t)
        }
        var n = $.validate.getTarget(t);
        return a ? n.addClass("error") : "radio" == r.type && r.name ? this.el.form.find("input[type=radio][name=" + r.name + "]").each(function() {
            $.validate.getTarget($(this)).removeClass("error")
        }) : n.removeClass("error"),
        a
    }
    ,
    t.prototype.isPass = function(t) {
        if (!t || !t.get || !t.length)
            return this;
        var e = t.get(0)
          , r = e.id
          , a = this.boo.label
          , i = {
            label: a
        };
        r && this.data && this.data.length && $.each(this.data, function(t, e) {
            e.id == r && ("undefined" != typeof e.label && (e.label = a),
            i = e)
        });
        var n = $.validate.isAllPass(t, i);
        if (1 == n && i && i.method) {
            var o = i.method.call(e, t);
            "string" == typeof o && "" !== o && (this.errorTip(t, o),
            n = !1),
            t.data("customValidate", i.method)
        }
        return this.callback[n ? "success" : "error"].call(this, t),
        n
    }
    ,
    t.prototype.isAllPass = function() {
        var t = this
          , e = this.el.form
          , r = !0;
        return $.validate.focusable = !0,
        e.find(":input").each(function() {
            if (1 == r && 0 == t.isPass($(this)) && (r = !1),
            t.boo.multiple) {
                var a = this;
                e.data("immediate") || $.each(t.data, function(t, e) {
                    e.id == a.id && e.method && $(a).data("customValidate", e.method)
                }),
                t.isError($(this))
            }
        }),
        !e.data("immediate") && t.boo.immediate && t.immediate(),
        r
    }
    ,
    t.prototype.errorTip = function(t, e) {
        return $.validate.errorTip(t, e),
        this
    }
    ,
    t
});
