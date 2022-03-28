import Swiper from 'swiper/bundle';

class ReferenceSlider {

	constructor() {
		this.init();
		console.log('hello sipwer')
	}

	init() {
		var swiper = new Swiper(".mySwiper", {
			slidesPerView: 1,
			spaceBetween: 30,
			speed: 750,
			loop: true,
			autoplay: {
				delay: 10000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}
}



export default ReferenceSlider;