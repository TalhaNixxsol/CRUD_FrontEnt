import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetapiService } from '../services/getapi.service';



@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent {
  constructor(private fb: FormBuilder,
      private service: GetapiService) { }
  addproductform!: FormGroup
  obj: any
  productdata: any
  product: any

  selectedFile!: File
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  ngOnInit(): void {
    this.addproductform = this.fb.group({

      name: [''],
      price: [''],
      category: [''],
      image: ['']
    });
  }
  addproduct() {
    this.obj = {
      name: this.addproductform.value.name,
      price: this.addproductform.value.price,
      category: this.addproductform.value.category,
      image: this.selectedFile
    };
    console.log(this.obj);
    const formData = new FormData();

    formData.append('name', this.addproductform.get('name')?.value);
    formData.append('price', this.addproductform.get('price')?.value);
    formData.append('category', this.addproductform.get('category')?.value);
    formData.append('product', this.selectedFile
    )
    this.service.addproduct(formData)
  }
}
