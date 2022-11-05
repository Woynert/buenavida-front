import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.css']
})
export class ViewLoginComponent implements OnInit {

  public captcha: Array<any>;

  constructor() { 
    this.captcha = [];
    const checkDiv = setInterval(() => {
      this.createCaptcha()
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
    let captcha = this.validateCaptcha();

    if (captcha == true) {
        if (text_email === '') {
            let error = document.getElementById("error_email");
            if (error != null) {
              error.innerHTML = "El campo de email no debe estar vacio";
              error.style.display = "block";
            }
            conditional = false;
        } else if (regex_email.test(text_email) == false){
            let error = document.getElementById("error_email");
            if (error!= null) {
              error.innerHTML = "Debe ser un formato valido para correos";
              error.style.display = "block";
            }
            conditional = false;
        }
        if (text_psw === '') {
            let error = document.getElementById("error_psw");
            if (error!= null) {
              error.innerHTML = "El campo de contraseña no debe estar vacio";
              error.style.display = "block";
            }
            conditional = false;
        } else if (regex_password.test(text_psw) == false){
            let error = document.getElementById("error_psw");
            if (error!= null) {
              error.innerHTML = "Debe tener minimo 8 caracteres, al menos un numero,un caracter especial, una letra mayuscula y una minuscula";
              error.style.display = "block";
            }
            conditional 
        }
        if(conditional == true){
            let pass = document.getElementById("pass_validation");
            if (pass != null) {
              pass.innerHTML = "Ingresando";
              pass.style.display = "block";
            }
        }
    } 
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

  //Validar contenido del captcha
  validateCaptcha() {
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
