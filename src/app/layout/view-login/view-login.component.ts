import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CaptchaService } from '@service/captcha.service';
import { SessionService } from '@service/session.service';

@Component({
	selector: 'app-view-login',
	templateUrl: './view-login.component.html',
	styleUrls: ['./view-login.component.css']
})
export class ViewLoginComponent implements OnInit {

	public email        :string = "";
	public reCaptcha    :string = "";
	public password     :string = "";
	public error_psw    :string = "";
	public error_email  :string = "";
	public error_captcha:string = "";
	public pass_msg     :string = "";
	public captcha      :string = "";
	public message      :string = "";
	public logIn        :boolean = false;

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
	async access() {

		this.error_psw = "";
		this.error_email = "";
		this.error_captcha = "";

		let regex_email = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
		let captcha = this.captchaService.validateCaptcha(this.reCaptcha);

		this.pass_msg = "";

		// validate fields

		if (captcha == false) {
			this.error_captcha = this.captchaService.message_error;
			return;
		}

		if (this.email === '') {
			this.error_email  = "Please enter your email";
			return;
		}

		else if (regex_email.test(this.email) == false){
			this.error_email = "Please enter a valid email"
			return;
		}

		if (this.password === '') {
			this.error_psw = "Please enter your password";
			return;
		}

		// make request

		const form = {
			"email": this.email,
			"password":this.password
		};

		try{
			const resp = await this.sessionService.logIn(form);
			// logged in -> redirect to home
			this.router.navigate(['/']);
		}
		catch(e){
			if (e instanceof Error) this.pass_msg = e.message;
		}
	}
}
