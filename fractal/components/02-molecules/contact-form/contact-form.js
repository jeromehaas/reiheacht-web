import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';

class ContactForm {

	constructor() {
		this.name = 'contact-form';
		this.elements = {
			button: document.querySelector('.contact-form__submit-button'),
			errorLabel: document.querySelector('.submit-button__error-label'),
			form: document.querySelector('.contact-form '),
			confirmationFlash: {
				success: document.querySelector('.flash__message--success'),
				error: document.querySelector('.flash__message--error'),
			}
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
		this.elements.button.addEventListener('click', (event) => {
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

	send = async () => {
		let res = await emailjs.send("reiheacht","reiheacht",{
			name: this.inputs.name.node.value,
			email: this.inputs.email.node.value,
			phone: this.inputs.phone.node.value,
			message: this.inputs.message.node.value,
			}, process.env.EMAILJS_PUBLICKEY);
		if (res.status === 200) {
			this.showConfirmationFlash('success');
			this.resetForm();
		} else {
			this.showConfirmationFlash('error');
		};
	};

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
			};	
		};
		if (this.errors.length === 0) {
			this.hideErrorLabel();
			this.send();	
		} else {
			console.error('The contactform could not send because the following fields are not valid:')
			console.error(this.errors);
		};
	};

	resetForm = () => {
		for (const input in this.inputs) {
			this.inputs[input].node.value = '';
		};
	};

	showConfirmationFlash = (type) => {
		if ( type === undefined ) return (console.error('Please provide a type to trigger the flash.'))
		gsap.fromTo(this.elements.confirmationFlash[type], 
				{ top: -10, opacity: 0, display: 'block' },
				{ top: 0, opacity: 1 }
			);
		};

};

export default ContactForm;