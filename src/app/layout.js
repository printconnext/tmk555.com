import { Trirong, Anuphan } from 'next/font/google';
import './globals.css';

const trirong = Trirong({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['thai', 'latin'],
  variable: '--f-display',
});

const anuphan = Anuphan({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['thai', 'latin'],
  variable: '--f-body',
});

export const metadata = {
  title: {
    default: 'ทิพย์มงคล555 Property | ขายที่ดินริมทะเล บ้านพักตากอากาศ',
    template: '%s | ทิพย์มงคล555 Property'
  },
  description: 'ตัวแทนจำหน่ายที่ดินริมทะเล พูลวิลล่า และบ้านพักตากอากาศ เราคัดเฉพาะที่ดินมีโฉนด ตรวจสอบความถูกต้อง พร้อมให้คำปรึกษาจนถึงวันโอนที่สำนักงานที่ดิน',
  keywords: ['ขายที่ดิน', 'ที่ดินริมทะเล', 'พูลวิลล่า', 'บ้านพักตากอากาศ', 'อสังหาริมทรัพย์', 'ที่ดินมีโฉนด', 'ทิพย์มงคล555'],
  authors: [{ name: 'ทิพย์มงคล555 Property' }],
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://tmk555.com',
    siteName: 'ทิพย์มงคล555 Property',
    title: 'ทิพย์มงคล555 Property | ขายที่ดินริมทะเล บ้านพักตากอากาศ',
    description: 'ตัวแทนจำหน่ายที่ดินริมทะเล พูลวิลล่า และบ้านพักตากอากาศ เราคัดเฉพาะที่ดินมีโฉนด',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'ทิพย์มงคล555 Property',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ทิพย์มงคล555 Property',
    description: 'ตัวแทนจำหน่ายที่ดินริมทะเล พูลวิลล่า และบ้านพักตากอากาศ เราคัดเฉพาะที่ดินมีโฉนด',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'ทิพย์มงคล555 Property',
    url: 'https://tmk555.com',
    telephone: '097-791-6555',
    description: 'ตัวแทนจำหน่ายที่ดินริมทะเล พูลวิลล่า และบ้านพักตากอากาศ',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TH'
    }
  };

  return (
    <html lang="th" className={`${trirong.variable} ${anuphan.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
