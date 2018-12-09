import Frameworks from './Frameworks';
import Header from './Header';
import parallax from './parallax';
import './index.scss';

function playVideo() {
    const video = document.querySelector('video');
    let retryTimes = 10;

    if (video) {
        const interval = window.setInterval(() => {
            if (retryTimes > 0) {
                video.play();
            } else {
                window.clearInterval(interval);
            }
        }, 1000);
        video.onplaying = () => window.clearInterval(interval);
    }
}

function startApp() {
    new Frameworks('.frameworks');
    new Header('.intro_content');
    parallax('.intro', '.intro_background');
    parallax('.projects', '.projects_background');
    playVideo();
}
startApp();
