import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { email, Field, form, required } from '@angular/forms/signals';

@Component({
  selector: 'app-signal-form',
  imports: [Field,JsonPipe],
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.scss',
})
export class SignalForm {

  loginModel = signal({email: '', password: ''});

  //loginForm = form(this.loginModel);

  loginForm = form(this.loginModel,(schema) =>{
    required(schema.email,{message: 'Email is required'});
    email(schema.email,{message: 'Invalid email format'});
    required(schema.password,{message: 'Password is required'}  );

  });

  onSubmit() {
    console.log(this.loginForm().value);
  }
}
