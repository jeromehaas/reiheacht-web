class ContactForm {

	constructor() {
		this.name = 'contact-form';
		this.elements = {
			button: document.querySelector('.contact-form__submit-button'),
			errorLabel: document.querySelector('.submit-button__error-label')
		};
		this.inputs = {
			name: {
				name: 'name',
				node: document.querySelector('.contact-form__input--name'),
				isRequired: true,
				validationSchema: '^.{2,50}$',
			},
			email: {
				name: 'email',
				node: document.querySelector('.contact-form__input--email'),
				isRequired: true,
				validationSchema: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}',
			},
			phone: {
				name: 'phone',
				node: document.querySelector('.contact-form__input--phone'),
				isRequired: false,
			},
			message: {
				name: 'message',
				node: document.querySelector('.contact-form__input--message'),
				isRequired: true,
				validationSchema: '^.{2,500}$',
			}
		};
		this.errors = [];
		this.init();
	};

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.addEventListener();
	};

	addEventListener() {
		this.elements.button.addEventListener('click', () => {
			event.preventDefault();
			this.validateInputs();
		});
	};

	showErrorLabel() {
		this.elements.errorLabel.classList.add('submit-button__error-label--visible');
	}

	hideErrorLabel() {
		this.elements.errorLabel.classList.remove('submit-button__error-label--visible');
	}

	send() {
		console.log('send');
	}

	validateInputs = () => {
		this.errors = [];
		for (const input in this.inputs) {
			if (!this.inputs[input].isRequired) continue;
			const name = this.inputs[input].name;
			const value = this.inputs[input].node.value;
			const validationSchema = this.inputs[input].validationSchema;
			const regex = new RegExp(validationSchema);
			const res = regex.test(value);
			if (res === false) { 
				this.errors.push(name);
				this.showErrorLabel();
				break;	
			};	
		}
		console.log(this.errors);
		if (this.errors.length === 0) {
			this.hideErrorLabel();
			this.send();	
		}
	}

}

export default ContactForm;