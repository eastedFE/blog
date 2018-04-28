!function(e, t) {
    "function" == typeof define && (define.amd || define.cmd) ? define(t) : t().init()
}(0, function() {
    return $.fn.selectMatch = function(e) {
        var t = {
            prefix: "ui-",
            trigger: ["change"]
        }
          , a = $.extend({}, t, e || {})
          , i = a.prefix + "select"
          , s = a.prefix.replace(/[a-z]/gi, "")
          , n = function(e) {
            var t = 0
              , a = "";
            return e.find("option").each(function(e) {
                var n = [i + s + "datalist" + s + "li", this.className];
                this.selected && (t = e,
                n.push("selected")),
                this.disabled && n.push("disabled"),
                a = a + '<a href="javascript:" class="' + n.join(" ") + '" data-index=' + e + ">" + this.innerHTML + "</a>"
            }),
            {
                index: t,
                html: a
            }
        }
        ;
        return $(this).each(function(e, t) {
            var r = $(this).hide().data("select");
            r || (r = $("<div></div>").on("click", "a._", function() {
                if ($(t).prop("disabled"))
                    return !1;
                if (r.toggleClass("active"),
                r.hasClass("active")) {
                    var e = r.children("div[id]")
                      , a = e.offset().top + e.outerHeight() > Math.max($(document.body).height(), $(window).height());
                    r[a ? "addClass" : "removeClass"]("reverse");
                    var i = r.data("scrollTop")
                      , s = e.find(".selected");
                    i && i[1] == s.attr("data-index") && i[2] == s.text() && (e.scrollTop(i[0]),
                    r.removeData("scrollTop"))
                } else
                    r.removeClass("reverse")
            }).on("click", "a[data-index]", function(e, i) {
                var s = $(this).attr("data-index")
                  , n = $(this).parent().scrollTop();
                r.removeClass("active"),
                r.data("scrollTop", [n, s, $(this).text()]),
                $(t).find("option").eq(s).get(0).selected = !0,
                $(t).selectMatch(a),
                $.each(a.trigger, function(e, a) {
                    $(t).trigger(a, [i])
                })
            }),
            $(this).data("select", r),
            $(this).after(r),
            $(document).mouseup(function(e) {
                var t = e.target;
                t && r.hasClass("active") && r.get(0) !== t && 0 == r.get(0).contains(t) && r.removeClass("active").removeClass("reverse")
            }));
            var c = n($(this))
              , d = $(this).find("option").eq(c.index);
            r.attr("class", t.className + " " + i).width($(this).outerWidth());
            var l = ("id_" + Math.random()).replace("0.", "")
              , o = '<a href="javascript:" class="' + i + s + 'button _" data-target="' + l + '"><span class="' + i + s + 'text">' + d.html() + '</span><i class="' + i + s + 'icon"></i></a>'
              , h = '<div id="' + l + '" class="' + i + s + 'datalist">' + c.html + "</div>";
            r.html(o + h)
        })
    }
    ,
    {
        init: function(e, t) {
            e = e || $("select"),
            e.selectMatch(t)
        }
    }
});
