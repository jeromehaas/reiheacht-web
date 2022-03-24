import lottieWeb from 'lottie-web';
import {
	gsap
} from "gsap";

class NavigationMobile {

	constructor() {
		this.name = 'navigation-mobile';
		this.isActive = false;
		this.elements = {
			logo: document.querySelector('.navigation-mobile__logo'),
			hamburger: document.querySelector('.navigation-mobile__hamburger'),
			panel: document.querySelector('.navigation-mobile__panel'),
			links: document.querySelectorAll('.navigation-mobile__link'),
		};
		this.logo = {
			element: null,
			container: this.elements.logo
		};
		this.hamburger = {
			element: null,
			container: this.elements.hamburger,
		};
		this.init();
	};

	init() {
		if (document.querySelector(`.js-${this.name}`)) return;
		this.createLogo();
		this.createHamburger();
	};

	createLogo() {
		this.logo.element = lottieWeb.loadAnimation({
			container: this.elements.logo,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: '/media/lotties/logo.json'
		});
	};

	createHamburger() {
		this.hamburger.element = lottieWeb.loadAnimation({
			container: this.elements.hamburger,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: '/media/lotties/hamburger.json',
		});
		this.hamburger.element.setSpeed(1.5);
		this.elements.hamburger.addEventListener('click', () => this.toggleStatus());
	};

	toggleStatus() {
		this.isActive = !this.isActive;
		if (this.isActive) {
			this.activateHamburger();
			this.showPanel();
		} else {
			this.deactivateHamburger();
			this.hidePanel();
		};
	};

	activateHamburger() {
		this.hamburger.element.setDirection(1);
		this.hamburger.element.play();
	};

	deactivateHamburger() {
		this.hamburger.element.setDirection(-1);
		this.hamburger.element.play();
	};

	showPanel() {
		this.elements.panel.classList.add('navigation-mobile__panel--active');
		this.showLinks();
	};

	hidePanel() {
		this.elements.panel.classList.remove('navigation-mobile__panel--active');
		this.hideLinks();
	};

	showLinks() {
		gsap.fromTo(this.elements.links, {
			opacity: 0
		}, {
			opacity: 1,
			duration: 0.5,
			delay: 1,
			stagger: {
				from: 'start',
				amount: 0.5
			}
		});
	};

	hideLinks() {
		gsap.fromTo(this.elements.links, {
			opacity: 1
		}, {
			opacity: 0,
			duration: 0.5,
			stagger: {
				from: 'end',
				amount: 0.5
			},
			delay: 0
		});
	};

};

export default NavigationMobile;