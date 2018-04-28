!function(t, i) {
    "function" == typeof define && (define.amd || define.cmd) ? define(i) : t.Dialog = i()
}(this, function(require) {
    if ("function" == typeof require)
        require("common/ui/Loading");
    else if (!$().loading)
        return window.console && console.error("need Loading.js"),
        {};
    var t = window.addEventListener ? '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path d="M116.152,99.999l36.482-36.486c2.881-2.881,2.881-7.54,0-10.42 l-5.215-5.215c-2.871-2.881-7.539-2.881-10.42,0l-36.484,36.484L64.031,47.877c-2.881-2.881-7.549-2.881-10.43,0l-5.205,5.215 c-2.881,2.881-2.881,7.54,0,10.42l36.482,36.486l-36.482,36.482c-2.881,2.881-2.881,7.549,0,10.43l5.205,5.215 c2.881,2.871,7.549,2.871,10.43,0l36.484-36.488L137,152.126c2.881,2.871,7.549,2.871,10.42,0l5.215-5.215 c2.881-2.881,2.881-7.549,0-10.43L116.152,99.999z"/></svg>' : ""
      , i = "WebkitAppearance" in document.documentElement.style || void 0 !== document.webkitHidden
      , e = function(e) {
        var o = {
            title: "",
            content: "",
            width: "auto",
            buttons: [],
            onShow: $.noop,
            onHide: $.noop,
            onRemove: $.noop
        }
          , n = $.extend({}, o, e || {})
          , s = {};
        this.el = s,
        this.width = this.width,
        this.callback = {
            show: n.onShow,
            hide: n.onHide,
            remove: n.onRemove
        },
        s.container = window.addEventListener ? $('<dialog class="ui-dialog-container"></dialog>') : $('<div class="ui-dialog-container"></div>'),
        history.pushState && s.container.get(0).addEventListener(i ? "webkitAnimationEnd" : "animationend", function(t) {
            "dialog" == t.target.tagName.toLowerCase() && this.classList.remove("ui-dialog-animation")
        }),
        s.dialog = $('<div class="ui-dialog"></div>').css("width", n.width),
        s.title = $('<div class="ui-dialog-title"></div>').html(n.title),
        s.close = $('<a href="javascript:" class="ui-dialog-close"></a>').html(t).click($.proxy(function(t) {
            this[this.closeMode](),
            t.preventDefault()
        }, this));
        var a = n.content;
        $.isFunction(a) && (a = a()),
        a.size ? this.closeMode = "hide" : this.closeMode = "remove",
        s.body = $('<div class="ui-dialog-body"></div>')[a.size ? "append" : "html"](a),
        s.footer = $('<div class="ui-dialog-footer"></div>'),
        this.button(n.buttons),
        s.container.append(s.dialog.append(s.close).append(s.title).append(s.body).append(s.footer)),
        document.querySelector || s.container.append('<i class="ui-dialog-after"></i>');
        var l = $(".ui-dialog-container");
        return l.size() ? l.eq(0).before(s.container.css({
            zIndex: 1 * l.eq(0).css("z-index") + 1
        })) : (n.container || $(document.body)).append(s.container),
        this.display = !1,
        n.content && this.show(),
        this
    }
    ;
    return e.prototype.button = function(t) {
        var i = this.el
          , e = this;
        return i.footer.empty(),
        $.each(t, function(t, o) {
            o = o || {};
            var n = t ? o.type || "" : o.type || "primary"
              , s = t ? o.value || "取消" : o.value || "确定"
              , a = o.events || {
                click: function() {
                    e[e.closeMode]()
                }
            };
            $.isFunction(a) && (a = {
                click: a
            });
            var l = "ui-button";
            n && (l = l + " " + l + "-" + n),
            o.for ? i.footer.append(i["button" + t] = $('<label for="' + o.for + '" class="' + l + '">' + s + "</label>").bind(a)) : i.footer.append(i["button" + t] = $('<a href="javascript:;" class="' + l + '">' + s + "</a>").bind(a))
        }),
        this
    }
    ,
    e.prototype.loading = function() {
        var t = this.el;
        return t && (t.container.attr("class", ["ui-dialog-container", "ui-dialog-loading"].join(" ")),
        t.body.loading(),
        this.show()),
        this
    }
    ,
    e.prototype.unloading = function(t) {
        var i = this.el;
        return i && (i.container.removeClass("ui-dialog-loading"),
        i.body.unloading(t)),
        this
    }
    ,
    e.prototype.open = function(t, i) {
        var e = this.el
          , o = {
            title: "",
            buttons: []
        }
          , n = $.extend({}, o, i || {});
        return e && t && (e.container.attr("class", ["ui-dialog-container"].join(" ")),
        e.title.html(n.title),
        e.body.html(t),
        this.button(n.buttons).show()),
        this
    }
    ,
    e.prototype.alert = function(t, i) {
        var e = this.el
          , o = {
            title: "",
            type: "remind",
            buttons: [{}]
        }
          , n = $.extend({}, o, i || {});
        return n.buttons[0].type || "remind" == n.type || (n.buttons[0].type = n.type),
        e && t && (e.container.attr("class", ["ui-dialog-container", "ui-dialog-alert"].join(" ")),
        e.dialog.width("auto"),
        e.title.html(n.title),
        0 == /<[\w\W]+>/.test(t) && (t = "<h6>" + t + "</h6>"),
        e.body.html('<div class="ui-dialog-' + n.type + '">' + t + "</div>"),
        this.button(n.buttons).show(),
        e.button0 && e.button0.focus()),
        this
    }
    ,
    e.prototype.confirm = function(t, i) {
        var e = this.el
          , o = {
            title: "",
            type: "warning",
            buttons: [{
                type: "warning"
            }, {}]
        }
          , n = $.extend({}, o, i || {});
        return n.buttons.length && !n.buttons[0].type && (n.buttons[0].type = "warning"),
        e && t && (e.container.attr("class", ["ui-dialog-container", "ui-dialog-confirm"].join(" ")),
        e.dialog.width("auto"),
        e.title.html(n.title),
        0 == /<[\w\W]+>/.test(t) && (t = "<h6>" + t + "</h6>"),
        e.body.html('<div class="ui-dialog-' + n.type + '">' + t + "</div>"),
        this.button(n.buttons).show(),
        e.button0 && e.button0.focus()),
        this
    }
    ,
    e.prototype.ajax = function(t, i) {
        var e = this
          , o = (new Date).getTime()
          , n = {
            dataType: "JSON",
            timeout: 3e4,
            error: function(t, i) {
                var o = "";
                o = "timeout" == i ? "<p>主要是由于请求时间过长，数据没能成功加载，这一般是由于网速过慢导致，您可以稍后重试！</p>" : "parsererror" == i ? "<p>原因是请求的数据含有不规范的内容。一般出现这样的问题是开发人员没有考虑周全，欢迎向我们反馈此问题！</p>" : "<p>一般是网络出现了异常，如断网；或是网络临时阻塞，您可以稍后重试！如依然反复出现此问题，欢迎向我们反馈！</p>",
                e.alert("<h6>尊敬的用户，很抱歉您刚才的操作没有成功！</h6>" + o, {
                    type: "warning"
                }).unloading()
            }
        }
          , s = $.extend({}, n, t || {});
        if (!s.url)
            return this;
        var a = {
            title: "",
            content: function(t) {
                return "string" == typeof t ? t : "<i style=\"display:none\">看见我说明没使用'options.content'做JSON解析</i>"
            },
            buttons: []
        }
          , l = $.extend({}, a, i || {})
          , r = s.success;
        return s.success = function(t) {
            e.open(l.content(t), l),
            (new Date).getTime() - o < 100 ? e.unloading(0) : e.unloading(),
            $.isFunction(r) && r.apply(this, arguments)
        }
        ,
        e.loading(),
        setTimeout(function() {
            $.ajax(s)
        }, 250),
        this
    }
    ,
    e.prototype.scroll = function() {
        var t = $(".ui-dialog-container")
          , i = !1;
        if (t.each(function() {
            "block" == $(this).css("display") && (i = !0)
        }),
        i) {
            var e = 17;
            1 != this.display && "number" == typeof window.innerWidth && (e = window.innerWidth - document.documentElement.clientWidth),
            document.documentElement.style.overflow = "hidden",
            1 != this.display && $(document.body).css("border-right", e + "px solid transparent")
        } else
            document.documentElement.style.overflow = "",
            $(document.body).css("border-right", "");
        return this
    }
    ,
    e.prototype.show = function() {
        var t = this.el.container;
        return t && (t.css("display", "block"),
        1 != this.display && t.addClass("ui-dialog-animation"),
        this.scroll(),
        this.display = !0,
        $.isFunction(this.callback.show) && this.callback.show.call(this, t)),
        this
    }
    ,
    e.prototype.hide = function() {
        var t = this.el.container;
        return t && (t.hide(),
        this.scroll(),
        this.display = !1,
        $.isFunction(this.callback.hide) && this.callback.hide.call(this, t)),
        this
    }
    ,
    e.prototype.remove = function(t) {
        var i = this.el.container;
        return i && (i.remove(),
        this.scroll(),
        this.display = !1,
        $.isFunction(this.callback.remove) && this.callback.remove.call(this, i)),
        this
    }
    ,
    e
});
