import hyperhtml from 'hyperhtml';
import onScroll from './onScroll';
import parallax from './parallax';
import './main.scss';

class Frameworks {
    constructor(el) {
        this.frameworks = [
            { name: 'AngularJS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/angular?s=200' },
            { name: 'BackboneJS', type: 'frontend', avatar: 'http://enzolutions.com/assets/img/backbonejs-logo-small.png' },
            { name: 'ReactJs', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/reactjs?s=200' },
            { name: 'Ant Design', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/ant-design?s=200' },
            { name: 'ReduxJs', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/reduxjs?s=200' },
            { name: 'ExpressJS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/expressjs?s=200' },
            { name: 'BabelJS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/babel?s=200' },
            { name: 'PostCSS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/postcss?s=200' },
            { name: 'WebpackJS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/webpack?s=200' },
            { name: 'JasmineJS', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/jasmine?s=200' },
            { name: 'Sass', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/sass?s=200' },
            { name: 'NodeJS', type: 'frontend', avatar: 'http://3apples.co/wp-content/uploads/2016/08/nodejs-128.png' },
            { name: 'MongoDB', type: 'frontend', avatar: 'https://avatars.githubusercontent.com/mongodb?s=200' }
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
        `;
    }
}

function startApp() {
    new Frameworks('.frameworks');
    parallax('.intro', '.intro_background');
    parallax('.projects', '.projects_background');
}
startApp();
