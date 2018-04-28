!function(n, e) {
    "function" == typeof define && (define.amd || define.cmd) ? define(e) : e().init()
}(this, function() {
    return !$().propMatch && window.console && console.error("need Radio.js"),
    {
        init: function() {
            if (!window.addEventListener && !window.initedCheckbox && $().propMatch) {
                var n = "input[type=checkbox]";
                $(document.body).delegate(n, "click", function() {
                    $(this).propMatch()
                }),
                $(n).propMatch(),
                window.initedCheckbox = !0
            }
        }
    }
});
