$(document).ready(function() {
    $('.dich-more').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var $this = $(this),
            parentSec = $this.closest('section'),
            nextSec = parentSec.next('section'),
            body = $('body');

        body.stop().animate({scrollTop: nextSec.offset().top}, 500, 'swing');
    });

    $('#audio-samples').on('click', 'li', function() {
        $(this).find('audio')[0].play();
    });

    $('.dich-video').on('click', function() {
        if (!player || !player.playVideo) {
            return;
        }

        $(this).addClass('shown');
        player.playVideo();
    });

    recalc();
    var resize = window.onresize || function() {};
    window.onresize = function() {
        resize();
        recalc();
    };
});

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player');
}

function recalc() {
    var bg = $('.dich-video'),
        pl = $('#player'),

        // background original image
        ow = 1055,
        oh = 685,

        // background tablet height
        th = 510,

        // original right hand offset
        or = 199,
        // original bottom offset
        ob = 133,

        // original video size
        opw = 678,
        oph = 382,

        aw = bg.width(),
        ah = bg.height(),
        m;

    if (ow / aw > oh / ah) {
        m = ow / aw;
    } else {
        m = oh / ah;
    }

    var r = or / m,
        b = ob / m,
        pw = opw / m,
        ph = oph / m,
        bot = b + (th - oph) / m / 2;

    pl.css({
        right:  r,
        bottom: bot,
        width:  pw,
        height: ph
    });

    var top = ah - bot - ph / 2;
    pl.next('.play').css({
        'background-position-y': (top * 100 / ah) + '%'
    })
}