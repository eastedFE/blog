!function(e, i) {
    "function" == typeof define && (define.amd || define.cmd) ? define(i) : e.ErrorTip = i()
}(this, function(require, exports, module) {
    if ("function" == typeof require)
        require("common/ui/Follow");
    else if (!$().follow)
        return window.console && console.error("need Follow.js"),
        {};
    var e = "ui-tips"
      , i = e + "-";
    $.fn.errorTip = function(e, n) {
        var r = {
            unique: !0,
            align: "center",
            onShow: $.noop,
            onHide: $.noop
        }
          , o = $.extend({}, r, n || {});
        return $.isFunction(e) && (e = e()),
        "string" != typeof e ? this : $(this).each(function(n, r) {
            if (!(1 == o.unique && n > 0)) {
                var t, a, d, s = $(this);
                if (1 == o.unique && window.errorTip)
                    t = errorTip.data("trigger", s);
                else if (0 == o.unique && s.data("errorTip"))
                    t = s.data("errorTip");
                else {
                    t = $('<div class="' + i + "x " + i + 'error"></div>').html('<span class="' + i + 'before"></span><i class="' + i + 'after"></i>'),
                    $(document.body).append(t.append(a).append(d)),
                    1 == o.unique ? window.errorTip = t.data("trigger", s) : s.data("errorTip", t);
                    var l = function() {
                        "none" != t.css("display") && (t.hide(),
                        o.onHide.call((t.data("trigger") || s).removeClass("error"), t))
                    }
                    ;
                    $(document).bind({
                        keydown: function(e) {
                            16 != e.keyCode && 17 != e.keyCode && l()
                        },
                        mousedown: function(e) {
                            var i = document.activeElement
                              , n = t.data("trigger")
                              , r = e.target;
                            i && n && i == r && i == n.get(0) && 0 == n.data("focus") || l()
                        }
                    }),
                    $(window).bind({
                        resize: l
                    })
                }
                t.show(),
                a = t.find("span"),
                d = t.find("i"),
                a.html(e);
                var f = 0;
                "left" == o.align ? f = -.5 * a.width() + parseInt(a.css("padding-left")) || 0 : "right" == o.align ? f = .5 * a.width() - parseInt(a.css("padding-right")) || 0 : "number" == typeof o.align && (f = o.align),
                d.css({
                    left: f
                }),
                t.follow(s, {
                    align: o.align,
                    position: "5-7",
                    edgeAdjust: !1
                }),
                o.onShow.call(s.addClass("error valided"), t)
            }
        })
    }
    ;
    var n = function(i, n, r) {
        return i.errorTip(n, r),
        this.el = {
            trigger: i
        },
        this.cl = e,
        this
    }
    ;
    return n
});
