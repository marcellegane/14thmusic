
var samples = [];

$('.sample').each(function(i) {
    var audio = new Audio(),
        src = $(this).data('file'),
        sample = {
            audio: audio,
            src: src
        };

    samples.push(sample);
});

// Add sample end event listener

$.each(samples, function(index, sample) {
    sample.audio.addEventListener('timeupdate', function() {
        if (sample.audio.currentTime >= sample.audio.duration - 0.2) {
            sample.audio.currentTime = 0;
            sample.audio.play(0);
        }
    });
});

function setAudioSrc(sample,url) {
    sample.src = url;
}

function setAudioFormat (ext) {
    $.each(samples, function(index, sample) {
        setAudioSrc(sample.audio,sample.src + ext);
    });
}

function canPlayAudio(ext) {
    var a = document.createElement('audio');
    return ( !! (a.canPlayType && a.canPlayType('audio/' + ext + ';').replace(/no/, '')));
}

function getAudioExtension() {
    var extension = 'wav';

    if (canPlayAudio('ogg')) {
        extension = '.ogg';
    }
    else if (canPlayAudio('mp4')) {
        extension = '.m4a';
    }
    else if (canPlayAudio('aac')) {
        extension = '.aac';
    }
    else if (canPlayAudio('mp3')) {
        extension = '.mp3';
    }

    return extension;
}

setAudioFormat(getAudioExtension());

$(window).load(function() {
    $.each(samples, function(index, sample) {
        sample.audio.volume = 0;
    });

    // Interaction

    $('.sample').on('click', function() {
        var index = $(this).data('index');

        $.each(samples, function(index, sample) {
            sample.audio.play();
        });

        if ($(this).hasClass('playing')) {
            $(this).removeClass('playing');

            $(samples[index].audio).animate({
                volume: 0
            }, 1000);
        } else {
            $(this).addClass('playing');

            $(samples[index].audio).animate({
                volume: 1
            }, 1000);
        }

        return false;
    });
});