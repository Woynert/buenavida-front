import { Component, OnInit } from '@angular/core';

import { CaptchaService } from '@service/captcha.service';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.css']
})
export class ViewLoginComponent implements OnInit {


  constructor(private captchaService: CaptchaService) { 
    const checkDiv = setInterval(() => {
      this.captchaService.createCaptcha();
      let activeCaptcha = document.getElementById("captcha") as HTMLDivElement; 
      if (activeCaptcha != null) {
        clearInterval(checkDiv);
      }
    }, 500);
  }

  ngOnInit(): void {
  }

  //Validate Form
  access() {
    let mesages_hide = Array.from(document.getElementsByClassName("mesage_error") as HTMLCollectionOf<HTMLElement>); 
    mesages_hide.forEach((element) => {
      if (element != null){
        element.innerHTML = "";
      }
    });

    let email = document.getElementById("email") as HTMLInputElement;
    let text_email:string = "";
    if (email != null){
      text_email = email.value;
    }
    let psw = document.getElementById("psw") as HTMLInputElement;
    let text_psw:string = "";
    if (psw != null){
      text_psw = psw.value;
    }
    let conditional = true;
    let regex_email = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let regex_password = new RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}')
    let captcha = this.captchaService.validateCaptcha();
    let pass = document.getElementById("pass_validation");
    if (pass != null) {
      pass.innerHTML = "";
    }

    if (captcha == true) {
        if (text_email === '') {
            let error = document.getElementById("error_email");
            if (error != null) {
              error.innerHTML = "Please enter your email";
              error.style.display = "block";
            }
            conditional = false;
        } else if (regex_email.test(text_email) == false){
            let error = document.getElementById("error_email");
            if (error!= null) {
              error.innerHTML = "Please enter a valid email";
              error.style.display = "block";
            }
            conditional = false;
        }
        if (text_psw === '') {
            let error = document.getElementById("error_psw");
            if (error!= null) {
              error.innerHTML = "Please enter your password";
              error.style.display = "block";
            }
            conditional = false;
        } else if (regex_password.test(text_psw) == false){
            let error = document.getElementById("error_psw");
            if (error!= null) {
              error.innerHTML = "Must have a minimum of 8 characters, at least one number, one special character, one uppercase letter and one lowercase letter";
              error.style.display = "block";
            }
            conditional = false;
        }
        if(conditional == true){
            let pass = document.getElementById("pass_validation");
            if (pass != null) {
              pass.innerHTML = "Entering";
              pass.style.display = "block";
            }
        }
    } 
  }
}
