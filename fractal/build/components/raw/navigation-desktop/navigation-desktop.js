import lottieWeb from 'lottie-web';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
    this.links = {
      active: null,
      all: document.querySelectorAll('.navigation-desktop__link'),
      home: document.querySelector('.navigation-desktop [data-section="home"]'),
    };
    this.sections = document.querySelectorAll('.section--linked');
    this.anchorTargets = document.querySelectorAll('.anchor-target');
		this.init();
	}

	init() {
    if (!document.querySelector(`.js-${this.name}`)) return;
    gsap.to(window, { scrollTo: window.location.hash || '#home' || '#', ease: 'none', duration: 0 });
    if (window.location.pathname === '/components/preview/home' || window.location.pathname === '/') {
      this.setupScrollTrigger();
      this.setupLinkObserver();
    }
    this.createLogo();	
    this.addEventListener();
	};

  addEventListener() {
    if (window.location.pathname === '/components/preview/home' || window.location.pathname === '/') {
      this.elements.logo.addEventListener('click', (event) => this.scrollToTop(event));
    }
  }
  
  scrollToTop(event) {
    event.preventDefault();
    gsap.to(window, { scrollTo: '#home', duration: 1, ease: 'power2' });
  }

  setupScrollTrigger() {
    const links = gsap.utils.toArray(this.links.all);
    links.forEach((link) => {
      if (link.hash) {
        link.addEventListener('click', (event) => this.scrollToSection(link.hash, event));
      };
    });
  };

  scrollToSection(hash, event) {
    event.preventDefault();
    gsap.to(window, { scrollTo: hash, duration: 1, ease: 'power2' });
  };

  removeActiveLink() {
    const links = gsap.utils.toArray(this.links.all);
    links.forEach((link) => link.classList.remove('navigation-desktop__link--active')); 
  };

  setActiveLink(link) {
    link.classList.add('navigation-desktop__link--active') 
  };

  updateActiveLink(link) {
    this.removeActiveLink();
    link.classList.add('navigation-desktop__link--active')
  };

  setupLinkObserver() {
    const sections = gsap.utils.toArray(this.sections);
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section, 
        start: "top 50%",
        end: "top 50%",
        markers: false,
        onEnter: () => {
          this.removeActiveLink();
          this.setActiveLink(this.links.all[i]);
        },
        onEnterBack: () => {
          this.removeActiveLink();
          this.setActiveLink(this.links.all[i - 1]);
        }
      });
    });
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

};

export default NavigationDesktop;