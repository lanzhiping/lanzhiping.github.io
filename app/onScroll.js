const scrollHandlerList = [];

function handlerScrolling(e) {
    scrollHandlerList.forEach(handler => handler(e));
}

function onScroll(handler, options = {}) {
    if (options.leading) {
        handler();
    }

    if (options.optimize && window.requiestAnimationFrame) {
        scrollHandlerList.push(() => {
            window.requestAnimationFrame(() => handler(e));
        })
    } else {
        scrollHandlerList.push(handler);
    }
}

window.onscroll = handlerScrolling;

export default onScroll;
