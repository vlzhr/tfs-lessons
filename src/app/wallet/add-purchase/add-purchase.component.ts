import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Purchase} from '../../model/purchase';

@Component({
  selector: 'tfs-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {
  form: FormGroup;
  @Output() addPurchase = new EventEmitter<Purchase>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      price: ['', [Validators.required, Validators.pattern(/^[0-9.]*$/), Validators.min(10), Validators.max(1000000)]],
      date: [''],
      comment: ['']
    });
  }

  onSubmit() {
    const price = parseFloat(this.form.value.price);
    const date = '11.10.2017';

    if (isNaN(price)) {
      return;
    }

    const purchase: Purchase = {
      title: this.form.value.title,
      price: price,
      date: date
    };

    this.addPurchase.emit(purchase);
  }
}
