import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';

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
  errorMsg = '';
  constructor(
    private loginRegister: LoginRegisterService,
    public router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit(form: any) {
    this.loginRegister.loginUser(form.value).subscribe(
      (res: any) => {
        this.errorMsg = '';
        // localStorage.removeItem('token');
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
        // window.location.reload();
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });

        // this.getLoggedInName.next('fullName');
      },
      (err) => {
        this.errorMsg = 'Invalid Credentials';
      }
    );
    // console.log(person);
  }
}
