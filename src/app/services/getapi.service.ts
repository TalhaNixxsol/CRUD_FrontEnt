import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetapiService {
//  envVariable = 'http://localhost:3000';
envVariable= 'https://real-jay-girdle.cyclic.app/'
  isloggedin = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(data: any) {
    this.http.post(this.envVariable + '/login', data, { observe: 'response' })
      .subscribe((result: any) => {
        console.log(result);
        if (result.status == 200) {
          console.log(result);
          window.localStorage.setItem('username', result.body.username);
          window.localStorage.setItem('token', result.body.token);
          window.localStorage.setItem('email', result.body.email);
          this.isloggedin.next(true);
          this.router.navigate(['dashboard']);
        } else {
          alert('Invalid User...');
        }
      });
  }

  signup(data: any) {
    return this.http.post(this.envVariable + '/signup', data);
  }

  addproduct(data: any) {
    console.log(data);
    localStorage.setItem('data', JSON.stringify(data.body));
    const token = window.localStorage.getItem('token' || '{}');
    let header = new HttpHeaders();
    if (token !== null) {
      header = header.set('authorization', token);
    }
    this.http.post(this.envVariable + '/addproduct', data, { headers: header })
      .subscribe((result: any) => {
        return this.router.navigate(['dashboard']);
      });
  }

  getproduct() {
    return this.http.get(this.envVariable + '/getproduct');
  }

  delete(data: any) {
    const options = {
      params: data,
    };
    this.http.delete(this.envVariable + '/delete', options)
      .subscribe((res: any) => {
        if (res) {
          this.router.navigate(['dashboard']);
          window.location.reload();
        }
      });
  }

  update(formData: any, options: any) {
    return this.http.put<any>(this.envVariable + '/update', formData, options);
  }
}
