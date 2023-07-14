import { HttpClient, HttpClientModule, JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GetapiService } from '../services/getapi.service';
HttpClientModule
HttpClient


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  bodydata: any = ''
  signupform!: FormGroup

  constructor(private fb: FormBuilder,
    private router: Router,
    private service: GetapiService) { }
  ngOnInit(): void {
    this.signupform = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-z][A-Za-z]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-z][A-Za-z]+$/)]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`-]).{8,}$/)]]
    })
  }
  get formData() {
    return this.signupform.controls
  }
  signup(data: any) {
    this.bodydata = {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password
    }
    console.log(this.bodydata)
    return this.service.signup(this.bodydata).subscribe((result:any)=>{
      console.log(result.message);
        this.router.navigate(['login'])
    })
  }
};