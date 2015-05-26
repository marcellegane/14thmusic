//------------------------------------------------------------------------
//  $Load functions
//------------------------------------------------------------------------


$(window).load(function() {
    $('body').addClass('loaded');
});


//------------------------------------------------------------------------
//  $Audio
//------------------------------------------------------------------------


var extension = '.wav',
    audio = new Audio(),
    audioLoad = false,
    $btn = $('.btn');

if (canPlayAudio('ogg')) {
    extension = '.ogg';
} else if (canPlayAudio('mp4')) {
    extension = '.m4a';
} else if (canPlayAudio('aac')) {
    extension = '.aac';
} else if (canPlayAudio('mp3')) {
    extension = '.mp3';
}

function canPlayAudio(ext) {
    var a = document.createElement('audio');
    return ( !! (a.canPlayType && a.canPlayType('audio/' + ext + ';').replace(/no/, '')));
};

audio.src = "assets/audio/cover-you-teaser" + extension;

audio.addEventListener('timeupdate', function() {
    if (this.currentTime >= this.duration) {
        audio.pause();
        audio.currentTime = 0;

        $btn.removeClass('is-active');
    }
});

$btn.on('click', function() {
    var control = $(this).data('control');

    if (control === 'play') {
        audio.play();
        $btn.removeClass('is-active');
        $(this).addClass('is-active');
    }

    if (control === 'pause') {
        audio.pause();
        $btn.removeClass('is-active');
        $(this).addClass('is-active');
    }

    if (control === 'replay') {
        $btn.removeClass('is-active');
        $('[data-control="play"]').addClass('is-active');

        audio.currentTime = 0;
        audio.pause();

        setTimeout(function() {
            audio.play();
        },200);
    }
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
                    $sample.removeClass('is-chosen');
                    audio.play();
                }
            }
        }
    }

    return false;
};

$sample.on('click', sampleSelect);