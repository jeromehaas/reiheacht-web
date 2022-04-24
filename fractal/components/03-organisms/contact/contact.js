import lottieWeb from 'lottie-web';

class Contact {

  constructor() {
    this.name = 'contact';
    this.elements = {
      observer: document.querySelector('.contact__observer')
    };
    this.observer = {
      element: null,
      container: this.elements.observer
    }
    this.init();
  }

  init() {
    if (!document.querySelector(`.js-${this.name}`)) return;
    console.log('hello');
    this.createObserver();
  }

  createObserver() {
    this.observer.element = lottieWeb.loadAnimation({
      container: this.elements.observer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/media/lotties/observer.json'
    });
  };

};

export default Contact;