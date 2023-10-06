import Timeout from "./Timeout.js";
export default class Slide {
    container;
    slides;
    controls;
    time;
    index;
    slide;
    timeout;
    paused;
    pausedTimeout;
    constructor(container, slides, controls, time = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.index = 0;
        this.slide = this.slides[this.index];
        this.timeout = null;
        this.pausedTimeout = null;
        this.paused = false;
        this.init();
    }
    hide(element) {
        element.classList.remove("active");
    }
    show(index) {
        this.index = index;
        this.slide = this.slides[this.index];
        this.slides.map((element) => this.hide(element));
        this.slide.classList.add("active");
        this.auto(this.time);
    }
    prev() {
        if (this.paused)
            return;
        const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
        this.show(prev);
    }
    next() {
        if (this.paused)
            return;
        const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
        this.show(next);
    }
    auto(time) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
    }
    pause() {
        console.log("Pause");
        this.pausedTimeout = new Timeout(() => {
            this.paused = true;
        }, 300);
    }
    continue() {
        console.log("continue");
        this.pausedTimeout?.clear();
        if (this.paused) {
            this.paused = false;
            this.auto(this.time);
        }
    }
    addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        this.controls.appendChild(nextButton);
        prevButton.innerText = "Anterior";
        nextButton.innerText = "Próximo";
        this.controls.addEventListener("pointerdown", () => this.pause());
        this.controls.addEventListener("pointerup", () => this.continue());
        prevButton.addEventListener("pointerup", () => this.prev());
        nextButton.addEventListener("pointerup", () => this.next());
    }
    init() {
        this.addControls();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slide.js.map