import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.scss',
})
export class TemplateDrivenForm {
  userObj ={
    "id": 0,
    "name": "",
    "username": "",
    "email": "",
    "password": "",
    "phone": ""
  }
}
