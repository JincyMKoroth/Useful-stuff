export default {
    _targetElements: null,
    _activeClass: null,
    _observer: null,
    init() {
        this._targetElements = document.querySelectorAll('[data-auto-height]');
        if (!this._targetElements) {
            return;
        }

        for (const element of this._targetElements) {
            this._activeClass = element.classList[0] + '--active';
            
            this._observer    = new MutationObserver((mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (element.classList.contains(this._activeClass)) {
                            const clone = element.cloneNode(true);
                            clone.setAttribute('style', 'max-height:unset');
                            element.parentNode.appendChild(clone);

                            const height = clone.offsetHeight;
                            element.parentNode.removeChild(clone);
                            element.style.maxHeight = height + 'px';
                        } else {
                            element.style.maxHeight = 0;
                        }
                    };
                }
            });

            this._observer.observe(element, {attributes: true});
        }
    }
}
