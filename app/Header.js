import onScroll from './onScroll';

class Header {
    constructor(className) {
        this.el = document.querySelector(className);
        this.fixedHeader = undefined;

        onScroll(() => {
            if (this.isReachedTop()) {
                !this.fixedHeader && this.fixupHeader();
            } else {
                this.fixedHeader && this.reverseHeader();
            }
        });
    }

    isReachedTop() {
        const { bottom } = this.el.getBoundingClientRect();

        return bottom <= 0;
    }

    fixupHeader() {
        this.fixedHeader = this.el.cloneNode(true);
        this.fixedHeader.classList.add('fixed');
        document.body.appendChild(this.fixedHeader);
    }

    reverseHeader() {
        document.body.removeChild(this.fixedHeader);
        this.fixedHeader = undefined;
    }
}

export default Header;
