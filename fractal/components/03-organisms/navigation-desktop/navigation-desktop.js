import lottieWeb from 'lottie-web';

class NavigationDesktop {

	constructor() {
		this.name = 'navigation-desktop';
		this.elements = {
			logo: document.querySelector('.navigation-desktop__logo')
		};
		this.logo = {
			element: null,
			container: this.elements.logo
		}
		this.init();
	}

	init() {
		if (document.querySelector(`.js-${this.name}`)) return;
		this.createLogo();	
	}

	createLogo() {
		this.logo.element = lottieWeb.loadAnimation({
			container: this.elements.logo,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: '/media/lotties/logo.json'
		});
	};

};

export default NavigationDesktop;