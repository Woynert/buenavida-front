import { Component, OnInit } from '@angular/core';

import { CaptchaService } from '@service/captcha.service';

@Component({
  selector: 'app-view-signin',
  templateUrl: './view-signin.component.html',
  styleUrls: ['./view-signin.component.css']
})
export class ViewSigninComponent implements OnInit {

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
    let name = document.getElementById("name") as HTMLInputElement;
    let text_name:string = "";
    if (name != null){
      text_name = name.value;
    }
    let lastname = document.getElementById("lastname") as HTMLInputElement;
    let text_lastname:string = "";
    if (lastname != null){
      text_lastname = lastname.value;
    }
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
    let confirm_psw = document.getElementById("confirm_psw") as HTMLInputElement;
    let text_confirm_psw:string = "";
    if (confirm_psw != null){
      text_confirm_psw = confirm_psw.value;
    }
    let conditional = true;
    let regex_email = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let regex_password = new RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}')
    let pass = document.getElementById("pass_validation");
    if (pass != null) {
      pass.innerHTML = "";
    }
    let captcha = this.captchaService.validateCaptcha();

    if (captcha == true) {
        if (text_name === '') {
            let error = document.getElementById("error_name");
            if (error!= null) {
              error.innerHTML = "Please enter your name";
              error.style.display = "block";
            }
            conditional = false;
        }
        if (text_lastname === '') {
            let error = document.getElementById("error_lastname");
            if (error!= null) {
              error.innerHTML = "Please enter your last name";
              error.style.display = "block";
            }
            conditional = false;
        }
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
        if (text_confirm_psw === '') {
            let error = document.getElementById("error_confirm_psw");
            if (error!= null) {
              error.innerHTML = "Please confirm your password";
              error.style.display = "block";
            }
            conditional = false;
        }  else if (text_psw != text_confirm_psw) {
            let error = document.getElementById("error_confirm_psw");
            if (error!= null) {
              error.innerHTML = "Password fields are different";
              error.style.display = "block";
            }
            conditional = false;
        }
        if(conditional == true){
            let pass = document.getElementById("pass_validation");
            if (pass != null) {
              pass.innerHTML = "Registered";
              pass.style.display = "block";
            }
            let message_pass = document.getElementById("mesage_pws");
            if (message_pass!= null) {
              message_pass.style.display = "none";
            }
        }
    }


  }

}
