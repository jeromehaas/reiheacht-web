import { gsap } from 'gsap';

class TeamTile {

	constructor() {
		this.elements = {
			tiles: document.querySelectorAll('.team-tile'),
		};
		this.init();
	};

	init() {
		this.addEventListener();
	};

	addEventListener() {
		const tiles = gsap.utils.toArray(this.elements.tiles);
		tiles.forEach((tile) => tile.addEventListener('mouseenter', (event) => this.showSquare(event.target)));
		tiles.forEach((tile) => tile.addEventListener('mouseleave', (event) => this.hideSquare(event.target)));

	};

	showSquare(element) {
		const square = element.querySelector('.team-tile__square');
		gsap.to(square, {
			width: '100%',
			height: '100%',
			rotate: '360',
			translateX: '-50%',
			translateY: '-50%',
			duration: 0.9,
			delay: 0.6,
			ease: 'power2.easeOut'
		});
	};

	hideSquare(element) {
		const square = element.querySelector('.team-tile__square');
		gsap.to(square, {
			width: '0%',
			height: '0%',
			rotate: '0',
			translateX: '-50%',
			translateY: '-50%',
			duration: 0.9,
    	delay: 0.6,
			ease: 'power2.easeOut'
		});
	}

};

export default TeamTile;