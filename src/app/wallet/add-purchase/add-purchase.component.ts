import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Purchase} from '../../model/purchase';
import {AddPurchaseService} from './add-purchase.service';

const digitRegex = /^\d*\.?\d+$/;

@Component({
  selector: 'tfs-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css'],
  providers: [AddPurchaseService]
})
export class AddPurchaseComponent implements OnInit {
  @Output() addPurchase = new EventEmitter<Purchase>();
  // @Input() purchase: Purchase;
  form: FormGroup;
  purchase: Purchase;
  private addPurchaseService: AddPurchaseService;

  constructor(private formBuilder: FormBuilder, addPurchaseService: AddPurchaseService) {
    this.addPurchaseService = addPurchaseService;
    this.purchase = this.addPurchaseService.purchase;
  }

  getErrors(errors: any): string {
    if (errors['required']) {
      return 'поле обязательно для заполнения';
    }

    if (errors['min']) {
      return `минимальное значение ${errors['min']['min']}`;
    }

    if (errors['max']) {
      return `максимальное значение ${errors['max']['max']}`;
    }

    if (errors['minlength']) {
      return `минимальная длина — ${errors['minlength']['requiredLength']}`;
    }

    if (errors['maxlength']) {
      return `максимальная длина — ${errors['maxlength']['requiredLength']}`;
    }

    if (errors['pattern'] && errors['pattern']['requiredPattern'] === digitRegex.toString()) {
      return `разрешены лишь цифры`;
    }
  }

  ngOnInit() {
    if (this.purchase === undefined) {
      this.form = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        price: ['', [Validators.required, Validators.min(10), Validators.max(1000000), Validators.pattern(digitRegex)]],
        date: [''],
        comment: ['']
      });
    } else {
      this.form = this.formBuilder.group({
        title: [this.purchase.title, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        price: [this.purchase.price, [Validators.required, Validators.min(10), Validators.max(1000000), Validators.pattern(digitRegex)]],
        date: [this.purchase.date.split('T')[0]],
        comment: [this.purchase.comment]}); }
  }

  onSubmit() {
    const price = parseFloat(this.form.value.price);

    if (!isFinite(price) || this.form.invalid) {
      return;
    }

    const date = this.form.value.date
      ? new Date(this.form.value.date)
      : new Date();

    const purchase: Purchase = {
      title: this.form.value.title,
      price: Math.floor(price * 100) / 100,
      date: date.toISOString()
    };

    if (this.form.value.comment) {
      purchase.comment = this.form.value.comment;
    }

    this.addPurchase.emit(purchase);
  }
}
