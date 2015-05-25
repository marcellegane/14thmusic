//------------------------------------------------------------------------
//  $Load functions
//------------------------------------------------------------------------


$(window).load(function() {
    $('body').addClass('loaded');
});


//------------------------------------------------------------------------
//  $Game
//------------------------------------------------------------------------


var selected = 0,
    selectMax = 4,
    found = 0,
    $sample = $('.sample'),
    $found = $('.found'),
    play = true;

var sampleSelect = function() {
    if (play) {
        if ($(this).hasClass('is-chosen')) {
            $(this).removeClass('is-chosen');
            selected--;

            if ($(this).data('code') === true) {
                found--;
                $found.html(found);
            }
        } else {
            if (selected === 4) {
                return;
            }

            $(this).addClass('is-chosen');
            selected++;

            if ($(this).data('code') === true) {
                found++;
                $found.html(found);
                if (found === 4) {
                    play = false;
                    $('body').addClass('found');
                }
            }
        }
    }
};

$sample.on('click', sampleSelect);