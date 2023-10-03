export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;

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
    this.show(this.index);
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
  }

  prev() {

    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1
    this.show(prev)

    /* lógica alternativa
    if(this.index > 0) {
      this.show(this.index - 1)
    } */
  }
  next() {

    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0 
    this.show(next)
    /* lógica alternativa
    if (this.index < this.slides.length - 1) {
      this.show(this.index + 1);
    } */
  }

  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);
    this.controls.appendChild(nextButton);
    prevButton.innerText = "Anterior";
    nextButton.innerText = "Próximo";
    prevButton.addEventListener("pointerup", () => this.prev());
    nextButton.addEventListener("pointerup", () => this.next());
  }

  init() {
    this.addControls();
    this.show(this.index);
  }
}
