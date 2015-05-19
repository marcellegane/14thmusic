//------------------------------------------------------------------------
//  $Fastclick
//------------------------------------------------------------------------


$(function() {
    FastClick.attach(document.body);
});


//------------------------------------------------------------------------
//  $Samples
//------------------------------------------------------------------------


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

// Add sample end event listener

var preloop;

if (getAudioExtension() === '.m4a') {
    preloop = 0.46;
} else {
    preloop = 0.2;
}

samples[0].audio.addEventListener('timeupdate', function() {
    if (this.currentTime >= this.duration - preloop) {
        $.each(samples, function(index, sample){
            sample.audio.currentTime = 0;
            sample.audio.play(0);
        });
    }
});

$(window).load(function() {
    $('body').addClass('loaded');

    $.each(samples, function(index, sample) {
        sample.audio.volume = 0;
    });

    $('.sample').on('click touchstart', function() {
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