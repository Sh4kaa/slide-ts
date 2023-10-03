import Slide from "./Slide.js";
const container = document.getElementById("slide");
const elements = document.getElementById("slide-elements");
const controls = document.getElementById("slide-controls");
if (container && controls && elements?.children.length) {
    const slides = new Slide(container, Array.from(elements.children), controls, 3000);
    slides.show(2);
    console.log(slides.index);
    console.log(slides.slides);
}
//# sourceMappingURL=script.js.map