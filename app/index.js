import hyperhtml from 'hyperhtml';
import './main.scss';



function startApp() {
    const root = window.document.querySelector('#app');
    hyperhtml(root)`
        <video class="videoplayer" id="video" width="100%" autoplay loop controlsList="nodownload nofullscreen noremoteplayback">
            <source type="video/webm" src="https://download.videvo.net/videvo_files/video/free/2018-08/small_watermarked/180825_01_laptop_preview.webm">
            <source type="video/mp4" src="https://download.videvo.net/videvo_files/video/free/2018-08/small_watermarked/180825_01_laptop_preview.mp4">
        </video>
    `
}
// startApp();
