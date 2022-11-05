import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  public captcha: Array<any>;
  public message_error: string = '';

  constructor() { 
    this.captcha = [];
  }

  //Create captcha content
  createCaptcha() {
    for (let i = 0; i < 6; i++) {
        if (i % 2 == 0) {
          this.captcha[i] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
        } else {
          this.captcha[i] = Math.floor(Math.random() * 10 + 0);
        }
    }
  }

  //Check captcha content
  validateCaptcha(recaptcha:any): boolean {
    let validateCaptcha = 0;
    this.message_error = "";
    for (var z = 0; z < 6; z++) {
        if (recaptcha.charAt(z) != this.captcha[z]) {
            validateCaptcha++;
      }
    }
    if (recaptcha == "") {
        this.message_error = "You must complete the Captcha";
        return false;
    } else if (validateCaptcha > 0 || recaptcha.length > 6) {
        this.message_error = "Incorrect captcha";
        return false;
    } else {
        return true;
    }
  }
}
