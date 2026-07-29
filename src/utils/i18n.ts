import { Language } from '../types';

export const translations = {
  th: {
    appTitle: 'Bill Splitter',
    appSubtitle: 'หารค่าอาหารง่ายๆ ยุติธรรมทุกรายการ',
    language: 'ภาษา',
    reset: 'รีเซ็ตข้อมูล',
    resetConfirm: 'ต้องการล้างข้อมูลแล้วเริ่มหารบิลใหม่ใช่ไหม?',
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
    settingsTitle: 'ส่วนลด ภาษี และค่าบริการ',
    serviceCharge: 'Service Charge (%)',
    vat: 'VAT (%)',
    discount: 'ส่วนลด (บาท)',
    tip: 'ทิปพนักงาน (บาท)',
    baht: 'บาท',

    // Friends
    friendsTitle: 'คนหารบิลนี้',
    addFriend: 'เพิ่มคนหาร',
    friendNamePlaceholder: 'ชื่อคนหาร...',
    noFriends: 'ยังไม่มีคนหาร กดเพิ่มคนหารเพื่อเริ่มแบ่งยอด',

    // Items
    itemsTitle: 'รายการอาหาร',
    addItem: 'เพิ่มรายการ',
    deleteItem: 'ลบรายการ',
    itemName: 'ชื่อรายการ',
    price: 'ราคา (บาท)',
    quantity: 'จำนวน',
    subtotal: 'ยอดรวม (บาท)',
    assignedPeople: 'คนหาร',
    selectAll: 'เลือกทุกคน',
    deselectAll: 'ยกเลิกทั้งหมด',
    noItems: 'ยังไม่มีรายการอาหาร กดเพิ่มรายการเพื่อเริ่มคำนวณ',
    matrixView: 'ตาราง (Desktop)',
    cardView: 'การ์ด (Mobile)',

    // Validation
    warningTitle: 'มีรายการยังไม่ได้เลือกคนหาร',
    unassignedWarning: 'ยังไม่ได้เลือกคนหารอีก {count} รายการ',
    sumMismatchWarning: 'ยอดรวมของแต่ละคนยังไม่เท่ากับยอดสุทธิของบิล กรุณาตรวจสอบคนหาร',
    allAssigned: 'เลือกคนหารครบทุกรายการแล้ว',

    // Summary & Tracking
    summaryTitle: 'สรุปยอดแต่ละคน',
    totalBill: 'ยอดรวมบิลนี้',
    perPersonDetail: 'รายละเอียด',
    noConsumption: 'ไม่ได้หารรายการนี้',
    itemsShare: 'ค่าอาหาร',
    scShare: 'ค่าบริการ',
    vatShare: 'ภาษี',
    discountShare: 'ส่วนลด',
    tipShare: 'ทิป/อื่นๆ',
    totalOwed: 'ยอดที่ต้องจ่าย',
    paidTrackerTitle: 'เช็กสถานะการโอน',
    paidStatus: 'โอนแล้ว',
    unpaidStatus: 'รอโอน',
    paidProgress: 'โอนแล้ว {paid}/{total} คน ({percent}%)',
    allPaidCongrats: 'โอนครบทุกคนแล้ว',

    // PromptPay
    promptPayTitle: 'สแกนจ่ายผ่าน PromptPay',
    promptPaySubtitle: 'ใส่เบอร์โทรศัพท์ (10 หลัก) หรือเลขบัตรประชาชน (13 หลัก)',
    promptPayPlaceholder: '08XXXXXXXX หรือ เลขบัตรประชาชน 13 หลัก',
    invalidPromptPay: 'กรุณากรอกเบอร์โทร 10 หลัก หรือเลขบัตรประชาชน 13 หลักให้ถูกต้อง',
    promptPayNotice: 'ระบบจะสร้าง QR Code สแกนจ่ายให้อัตโนมัติ โดยไม่เก็บข้อมูลของคุณลงเซิร์ฟเวอร์',
    scanToPay: 'สแกนเพื่อโอนเงิน',
    downloadQR: 'ดาวน์โหลด QR',

    // Export Modal
    exportModalTitle: 'สรุปบิลอาหาร',
    downloadImage: 'เซฟรูปภาพ',
    copyText: 'คัดลอกสรุป',
    copiedTextSuccess: 'คัดลอกสรุปเรียบร้อยแล้ว',
    close: 'ปิด',
    date: 'วันที่',
  },
  en: {
    appTitle: 'Bill Splitter',
    appSubtitle: 'Fair and effortless bill splitting',
    language: 'Language',
    reset: 'Reset Data',
    resetConfirm: 'Are you sure you want to clear all data and start a new bill?',
    exportSummary: 'Save Summary Card',
    exportText: 'Copy Summary Text',
    equalSplit: 'Equal Split All',

    // Theme & PWA
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    installPWA: 'Install App',
    pwaPrompt: 'Add app to Home Screen for fast offline access',

    // Settings
    settingsTitle: 'Tax, Service Charge & Discounts',
    serviceCharge: 'Service Charge (%)',
    vat: 'VAT (%)',
    discount: 'Discount (THB)',
    tip: 'Tip (THB)',
    baht: 'THB',

    // Friends
    friendsTitle: 'People Sharing Bill',
    addFriend: 'Add Person',
    friendNamePlaceholder: 'Name...',
    noFriends: 'No people added yet. Add someone to start splitting.',

    // Items
    itemsTitle: 'Food & Drink Items',
    addItem: 'Add Item',
    deleteItem: 'Delete Item',
    itemName: 'Item Name',
    price: 'Price (THB)',
    quantity: 'Qty',
    subtotal: 'Total (THB)',
    assignedPeople: 'Shared By',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    noItems: 'No items added yet. Click "Add Item" to begin.',
    matrixView: 'Matrix View',
    cardView: 'Card View',

    // Validation
    warningTitle: 'Unassigned Items',
    unassignedWarning: '{count} items have no assigned people yet',
    sumMismatchWarning: 'Sum of individual shares does not equal bill grand total.',
    allAssigned: 'All items are assigned to at least one person.',

    // Summary & Tracking
    summaryTitle: 'Payment Summary',
    totalBill: 'Grand Total',
    perPersonDetail: 'Details',
    noConsumption: 'No items shared',
    itemsShare: 'Food Items',
    scShare: 'Service Charge',
    vatShare: 'VAT',
    discountShare: 'Discount',
    tipShare: 'Tip/Extra',
    totalOwed: 'Total Owed',
    paidTrackerTitle: 'Payment Status',
    paidStatus: 'Paid',
    unpaidStatus: 'Pending',
    paidProgress: 'Paid {paid}/{total} ({percent}%)',
    allPaidCongrats: 'Everyone has paid in full',

    // PromptPay
    promptPayTitle: 'PromptPay QR Payment',
    promptPaySubtitle: 'Enter 10-digit Phone Number or 13-digit National ID',
    promptPayPlaceholder: '08XXXXXXXX or 13-digit ID Card',
    invalidPromptPay: 'Please enter a valid 10-digit phone number or 13-digit ID number',
    promptPayNotice: 'PromptPay QR Code is generated locally in your browser without saving any data.',
    scanToPay: 'Scan to Pay',
    downloadQR: 'Download QR',

    // Export Modal
    exportModalTitle: 'Bill Receipt Summary',
    downloadImage: 'Save Image',
    copyText: 'Copy Summary',
    copiedTextSuccess: 'Copied summary to clipboard',
    close: 'Close',
    date: 'Date',
  }
};

export const getTranslation = (lang: Language) => translations[lang] || translations.th;
