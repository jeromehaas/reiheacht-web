import { gsap } from "gsap";

class PageNotFound {

  constructor() {
    this.name = "page-not-found";
    this.elements = {
      astronaut: document.querySelector('.page-not-found__astronaut')
    }
    this.init()
  }

  init() {
    if (document.querySelector(`js-${this.name}`)) return;
    this.moveAstronaut();
  }

  moveAstronaut() {
    gsap.to(this.elements.astronaut, {
      duration: 18, 
      x: '250vw',
      y: '-200%',
      ease: 'linear', 
      rotation: 720, 
      repeat: -1
    })
  }

}

export default PageNotFound;