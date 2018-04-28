!function(i, n) {
    "function" == typeof define && (define.amd || define.cmd) ? define(n) : i.Loading = n()
}(this, function() {
    var i = "ui-loading"
      , n = "ui-loading-icon"
      , t = "ui-button"
      , e = "ui-button-loading"
      , s = "-";
    $.fn.isLoading = function() {
        var i = $(this).eq(0);
        if (0 == i.hasClass(t)) {
            var s = i.find("." + n);
            return !(!s.length || !s.is(":visible"))
        }
        return i.hasClass(e)
    }
    ,
    $.fn.loading = function(i) {
        return $(this).each(function() {
            var n = $(this);
            0 == n.hasClass(t) ? n.data("loading", new a(n,i)) : n.addClass(e)
        })
    }
    ,
    $.fn.unloading = function(n) {
        var a = n || 0;
        return "number" != typeof n && (a = 200),
        "undefined" == typeof n && (n = a),
        $(this).each(function(o, r) {
            var h = $(this);
            if (h.hasClass(t))
                return void h.removeClass(e);
            if ("function" == typeof history.pushState)
                if (a > 0) {
                    var l = h.height();
                    h.css("min-height");
                    h.css({
                        height: "auto",
                        webkitTransition: "none",
                        transition: "none",
                        overflow: "hidden"
                    });
                    var d = h.height();
                    h.height(l),
                    h.removeClass(i + s + "animation"),
                    r.offsetWidth = r.offsetWidth,
                    n !== !1 && h.addClass(i + s + "animation"),
                    h.css({
                        webkitTransition: "height " + a + "ms",
                        transition: "height " + a + "ms"
                    }),
                    setTimeout(function() {
                        h.css("overflow", "")
                    }, a),
                    h.height(d)
                } else
                    h.css({
                        webkitTransition: "none",
                        transition: "none"
                    }),
                    h.height("auto").removeClass(i);
            else
                h.height("auto")
        })
    }
    ;
    var a = function(t, e) {
        var a = {
            primary: !1,
            small: !1,
            create: !1
        }
          , o = $.extend({}, a, e || {})
          , r = t
          , h = null 
          , l = null ;
        return this._create = function() {
            var t = this.el.container;
            h = t.find("." + i),
            l = t.find("." + n),
            1 == o.create && 0 == h.size() ? t.append(h = $("<div></div>").addClass(i)) : 0 == o.create && (h = t),
            0 == l.size() && (l = (o.small ? $("<s></s>") : $("<i></i>")).addClass(n),
            h.empty().addClass(i).append(l),
            o.primary && h.addClass(i + s + "primary")),
            this.el.loading = h,
            this.el.icon = l
        }
        ,
        this.el = {
            container: r,
            loading: h,
            icon: l
        },
        this.show(),
        this
    }
    ;
    return a.prototype.show = function() {
        var i = this.el;
        return i.loading && i.icon || this._create(),
        i.loading.show(),
        this.display = !0,
        this
    }
    ,
    a.prototype.hide = function() {
        var i = this.el
          , t = i.container
          , e = i.loading;
        return e && (t.get(0) != e.get(0) ? e.hide() : t.find("." + n).length && (e.empty(),
        this.el.icon = null )),
        this.display = !1,
        this
    }
    ,
    a.prototype.remove = function() {
        var n = this.el
          , t = n.container
          , e = n.loading
          , s = n.icon;
        return e && s && (t.get(0) == e.get(0) ? (e.removeClass(i),
        s.remove()) : e.remove(),
        this.el.loading = null ,
        this.el.icon = null ),
        this.display = !1,
        this
    }
    ,
    a.prototype.end = function(i) {
        var t = this.el
          , e = t.container;
        return e && (e.unloading(i),
        0 == e.find("." + n).length && (this.el.icon = null )),
        this.display = !1,
        this
    }
    ,
    a
});
