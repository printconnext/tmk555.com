import Image from "next/image";
import { Cinzel, Kanit, Prompt } from "next/font/google";
import "./panarin.css";

const kanit = Kanit({ weight: ["500", "600", "700", "800"], subsets: ["thai", "latin"], variable: "--pn-font-display" });
const prompt = Prompt({ weight: ["400", "500", "600"], subsets: ["thai", "latin"], variable: "--pn-font-body" });
const cinzel = Cinzel({ weight: ["600", "700"], subsets: ["latin"], variable: "--pn-font-wordmark" });

export const PAGE_CLASS = `pn-page ${kanit.variable} ${prompt.variable} ${cinzel.variable}`;

export const PHONE = "092-104-5555";
export const PHONE_HREF = "tel:0921045555";
export const LINE_ID = "@tmk555";
export const LINE_HREF = "https://line.me/ti/p/~@tmk555";
export const HERB_IMG = "/products/toothpaste/herbs";

const ICONS = {
  tooth: <path d="M12 5.5c-1.6-1.3-3.4-2-5-1.4C4.800 5 4 7.300 4.300 9.600c.3 2 1 3.300 1.400 5 .4 1.900.6 5.400 2.400 5.400 1.900 0 1.500-5 3.900-5s2 5 3.900 5c1.800 0 2-3.500 2.400-5.400.4-1.700 1.100-3 1.400-5C20 7.300 19.200 5 17 4.100c-1.600-.6-3.400.1-5 1.400Z" />,
  wind: <path d="M3 9h11a3 3 0 1 0-3-3M3 14h15a3 3 0 1 1-3 3M3 19h7" />,
  sparkle: <path d="M12 3l1.900 5.600L19.500 10.500l-5.600 1.900L12 18l-1.900-5.600L4.500 10.500l5.600-1.900L12 3ZM19 16l.8 2.200L22 19l-2.200.8L19 22l-.8-2.200L16 19l2.200-.8L19 16Z" />,
  shield: <path d="M12 3l8 3v6c0 4.500-3.200 7.800-8 9-4.800-1.200-8-4.500-8-9V6l8-3ZM8.500 12l2.500 2.500 4.500-5" />,
  drop: <path d="M12 3s7 7 7 11.500a7 7 0 0 1-14 0C5 10 12 3 12 3Z" />,
  feather: <path d="M20 4c-7-1-14 3-14 11v5M6 15c6 0 11-3 13-8M4 20l4-4" />,
  phone: <path d="M6.600 3.500h2.600l1.500 4.300-2 1.700c1 2.200 2.800 4 5 5l1.700-2 4.300 1.500v2.600c0 1.300-1.100 2.400-2.400 2.300C10.300 18 6 13.700 4.300 5.900 4.200 4.600 5.300 3.500 6.600 3.500Z" />,
  chat: <path d="M12 4c-5 0-9 3.200-9 7.200 0 3.600 3.200 6.600 7.500 7.100.3 0 .7.200.8.500.1.300.1.700 0 1l-.1.800c0 .3.300.500.6.400 2.500-1.100 5.400-2.900 7-4.900 1.400-1.500 2.200-3 2.200-4.700C21 7.200 17 4 12 4Z" />,
};

export function Icon({ name, size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

export function PhoneButton({ className = "", label }) {
  return (
    <a className={`pn-btn pn-btn--tel ${className}`} href={PHONE_HREF} aria-label={`โทร ${PHONE}`}>
      <Icon name="phone" />
      <span>
        {label && <small>{label}</small>}
        {PHONE}
      </span>
    </a>
  );
}

export function LineButton({ className = "", label = "แอดไลน์" }) {
  return (
    <a className={`pn-btn pn-btn--line ${className}`} href={LINE_HREF} target="_blank" rel="noreferrer" aria-label={`แอดไลน์ ${LINE_ID}`}>
      <Icon name="chat" />
      <span>{label}</span>
    </a>
  );
}

export function PanarinHeader({ links }) {
  return (
    <header className="pn-head">
      <div className="pn-wrap pn-head__row">
        <a className="pn-brand" href="#top" aria-label="PANARIN หน้าแรก">
          <Image src="/products/toothpaste/logo-thipmongkol-3d.webp" alt="ตราทิพย์มงคล 555" width={480} height={366} sizes="72px" />
          <span>
            <b>PANARIN</b>
            <small>ตรา พนารินทร์</small>
          </span>
        </a>
        <nav className="pn-nav" aria-label="เมนูหน้าสินค้า">
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="pn-head__cta">
          <PhoneButton />
          <LineButton className="pn-head__line" label={`แอดไลน์ ${LINE_ID}`} />
        </div>
      </div>
    </header>
  );
}

export function PanarinDock() {
  return (
    <div className="pn-dock">
      <PhoneButton label="โทรเลย" />
      <LineButton />
    </div>
  );
}
