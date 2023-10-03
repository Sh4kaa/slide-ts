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
}
