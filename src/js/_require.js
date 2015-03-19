var site = (function($) {

    var $win = $(window),
        width;

    var winW = function() {
        width = $win.width();
        console.log(width);
    };

    $win.on('resize', function() {
        winW();
    });

    var init = function(){
        winW();
    };

    return {
        init: init
    };

})(jQuery);

site.init();