import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginObj:LoginModel = new LoginModel();
  router = inject(Router);
  http = inject(HttpClient);

    onLogin(){
        //Hard Coded Login Code
        // if(this.loginObj.emailId == 'admin@gmail.com' && this.loginObj.password =='admin123'){
        //     this.router.navigateByUrl('/signal');
        // }else{
        //   alert('Invalid Credentials');
        // }

        //Login Using API
        this.http.post('https://api.freeprojectapi.com/api/UserApp/login',this.loginObj).subscribe({
          next:(res:any)=>{
            console.log(res.message);
            localStorage.setItem('loggedInUserId',res.data.userId);
            this.router.navigateByUrl('/signal');

        }, error(err){
          alert("Unathorized error"+err.message);
        }

      });

    }
}
class LoginModel {
    emailId: string = '';
    password: string = '';  

    constructor() { 
      this.emailId = ''; 
      this.password = ''; 
    }

}