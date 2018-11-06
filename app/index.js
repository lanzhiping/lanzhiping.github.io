import hyperhtml from 'hyperhtml';
import './main.scss';

class Frameworks {
    constructor(el) {
        this.frameworks = [
            { name: 'AngularJS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/angular?s=200' },
            { name: 'BackboneJS', type: 'frontend', avatar: 'http://enzolutions.com/assets/img/backbonejs-logo-small.png' },
            { name: 'ReactJs', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/reactjs?s=200' },
            { name: 'ReduxJs', type: 'frontend', avatar: 'https://avatars3.githubusercontent.com/reduxjs?s=200' },
            { name: 'ExpressJS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/expressjs?s=200' },
            { name: 'BabelJS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/babel?s=200' },
            { name: 'WebpackJS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/webpack?s=200' },
            { name: 'JasmineJS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/jasmine?s=200' },
            { name: 'Sass', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/sass?s=200' },
            { name: 'NodeJS', type: 'frontend', avatar: 'http://3apples.co/wp-content/uploads/2016/08/nodejs-128.png' },
            { name: 'MongoDB', type: 'frontend', avatar: 'https://avatars3.githubusercontent.com/mongodb?s=200' }
        ];

        const root = window.document.querySelector(el);
        if (root) {
            this.template = hyperhtml(root);
            this.render();
        } else {
            throw { message: `[Frameworks]: ${el} can not be found.` };
        }
    }

    render() {
        this.template`
            <div>
                ${this.frameworks.map(f => hyperhtml`
                    <span><img src=${f.avatar} alt=${f.name}/></span>
                `)}
            </div>
        `
    }
}

new Frameworks('.frameworks')


function startApp() {
    // const root = window.document.querySelector('#app');
    // hyperhtml(root)`
    //     <video class="videoplayer" id="video" width="100%" autoplay loop controlsList="nodownload nofullscreen noremoteplayback">
    //         <source type="video/webm" src="https://download.videvo.net/videvo_files/video/free/2018-08/small_watermarked/180825_01_laptop_preview.webm">
    //         <source type="video/mp4" src="https://download.videvo.net/videvo_files/video/free/2018-08/small_watermarked/180825_01_laptop_preview.mp4">
    //     </video>
    // `
}
// startApp();
