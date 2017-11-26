import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';
import {WalletService} from './wallet.service';
import {Wallet} from '../model/wallet';
import {WalletHttpService} from './wallet-http.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'tfs-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  providers: [WalletService]
})
export class WalletComponent implements OnInit {
  @Input() wallet: Wallet;

  purchases: Purchase[] = [];
  total = 0;
  isAddPurchaseOpen = false;
  isEditPurchaseOpen = false;

  private currentOpen: number;

  constructor(private walletService: WalletService,
              private walletHttpService: WalletHttpService) {
      this.isEditPurchaseOpen = walletService.isEditPurchaseOpen;
      walletService.iseChanged.subscribe((value) => {
        console.log(value);
        this.isEditPurchaseOpen = value;
    });
  }

  get balance(): number {
    return this.wallet.amount - this.total;
  }

  getIsEdit() {
    return this.walletService.getEdit();
  }

  ngOnInit() {

    this.loadPurchases();
  }

  NgOnChanges() {
    console.log('hey');
    this.isEditPurchaseOpen = this.walletService.isEditPurchaseOpen;
    console.log(this.isEditPurchaseOpen);
  }

  onAddPurchase(newPurchase: Purchase) {
    this.walletHttpService.addPurchase(this.wallet.id, newPurchase)
      .subscribe((id) => {
        const resultPurchase = Object.assign({}, newPurchase, {id});

        this.setPurchasesAsync([...this.purchases, resultPurchase]);
        this.toggleAdd();
      });
  }

  toggleAdd() {
    this.isAddPurchaseOpen = !this.isAddPurchaseOpen;
  }

  onPreviewClick(index: number) {
    if (index === this.currentOpen) {
      this.currentOpen = null;
      return;
    }

    this.currentOpen = index;
  }

  onPreviewDelete({id}: Purchase) {
    this.walletHttpService.deletePurchase(this.wallet.id, id)
      .subscribe(() => {
        this.loadPurchases();
      });
  }

  onPurchaseEdit(val) {
    this.walletHttpService.updatePurchase(val);
    this.walletHttpService.getPurchases(this.wallet.id);
  }

  isCurrentOpen(index: number): boolean {
    return this.currentOpen === index;
  }

  private loadPurchases() {
    this.walletHttpService.getPurchases(this.wallet.id)
      .subscribe((purchases) => {
        this.setPurchasesAsync(purchases);
      });
  }

  private setPurchasesAsync(purchases: Purchase[]) {
    this.purchases = purchases.slice(0).reverse();
    this.total = this.walletService.getTotal(this.purchases);
  }
}
