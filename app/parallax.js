import onScroll from './onScroll';

function parallax(container, element) {
    onScroll(() => {
        const { y } = container.getBoundingClientRect();
        element.style.top = `${Math.max(y, 0)}px`;
        element.children[0].style.top = `-${Math.max(y, 0)}px`;
    }, { leading: true });
}

function initParallax(parentSelector, selector) {
    const container = window.document.querySelector(parentSelector);
    const element = window.document.querySelector(selector);

    if (container && element) {
        element.setAttribute('class', `parallax_ele ${element.className}`);
        element.style.height = container.clientHeight;
        element.children[0].style.transform = 'translate3d(0, 0, 0)';
        parallax(container, element);
    }
}

export default initParallax;
