!function(t, a) {
    "function" == typeof define && (define.amd || define.cmd) ? define(a) : t.DateTime = a()
}(this, function(require, exports, module) {
    if ("function" == typeof require)
        require("common/ui/Follow");
    else if (!$().follow)
        return window.console && console.error("need Follow.js"),
        {};
    var t = "ui-date-"
      , a = "ui-range-"
      , e = "ui-day-"
      , s = "ui-year-"
      , i = "ui-month-"
      , n = "ui-hour-"
      , r = "ui-minute-"
      , h = "selected"
      , o = "active"
      , l = /\-|\//g;
    String.prototype.toDate = function() {
        var t, a, e, s = this.split(l);
        return t = 1 * s[0],
        a = s[1] || 1,
        e = s[2] || 1,
        t ? new Date(t,a - 1,e) : new Date
    }
    ,
    Date.prototype.toArray = function() {
        var t = this.getFullYear()
          , a = this.getMonth() + 1
          , e = this.getDate();
        return a < 10 && (a = "0" + a),
        e < 10 && (e = "0" + e),
        [t, a, e]
    }
    ;
    var c = function(a, e) {
        if (!a || !a.length)
            return this;
        var s = {
            value: "",
            type: "auto",
            min: "auto",
            max: "auto",
            trigger: ["change"],
            onShow: $.noop,
            onHide: $.noop
        }
          , i = $.extend({}, s, e || {})
          , n = null ;
        if (a.get(0).type ? (n = a,
        a = n.parent()) : n = a.find("input"),
        0 == n.length)
            return this;
        n.prop("readonly", !0),
        n.parent().hover(function() {
            $(this).addClass("hover")
        }, function() {
            $(this).removeClass("hover")
        });
        var r = i.type;
        "auto" == r && (r = n.attr("type") || "date");
        var o = n.attr("id");
        o || (o = r + (Math.random() + "").replace("0.", ""),
        n.attr("id", o)),
        $('<label for="' + o + '"></label>').addClass(t + "arrow").insertAfter(n);
        var l = n.val();
        switch ("" == l && i.value && (n.val(i.value),
        l = i.value),
        r) {
        case "date":
        case "year":
        case "month":
            var c = l.toDate()
              , v = c.toArray();
            "" == l && ("date" == r ? n.val(v.join("-")) : "year" == r ? n.val(v[0]) : "month" == r && n.val(v.slice(0, 2).join("-"))),
            this[h] = v;
            break;
        case "time":
        case "hour":
        case "minute":
            var d = l.split(":")
              , p = d[0]
              , m = d[1];
            "" != l && p < 24 && p > 0 ? (m > 0 && m < 60 && "hour" != r ? 1 == m.length && (m = "0" + m) : m = "00",
            1 == p.length && (p = "0" + p)) : (p = "00",
            m = "00"),
            n.val([p, m].join(":")),
            this[h] = [p, m];
            break;
        case "date-range":
        case "month-range":
            var u = new Date
              , g = new Date
              , f = l.split(" ");
            if ("" != l && 1 == f.length) {
                var y = f[0].toDate();
                y.getTime() > u.getTime() ? g = y : u = y
            } else
                u = f[0].toDate(),
                g = f[f.length - 1].toDate();
            var j = u.toArray()
              , D = g.toArray();
            "date-range" == r ? n.val(j.join("-") + " 至 " + D.join("-")) : n.val(j.slice(0, 2).join("-") + " 至 " + D.slice(0, 2).join("-")),
            this[h] = [j, D]
        }
        var w = this
          , x = $("<div></div>").addClass(t + "container").delegate("a", "click", function() {
            var t = 0
              , a = 0
              , e = 0
              , s = 0;
            switch (x.attr("data-type")) {
            case "date":
                if (/prev|next/.test(this.className)) {
                    a = $(this).attr("data-month"),
                    w[h][1] = 1 * a;
                    var i = w._monthDay(w[h])
                      , n = w[h][2]
                      , r = x.data("dayOverflow")
                      , o = function() {
                        return a - 1 < 0 ? i[11] : a > i.length ? i[0] : i[a - 1]
                    }();
                    r ? w[h][2] = Math.min(r, o) : w[h][2] > o && (w[h][2] = o,
                    x.data("dayOverflow", n)),
                    w[h] = w[h].join("-").toDate().toArray(),
                    w.date(),
                    x.find("." + h).get(0).href && w.val()
                } else
                    /item/.test(this.className) ? (e = this.innerHTML,
                    /\D/.test(e) ? w[h] = (new Date).toArray() : (e < 10 && (e = "0" + e),
                    w[h][2] = e),
                    w.val(),
                    w.hide(),
                    x.removeData("dayOverflow")) : "month" == $(this).attr("data-type") && w.month();
                break;
            case "date-range":
                if (/prev|next/.test(this.className)) {
                    a = 1 * $(this).attr("data-month");
                    var l = w.el.container.data("date") || w[h][0];
                    w.el.container.data("date", new Date(l[0],a - 1,1).toArray()),
                    w["date-range"]()
                } else if (/item/.test(this.className)) {
                    t = $(this).attr("data-year"),
                    a = $(this).attr("data-month"),
                    e = this.innerHTML,
                    a < 10 && (a = "0" + a),
                    e < 10 && (e = "0" + e);
                    var c = w[h];
                    c[0].join() == c[1].join() ? t + a + e > c[0].join("") ? c[1] = [t, a, e] : c[0] = [t, a, e] : c = [[t, a, e], [t, a, e]],
                    w[h] = c,
                    w["date-range"]()
                } else if (/button/.test(this.className)) {
                    var v = $(this).attr("data-type");
                    "ensure" == v ? (w.val(),
                    w._rangeSelected = w[h],
                    w.hide()) : "cancel" == v && (w._rangeSelected && (w[h] = w._rangeSelected),
                    w.hide())
                }
                break;
            case "month-range":
                if (/prev|next/.test(this.className)) {
                    t = 1 * $(this).attr("data-year");
                    var l = w.el.container.data("date") || w[h][0];
                    w.el.container.data("date", new Date(t,l[1],1).toArray()),
                    w["month-range"]()
                } else if (/item/.test(this.className)) {
                    t = $(this).attr("data-year"),
                    a = $(this).attr("data-value"),
                    e = "01";
                    var c = w[h];
                    c[0].join() == c[1].join() ? t + a + e > c[0].join("") ? c[1] = [t, a, e] : c[0] = [t, a, e] : c = [[t, a, e], [t, a, e]],
                    w[h] = c,
                    w["month-range"]()
                } else if (/button/.test(this.className)) {
                    var v = $(this).attr("data-type");
                    "ensure" == v ? (w.val(),
                    w._rangeSelected = w[h],
                    w.hide()) : "cancel" == v && (w._rangeSelected && (w[h] = w._rangeSelected),
                    w.hide())
                }
                break;
            case "month":
                if (/prev|next/.test(this.className))
                    t = $(this).attr("data-year"),
                    w[h][0] = 1 * t,
                    w.month(),
                    x.find("." + h).get(0).href && w.val();
                else if (/item/.test(this.className)) {
                    var d = $(this).attr("data-value");
                    if (d)
                        w[h][1] = d;
                    else {
                        var p = (new Date).toArray();
                        w[h][0] = p[0],
                        w[h][1] = p[1]
                    }
                    w.val(),
                    "month" == w.type ? w.hide() : w.date()
                } else
                    "year" == $(this).attr("data-type") && w.year();
                break;
            case "year":
                /prev|next/.test(this.className) ? (t = $(this).attr("data-year"),
                w[h][0] = 1 * t,
                w.year(),
                x.find("." + h).get(0).href && w.val()) : /item/.test(this.className) && ("今年" == this.innerHTML ? w[h][0] = (new Date).getFullYear() : w[h][0] = 1 * this.innerHTML,
                w.val(),
                "year" == w.type ? w.hide() : w.month());
                break;
            case "minute":
                /prev|next/.test(this.className) ? (s = $(this).attr("data-hour"),
                1 == s.length && (s = "0" + s),
                w[h][0] = s,
                w.minute(),
                x.find("." + h).attr("href") && w.val()) : /item/.test(this.className) ? (w[h] = this.innerHTML.split(":"),
                w.val(),
                w.hide()) : "hour" == $(this).attr("data-type") && w.hour();
                break;
            case "hour":
                /item/.test(this.className) && (w[h][0] = this.innerHTML.split(":")[0],
                w.val(),
                "hour" == w.type ? w.hide() : w.minute())
            }
        });
        return this.el = {},
        this.el.container = x,
        this.el.trigger = a,
        this.el.input = n,
        this.type = r,
        this.max = i.max,
        this.min = i.min,
        this.callback = {
            show: i.onShow,
            hide: i.onHide,
            trigger: i.trigger
        },
        a.click($.proxy(function(t) {
            this.display ? this.hide() : this.show(),
            t.preventDefault()
        }, this)),
        $(document).mouseup($.proxy(function(t) {
            var e = t && t.target
              , s = this.el.container.get(0);
            e && a.get(0) != e && 0 == a.get(0).contains(e) && s != e && 0 == s.contains(e) && this.hide()
        }, this)),
        this.svg = window.addEventListener ? '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path d="M85.876,100.5l49.537-50.526c4.089-4.215,4.089-11.049,0-15.262 c-4.089-4.218-10.719-4.218-14.808,0L63.586,92.868c-4.089,4.215-4.089,11.049,0,15.264l57.018,58.156 c4.089,4.215,10.719,4.215,14.808,0c4.089-4.215,4.089-11.049,0-15.262L85.876,100.5z"/></svg>' : "",
        this
    }
    ;
    return c.prototype.format = function() {
        var t = this.type
          , a = this.el.input.val();
        if ("" == a)
            return this;
        switch (t) {
        case "date":
        case "year":
        case "month":
            var e = a.toDate()
              , s = e.toArray();
            this[h] = s;
            break;
        case "time":
        case "hour":
        case "minute":
            var i = a.split(":")
              , n = i[0]
              , r = i[1];
            2 == i.length && (r > 0 && r < 60 && "hour" != t ? 1 == r.length && (r = "0" + r) : r = "00",
            1 == n.length && (n = "0" + n),
            this.el.input.val([n, r].join(":")),
            this[h] = [n, r]);
            break;
        case "date-range":
        case "month-range":
            var o = new Date
              , l = new Date
              , c = a.split(" ");
            3 == c.length && (o = c[0].toDate(),
            l = c[c.length - 1].toDate(),
            this[h] = [o.toArray(), l.toArray()])
        }
        return this
    }
    ,
    c.prototype.val = function() {
        var t = this.el.input
          , a = this[h]
          , e = t.val();
        switch (this.type) {
        case "date":
            t.val(a.join("-"));
            break;
        case "month":
            t.val(a.slice(0, 2).join("-"));
            break;
        case "year":
            t.val(a[0]);
            break;
        case "date-range":
            t.val(a[0].join("-") + " 至 " + a[1].join("-"));
            break;
        case "month-range":
            t.val(a[0].slice(0, 2).join("-") + " 至 " + a[1].slice(0, 2).join("-"));
            break;
        case "time":
        case "minute":
            t.val(a.join(":"));
            break;
        case "hour":
            t.val(a[0] + ":00")
        }
        return t.val() != e && ($.isArray(this.callback.trigger) ? $.each(this.callback.trigger, function(a, e) {
            t.trigger(e)
        }) : t.trigger(this.callback.trigger)),
        this
    }
    ,
    c.prototype._calendar = function(a) {
        var s = ""
          , i = a
          , n = this.el.input
          , r = this.type
          , o = n.attr("min") || this.min
          , c = n.attr("max") || this.max
          , v = $.map([o, c], function(t, a) {
            return "string" == typeof t && 1 == /^\d{8}$/.test(t.replace(l, "")) ? t = t.toDate() : "object" == typeof t && t.getTime || (t = a ? new Date(9999,0,1) : new Date(0,0,1)),
            t
        });
        o = v[0],
        c = v[1];
        var d = ["日", "一", "二", "三", "四", "五", "六"]
          , p = this._monthDay(i)
          , m = i.join("-").toDate();
        s = s + '<div class="' + e + 'x">' + function() {
            var t = "";
            return $.each(d, function(a, s) {
                t = t + '<span class="' + e + 'item">' + s + "</span>"
            }),
            t
        }() + "</div>";
        var u = i.join("-").toDate()
          , g = 0;
        u.setDate(1),
        2 == u.getDate() && u.setDate(0),
        g = u.getDay();
        var f = u.getMonth() - 1;
        f < 0 && (f = 11);
        var y = 'data-year="' + i[0] + '" data-month="' + (u.getMonth() + 1) + '"';
        return s = s + '<div class="' + t + 'body">' + function() {
            for (var a = "", e = "", s = 0; s < 6; s++) {
                a = a + '<div class="' + t + 'tr">';
                for (var n = 0; n < 7; n++)
                    if (e = t + "item col" + n,
                    "date" == r)
                        if (0 == s && n < g)
                            a = a + '<span class="' + e + '">' + (p[f] - g + n + 1) + "</span>";
                        else {
                            var l = 7 * s + n - g + 1;
                            if (l <= p[u.getMonth()]) {
                                var v = new Date(i[0],u.getMonth(),l);
                                m.getDate() == l && (e = e + " " + h),
                                a = v >= o && v <= c ? a + '<a href="javascript:;" ' + y + ' class="' + e + '">' + l + "</a>" : a + '<span class="' + e + '">' + l + "</span>"
                            } else
                                a = a + '<span class="' + e + '">' + (l - p[u.getMonth()]) + "</span>"
                        }
                    else if ("date-range" == r)
                        if (0 == s && n < g)
                            a = a + '<span class="' + e + '">&nbsp;</span>';
                        else {
                            var l = 7 * s + n - g + 1;
                            if (l <= p[u.getMonth()]) {
                                var v = new Date(i[0],u.getMonth(),l)
                                  , d = this[h][0].join("-").toDate()
                                  , j = this[h][1].join("-").toDate()
                                  , D = v.getTime()
                                  , w = d.getTime()
                                  , x = j.getTime();
                                D >= w && D <= x && (e = e + " " + h,
                                D == w && (e = e + " " + t + "begin"),
                                D == x && (e = e + " " + t + "end"),
                                1 == l ? e = e + " " + t + "first" : l == p[u.getMonth()] && (e = e + " " + t + "last")),
                                a = v >= o && v <= c ? a + '<a href="javascript:;" ' + y + ' class="' + e + '">' + l + "</a>" : a + '<span class="' + e + '">' + l + "</span>"
                            } else
                                a = a + '<span class="' + e + '">&nbsp;</span>'
                        }
                a += "</div>"
            }
            return a
        }
        .call(this) + "</div>",
        {
            monthDay: p,
            html: s,
            min: o,
            max: c
        }
    }
    ,
    c.prototype._monthDay = function(t) {
        var a = t;
        0 == $.isArray(t) && (a = t.toArray());
        var e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return (a[0] % 4 == 0 && a[0] % 100 != 0 || a[0] % 400 == 0) && (e[1] = 29),
        e
    }
    ,
    c.prototype._datePrevMonth = function(t) {
        var a = t;
        0 == $.isArray(t) && (a = t.toArray());
        var e = 1 * a[1]
          , s = this._monthDay(a);
        return 1 == e ? [a[0] - 1, 12, a[2]].join("-").toDate() : s[e - 2] < a[2] ? [a[0], e - 1, s[e - 2]].join("-").toDate() : [a[0], e - 1, a[2]].join("-").toDate()
    }
    ,
    c.prototype._dateNextMonth = function(t) {
        var a = t;
        0 == $.isArray(t) && (a = t.toArray());
        var e = 1 * a[1]
          , s = this._monthDay(a);
        return 12 == e ? [a[0] + 1, 1, a[2]].join("-").toDate() : s[e] < a[2] ? [a[0], e + 1, s[e]].join("-").toDate() : [a[0], e + 1, a[2]].join("-").toDate()
    }
    ,
    c.prototype.date = function() {
        var a = this[h]
          , e = (a.join("-").toDate(),
        a[1] - 1);
        nextMonth = 1 * a[1] + 1;
        var s = this._calendar(a)
          , i = '<div class="' + t + 'x">';
        i = i + '<div class="' + t + 'head">';
        var n = this._datePrevMonth(a)
          , r = n.getMonth()
          , o = n.getFullYear();
        i = new Date(o,r,s.monthDay[r]) >= s.min && n <= s.max ? i + '<a href="javascript:" class="' + t + 'prev" data-month="' + e + '">' + this.svg + "</a>" : i + '<span class="' + t + 'prev">' + this.svg + "</span>";
        var l = this._dateNextMonth(a)
          , c = l.getMonth()
          , v = l.getFullYear();
        return i = l >= s.min && new Date(v,c,1) <= s.max ? i + '<a href="javascript:" class="' + t + 'next" data-month="' + nextMonth + '">' + this.svg + "</a>" : i + '<span class="' + t + 'next">' + this.svg + "</span>",
        i = i + '<a href="javascript:" class="' + t + 'switch" data-type="month">' + a.slice(0, 2).join("-") + "</a>\t\t</div>",
        i += s.html,
        i = new Date >= s.min && new Date <= s.max ? i + '<a href="javascript:" class="' + t + "item " + t + 'now">今天</a>' : i + '<span class="' + t + "item " + t + 'now">今天</span>',
        i += "</div>",
        this.el.container.attr("data-type", "date").html(i),
        this
    }
    ,
    c.prototype["date-range"] = function() {
        var e = this[h]
          , s = this.el.container.data("date") || e[0];
        this.el.container.data("date", s);
        var i = s[1] - 1
          , n = 1 * s[1] + 1
          , r = this._calendar(s)
          , o = '<div class="' + a + 'x">';
        o = o + '<div class="' + t + 'head">\t\t\t<div class="' + t + 'half">';
        var l = new Date(s[0],i - 1,s[2]);
        o = l >= r.min && l <= r.max ? o + '<a href="javascript:" class="' + t + 'prev" data-month="' + i + '">' + this.svg + "</a>" : o + '<span class="' + t + 'prev">' + this.svg + "</span>",
        o = o + '<span class="' + t + 'switch">' + new Date(s[0],i,s[2]).toArray().slice(0, 2).join("-") + '</span>\t\t</div>\t\t<div class="' + t + 'half">';
        var c = new Date(s[0],s[1],1)
          , v = new Date(s[0],n,s[2]);
        return o = v >= r.min && v <= r.max ? o + '<a href="javascript:" class="' + t + 'next" data-month="' + n + '">' + this.svg + "</a>" : o + '<span class="' + t + 'next">' + this.svg + "</span>",
        o = o + '<span class="' + t + 'switch">' + c.toArray().slice(0, 2).join("-") + "</span>\t\t</div>",
        o += "</div>",
        o = o + '<div class="' + a + 'body"><div class="' + t + 'half">' + r.html + '</div><div class="' + t + 'half">' + this._calendar(c.toArray()).html + "</div></div>",
        o = o + '<div class="' + a + 'footer"><a href="javascript:;" class="ui-button ui-button-primary" data-type="ensure">确定</a><a href="javascript:;" class="ui-button" data-type="cancel">取消</a></div>',
        o += "</div>",
        this.el.container.attr("data-type", "date-range").html(o),
        this
    }
    ,
    c.prototype._month = function(a) {
        var e = this.el.input
          , s = e.attr("min") || this.min
          , n = e.attr("max") || this.max
          , r = $.map([s, n], function(t, a) {
            return t = "object" == typeof t && t.getTime ? t.toArray().slice(0, 2).join("") : "string" == typeof t && 0 == /\D/.test(t.replace(l, "")) ? t.replace(l, "").slice(0, 6) : a ? "999912" : "000000"
        });
        s = r[0],
        n = r[1];
        var o = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"]
          , c = 1 * a[0]
          , v = this.type
          , d = '<div class="' + i + 'body">' + function() {
            for (var e = "", i = "", r = "", l = 1; l <= 12; l += 1) {
                if (r = l < 10 ? "0" + l : l + "",
                i = t + "item",
                "month" == v)
                    l == a[1] && (i = i + " " + h);
                else if ("month-range" == v) {
                    var d = this[h][0].slice(0, 2).join("")
                      , p = this[h][1].slice(0, 2).join("")
                      , m = c + r;
                    m >= d && m <= p && (i = i + " " + h)
                }
                e = c + r >= s && c + r <= n ? e + '<a href="javascript:" class="' + i + '" data-year="' + c + '" data-value="' + r + '">' + o[l - 1] + "月</a>" : e + '<span class="' + i + '" data-value="' + r + '">' + o[l - 1] + "月</span>"
            }
            return e
        }
        .call(this) + "</div>";
        return {
            html: d,
            min: s,
            max: n
        }
    }
    ,
    c.prototype.month = function() {
        var a = this[h]
          , e = this._month(a)
          , s = e.min
          , n = e.max
          , r = '<div class="' + i + 'x">'
          , o = 1 * a[0];
        r = r + '<div class="' + t + 'head">',
        r = o - 1 >= Math.floor(s / 100) && o - 1 <= Math.floor(n / 100) ? r + '<a href="javascript:" class="' + t + 'prev" data-year="' + (o - 1) + '">' + this.svg + "</a>" : r + '<span class="' + t + 'prev">' + this.svg + "</span>",
        r = o + 1 >= Math.floor(s / 100) && o + 1 <= Math.floor(n / 100) ? r + '<a href="javascript:" class="' + t + 'next" data-year="' + (o + 1) + '">' + this.svg + "</a>" : r + '<span class="' + t + 'next">' + this.svg + "</span>",
        r = r + '<a href="javascript:" class="' + t + 'switch" data-type="year">' + o + "</a>\t\t</div>",
        r += e.html;
        var l = (new Date).toArray().slice(0, 2).join("");
        return r = l >= s && l <= n ? r + '<a href="javascript:" class="' + t + "item " + t + 'now">今月</a>' : r + '<span class="' + t + "item " + t + 'now">今月</span>',
        r += "</div>",
        this.el.container.attr("data-type", "month").html(r),
        this
    }
    ,
    c.prototype["month-range"] = function() {
        var e = this[h]
          , s = this.el.container.data("date") || e[0];
        this.el.container.data("date", s);
        var i = 1 * s[0] - 1
          , n = 1 * s[0] + 1
          , r = this._month(s)
          , o = r.max.slice(0, 4)
          , l = r.min.slice(0, 4)
          , c = '<div class="' + a + 'x">';
        return c = c + '<div class="' + t + 'head">\t\t\t<div class="' + t + 'half">',
        c = i >= l && i <= o ? c + '<a href="javascript:" class="' + t + 'prev" data-year="' + i + '">' + this.svg + "</a>" : c + '<span class="' + t + 'prev">' + this.svg + "</span>",
        c = c + '<span class="' + t + 'switch">' + s[0] + '</span>\t\t</div>\t\t<div class="' + t + 'half">',
        c = n >= l && n < o ? c + '<a href="javascript:" class="' + t + 'next" data-year="' + n + '">' + this.svg + "</a>" : c + '<span class="' + t + 'next">' + this.svg + "</span>",
        c = c + '<span class="' + t + 'switch">' + n + "</span>\t\t</div>",
        c += "</div>",
        c = c + '<div class="' + a + 'body"><div class="' + t + 'half">' + r.html + '</div><div class="' + t + 'half">' + this._month([n, s[1], s[2]]).html + "</div></div>",
        c = c + '<div class="' + a + 'footer"><a href="javascript:;" class="ui-button ui-button-primary" data-type="ensure">确定</a><a href="javascript:;" class="ui-button" data-type="cancel">取消</a></div>',
        c += "</div>",
        this.el.container.attr("data-type", "month-range").html(c),
        this
    }
    ,
    c.prototype.year = function() {
        var a = this[h]
          , e = this.el.input
          , i = e.attr("min") || this.min
          , n = e.attr("max") || this.max;
        i = "object" == typeof i && i.getFullYear ? i.getFullYear() : "string" == typeof i && 0 == /\D/.test(i.replace(l, "")) ? i.toDate().getFullYear() : 0,
        n = "object" == typeof n && n.getFullYear ? n.getFullYear() : "string" == typeof n && 0 == /\D/.test(n.replace(l, "")) ? n.toDate().getFullYear() : 9999;
        var r = '<div class="' + s + 'x">'
          , o = a[0];
        r = r + '<div class="' + t + 'head">',
        r = o - 12 >= i && o - 12 <= n ? r + '<a href="javascript:" class="' + t + 'prev" data-year="' + (o - 12) + '">' + this.svg + "</a>" : r + '<span class="' + t + 'prev">' + this.svg + "</span>",
        r = o + 12 >= i && o + 12 <= n ? r + '<a href="javascript:" class="' + t + 'next" data-year="' + (o + 12) + '">' + this.svg + "</a>" : r + '<span class="' + t + 'next">' + this.svg + "</span>",
        r = r + '<span class="' + t + 'switch">' + [o - 6, o + 5].join("-") + "</span></div>",
        r = r + '<div class="' + s + 'body">' + function() {
            for (var a = "", e = "", s = o - 6; s < o + 6; s += 1)
                e = t + "item",
                s == o && (e = e + " " + h),
                a = s >= i && s <= n ? a + '<a href="javascript:" class="' + e + '">' + s + "</a>" : a + '<span class="' + e + '">' + s + "</span>";
            return a
        }() + "</div>";
        var c = (new Date).getFullYear();
        return r = c >= i && c <= n ? r + '<a href="javascript:" class="' + t + "item " + t + 'now">今年</a>' : r + '<span class="' + t + "item " + t + 'now">今年</span>',
        r += "</div>",
        r += "</div>",
        this.el.container.attr("data-type", "year").html(r),
        this
    }
    ,
    c.prototype.hour = function() {
        var a = this[h]
          , e = this.el.input
          , s = 1 * e.attr("step");
        s = "hour" != this.type || !s || s < 1 ? 1 : Math.round(s);
        var i = (e.attr("min") || this.min.toString()).split(":")[0]
          , r = (e.attr("max") || this.max.toString()).split(":")[0];
        /\D/.test(i) ? i = 0 : i *= 1,
        /\D/.test(r) ? r = 24 : r *= 1;
        var o = '<div class="' + n + 'x">';
        return o = o + '<div class="' + n + 'body">' + function() {
            for (var e = "", n = "", o = "", l = 0; l < 24; l += s)
                n = l + "",
                1 == n.length && (n = "0" + n),
                o = t + "item",
                n == a[0] && (o = o + " " + h),
                e = n >= i && n <= r ? e + '<a href="javascript:" class="' + o + '">' + n + ":00</a>" : e + '<span class="' + o + '">' + n + ":00</span>";
            return e
        }() + "</div>",
        o += "</div>",
        this.el.container.attr("data-type", "hour").html(o),
        this
    }
    ,
    c.prototype.minute = function() {
        var a = this[h]
          , e = this.el.input
          , s = 1 * e.attr("step") || 5
          , i = e.attr("min") || this.min + ""
          , n = e.attr("max") || this.max + "";
        i = "auto" == i || /\D/.test(i.replace(":", "")) || 2 != i.split(":").length ? 0 : 1 * i.replace(":", ""),
        n = "auto" == n || /\D/.test(n.replace(":", "")) || 2 != n.split(":").length ? 2359 : 1 * n.replace(":", "");
        var o = '<div class="' + r + 'x">'
          , l = 1 * a[0];
        return o = o + '<div class="' + t + 'head">',
        o = l <= Math.floor(i / 100) ? o + '<span class="' + t + 'prev">' + this.svg + "</span>" : o + '<a href="javascript:" class="' + t + 'prev" data-hour="' + (l - 1) + '">' + this.svg + "</a>",
        o = l >= Math.floor(n / 100) ? o + '<span class="' + t + 'next">' + this.svg + "</span>" : o + '<a href="javascript:" class="' + t + 'next" data-hour="' + (l + 1) + '">' + this.svg + "</a>",
        o = o + '<a href="javascript:" class="' + t + 'switch" data-type="hour">' + a[0] + ":00</a></div>",
        o = o + '<div class="' + r + 'body">' + function() {
            for (var e = "", r = "", o = "", l = 0; l < 60; l += s)
                r = l + "",
                1 == r.length && (r = "0" + r),
                o = t + "item",
                1 * (a[0] + r) >= i && 1 * (a[0] + r) <= n ? (r == a[1] && (o = o + " " + h),
                e = e + '<a href="javascript:" class="' + o + '">' + [a[0], r].join(":") + "</a>") : e = e + '<span class="' + o + '">' + [a[0], r].join(":") + "</span>";
            return e
        }() + "</div>",
        o += "</div>",
        this.el.container.attr("data-type", "minute").html(o),
        this
    }
    ,
    c.prototype.show = function() {
        var t = this.el.container;
        return this.format(),
        "time" == this.type ? this.minute() : "date-range" == this.type ? (this._rangeSelected || (this._rangeSelected = this[h]),
        this["date-range"]()) : "month-range" == this.type ? (this._rangeSelected || (this._rangeSelected = this[h]),
        this["month-range"]()) : this[this.type] ? this[this.type]() : this.date(),
        0 == $.contains($(document.body), t) && $(document.body).append(t),
        t.show().follow(this.el.trigger.addClass(o), {
            position: "4-1"
        }),
        $.isFunction(this.callback.show) && this.callback.show.call(this, this.el.input, t),
        this.display = !0,
        this
    }
    ,
    c.prototype.hide = function() {
        return this.el.container.hide(),
        this.el.trigger.removeClass(o),
        $.isFunction(this.callback.hide) && this.callback.hide.call(this, this.el.input, this.el.container),
        this.display = !1,
        this
    }
    ,
    $.fn.dateTime = function(t) {
        return $(this).each(function() {
            $(this).data("dateTime") || $(this).data("dateTime", new c($(this),t))
        })
    }
    ,
    c
});
