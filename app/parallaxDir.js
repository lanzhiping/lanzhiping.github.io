const onScroll = require('./onScroll');

function linkFunction(scope, element, attrs, controller, transcludeFn) {
}

function ParallaxDir() {
    return {
        link: linkFunction
    };
}

module.exports = [ParallaxDir];
