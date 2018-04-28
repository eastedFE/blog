!function(t, i) {
    "function" == typeof define && (define.amd || define.cmd) ? define(i) : i().init()
}(this, function() {
    var t = "checked";
    return $.fn.propMatch = function() {
        if (!window.addEventListener) {
            var i = function(i) {
                i = $(i),
                i.prop(t) ? i.attr(t, t) : i.removeAttr(t),
                i.parent().addClass("z").toggleClass("i_i")
            }
            ;
            if (1 == $(this).length && "radio" == $(this).attr("type")) {
                var n = $(this).attr("name");
                $("input[type=radio][name=" + n + "]").each(function() {
                    i(this)
                })
            } else
                $(this).each(function() {
                    i(this)
                });
            return $(this)
        }
    }
    ,
    {
        match: function(t) {
            t.propMatch()
        },
        init: function() {
            if (!window.addEventListener && !window.initedRadio) {
                var t = "input[type=radio]";
                $(document.body).delegate(t, "click", function() {
                    $(this).propMatch()
                }),
                $(t).propMatch(),
                window.initedRadio = !0
            }
        }
    }
});
