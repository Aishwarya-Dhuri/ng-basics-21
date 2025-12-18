import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss',
})
export class ReactiveForm {
    userForm :FormGroup= new FormGroup({
      name : new FormControl('',[Validators.required,Validators.minLength(5)]),
      username : new FormControl('',Validators.required),
      email : new FormControl(''),
      password : new FormControl(''),
      
    });
}
