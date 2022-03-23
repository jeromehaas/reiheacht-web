class Heading {

	constructor() {
		this.name = 'heading';
		this.headings = document.querySelectorAll('.heading');
		this.init();
	}

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.headings.forEach((heading) => {
			const highlight = JSON.parse(heading.getAttribute('data-highlight'));
			let text = heading.innerText;
			highlight && highlight.forEach((word) => {
				text = text.replace(word, `<span class="heading--highlight">${word}</span>`);
			}); 
			heading.innerHTML = text;
		})

	}

}

export default Heading;