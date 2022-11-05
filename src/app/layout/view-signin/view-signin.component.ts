import { Component, OnInit } from '@angular/core';

import { CaptchaService } from '@service/captcha.service';

@Component({
	selector: 'app-view-signin',
	templateUrl: './view-signin.component.html',
	styleUrls: ['./view-signin.component.css']
})
export class ViewSigninComponent implements OnInit {

	public reCaptcha:string = "";
	public captcha:string = "";
	public error_captcha:string = "";
	public error_name:string = "";
	public name:string = "";
	public error_lastname:string = "";
	public lastname:string = "";
	public error_email:string = "";
	public email:string = "";
	public error_password:string = "";
	public password:string = "";
	public error_password_again:string = "";
	public password_again:string = "";
	public pass_msg:string = "";
	public mesage_pws:string = "Must have a minimum of 8 characters, at least one number, one special character, one uppercase letter and one lowercase letter";

	constructor(private captchaService: CaptchaService) { 
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

		if (captcha == true) {
			if (this.name === '') {
				this.error_name = "Please enter your name";
				conditional = false;
			}
			if (this.lastname === '') {
				this.error_lastname = "Please enter your last name";
				conditional = false;
			}
			if (this.email === '') {
				this.error_email = "Please enter your email";
				conditional = false;
			} else if (regex_email.test(this.email) == false){
				this.error_email = "Please enter a valid email";
				conditional = false;
			}
			if (this.password === '') {
				this.error_password = "Please enter your password";
				conditional = false;
			} else if (regex_password.test(this.password) == false){
				this.error_password = "Must have a minimum of 8 characters, at least one number, one special character, one uppercase letter and one lowercase letter";
				conditional = false;
			}
			if (this.password_again === '') {
				this.error_password_again = "Please confirm your password";
				conditional = false;
			}  else if (this.password != this.password_again) {
				this.error_password_again = "Password fields are different";
				conditional = false;
			}
			if(conditional == true){
				this.pass_msg = "Registered";
				this.mesage_pws = "";
			}
		}else{
			this.error_captcha = this.captchaService.message_error;
		}


	}

}
