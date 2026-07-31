export interface Friend {
  id: string;
  name: string;
  avatarColor: string;
}

export interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  assignedFriendIds: string[];
}

export interface BillSettings {
  serviceChargePercent: number;
  vatPercent: number;
  billDiscountAmount: number; // ส่วนลดคูปอง/ร้านค้า (คิดก่อน VAT & Service Charge)
  discountAmount: number;     // สปอนเซอร์/คนเลี้ยงช่วยจ่าย (คิดหลัง VAT & Service Charge)
  tipAmount: number;
  promptPayId: string;
}

export type Language = 'th' | 'en';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface PersonItemShare {
  itemId: string;
  itemName: string;
  unitPrice: number;
  quantity: number;
  totalItemPrice: number;
  splitCount: number;
  personShare: number;
}

export interface PersonSummary {
  friendId: string;
  friendName: string;
  avatarColor: string;
  items: PersonItemShare[];
  itemSubtotal: number;
  netItemSubtotal: number;
  storeDiscountShare: number;
  serviceChargeShare: number;
  vatShare: number;
  discountShare: number;
  tipShare: number;
  finalTotal: number;
  isPaid?: boolean;
}

export interface CalculationResult {
  personSummaries: PersonSummary[];
  itemsSubtotal: number;
  totalStoreDiscount: number;
  netItemsSubtotal: number;
  totalServiceCharge: number;
  totalVat: number;
  totalDiscount: number;
  totalTip: number;
  grandTotal: number;
  unassignedItemIds: string[];
  isFullyAssigned: boolean;
}
