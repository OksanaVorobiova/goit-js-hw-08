import Player from '@vimeo/player';
import throttle from 'lodash.throttle'

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimeupdate, 1000));

const SECONDS = localStorage.getItem("videoplayer-current-time:");
console.log(SECONDS);
player.setCurrentTime(SECONDS).then(function(SECONDS) {
    // seconds = the actual time that the player seeked to
    console.log(SECONDS);
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            console.log(error.message);
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            console.log(error.name);
            // some other error occurred
            break;
    }
});


function onTimeupdate(e) {
        localStorage.setItem("videoplayer-current-time:", e.seconds);
}