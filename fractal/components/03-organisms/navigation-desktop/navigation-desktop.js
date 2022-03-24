import lottieWeb from 'lottie-web';

class DesktopNavigation {

	constructor() {
		this.elements = {
			logo: document.querySelector('.navigation-desktop__logo')
		};
		this.logo = {
			element: this.lottie = this.createLottie(),
			container: this.elements.logo
		}
	}

	createLottie() {
		return lottieWeb.loadAnimation({
			container: this.elements.logo,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: '/media/lotties/logo.json'
		});
	};

};

export default DesktopNavigation;