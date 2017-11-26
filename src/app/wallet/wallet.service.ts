import {Injectable} from '@angular/core';
import {Purchase} from '../model/purchase';
import {CalcedPurchases} from '../model/calced-purchases';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class WalletService {
  private purchases: Purchase[] = [];
  private isInited = false;
  isEditPurchaseOpen = false;
  iseChanged: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  setEdit(open: boolean) {
    this.isEditPurchaseOpen = open;
    this.iseChanged.next(open);
  }
  getEdit() {
    return this.isEditPurchaseOpen;
  }
  addPurchase(newPurchase: Purchase) {
    this.purchases.unshift(newPurchase);
  }

  deletePurchase(index: number) {
    this.purchases.splice(index, 1);
  }

  getPurchases(): CalcedPurchases {
    if (!this.isInited) {
      this.isInited = true;
      this.purchases = this.getData();
    }

    return {
      purchases: this.purchases,
      total: this.getTotal(this.purchases)
    };
  }

  private getData(): Purchase[] {
    return [
      {
        title: 'Проезд на метро',
        price: 1700,
        date: '2017-10-03'
      },
      {
        title: 'IPhone X 256gb',
        price: 91990,
        date: '2017-10-03'
      },
      {
        title: 'Лапша "Доширак"',
        price: 40,
        date: '2017-10-03'
      }
    ];
  }

  getTotal(purchases: Purchase[]): number {
    return purchases.reduce((total, {price}) => total += price, 0);
  }
}
