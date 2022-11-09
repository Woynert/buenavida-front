import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CaptchaService } from '@service/captcha.service';
import { SessionService } from '@service/session.service';

@Component({
	selector: 'app-view-signin',
	templateUrl: './view-signin.component.html',
	styleUrls: ['./view-signin.component.css']
})
export class ViewSigninComponent implements OnInit {

	public reCaptcha      :string = "";
	public captcha        :string = "";
	public error_captcha  :string = "";
	public error_name     :string = "";
	public name           :string = "";
	public error_lastname :string = "";
	public lastname       :string = "";
	public error_email    :string = "";
	public email          :string = "";
	public error_password :string = "";
	public password       :string = "";
	public error_password_again :string = "";
	public password_again :string = "";
	public pass_msg       :string = "";
	public mesage_pws     :string = "Debe tener un mínimo de 8 caracteres, al menos un número, un carácter especial, una letra mayúscula y una letra minúscula";
	public message        :string = "";
	public signin         :boolean = false;

	constructor(
		private captchaService: CaptchaService,
		private sessionService: SessionService,
		private router: Router
	) { 
		const checkDiv = setInterval(() => {
			this.captchaService.createCaptcha();
			this.captcha = this.captchaService.captcha.join("");
			clearInterval(checkDiv);
		}, 500);
	}

	ngOnInit(): void {

	}

	//Validate Form
	access() {
		this.error_captcha = "";
		this.error_name = "";
		this.error_lastname = "";
		this.error_email = "";
		this.error_password = "";
		this.error_password_again = "";
		this.pass_msg = "";

		let conditional = true;
		let regex_email = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
		let regex_password = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
		this.pass_msg = "";

		let captcha = this.captchaService.validateCaptcha(this.reCaptcha);

		// validate fields

		if (captcha == false) {
			this.error_captcha = this.captchaService.message_error;
			return;
		}

		if (this.name === '') {
			this.error_name = "Por favor ingrese el nombre";
			return;
		}

		if (this.lastname === '') {
			this.error_lastname = "Por favor ingrese el apellido";
			return;
		}

		if (this.email === '') {
			this.error_email = "Por favor ingrese un correo";
			return;
		}

		else if (regex_email.test(this.email) == false){
			this.error_email = "Por favor ingrese un correo valido";
			return;
		}

		if (this.password === '') {
			this.error_password = "Por favor ingrese una contraseña";
			return;
		}

		else if (regex_password.test(this.password) == false){
			this.error_password = "Debe tener un mínimo de 8 caracteres, al menos un número, un carácter especial, una letra mayúscula y una letra minúscula";
			return;
		}

		if (this.password_again === '') {
			this.error_password_again = "Por favor confirme la contraseña";
			return;
		}

		else if (this.password != this.password_again) {
			this.error_password_again = "Las contraseñas son diferentes";
			return;
		}

		// make request

		let form = {
			"firstname"      : this.name,
			"lastname"       : this.lastname,
			"email"          : this.email,
			"password"       : this.password,
			"passwordconfirm": this.password_again
		};

		this.sessionService.signIn(form).subscribe({
			next: data => {
				this.message = data.message;
				this.signin = true;
			},
			error: error => {
				this.message = error.error.message;
				this.signin = false;
			}
		});

		const checkMessagePost = setInterval(() => {
			if (this.message != ""){
				this.pass_msg = this.message;
				this.mesage_pws = "";
				clearInterval(checkMessagePost);

				if (this.signin) {
					this.pass_msg += " in 5 seconds you will be redirected to LogIn Page";
					setTimeout(() => { this.router.navigate(['/login']); }, 5000);
				}

			}
		}, 500);

	}

}
