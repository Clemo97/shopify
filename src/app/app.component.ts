import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// app.component.ts
export class AppComponent implements OnInit {
  productForm: FormGroup;
  submittedData: any[] = [];
  options: Option[] = [
    { value: 'color', viewValue: 'Color' },
    { value: 'size', viewValue: 'Size' },
    { value: 'material', viewValue: 'Material' },
    { value: 'style', viewValue: 'Style' }
  ];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: 'size',
      quantities: this.fb.array([
        this.newQuantity()
      ])
    });
  }

  ngOnInit() {
  }

  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      qty: '',
    });
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  onInput(index: number) {
    const quantitiesArray = this.quantities();
    if (quantitiesArray && quantitiesArray.length > index) {
      const currentQuantityControl = quantitiesArray.at(index);
      if (currentQuantityControl) {
        const qtyControl = currentQuantityControl.get('qty');
        if (qtyControl) {
          const currentQuantity = qtyControl.value;
          const isLastField = index === quantitiesArray.length - 1;
          if (currentQuantity && isLastField) {
            this.addQuantity();
          }
        }
      }
    }
  }



  onSubmit() {
    console.log(this.productForm.value);
    this.submittedData.push(this.productForm.value);
    this.productForm.reset();
  }

}

export interface Option {
  value: string;
  viewValue: string;
}

