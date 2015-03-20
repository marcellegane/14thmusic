var site = (function($) {

    var $win = $(window),
        width;

    var winW = function() {
        width = $win.width();
    };

    $win.on('resize', function() {
        winW();
    });

    var init = function(){
        winW();
    };

    return {
        init: init,
        width: function() {
            return width;
        }
    };

})(jQuery);

site.init();