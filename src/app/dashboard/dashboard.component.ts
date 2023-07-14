import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GetapiService } from '../services/getapi.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public showaddproduct = false;
//  public imageUrl = 'http://localhost:3000' + '/images/';
  public imageUrl= 'https://real-jay-girdle.cyclic.app/' + '/images/';
  product: any;
  discount: any;
  name: string = '';
  email: string = '';
  public myuser: any = window.localStorage.getItem('username');

  constructor(
    private router: Router,
    private service: GetapiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.getproduct().subscribe((res: any) => {
      console.log('-----------------------', res);
      this.product = res.users;
    });
  }

  addproduct() {
    const email = localStorage.getItem('email');
    if (email) {
      this.service.isloggedin.next(true);
      this.router.navigate(['addproduct']);
    } else {
      alert('You are not logged In...');
    }
  }

  delete(data: any) {
    let bodydata = {
      name: data,
    };
    this.service.delete(bodydata);
  }

  update(data: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((formData: any) => {
      if (formData) {
        console.log(formData, 'this is the form data in dashboard');
        const queryParams = {
          name: data,
        };
        const options = {
          params: queryParams,
        };
        this.service.update(formData, options).subscribe(
          (response: any) => {
            console.log(response);
            window.location.reload();
            alert(response.message)
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });
  }



  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
