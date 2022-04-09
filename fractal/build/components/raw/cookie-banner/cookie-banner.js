import Cookies from 'js-cookie';
import moment from 'moment';

class CookieBanner {

	constructor() {
		this.name = 'cookie-banner',
		this.elements = {
			banner: document.querySelector('.cookie-banner'),
			button: document.querySelector('.cookie-banner__button')
		};
		this.init();
	};

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.addEventListeners();
		setTimeout(() => this.checkCookie(), 5000);
	};

	addEventListeners() {
		this.elements.button.addEventListener('click', () => {
			this.setCookie();
			this.hideBanner();
		});
	};

	showBanner() {
		this.elements.banner.classList.add('cookie-banner--visible');
	};
	
	hideBanner() {
		this.elements.banner.classList.remove('cookie-banner--visible');
	};

	checkCookie() {
		const cookie = Cookies.get('cookie-banner');
		if (!cookie) this.showBanner();
	};
	
	setCookie() {
		const today = moment().subtract(10, 'days').calendar();
		Cookies.set('cookie-banner', today, { expires: 7 } );
	};

};

export default CookieBanner;