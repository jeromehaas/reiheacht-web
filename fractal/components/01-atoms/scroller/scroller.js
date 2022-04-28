import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

class Scroller {

	constructor() {
		this.name = 'scroller';
		this.elements = {
			arrow: document.querySelector('.scroller__icon')
		};
		this.init();
	}

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.addEventListener();
	}

	addEventListener() {
		this.elements.arrow.addEventListener('click', this.scrollDown)
	}

	scrollDown() {
		gsap.to(window, { scrollTo: '#leistungen', duration: 1.3, ease: 'Power4.easeInOut' })
	}

}

export default Scroller;