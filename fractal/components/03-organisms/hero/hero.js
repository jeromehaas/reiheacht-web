import { gsap } from 'gsap';
import { ScrollPlugin } from 'gsap/ScrollToPlugin';
import Vimeo from '@vimeo/player';

class Hero {

	constructor() {
		this.name = 'hero';
		this.elements = {
			buttons: {
				showreel: document.querySelector('.hero__button--showreel'),
				projects: document.querySelector('.hero__button--projects'),
				contact: document.querySelector('.hero__button--contact'),
			},
			showreel: {
				container: document.querySelector('.hero__showreel'),
				video: document.querySelector('.showreel__video'),
				icon: document.querySelector('.showreel__icon'),
				player: null
			}
		}
		this.init()
	}
	
	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.setupPlayer();
		this.addEventListener();
	}
	
	setupPlayer() {
		this.elements.showreel.player = new Vimeo(document.querySelector('.video__player'))
	}

	addEventListener() {
		this.elements.buttons.projects.addEventListener('click', (event) => this.scrollTo('#projekte', event));
		this.elements.buttons.contact.addEventListener('click', (event) => this.scrollTo('#kontakt', event));
		this.elements.buttons.showreel.addEventListener('click', (event) => this.showShowreel());
		this.elements.showreel.icon.addEventListener('click', (event) => this.hideShowreel());
	}

	scrollTo(target, event) {
		event.preventDefault();
		gsap.to(window, { scrollTo: target, ease: 'power2', duration: 1 })
	}

	showShowreel() {
		this.elements.showreel.container.classList.add('showreel--active')
		this.elements.showreel.player.play();
	}
	
	hideShowreel() {
		this.elements.showreel.container.classList.remove('showreel--active')
		this.elements.showreel.player.pause();
	}

}

export default Hero;