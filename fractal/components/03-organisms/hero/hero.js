import { gsap } from 'gsap';
import { ScrollPlugin } from 'gsap/ScrollToPlugin';
import Vimeo from '@vimeo/player';
import Cookies from 'js-cookie';
import moment from 'moment';
import lottieWeb from 'lottie-web';

class Hero {

	constructor() {
		this.name = 'hero';
		this.elements = {
      heading: document.querySelector('.hero h1'),
      line: document.querySelector('.hero__line'),
      teaser: document.querySelector('.hero__teaser'),
      slogan: document.querySelector('.hero__slogan'),
      scroller: document.querySelector('.hero__scroller'),
			blocker: document.querySelector('.hero__blocker'),
      section: document.querySelector('.hero__inner'),
			introAnimation: document.querySelector('.hero__intro-animation'),
			introAnimationLottie: document.querySelector('.hero .intro-animation__lottie'),
			buttons: {
        all: document.querySelectorAll('.hero .button'),
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
		};
		this.introAnimation = {
			element: null,
			container: this.elements.introAnimation
		};
    this.timelines = {
      long: null,
      short: null, 
			blocker: null,
			introAnimation: null
    };
		this.init()
	};
	
	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.removeBlocker();
		this.setupPlayer();
		this.addEventListener();
    this.checkAnimationCookie();
	};

	createIntroAnimation() {
		gsap.to(this.elements.introAnimation, { display: 'grid' })
		this.introAnimation.element = lottieWeb.loadAnimation({
			container: this.elements.introAnimationLottie,
			renderer: 'svg',
			loop: false,
			speed: 0.1,
			autoplay: true,
			path: '/media/lotties/introducer.json',
		});
		this.introAnimation.element.setSpeed(1);
		this.introAnimation.element.addEventListener('complete',() => {
			this.removeIntroAnimation();
			this.playLongAnimation();
		}); 
	};

	removeIntroAnimation = () => {
		this.timelines.introAnimation = gsap.timeline({ ease: 'expo' });
		this.timelines.introAnimation.to(this.elements.introAnimation, { autoAlpha: 0, duration: 0.5 }, '+=1')
		this.timelines.introAnimation.to(this.elements.introAnimation, { display: 'none', duration: 0 })
	}
	
	setupPlayer() {
		this.elements.showreel.player = new Vimeo(document.querySelector('.video__player'))
	};

	addEventListener() {
		this.elements.buttons.projects.addEventListener('click', (event) => this.scrollTo('#projekte', event));
		this.elements.buttons.contact.addEventListener('click', (event) => this.scrollTo('#kontakt', event));
		this.elements.buttons.showreel.addEventListener('click', (event) => this.showShowreel());
		this.elements.showreel.icon.addEventListener('click', (event) => this.hideShowreel());
	};

	scrollTo(target, event) {
		event.preventDefault();
		gsap.to(window, { scrollTo: target, duration: 1.3, ease: 'Power4.easeInOut' })
	};

	showShowreel() {
		this.elements.showreel.container.classList.add('showreel--active')
		this.elements.showreel.player.play();
	};
	
	hideShowreel() {
		this.elements.showreel.container.classList.remove('showreel--active')
		this.elements.showreel.player.pause();
	};

  playLongAnimation() {
    this.timelines.long = gsap.timeline({ ease: 'expo' });
    this.timelines.long.to( this.elements.section, { autoAlpha: 1, duration: 1 } );
    this.timelines.long.from( this.elements.heading, { autoAlpha: 0, y: -30, duration: 1 } );
    this.timelines.long.from( this.elements.line, { width: 0, duration: 0.5 } );
    this.timelines.long.from( this.elements.teaser, { autoAlpha: 0, y: 30, duration: 1 } );
    this.timelines.long.from( this.elements.slogan, { autoAlpha: 0, y: 30, duration: 1 },  "-=1" );
    this.timelines.long.from( this.elements.buttons.all, { autoAlpha: 0, y: 30, duration: 0.5, stagger: 0.3 } );
    this.timelines.long.from( this.elements.scroller, { autoAlpha: 0, duration: 0.5 } );
  }

  playShortAnimation() {
    this.timelines.short = gsap.timeline({ ease: 'expo' });
    this.timelines.short.to( this.elements.section, { autoAlpha: 1, y: 30, duration: 1.5 });
  }

	setCookie() {
    const today = moment().format();
    Cookies.set('last-hero-animation-render', today, { expires: 1 });
	}


  checkAnimationCookie() {
    const animationCookie = Cookies.get('last-hero-animation-render');
    if (!animationCookie) {
			this.setCookie();
			this.createIntroAnimation();
    } else {
      this.playShortAnimation();
    };
  };

	removeBlocker() {
		this.timelines.blocker = gsap.timeline({ ease: 'expo' });
		this.timelines.blocker.to(this.elements.blocker, { autoAlpha: 0, duration: 0.5 }, '+=1')
		this.timelines.blocker.to(this.elements.blocker, { display: 'none', duration: 0 })
	}

};

export default Hero;