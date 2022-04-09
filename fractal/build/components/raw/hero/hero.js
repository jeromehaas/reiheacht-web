import { gsap } from 'gsap';
import { ScrollPlugin } from 'gsap/ScrollToPlugin';

class Hero {

	constructor() {
		this.name = 'hero';
		this.elements = {
			buttons: {
				showreel: document.querySelector('.hero__button--showreel'),
				projects: document.querySelector('.hero__button--projects'),
				contact: document.querySelector('.hero__button--contact'),
			}
		}
		this.init()
	}

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.addEventListener();
	}

	addEventListener() {
		this.elements.buttons.projects.addEventListener('click', (event) => this.scrollTo('#projekte', event));
		this.elements.buttons.contact.addEventListener('click', (event) => this.scrollTo('#kontakt', event));
	}

	scrollTo(target, event) {
		event.preventDefault();
		gsap.to(window, { scrollTo: target, ease: 'power2', duration: 1 })
	}

}

export default Hero;