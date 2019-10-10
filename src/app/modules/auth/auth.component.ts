import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  loginForm: FormGroup;
  loginFormErrors = {
    login: '',
    password: '',
  };

  formErrors = {
    login: '',
    password: '',
  };

  validationMessages = {
    login: {
      required: 'Le login est obligatoire.'
    },
    password: {
      required: 'Le mot de passe est obligatoire.'
    },
  };

  constructor(private _apisService: SessionService) { }

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),

    });
    this.loginForm.valueChanges.subscribe(data =>
      this.onValueChanged(data)
    );
    this.onValueChanged();
  }


  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        } 
      }
    }
  }

  onLogin(formvalue){
    let flag = false;
    if (formvalue.login == '') {
      this.formErrors['login'] = this.validationMessages['login'].required;
      flag = true;
    }
    if (formvalue.pass == '') {
      this.formErrors['password'] = this.validationMessages['password'].required;
      flag = true;
    }
    if (flag) {
      return;
    }else{
      formvalue.admin = true;
      formvalue.customer = false;
      return this._apisService.postOauth(formvalue).subscribe(
        (res)=>{
          // console.log('success');
          alert('Client enregistré avec succés !');
        },
        err=>{
          console.log(" Error..");
        });
    }
  }

}
