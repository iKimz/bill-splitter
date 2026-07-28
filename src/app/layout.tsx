import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const promptFont = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
});

const siteUrl = "https://bill-splitter.innovation.in.th";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bill Splitter - แอปหารค่าอาหาร คำนวณหารบิล แยกรายการ พร้อม PromptPay QR",
    template: "%s | Bill Splitter",
  },
  description: "เว็บหารค่าอาหารฟรี แยกรายการรายคน ติ๊กชื่อเพื่อน คิด Service Charge 10%, VAT 7%, ส่วนลด, ทิปพนักงาน สร้าง PromptPay QR Code สแกนโอนเงินทันที มินิมอล ใช้งานง่ายไม่ต้องโหลดแอป",
  keywords: [
    "หารค่าอาหาร",
    "เว็บหารค่าอาหาร",
    "หารบิล",
    "คำนวณหารค่าอาหาร",
    "โปรแกรมหารค่าอาหาร",
    "หารค่าอาหาร promptpay",
    "คำนวณ Service Charge VAT",
    "bill splitter",
    "split bill online",
    "promptpay qr code generator",
    "หารค่าอาหารออนไลน์"
  ],
  authors: [{ name: "Thanapat Chatchaithanawat" }],
  creator: "Thanapat Chatchaithanawat",
  publisher: "Bill Splitter",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
    languages: {
      "th-TH": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: siteUrl,
    title: "Bill Splitter - แอปหารค่าอาหาร คำนวณหารบิล แยกรายการ พร้อม PromptPay QR",
    description: "แอปหารค่าอาหารแยกรายการฟรี ติ๊กเลือกคนกิน คิด SC, VAT, ส่วนลด สแกน PromptPay QR โอนง่าย ใช้งานฟรีออฟไลน์ 100%",
    siteName: "Bill Splitter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bill Splitter - แอปหารค่าอาหาร คำนวณหารบิล แยกรายการ พร้อม PromptPay QR",
    description: "แอปหารค่าอาหารแยกรายการฟรี ติ๊กเลือกคนกิน คิด SC, VAT, ส่วนลด สแกน PromptPay QR โอนง่าย",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bill Splitter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// JSON-LD Structured Data Schema for Google Search
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Bill Splitter - แอปหารค่าอาหาร",
      "url": siteUrl,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "THB"
      },
      "description": "แอปหารค่าอาหารแยกรายการ ติ๊กชื่อเพื่อน คำนวณภาษี Service Charge ส่วนลด และสร้าง PromptPay QR Code"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Bill Splitter คิดคำนวณ Service Charge และ VAT อย่างไร?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ระบบจะคำนวณ Service Charge และ VAT ของแต่ละคนตามสัดส่วนยอดอาหารที่คนนั้นกินจริง (Proportional Ratio) ทำให้การหารค่าอาหารยุติธรรมที่สุด"
          }
        },
        {
          "@type": "Question",
          "name": "การสร้าง PromptPay QR Code ปลอดภัยหรือไม่?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ปลอดภัย 100% เนื่องจากระบบประมวลผลการสร้าง EMVCo PromptPay QR Code แบบ Client-side ภายในเบราว์เซอร์ของคุณ โดยไม่มีการบันทึกข้อมูลเบอร์โทรหรือบัตรประชาชนลงเซิร์ฟเวอร์ใดๆ"
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${promptFont.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
