import lottieWeb from 'lottie-web';

class Contact {

  constructor() {
    this.name = 'contact';
    this.elements = {
      observerLeft: document.querySelector('.contact__observer--left'),
      observerUp: document.querySelector('.contact__observer--up')
    };
    this.observer = {
			left: {
				element: null,
				container: this.elements.observerLeft
			},
			up: {
				element: null,
				container: this.elements.observerUp
			}
    }
    this.init();
  }

  init() {
    if (!document.querySelector(`.js-${this.name}`)) return;
    this.createObserver();
  }

  createObserver() {
    this.observer.left.element = lottieWeb.loadAnimation({
      container: this.elements.observerLeft,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/media/lotties/observer-left.json'
    });
    this.observer.up.element = lottieWeb.loadAnimation({
      container: this.elements.observerUp,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/media/lotties/observer-up.json'
    });
  };

};

export default Contact;