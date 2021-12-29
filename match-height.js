export default class MatchHeight{

    constructor(wrapper, selector) {
        this.elWrapper = wrapper;
        this.elElems = this.elWrapper.querySelectorAll(selector);
        this.setHeight();
        this.bindEvents();
    }

    bindEvents(){
        let throttled = false
        window.addEventListener('resize', () =>  {
            if (!throttled) {
                this.setHeight();
                throttled = true;
                setTimeout(() => {
                    throttled = false;
                }, 250);
            }
        });

        document.addEventListener('matchheight:reset', this.reset.bind(this));
    }

    reset(){
        [...this.elElems].map((el) => {
            el.style.height = 'auto';
        });
        this.setHeight();
    }

    setHeight(){
        let h = 0;
        [...this.elElems].map((el) => {
            h = el.offsetHeight > h ? el.offsetHeight : h;
        });
        [...this.elElems].map((el) => {
            el.style.height = h+'px';
        });
    }

}
