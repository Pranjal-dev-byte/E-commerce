import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  person = {
    password: '',
    email: '',
  };
  constructor(private loginRegister: LoginRegisterService) {}

  ngOnInit(): void {}
  onSubmit(form: any) {
    this.loginRegister.loginUser(form.value).subscribe(
      (res: any) => {
        console.log(res);
        // localStorage.removeItem('token');
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
      },
      (err) => {
        console.log(err);
      }
    );
    // console.log(person);
  }
}
