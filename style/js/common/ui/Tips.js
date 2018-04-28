!function(t, i) {
    "function" == typeof define && (define.amd || define.cmd) ? define(i) : t.Tips = i()
}(this, function(require) {
    if ("function" == typeof require)
        require("common/ui/Follow");
    else if (!$().follow)
        return window.console && console.error("need Follow.js"),
        {};
    var t = "ui-tips";
    $.fn.tips = function(t) {
        return $(this).each(function() {
            $(this).data("tips") || $(this).data("tips", new i($(this),t))
        })
    }
    ;
    var i = function(i, e) {
        var s = {
            attribute: "title",
            eventType: "hover",
            content: "",
            align: "center",
            delay: 100,
            onShow: $.noop,
            onHide: $.noop
        };
        if ("string" == typeof i && (i = $(i)),
        !i || !i.length)
            return this;
        var n, a, o = $.extend({}, s, e || {}), r = i;
        if (r.hasClass(t)) {
            var l = r.attr("title") || r.attr("data-title");
            return l && r.attr("data-title", l).removeAttr("title"),
            window.addEventListener || (n = $('<span class="ui-tips-before"></span>').html(l),
            a = $('<i class="ui-tips-after"></i>'),
            r.prepend(n),
            r.append(a),
            n.css("margin-left", -.5 * n.outerWidth()),
            a.css("margin-left", -.5 * a.outerWidth())),
            void r.data("tips", !0)
        }
        var h, d = this, p = function() {
            var t = o.content;
            return t || (t = r.attr(o.attribute),
            "title" == o.attribute && (t = t || r.data("title"),
            t && r.data("title", t),
            r.removeAttr("title"))),
            t
        }
        ;
        return this.el = {
            trigger: r,
            tips: void 0
        },
        this.callback = {
            show: o.onShow,
            hide: o.onHide
        },
        this.align = o.align,
        "hover" == o.eventType ? r.hover(function() {
            var t = p();
            h = setTimeout(function() {
                d.show(t)
            }, o.delay)
        }, function() {
            clearTimeout(h),
            d.hide()
        }) : "click" == o.eventType ? (r.click(function() {
            d.show(p())
        }),
        $(document).mouseup(function(t) {
            var i = t.target
              , e = r.get(0);
            1 == d.display && e != i && 0 == e.contains(i) && 0 == d.el.tips.get(0).contains(i) && d.hide()
        })) : this.show(p()),
        this
    }
    ;
    return i.prototype.show = function(t) {
        if (!t)
            return this;
        var i, e, s = this.el.trigger, n = this.el.tips;
        n ? (n.show(),
        i = n.find("span").html(t),
        e = n.find("i")) : (n = $("<div></div>").addClass("ui-tips-x"),
        i = $('<span class="ui-tips-before"></span>').html(t),
        e = $('<i class="ui-tips-after"></i>'),
        $(document.body).append(n.append(i).append(e)));
        var a = 0
          , o = "5-7";
        return "left" == this.align ? a = -.5 * i.width() + parseInt(i.css("padding-left")) || 0 : "right" == this.align ? a = .5 * i.width() - parseInt(i.css("padding-right")) || 0 : "rotate" == this.align ? o = "6-8" : "number" == typeof this.align && (a = this.align),
        n.addClass("ui-tips-" + this.align),
        "rotate" != this.align && e.css({
            left: a
        }),
        n.follow(s, {
            offsets: {
                x: a,
                y: 0
            },
            position: o,
            edgeAdjust: !1
        }),
        this.callback.show.call(s, n),
        this.el.tips = n,
        this.display = !0,
        this
    }
    ,
    i.prototype.hide = function() {
        return this.el.tips && (this.el.tips.hide(),
        this.callback.hide.call(this.el.trigger, this.el.tips)),
        this.display = !1,
        this
    }
    ,
    i.prototype.init = function() {
        return $("." + t).tips(),
        $(document).mouseover(function(i) {
            var e = i && i.target;
            e && $(e).hasClass(t) && !$(e).data("tips") && $(e).tips()
        }),
        this
    }
    ,
    i
});
