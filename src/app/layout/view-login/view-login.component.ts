import { Component, OnInit } from '@angular/core';

import { CaptchaService } from '@service/captcha.service';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.css']
})
export class ViewLoginComponent implements OnInit {

  public email:string = "";
  public reCaptcha:string = "";
  public password:string = "";
  public error_psw:string = "";
  public error_email:string = "";
  public error_captcha:string = "";
  public pass_msg:string = "";
  public captcha:string = "";

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
    this.error_psw = "";
    this.error_email = "";
    this.error_captcha = "";

    let conditional = true;
    let regex_email = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let regex_password = new RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}')
    let captcha = this.captchaService.validateCaptcha(this.reCaptcha);
    
    this.pass_msg = "";

    if (captcha == true) {
        if (this.email === '') {
            this.error_email  = "Please enter your email";
            conditional = false;
        } else if (regex_email.test(this.email) == false){
            this.error_email = "Please enter a valid email"
            conditional = false;
        }
        if (this.password === '') {
            this.error_psw = "Please enter your password";
            conditional = false;
            console.log(this.error_psw);
        } else if (regex_password.test(this.password) == false){
            this.error_psw = "Must have a minimum of 8 characters, at least one number, one special character, one uppercase letter and one lowercase letter"
            conditional = false;
        }
        if(conditional == true){
          this.pass_msg = "Entering";
        }
    }else{
      this.error_captcha = this.captchaService.message_error;
    }
  }
}
