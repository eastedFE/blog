!function(t, e) {
    "function" == typeof define && (define.amd || define.cmd) ? define(e) : t.Follow = e()
}(this, function() {
    $.fn.follow = function(t, e) {
        var o = {
            offsets: {
                x: 0,
                y: 0
            },
            position: "4-1",
            edgeAdjust: !0
        }
          , i = $.extend({}, o, e || {});
        return $(this).each(function() {
            var e = $(this);
            if (0 != t.length) {
                var n, r, a, s, f, c = 0, h = 0, d = e.data("height"), u = e.data("width"), l = $(window).scrollTop(), p = $(window).scrollLeft(), g = parseInt(i.offsets.x, 10) || 0, w = parseInt(i.offsets.y, 10) || 0;
                this.cacheData;
                d || (d = e.outerHeight()),
                u || (u = e.outerWidth()),
                n = t.offset(),
                c = t.outerHeight(),
                h = t.outerWidth(),
                r = n.left,
                a = n.top;
                var b, v = ["4-1", "1-4", "5-7", "2-3", "2-1", "6-8", "3-4", "4-3", "8-6", "1-2", "7-5", "3-2"], m = i.position, x = !1;
                $.each(v, function(t, e) {
                    if (e === m)
                        return void (x = !0)
                }),
                x || (m = o.position);
                var k = function(t) {
                    var e = "bottom";
                    switch (t) {
                    case "1-4":
                    case "5-7":
                    case "2-3":
                        e = "top";
                        break;
                    case "2-1":
                    case "6-8":
                    case "3-4":
                        e = "right";
                        break;
                    case "1-2":
                    case "8-6":
                    case "4-3":
                        e = "left";
                        break;
                    case "4-1":
                    case "7-5":
                    case "3-2":
                        e = "bottom"
                    }
                    return e
                }
                  , y = function(t) {
                    return "5-7" === t || "6-8" === t || "8-6" === t || "7-5" === t
                }
                  , I = function(t) {
                    var e = 0
                      , o = 0;
                    if ("right" === t) {
                        if (o = r + h + u + g,
                        o > $(window).width())
                            return !1
                    } else if ("bottom" === t) {
                        if (e = a + c + d + w,
                        e > l + $(window).height())
                            return !1
                    } else if ("top" === t) {
                        if (e = d + w,
                        e > a - l)
                            return !1
                    } else if ("left" === t && (o = u + g,
                    o > r))
                        return !1;
                    return !0
                }
                ;
                b = k(m),
                i.edgeAdjust && (I(b) ? !function() {
                    if (!y(m)) {
                        var t, e = {
                            top: {
                                right: "2-3",
                                left: "1-4"
                            },
                            right: {
                                top: "2-1",
                                bottom: "3-4"
                            },
                            bottom: {
                                right: "3-2",
                                left: "4-1"
                            },
                            left: {
                                top: "1-2",
                                bottom: "4-3"
                            }
                        }, o = e[b];
                        if (o)
                            for (t in o)
                                I(t) || (m = o[t])
                    }
                }() : !function() {
                    if (y(m)) {
                        var t = {
                            "5-7": "7-5",
                            "7-5": "5-7",
                            "6-8": "8-6",
                            "8-6": "6-8"
                        };
                        m = t[m]
                    } else {
                        var e = {
                            top: {
                                left: "3-2",
                                right: "4-1"
                            },
                            right: {
                                bottom: "1-2",
                                top: "4-3"
                            },
                            bottom: {
                                left: "2-3",
                                right: "1-4"
                            },
                            left: {
                                bottom: "2-1",
                                top: "3-4"
                            }
                        }
                          , o = e[b]
                          , i = [];
                        for (name in o)
                            i.push(name);
                        m = I(i[0]) || !I(i[1]) ? o[i[0]] : o[i[1]]
                    }
                }());
                var j = k(m)
                  , z = m.split("-")[0];
                switch (j) {
                case "top":
                    f = a - d,
                    s = "1" == z ? r : "5" === z ? r - (u - h) / 2 : r - (u - h);
                    break;
                case "right":
                    s = r + h,
                    f = "2" == z ? a : "6" === z ? a - (d - c) / 2 : a - (d - c);
                    break;
                case "bottom":
                    f = a + c,
                    s = "4" == z ? r : "7" === z ? r - (u - h) / 2 : r - (u - h);
                    break;
                case "left":
                    s = r - u,
                    f = "2" == z ? a : "6" === z ? a - (u - h) / 2 : a - (d - c)
                }
                if (i.edgeAdjust && y(m)) {
                    var A = $(window).width()
                      , M = $(window).height();
                    "7-5" == m || "5-7" == m ? s - p < .5 * A ? s - p < 0 && (s = p) : s - p + u > A && (s = A + p - u) : f - l < .5 * M ? f - l < 0 && (f = l) : f - l + d > M && (f = M + l - d)
                }
                "top" == j || "left" == j ? (s -= g,
                f -= w) : (s += g,
                f += w),
                e.css({
                    position: "absolute",
                    left: Math.round(s),
                    top: Math.round(f)
                }).attr("data-align", m);
                var H = 1 * e.css("zIndex") || 19
                  , W = H;
                $("body").children().each(function() {
                    var t, o = this, i = $(o);
                    o !== e[0] && "none" !== i.css("display") && (t = 1 * i.css("zIndex")) && (W = Math.max(t, W))
                }),
                H < W && e.css("zIndex", W + 1)
            }
        })
    }
    ;
    var t = function(t, e, o) {
        e.follow(t, o)
    }
    ;
    return t.prototype.hide = function() {
        target.remove()
    }
    ,
    t
});
