import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

class Teaser {

  constructor() {
    this.name = "teaser";
    this.elements = {
      teaser: document.querySelectorAll('.teaser')
    }
    this.init();
  }

  init() {
    if (!document.querySelector(`.js-${this.name}`)) return;
    this.setupScrollTrigger();
  }

  setupScrollTrigger() {
    const teasers = gsap.utils.toArray(this.elements.teaser);
    teasers.forEach((teaser) => {
      gsap.to(teaser, {
        scrollTrigger: {
          trigger: teaser,
          markers: false,
          once: true,
          start: "top 90%",
          end: "top 100%",
          onEnter: () => { 
            gsap.fromTo(teaser, 
              { y: -24, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power4" });
          }
        }
      });
    });
  };

};

export default Teaser;