import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Purchase} from '../../model/purchase';
import {AddPurchaseService} from '../add-purchase/add-purchase.service';
import {WalletService} from '../wallet.service';


@Component({
  selector: 'tfs-purchase-preview',
  templateUrl: './purchase-preview.component.html',
  styleUrls: ['./purchase-preview.component.css'],
  providers: [WalletService]
})
export class PurchasePreviewComponent implements OnInit, OnChanges {
  @Input() purchase: Purchase;
  @Input() isOpen: boolean;
  @Input() service = new AddPurchaseService();
  @Output() previewClick = new EventEmitter();
  @Output() previewDelete = new EventEmitter();
  @Output() edit = new EventEmitter<Purchase>();
  @Output() form;
  isEdit = false;

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
  }

  ngOnChanges(foo) {

  }

  onClick() {
    this.previewClick.emit();
  }

  cancel() {
    this.isEdit = false;
  }

  onDeleteClick(event: MouseEvent) {
    event.stopPropagation();

    this.previewDelete.emit();
  }

  onEditPurchase(val: Purchase) {
    this.isEdit = true;
    // console.log(this.walletService.getEdit());
    this.walletService.isEditPurchaseOpen = true; // setEdit(true);
    // console.log(this.walletService.getEdit());
  }

  toggleEdit() {
  }
}
