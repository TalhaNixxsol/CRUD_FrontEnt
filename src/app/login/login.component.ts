import { JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GetapiService } from '../services/getapi.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  bodydata: any = ''
  loginform!: FormGroup

  constructor(private fb: FormBuilder,
    private router: Router,
    private service: GetapiService) { }
  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`-]).{8,}$/)]]
    })
  }
  get formData() {
    return this.loginform.controls
  }
  login(data: any) {
    this.bodydata = {
      email: data.email,
      password: data.password
    }
    console.log(this.bodydata)
    return this.service.login(this.bodydata)
  }
};