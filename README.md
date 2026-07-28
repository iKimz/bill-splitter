# 🧾 Bill Splitter - แอปหารค่าอาหารมินิมอล

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10B981?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/)
[![Vercel Deployed](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

แอปหารค่าอาหารแยกรายการสไตล์ Minimalist ที่ช่วยคำนวณหารค่าอาหารตามจริงของแต่ละคน คิด Service Charge, VAT, ส่วนลด (Subsidize), ทิปพนักงาน พร้อมสร้าง **PromptPay Static QR Code** ให้เพื่อนสแกนโอนเงินได้สะดวก 100% Client-side Offline Security

---

## 🌟 ฟีเจอร์หลัก (Features)

- **หารค่าอาหารแยกรายการ (Itemized Split):** ติ๊กเลือกเพื่อนที่หารในแต่ละรายการอาหารได้อย่างยืดหยุ่น
- **Dual-View Mode (Desktop / Mobile):**
  - **Grid Matrix View:** ตาราง Matrix สำหรับหน้าจอคอมพิวเตอร์
  - **Mobile Cards View:** การ์ดปุ่มกดขนาดใหญ่สำหรับการใช้งานบนมือถือ
- **คำนวณ Service Charge, VAT, ส่วนลด และทิป:** 
  - กำหนด % SC (Default 10%) และ % VAT (Default 7%)
  - กำหนดส่วนลด (บาท) และค่าทิป (บาท) โดยระบบจะเฉลี่ยยอดตามสัดส่วนการกินของแต่ละคนอย่างยุติธรรม
- **ระบบติดตามการโอนเงิน (Payment Tracker):** ปุ่มติ๊กสถานะ "โอนแล้ว 💸" / "ยังไม่โอน" พร้อม Progress Bar สรุปยอด
- **ปุ่มทางลัด "หารเท่ากันทุกคน":** เพียง 1 คลิก สำหรับมื้อบุฟเฟต์หรือมื้อที่หารเท่ากัน
- **PromptPay QR Generator:** สร้าง Standard Thai PromptPay Static QR Code จากเบอร์โทรศัพท์ (10 หลัก) หรือเลขบัตรประชาชน (13 หลัก) โดยเพื่อนสามารถระบุยอดโอนได้เองในแอปธนาคาร
- **การ์ดสรุปรายการ (Export Receipt Card):** ดาวน์โหลดสรุปยอดเป็นรูปภาพ (PNG) หรือคัดลอกข้อความสรุปไปส่งใน LINE / Chat
- **รองรับ 2 ภาษา (i18n):** สลับภาษาไทย 🇹🇭 และภาษาอังกฤษ 🇬🇧 ได้ทันที
- **Dark Mode (โหมดมืด):** สลับธีมมืด/สว่างได้ตามต้องการ
- **PWA Support:** รองรับการกด Add to Home Screen เพื่อติดตั้งเสมือนแอปบนมือถือ

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React
- **QR Code:** Standard EMVCo PromptPay Generator (`qrcode.react`)
- **Export Image:** `html-to-image`
- **Effects:** `canvas-confetti`

---

## 🚀 ขั้นตอนการติดตั้งและรันในเครื่อง local (Getting Started)

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/bill-splitter.git
cd bill-splitter
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
เปิดเบราว์เซอร์เข้าใช้งานได้ที่ `http://localhost:3000`

---

## ☁️ การเชื่อมต่อและ Deploy บน Vercel (Vercel Deployment)

แอปพลิเคชันนี้ถูกออกแบบโครงสร้างให้พร้อมใช้งานบน **Vercel** ทันทีโดยไม่ต้องตั้งค่า Server หรือ Environment Variables ใดๆ

### ขั้นตอนการผูก GitHub กับ Vercel:
1. Push โค้ดขึ้น GitHub Repository:
   ```bash
   git add .
   git commit -m "feat: complete bill splitter phase 1"
   git push origin main
   ```
2. ไปที่ [Vercel Dashboard](https://vercel.com/dashboard) แล้วกด **"Add New" -> "Project"**
3. เลือกผูกกับ **GitHub Repository** (`bill-splitter`)
4. Vercel จะตรวจจับว่าเป็น **Next.js** อัตโนมัติ:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** Default
5. กด **"Deploy"**

---

## ❓ คำถามเรื่อง Port & CI/CD บน Vercel

> **Q: ตอน CI/CD บน Vercel มันจะรันพอร์ต 3000 หรือเปล่า?**
>
> **A:** **ไม่ต้องกังวลเรื่องพอร์ต 3000 ครับ!**
> - ในขั้นตอน CI/CD บน Vercel ระบบจะรันคำสั่ง `npm run build` เพื่อสร้างไฟล์ Static Assets & Serverless Functions แบบสำเร็จรูป
> - เมื่อ Build เสร็จแล้ว Vercel จะให้บริการผ่าน **Global Edge CDN** บนพอร์ตมาตรฐาน **HTTPS (443)** อัตโนมัติ โดยผู้ใช้สามารถเข้าผ่าน URL เช่น `https://bill-splitter.vercel.app` โดยไม่ต้องใส่ `:3000` ต่อท้าย
> - พอร์ต `3000` จะถูกใช้งานเฉพาะช่วงการพัฒนาในเครื่องตัวเอง (`npm run dev`) เท่านั้นครับ

---

## 📄 License

MIT License © 2026 Thanapat Chatchaithanawat
