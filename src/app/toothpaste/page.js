import Image from "next/image";
import Link from "next/link";
import { HERB_IMG, Icon, LINE_HREF, LINE_ID, LineButton, PAGE_CLASS, PHONE, PHONE_HREF, PanarinDock, PanarinHeader, PhoneButton } from "../_panarin/ui";

const NOTIFICATION_NO = "41-1-6900020128";
const PRICE = 199;
const IMG = "/products/toothpaste";

const DESCRIPTION =
  "ยาสีฟันสมุนไพร ตรา พนารินทร์ พลัง HERBAL กว่า 9 ชนิด ลดอาการเสียวฟัน เย็นปาก ลมหายใจสดชื่น ไร้กลิ่นปาก กำจัดคราบชา กาแฟ ขนาด 100 กรัม ราคา " + PRICE + " บาท สั่งซื้อโทร " + PHONE;

export const metadata = {
  title: { absolute: "ยาสีฟันสมุนไพร ตรา พนารินทร์ PANARIN 100 กรัม | บริษัท ทิพย์มงคล 555 จำกัด" },
  description: DESCRIPTION,
  keywords: ["ยาสีฟันสมุนไพร", "ยาสีฟันเปลือกมังคุด", "พนารินทร์", "PANARIN", "ทิพย์มงคล 555"],
  alternates: { canonical: "https://www.tmk555.com/toothpaste" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://www.tmk555.com/toothpaste",
    siteName: "บริษัท ทิพย์มงคล 555 จำกัด",
    title: "ยาสีฟันสมุนไพร ตรา พนารินทร์ — พลัง HERBAL กว่า 9 ชนิด",
    description: DESCRIPTION,
    images: [{ url: `https://www.tmk555.com${IMG}/ad-9-in-one-tube.jpg`, width: 1080, height: 1080, alt: "ยาสีฟันสมุนไพร PANARIN" }],
  },
};

const BENEFITS = [
  { icon: "tooth", title: "ลดอาการเสียวฟัน", text: "ดูแลฟันทุกวันด้วยสมุนไพรกว่า 9 ชนิด" },
  { icon: "wind", title: "เย็นปาก สดชื่น", text: "ลมหายใจสดชื่น ไร้กลิ่นปาก" },
  { icon: "sparkle", title: "กำจัดคราบชา กาแฟ", text: "ให้รอยยิ้มดู Fresh White" },
  { icon: "shield", title: "ไม่ทำร้ายผิวฟัน", text: "ใช้ได้ตั้งแต่เด็ก 7 ขวบขึ้นไป" },
];

// สรรพคุณเป็นข้อความ mockup จากภาพโฆษณาเดิม รอตรวจกับเกณฑ์ อย. ก่อนใช้จริง
const HERBS = [
  { img: "mangosteen-peel", name: "ผงเปลือกมังคุด", text: "ช่วยยับยั้งแบคทีเรีย และลดกลิ่นปาก" },
  { img: "acanthus", name: "สมุนไพรเหงือกปลาหมอ", text: "ช่วยให้เหงือกแข็งแรง ลดการอักเสบ" },
  { img: "khoi-bark", name: "ผงเปลือกข่อย", text: "บำรุงรากฟันและเหงือกให้แข็งแรง" },
  { img: "khoi-leaf", name: "ผงใบข่อย", text: "ช่วยลดการสะสมของแบคทีเรียในช่องปาก" },
  { img: "licorice", name: "ผงชะเอมเทศ", text: "ช่วยลดการอักเสบของเหงือกและช่องปาก" },
  { img: "clove", name: "ผงกานพลู", text: "ช่วยยับยั้งแบคทีเรีย และลดกลิ่นปาก" },
  { img: "guava-leaf", name: "ผงใบฝรั่ง", text: "ช่วยลดการอักเสบของเหงือก และสมานแผล" },
  { img: "turmeric", name: "ผงขมิ้นชัน", text: "ช่วยลดแบคทีเรีย และลดกลิ่นปาก" },
  { img: "peppermint", name: "น้ำมันเปเปอร์มิ้นต์", text: "ให้ความสดชื่น หอมยาวนาน" },
  { img: "sea-salt", name: "ดอกเกลือ" },
];

// ตามฉลากด้านหลังหลอด
const INGREDIENTS = [
  "AQUA",
  "DISODIUM EDTA",
  "SUCRALOSE",
  "SODIUM BENZOATE",
  "SODIUM FLUORIDE",
  "SORBITOL",
  "GLYCERIN",
  "CALCIUM CARBONATE",
  "SILICON DIOXIDE",
  "HYDRATED SILICA",
  "CARBOXYMETHYLCELLULOSE",
  "MENTHOL",
  "LAURYL GLUCOSIDE",
  "STREBLUS ASPER LEAF POWDER",
  "LICORICE ROOT EXTRACT",
  "TURMERIC POWDER",
  "PEPPERMINT OIL",
];

const STEPS = ["บีบยาสีฟันพอประมาณ", "แปรงฟันให้ทั่ว", "ล้างออกด้วยน้ำสะอาด"];

const ADS = [
  { src: "ad-9-in-one-tube.jpg", alt: "สมุนไพรธรรมชาติ 9 ชนิดในหลอดเดียว ยาสีฟัน PANARIN พร้อมกล่องและมังคุด" },
  { src: "ad-mangosteen-peel.jpg", alt: "พลังจากเปลือกมังคุด ยาสีฟัน PANARIN พร้อมกล่อง" },
  { src: "ad-9-herbs.jpg", alt: "อินโฟกราฟิกสมุนไพร 9 ชนิดในยาสีฟัน PANARIN" },
];

// ภาพ mockup ฉลากยังไม่ใช่อาร์ตเวิร์กสุดท้าย รอเปลี่ยนเมื่อแก้ไฟล์แล้ว
const MOCKUPS = [
  { src: "mockup-tube-front-back.jpg", width: 848, height: 1264, alt: "ภาพจำลองหลอดยาสีฟัน PANARIN ด้านหน้าและด้านหลัง" },
  { src: "label-front-back.jpg", width: 1099, height: 1490, alt: "ฉลากหลอดยาสีฟัน PANARIN ด้านหน้าและด้านหลัง" },
];

export default function ToothpastePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ยาสีฟันสมุนไพร ตรา พนารินทร์ (PANARIN Natural Herbal Toothpaste)",
    image: `https://www.tmk555.com${IMG}/ad-9-in-one-tube.jpg`,
    description: DESCRIPTION,
    brand: { "@type": "Brand", name: "PANARIN" },
    manufacturer: { "@type": "Organization", name: "บริษัท รุจิรา สยามโฮลดิ้ง จำกัด" },
    weight: { "@type": "QuantitativeValue", value: 100, unitCode: "GRM" },
    offers: { "@type": "Offer", url: "https://www.tmk555.com/toothpaste", price: PRICE, priceCurrency: "THB" },
  };

  return (
    <div className={PAGE_CLASS} id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <PanarinHeader links={[["#benefits", "จุดเด่น"], ["#herbs", "สมุนไพร"], ["#how-to", "วิธีใช้"]]} />

      <main>
        <section className="pn-hero">
          <div className="pn-wrap pn-hero__grid">
            <div className="pn-hero__copy">
              <p className="pn-wordmark" aria-hidden="true">PANARIN</p>
              <p className="pn-descriptor">NATURAL HERBAL TOOTHPASTE</p>
              <h1>
                <span>ยาสีฟันสมุนไพร</span> <span>ตรา พนารินทร์</span>
              </h1>
              <p className="pn-tag pn-tag--mangosteen">พลัง HERBAL กว่า 9 ชนิด</p>
              <ul className="pn-claims">
                <li>ลดอาการเสียวฟัน</li>
                <li>เย็นปาก ลมหายใจสดชื่น ไร้กลิ่นปาก</li>
                <li>กำจัดคราบชา กาแฟ</li>
                <li>Fresh White ไม่ทำร้ายผิวฟัน</li>
              </ul>
              <p className="pn-price">
                <small>ราคา</small>
                <b>{PRICE}</b>
                <small>บาท</small>
              </p>
              <div className="pn-call">
                <PhoneButton className="pn-btn--xl" label="สั่งซื้อ โทรเลย" />
                <LineButton className="pn-btn--lg" label={`แอดไลน์ ${LINE_ID}`} />
              </div>
            </div>
            <div className="pn-hero__media">
              <div className="pn-hero__photo">
                <Image
                  src={`${IMG}/hero-box-tube.webp`}
                  alt="กล่องและหลอดยาสีฟันสมุนไพร PANARIN วางคู่กับมังคุดผ่าครึ่งและดอกเกลือ"
                  width={867}
                  height={1407}
                  sizes="(min-width: 960px) 460px, (min-width: 600px) 60vw, 86vw"
                  preload
                />
              </div>
              <p className="pn-medal">
                <small>พลัง HERBAL กว่า</small>
                <b>9</b>
                <small>ชนิด</small>
              </p>
              <p className="pn-size">
                <small>น้ำหนักสุทธิ</small>
                <b>100 กรัม</b>
              </p>
            </div>
          </div>
          <svg className="pn-wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 40c180-34 360-34 540-10s360 42 540 22 270-36 360-32v50H0Z" />
          </svg>
        </section>

        <section className="pn-section pn-benefits" id="benefits">
          <div className="pn-wrap">
            <div className="pn-sec-head">
              <h2>สะอาด สดชื่น <em>Fresh White</em></h2>
              <p>ปากสะอาด ลมหายใจหอมสดชื่น ด้วยสมุนไพรธรรมชาติในหลอดเดียว</p>
            </div>
            <ul className="pn-benefit-grid">
              {BENEFITS.map((b) => (
                <li className="pn-benefit" key={b.title}>
                  <span className="pn-benefit__icon"><Icon name={b.icon} size={32} /></span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pn-section pn-herbs" id="herbs">
          <div className="pn-wrap">
            <div className="pn-sec-head">
              <p className="pn-tag pn-tag--mangosteen pn-tag--sm">พลังจากเปลือกมังคุด</p>
              <h2>พลัง HERBAL กว่า 9 ชนิด</h2>
              <p>รวมสมุนไพรธรรมชาติที่คัดสรรมาไว้ในยาสีฟันหลอดเดียว</p>
            </div>
            <div className="pn-herbs__stage">
              <ul className="pn-herb-list">
                {HERBS.map((h) => (
                  <li className="pn-herb" key={h.img}>
                    <Image src={`${HERB_IMG}/${h.img}.webp`} alt="" width={240} height={240} sizes="96px" />
                    <span>{h.name}</span>
                    {h.text && <p>{h.text.split(" ").map((part) => <span key={part}>{part}</span>)}</p>}
                  </li>
                ))}
              </ul>
              <div className="pn-herbs__tube">
                <Image src={`${IMG}/tube.webp`} alt="หลอดยาสีฟัน PANARIN ขนาด 100 กรัม" width={387} height={1248} sizes="240px" />
              </div>
            </div>
          </div>
        </section>

        <section className="pn-section pn-gallery" id="gallery">
          <div className="pn-wrap">
            <div className="pn-sec-head">
              <h2>ดูรายละเอียดสินค้า</h2>
              <p>แตะที่ภาพเพื่อดูขนาดเต็ม</p>
            </div>
            <div className="pn-gallery__grid">
              {ADS.map((ad) => (
                <a key={ad.src} href={`${IMG}/${ad.src}`} target="_blank" rel="noreferrer">
                  <Image src={`${IMG}/${ad.src}`} alt={ad.alt} width={1080} height={1080} sizes="(min-width: 900px) 33vw, (min-width: 600px) 80vw, 100vw" loading="lazy" />
                </a>
              ))}
            </div>
            <div className="pn-gallery__grid pn-gallery__grid--tall">
              {MOCKUPS.map((m) => (
                <a key={m.src} href={`${IMG}/${m.src}`} target="_blank" rel="noreferrer">
                  <Image src={`${IMG}/${m.src}`} alt={m.alt} width={m.width} height={m.height} sizes="(min-width: 600px) 45vw, 100vw" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="pn-section pn-info" id="how-to">
          <div className="pn-wrap pn-info__grid">
            <div className="pn-card">
              <h2>วิธีใช้</h2>
              <ol className="pn-steps">
                {STEPS.map((s) => <li key={s}>{s}</li>)}
              </ol>
              <p className="pn-note">ใช้ได้ตั้งแต่เด็ก 7 ขวบขึ้นไป</p>
              <div className="pn-warning">
                <h3>คำเตือน</h3>
                <p>มีสาร Sodium Fluoride เด็กอายุต่ำกว่า 3 ปี ควรใช้ยาสีฟันปริมาณน้อยกว่าเมล็ดถั่วเขียว และมีผู้ใหญ่แนะนำขณะแปรงฟัน ในกรณีที่เด็กได้รับสารฟลูออไรด์จากแหล่งอื่นด้วย ให้ปรึกษาแพทย์หรือทันตแพทย์</p>
              </div>
            </div>
            <div className="pn-card">
              <h2>Ingredient</h2>
              <ul className="pn-ingredients">
                {INGREDIENTS.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="pn-card pn-card--wide">
              <h2>ข้อมูลสินค้า</h2>
              <dl className="pn-specs">
                <dt>สินค้า</dt><dd>ยาสีฟันสมุนไพร ตรา พนารินทร์</dd>
                <dt>น้ำหนักสุทธิ</dt><dd>100 กรัม</dd>
                <dt>ราคา</dt><dd>{PRICE} บาท</dd>
                <dt>ผลิตโดย</dt><dd>บริษัท รุจิรา สยามโฮลดิ้ง จำกัด<br />456 หมู่ 2 ต.บ้านดุง อ.บ้านดุง จ.อุดรธานี 41190</dd>
                <dt>จัดจำหน่ายโดย</dt><dd>บริษัท ทิพย์มงคล 555 จำกัด</dd>
                <dt>เลขที่ใบรับจดแจ้ง</dt><dd className="pn-num">{NOTIFICATION_NO}</dd>
              </dl>
            </div>
          </div>
        </section>

        <section className="pn-final">
          <div className="pn-wrap pn-final__grid">
            <div className="pn-final__tube">
              <Image src={`${IMG}/tube.webp`} alt="" width={387} height={1248} sizes="(min-width: 900px) 200px, 130px" loading="lazy" />
            </div>
            <div>
              <p className="pn-wordmark pn-wordmark--on-dark" aria-hidden="true">PANARIN</p>
              <h2><span>ปากสะอาด</span> <span>ลมหายใจหอมสดชื่น</span></h2>
              <p className="pn-final__lead">ขนาด 100 กรัม ราคา <b>{PRICE} บาท</b> สั่งซื้อโทรหาเราได้เลย</p>
              <a className="pn-final__phone" href={PHONE_HREF}>
                <Icon name="phone" size={34} />
                {PHONE}
              </a>
              <LineButton className="pn-btn--lg" label={`แอดไลน์ ${LINE_ID}`} />
            </div>
          </div>
        </section>
      </main>

      <footer className="pn-footer">
        <div className="pn-wrap pn-footer__row">
          <div>
            <b>จัดจำหน่ายโดย บริษัท ทิพย์มงคล 555 จำกัด</b>
            <p>ยาสีฟันสมุนไพร ตรา พนารินทร์ · เลขที่ใบรับจดแจ้ง <span className="pn-num">{NOTIFICATION_NO}</span></p>
          </div>
          <div className="pn-footer__links">
            <a href={PHONE_HREF}>โทร {PHONE}</a>
            <a href={LINE_HREF} target="_blank" rel="noreferrer">LINE {LINE_ID}</a>
            <Link href="/">tmk555.com</Link>
          </div>
        </div>
      </footer>

      <PanarinDock />
    </div>
  );
}
