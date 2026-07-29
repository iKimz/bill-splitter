# Bill Splitter

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10B981?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A sleek, minimalist, and privacy-focused Web Application for splitting restaurant bills, calculating proportional tax and discounts, and generating standard Thai PromptPay QR payment codes. Built with Next.js 16, TypeScript, Tailwind CSS v4, and PWA capabilities.

---

## Key Features

- **Itemized Bill Splitting:** Assign specific food and drink items to one or multiple friends flexibly.
- **Dual-View Layout (Desktop & Mobile):**
  - **Grid Matrix View:** Full tabular view optimized for desktop screens.
  - **Mobile Cards View:** Touch-friendly card interface optimized for smartphones (auto-detected on mobile devices).
- **Proportional Tax & Discount Calculations:**
  - Configurable Service Charge (%) and VAT (%).
  - Discounts and Tips are distributed proportionally based on each individual's actual food consumption ratio.
- **Payment Status Tracker:** Interactive checkboxes ("Paid" / "Pending") with a live progress bar and confetti celebrations when everyone has paid.
- **Equal Split Shortcut:** Single-click action to assign all items equally to everyone (ideal for buffets or shared meals).
- **Standard Thai PromptPay QR Generator:** Generates official EMVCo-compliant Thai QR Payment cards from 10-digit mobile numbers or 13-digit Thai National ID numbers.
- **Export Summary Receipt Card:**
  - Export a beautiful receipt card as a high-resolution PNG image for sharing.
  - Copy structured text summaries directly to your clipboard for messaging apps like LINE or WhatsApp.
- **PWA & Add to Home Screen:**
  - Native 1-tap install prompt for Android Chrome & Desktop.
  - Guided 3-step installation modal for iOS Safari.
  - Full offline capability.
- **Bilingual & Theme Support:** Instant toggle between Thai (TH) and English (EN), alongside Dark and Light mode.
- **100% Privacy & Security:** All computations and QR generations occur locally on your client device. No personal data or phone numbers are stored on any server.

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **QR Code & Assets:** `qrcode.react` with official [Thai QR Payment](https://github.com/kittinan/thai-qr-payment) template assets
- **Image Generation:** `html-to-image`
- **Effects:** `canvas-confetti`

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/iKimz/bill-splitter.git
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

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## Deployment

This application is ready for zero-config deployment on [Vercel](https://vercel.com/):

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Vercel automatically detects Next.js and builds the project with `next build`.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
