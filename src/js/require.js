//------------------------------------------------------------------------
//  $Load functions
//------------------------------------------------------------------------


$(function() {
    FastClick.attach(document.body);
});


//------------------------------------------------------------------------
//  $Audio
//------------------------------------------------------------------------


var extension = '.wav',
    audio = new Audio(),
    audioLoad = false,
    $control = $('.control');

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
}

audio.src = "assets/audio/cover-you-teaser" + extension;

audio.addEventListener('timeupdate', function() {
    if (this.currentTime >= this.duration) {
        audio.pause();
        audio.currentTime = 0;

        $control.attr('data-control','replay');
    }
});

$control.on('click', function() {
    var audioState = $(this).attr('data-control');

    if (audioState === 'play') {
        audio.play();
        $control.attr('data-control', 'pause');
    }

    if (audioState === 'pause') {
        audio.pause();
        $control.attr('data-control', 'play');
    }

    if (audioState === 'replay') {
        audio.play();
        $control.attr('data-control', 'pause');
    }

    return false;
});


//------------------------------------------------------------------------
//  $Game
//------------------------------------------------------------------------


var selected = 0,
    max = 4,
    found = 0,
    chosen = 'is-chosen',
    $sample = $('.sample'),
    $found = $('.found'),
    $warning = $('.warning'),
    play = true;

var sampleSelect = function() {
    if (!play) {
        return false;
    }

    // If already selected
    if ($(this).hasClass(chosen)) {
        $(this).removeClass(chosen);
        $warning.addClass('is-hidden');
        selected--;

        // If correct code block lower the count
        if ($(this).data('code') === true) {
            found--;
            $found.html(found);
        }
    }
    // If unselected
    else {
        // If maximum number of blocks are selected do nothing
        if (selected === max) {
            $warning.removeClass('is-hidden');
            return false;
        }

        $(this).addClass(chosen);
        selected++;

        if ($(this).data('code') === true) {
            // Increase the found count
            found++;
            $found.html(found);

            // If all blocks are found start the audio
            if (found === max) {
                play = false;
                $('body').addClass('found');
                $sample.removeClass(chosen);
                audio.play();
            }
        }
    }

    return false;
};

$sample.on('click', sampleSelect);