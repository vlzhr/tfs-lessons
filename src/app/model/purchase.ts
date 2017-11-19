export interface Purchase {
  title: string;
  price: number;
  date: any;
  comment?: string;
  jasmineMatches?: any;
}

export interface PurchasePreviewComponent {
  title: string;
  price: number;
  date: any;
  comment?: string;
  jasmineMatches?: any;
  isOpen?: boolean;
  previewClick?: any;
}
