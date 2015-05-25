//------------------------------------------------------------------------
//  $Samples
//------------------------------------------------------------------------


var samples = [],
    audioLoad = 0,
    extension = '.wav';

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

function canPlayAudio(ext) {
    var a = document.createElement('audio');
    return ( !! (a.canPlayType && a.canPlayType('audio/' + ext + ';').replace(/no/, '')));
}

$('.sample').each(function(i) {
    var audio = new Audio(),
        src = $(this).data('file');

    audio.src = src + extension;
    audio.onloadeddata = function() {
        console.log('load' + i);
        audioLoad++;
        if (audioLoad === 14) {
            console.log('audioLoad');
            runSamples();
        }
    };

    samples.push(audio);
});


//------------------------------------------------------------------------
//  $Looping event listener
//------------------------------------------------------------------------


var preloop;

if (extension === '.m4a') {
    preloop = 0.46;
} else {
    preloop = 0.2;
}

samples[0].addEventListener('timeupdate', function() {
    if (this.currentTime >= this.duration - preloop) {
        $.each(samples, function(index, sample){
            sample.currentTime = 0;
            sample.play(0);
        });
    }
});


//------------------------------------------------------------------------
//  $Load functions
//------------------------------------------------------------------------


function runSamples() {

    $('body').addClass('loaded');

    $.each(samples, function(index, sample) {
        this.currentTime = 0;
        this.play();
        this.volume = 0;
    });

    $('.sample').on('click', function() {
        var index = $(this).data('index');

        if ($(this).hasClass('playing')) {
            $(this).removeClass('playing');

            $(samples[index]).animate({
                volume: 0
            }, 1000);
        } else {
            $(this).addClass('playing');

            $(samples[index]).animate({
                volume: 1
            }, 1000);
        }

        return false;
    });

}
