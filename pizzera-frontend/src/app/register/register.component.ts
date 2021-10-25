import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  person = {
    username: '',
    password: '',
    email: '',
  };
  constructor(private loginRegister: LoginRegisterService) {}

  ngOnInit(): void {}
  onSubmit(form: any) {
    this.loginRegister.registerUser(form.value).subscribe((res) => {
      console.log(res);
    });
    // console.log(form.value);
    // console.log(person);
  }
}
