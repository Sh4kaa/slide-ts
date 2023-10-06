import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;
  timeout: Timeout | null;
  paused: boolean;
  pausedTimeout: Timeout | null;
  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000
  ) {
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

  hide(element: Element) {
    element.classList.remove("active");
  }

  //removendo active dos elementos que não quero mostrar e mostrando so que quero
  show(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    this.slides.map((element) => this.hide(element));
    this.slide.classList.add("active");
    this.auto(this.time);
  }

  prev() {
    if (this.paused) return;
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.show(prev);

    /* lógica alternativa
    if(this.index > 0) {
      this.show(this.index - 1)
    } */
  }
  next() {
    if (this.paused) return;
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.show(next);
    /* lógica alternativa
    if (this.index < this.slides.length - 1) {
      this.show(this.index + 1);
    } */
  }
  auto(time: number) {
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

  private addControls() {
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
