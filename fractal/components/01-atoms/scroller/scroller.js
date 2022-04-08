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
		console.log('scroller');
		this.addEventListener();
	}

	addEventListener() {
		this.elements.arrow.addEventListener('click', this.scrollDown)
	}

	scrollDown() {
		gsap.to(window, { scrollTo: '#leistungen', ease: 'power2', duration: 0.5 })
	}

}

export default Scroller;