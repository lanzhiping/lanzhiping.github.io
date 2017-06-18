const scrollHandlerList = [];

window.onscroll = function(e) {
    scrollHandlerList
        .forEach(handler => handler(e));
}

function onScroll(handler) {
    scrollHandlerList.push(handler);
}

module.exports = onScroll;
