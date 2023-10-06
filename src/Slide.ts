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
    this.index = localStorage.getItem("activeSlide")
      ? Number(localStorage.getItem("activeSlide"))
      : 0;
    this.slide = this.slides[this.index];
    this.timeout = null;
    this.pausedTimeout = null;
    this.paused = false;
    this.init();
  }

  hide(element: Element) {
    element.classList.remove("active");
    if (element instanceof HTMLVideoElement) {
      element.currentTime = 0;
      element.pause();
    }
  }

  //removendo active dos elementos que não quero mostrar e mostrando so que quero
  show(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    localStorage.setItem("activeSlide", this.index.toString());
    this.slides.map((element) => this.hide(element));
    this.slide.classList.add("active");

    if (this.slide instanceof HTMLVideoElement) {
      this.autoVideo(this.slide);
    } else {
      this.auto(this.time);
    }
  }
  autoVideo(video: HTMLVideoElement) {
    video.muted = true;
    video.play();
    let firstPlay = true;
    video.addEventListener("playing", () => {
      this.auto(video.duration * 1000);
      firstPlay = false;
    });
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
    this.pausedTimeout = new Timeout(() => {
      this.timeout?.pause();
      this.paused = true;
      if (this.slide instanceof HTMLVideoElement) this.slide.pause();
    }, 300);
  }
  continue() {
    this.pausedTimeout?.clear();
    if (this.paused) {
      this.paused = false;
      this.timeout?.continue();
      if (this.slide instanceof HTMLVideoElement) this.slide.play();
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
