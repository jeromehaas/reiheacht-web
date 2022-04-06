import Swiper from 'swiper/bundle';

class ReferenceSlider {

	constructor() {
		this.init();
	}

	init() {
		var swiper = new Swiper(".mySwiper", {
			slidesPerView: 1,
			spaceBetween: 30,
			speed: 1250,
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