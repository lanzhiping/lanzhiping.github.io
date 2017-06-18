const onScroll = require('./onScroll');

function linkFunction(scope, element, attrs, controller, transcludeFn) {
    console.log('link function fired', scope, element, attrs, controller, transcludeFn);

    onScroll(e => {

    });
}

function ParallaxDir() {
    return {
        link: linkFunction
    };
}

module.exports = [ParallaxDir];
