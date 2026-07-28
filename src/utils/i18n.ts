import { Language } from '../types';

export const translations = {
  th: {
    appTitle: 'Bill Splitter',
    appSubtitle: 'แอปหารค่าอาหาร',
    language: 'ภาษา',
    reset: 'รีเซ็ตข้อมูล',
    resetConfirm: 'คุณต้องการรีเซ็ตรายการอาหารและเพื่อนทั้งหมดใช่หรือไม่?',
    exportSummary: 'เซฟรูปสรุปบิล',
    exportText: 'คัดลอกข้อความสรุป',
    equalSplit: 'หารเท่ากันทุกคน',

    // Theme & PWA
    theme: 'ธีม',
    light: 'สว่าง',
    dark: 'มืด',
    system: 'ตามระบบ',
    installPWA: 'ติดตั้งแอป',
    pwaPrompt: 'เพิ่มแอปไปยังหน้าจอหลักเพื่อใช้งานง่ายและออฟไลน์',
    
    // Settings
    settingsTitle: 'ตั้งค่าภาษี ส่วนลด และ ทิป',
    serviceCharge: 'SERVICE CHARGE (%)',
    vat: 'VAT (%)',
    discount: 'ส่วนลด / SUBSIDIZE (฿)',
    tip: 'ทิปพนักงาน / ค่าน้ำซุป (฿)',
    baht: 'บาท',
    
    // Friends
    friendsTitle: 'รายชื่อเพื่อนที่หาร',
    addFriend: 'เพิ่มเพื่อน',
    friendNamePlaceholder: 'ชื่อเพื่อน...',
    noFriends: 'ยังไม่มีรายชื่อเพื่อน กรุณาเพิ่มเพื่อนเพื่อเริ่มหาร',
    
    // Items
    itemsTitle: 'รายการอาหารและเครื่องดื่ม',
    addItem: 'เพิ่มอาหาร',
    itemName: 'รายการอาหาร',
    price: 'ราคา (฿)',
    quantity: 'จำนวน',
    subtotal: 'รวมสุทธิ (฿)',
    assignedPeople: 'คนกิน',
    selectAll: 'เลือกทุกคน',
    deselectAll: 'ยกเลิกทั้งหมด',
    noItems: 'ยังไม่มีรายการอาหาร กด "เพิ่มอาหาร" เพื่อเริ่มกรอก',
    matrixView: 'มุมมองตาราง (Desktop)',
    cardView: 'มุมมองการ์ด (Mobile)',
    
    // Validation
    warningTitle: 'ข้อควรระวัง!',
    unassignedWarning: 'มีรายการอาหารที่ยังไม่ได้ติ๊กเลือกคนจ่าย ({count} รายการ)',
    sumMismatchWarning: 'ยอดรวมของแต่ละคนยังไม่เท่ากับยอดสุทธิของบิล กรุณาตรวจสอบคนหาร',
    allAssigned: 'ติ๊กเลือกคนจ่ายครบทุกรายการแล้ว',

    // Summary & Tracking
    summaryTitle: 'สรุปยอดที่ต้องโอนคืนแต่ละคน',
    totalBill: 'ยอดรวมทั้งบิล (สุทธิ):',
    perPersonDetail: 'รายละเอียดการหาร',
    noConsumption: 'ไม่ได้กินรายการใดเลย',
    itemsShare: 'ค่าอาหาร',
    scShare: 'Service Charge',
    vatShare: 'VAT',
    discountShare: 'ส่วนลด',
    tipShare: 'ทิป/อื่นๆ',
    totalOwed: 'ยอดโอนรวม',
    paidTrackerTitle: 'สถานะการโอนเงินคืน',
    paidStatus: 'โอนแล้ว',
    unpaidStatus: 'ยังไม่โอน',
    paidProgress: 'โอนแล้ว {paid}/{total} คน ({percent}%)',
    allPaidCongrats: '🎉 เพื่อนทุกคนโอนเงินครบแล้ว!',

    // PromptPay
    promptPayTitle: 'สร้าง QR Code รับเงิน (PromptPay)',
    promptPaySubtitle: 'กรอกเลขเบอร์โทรศัพท์ (10 หลัก) หรือ เลขบัตรประชาชน (13 หลัก)',
    promptPayPlaceholder: '08XXXXXXXX หรือ เลขบัตรประชาชน 13 หลัก',
    invalidPromptPay: 'กรุณากรอกเบอร์มือถือ 10 หลัก หรือเลขบัตรประชาชน 13 หลักให้ถูกต้อง',
    promptPayNotice: 'เมื่อกรอกครบ 10 หรือ 13 หลัก ระบบจะสร้าง QR Code สแกนจ่ายให้อัตโนมัติ (ทำงานแบบออฟไลน์ 100%)',
    scanToPay: 'สแกนเพื่อโอนเงิน 💸',
    downloadQR: 'ดาวน์โหลด QR',

    // Export Modal
    exportModalTitle: 'การ์ดสรุปรายการบิลอาหาร',
    downloadImage: 'ดาวน์โหลดเป็นรูปภาพ (PNG)',
    copyText: 'คัดลอกข้อความสรุป',
    copiedTextSuccess: 'คัดลอกข้อความสรุปเรียบร้อยแล้ว!',
    close: 'ปิด',
    date: 'วันที่',
  },
  en: {
    appTitle: 'Bill Splitter',
    appSubtitle: 'Bill Splitter',
    language: 'Language',
    reset: 'Reset Data',
    resetConfirm: 'Are you sure you want to reset all friends and item data?',
    exportSummary: 'Save Summary Card',
    exportText: 'Copy Summary Text',
    equalSplit: 'Equal Split All',

    // Theme & PWA
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    installPWA: 'Install App',
    pwaPrompt: 'Add app to Home Screen for offline access',

    // Settings
    settingsTitle: 'Tax, Discount & Tip Settings',
    serviceCharge: 'SERVICE CHARGE (%)',
    vat: 'VAT (%)',
    discount: 'DISCOUNT / SUBSIDIZE (฿)',
    tip: 'TIP / EXTRA CHARGE (฿)',
    baht: 'THB',
    
    // Friends
    friendsTitle: 'Friends Sharing Bill',
    addFriend: 'Add Friend',
    friendNamePlaceholder: 'Friend name...',
    noFriends: 'No friends added yet. Add friends to start splitting.',
    
    // Items
    itemsTitle: 'Food & Drink Items',
    addItem: 'Add Item',
    itemName: 'Item Name',
    price: 'Price (฿)',
    quantity: 'Qty',
    subtotal: 'Total (฿)',
    assignedPeople: 'Shared By',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    noItems: 'No items added yet. Click "Add Item" to start.',
    matrixView: 'Matrix View (Desktop)',
    cardView: 'Card View (Mobile)',
    
    // Validation
    warningTitle: 'Attention Required!',
    unassignedWarning: 'Some items have 0 assigned people ({count} items)',
    sumMismatchWarning: 'Sum of individual totals does not equal bill grand total.',
    allAssigned: 'All items are assigned to at least one person.',

    // Summary & Tracking
    summaryTitle: 'Individual Payment Summary',
    totalBill: 'Grand Total (Net):',
    perPersonDetail: 'Item Breakdown',
    noConsumption: 'No items ordered',
    itemsShare: 'Food Items',
    scShare: 'Service Charge',
    vatShare: 'VAT',
    discountShare: 'Discount',
    tipShare: 'Tip/Extra',
    totalOwed: 'Total Owed',
    paidTrackerTitle: 'Payment Status Tracker',
    paidStatus: 'Paid',
    unpaidStatus: 'Pending',
    paidProgress: 'Paid {paid}/{total} ({percent}%)',
    allPaidCongrats: '🎉 Everyone has paid in full!',

    // PromptPay
    promptPayTitle: 'PromptPay QR Code Generator',
    promptPaySubtitle: 'Enter 10-digit Phone Number or 13-digit Thai National ID',
    promptPayPlaceholder: '08XXXXXXXX or 13-digit ID Card',
    invalidPromptPay: 'Please enter a valid 10-digit mobile number or 13-digit ID Card number',
    promptPayNotice: 'Standard Thai PromptPay QR will be generated client-side automatically.',
    scanToPay: 'Scan to Pay 💸',
    downloadQR: 'Download QR',

    // Export Modal
    exportModalTitle: 'Bill Summary Receipt Card',
    downloadImage: 'Download Image (PNG)',
    copyText: 'Copy Summary Text',
    copiedTextSuccess: 'Copied summary to clipboard!',
    close: 'Close',
    date: 'Date',
  }
};

export const getTranslation = (lang: Language) => translations[lang] || translations.th;
