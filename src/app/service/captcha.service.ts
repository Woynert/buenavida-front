import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  public captcha: Array<any>;

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

    let theCaptcha = this.captcha.join("");

    let activeCaptcha = document.getElementById("captcha") as HTMLDivElement; 
  
    if (activeCaptcha != null) {
      activeCaptcha.innerHTML = theCaptcha;
    }
  }

  //Check captcha content
  validateCaptcha(): boolean {
    let errCaptcha = document.getElementById("errCaptcha");
    let reCaptcha = document.getElementById("reCaptcha") as HTMLInputElement;
    let recaptcha = reCaptcha.value;
    let validateCaptcha = 0;
    if (errCaptcha != null){
      errCaptcha.innerHTML = "";
      for (var z = 0; z < 6; z++) {
          if (recaptcha.charAt(z) != this.captcha[z]) {
              validateCaptcha++;
          }
      }
      if (recaptcha == "") {
          errCaptcha.innerHTML = "Debe completar el Captcha";
          return false;
      } else if (validateCaptcha > 0 || recaptcha.length > 6) {
          errCaptcha.innerHTML = "Captcha Incorrecto";
          return false;
      } else {
          return true;
      }
    }
    return false;
  }
}
