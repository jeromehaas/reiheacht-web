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
			closeTriangle: {
				top: document.querySelector('.navigation-mobile__close-triangle.close-triangle.close-triangle__top'),
				bottom: document.querySelector('.navigation-mobile__close-triangle.close-triangle.close-triangle__bottom')
			}
		};
		this.logo = {
			element: null,
			container: this.elements.logo
		};
		this.closeTriangle = {
			color: null,
			top: {
				element: null,
				container: this.elements.closeTriangleTop
			},
			bottom: {
				element: null,
				container: this.elements.closeTriangleBottom
			}
		};
		this.hamburger = {
			element: null,
			container: this.elements.hamburger,
		};
		this.init();
	};

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.createLogo();
		this.createHamburger();
    this.addEventListener();
		if (this.elements.closeTriangle.top) {
			this.createCloseTriangle();
			this.checkShowTriangle();
		}
	};
	
	checkShowTriangle() {
		['load', 'scroll'].forEach((event) => {
			window.addEventListener(event, () => {
				const viewportHeight = window.innerHeight;
				const scrollPosition = window.scrollY;
				const pageHeight = document.body.offsetHeight;
				if ((viewportHeight + scrollPosition + 70) >= (pageHeight)) return this.showTriangleBottom();
				if (scrollPosition == 0) return this.showTriangleTop();
				this.hideTriangles();	
			});
		});
	};

	showTriangleTop() {
		this.closeTriangle.top.element.setDirection(1);
		this.closeTriangle.top.element.play();
	}

	showTriangleBottom() {
		this.closeTriangle.bottom.element.setDirection(1);
		this.closeTriangle.bottom.element.play();
	}

	hideTriangles() {
		this.closeTriangle.top.element.setDirection(-1);
		this.closeTriangle.bottom.element.setDirection(-1);
		this.closeTriangle.top.element.play();
		this.closeTriangle.bottom.element.play();
	}

	createCloseTriangle() {
		this.closeTriangle.color = document.querySelector('.close-triangle__top').dataset.color;
		this.closeTriangle.top.element = lottieWeb.loadAnimation({
			container: this.elements.closeTriangle.top,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: `/media/lotties/close-triangle-${ this.closeTriangle.color || 'orange' }.json`
		});
		this.closeTriangle.top.element.setSpeed(1.5);
		this.closeTriangle.bottom.element = lottieWeb.loadAnimation({
			container: this.elements.closeTriangle.bottom,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: `/media/lotties/close-triangle-${ this.closeTriangle.color || 'orange' }.json`
		});
		this.closeTriangle.bottom.element.setSpeed(1.5);
	};

  addEventListener() {
    this.elements.logo
    const links = gsap.utils.toArray(this.elements.links);
    links.forEach((link) => {
      link.addEventListener('click', () => {
        this.toggleStatus();
      });
    })
    if (window.location.pathname === '/components/preview/home' || window.location.pathname === '/') {
      this.elements.logo.addEventListener('click', (event) => this.scrollToTop(event));
    }
  }
  
  scrollToTop(event) {
    event.preventDefault();
    gsap.to(window, { scrollTo: '#home', duration: 1, ease: 'power2' });
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
		gsap.fromTo(this.elements.panel, 
			{ top: '-100vh' },
			{ top: '50px', duration: 1 }
		);
		this.showLinks();
	};

	hidePanel() {
		gsap.fromTo(this.elements.panel, 
			{ top: '50px' },
			{ top: '-100vh', duration: 1 },
		);
		this.hideLinks();
	};

	showLinks() {
		gsap.fromTo(this.elements.links, 
			{ opacity: 0 }, 
			{ opacity: 1, duration: 0.5, delay: 0.75, stagger: { from: 'start', amount: 0.5 } }
		);
	};

	hideLinks() {
		gsap.fromTo(this.elements.links, 
			{ opacity: 1 }, 
			{ opacity: 0, duration: 0.5, stagger: { from: 'end', amount: 0.5 } }
		);
	};

};

export default NavigationMobile;