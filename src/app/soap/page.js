import Image from "next/image";
import Link from "next/link";
import { HERB_IMG, Icon, LINE_HREF, LINE_ID, LineButton, PAGE_CLASS, PHONE, PHONE_HREF, PanarinDock, PanarinHeader, PhoneButton } from "../_panarin/ui";
import "./soap.css";

// เลขตัวอย่าง รอเปลี่ยนเป็นเลขจดแจ้งจริงของสบู่
const NOTIFICATION_NO = "99-999-9999";
const IMG = "/products/soap";

const DESCRIPTION =
  "สบู่มังคุด ดอกเกลือ ตรา พนารินทร์ ใช้แล้วสะอาดสดชื่น เบาตัว ผิวนุ่ม เนื้อแข็งใช้ทน ฟองเยอะ ไม่ผสมสี ใช้สีจากเปลือกมังคุด ขนาด 100 กรัม สั่งซื้อโทร " + PHONE;

export const metadata = {
  title: { absolute: "สบู่มังคุด ดอกเกลือ ตรา พนารินทร์ 100 กรัม | บริษัท ทิพย์มงคล 555 จำกัด" },
  description: DESCRIPTION,
  keywords: ["สบู่มังคุด", "สบู่ดอกเกลือ", "สบู่สมุนไพร", "พนารินทร์", "PANARIN", "ทิพย์มงคล 555"],
  alternates: { canonical: "https://www.tmk555.com/soap" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://www.tmk555.com/soap",
    siteName: "บริษัท ทิพย์มงคล 555 จำกัด",
    title: "สบู่มังคุด ดอกเกลือ ตรา พนารินทร์",
    description: DESCRIPTION,
    images: [{ url: `https://www.tmk555.com${IMG}/box-and-bar.jpg`, width: 1254, height: 1254, alt: "กล่องและก้อนสบู่มังคุด ดอกเกลือ ตรา พนารินทร์" }],
  },
};

const BENEFITS = [
  { icon: "sparkle", title: "สะอาดสดชื่น", text: "ใช้แล้วรู้สึกเบาตัว" },
  { icon: "feather", title: "ผิวนุ่มมาก", text: "ฟองเยอะ และนุ่มมาก" },
  { icon: "wind", title: "กลิ่นตัวไม่มีเลย", text: "ใช้แล้วสะอาดสดชื่น" },
  { icon: "shield", title: "ไม่เหนียว ไม่คัน", text: "ขาหนีบและซอกเท้าสะอาดมาก" },
];

const TEXTURE = [
  { title: "เนื้อแข็งมาก ใช้ได้ทนงาน", text: "เนื้อไม่เปื่อยยุ่ยง่าย" },
  { title: "ฟองเยอะ และนุ่มมาก", text: "อาบแล้วสะอาดสดชื่น" },
  { title: "ไม่ผสมสี", text: "สีของก้อนสบู่มาจากเปลือกมังคุด" },
  { title: "เซ็ตตัวเร็วมาก", text: "ตัดเป็นก้อนแล้วตากลมวันเดียวก็ห่อได้ จากปกติ 4-5 วัน" },
];

const HERBS = [
  { img: "mangosteen-peel", name: "ผงเปลือกมังคุด" },
  { img: "sea-salt", name: "ดอกเกลือ" },
  { img: "acanthus", name: "สมุนไพรเหงือกปลาหมอ" },
  { img: "khoi-bark", name: "ผงเปลือกข่อย" },
  { img: "khoi-leaf", name: "ผงใบข่อย" },
  { img: "licorice", name: "ผงชะเอมเทศ" },
  { img: "clove", name: "ผงกานพลู" },
  { img: "guava-leaf", name: "ผงใบฝรั่ง" },
  { img: "turmeric", name: "ผงขมิ้นชัน" },
  { img: "peppermint", name: "น้ำมันเปเปอร์มิ้นต์" },
];

// ภาพจัดฉากบางภาพสร้างด้วย AI ใช้เป็น mockup ก่อนมีภาพสินค้าจริง
const GALLERY = [
  { src: "ad-square.jpg", width: 1254, height: 1254, alt: "สบู่มังคุด ดอกเกลือ ตรา พนารินทร์ วางคู่มังคุดและดอกเกลือ ขนาด 100 กรัม" },
  { src: "factory.jpg", width: 1108, height: 1477, alt: "ก้อนสบู่มังคุดเรียงตากลมในไลน์ผลิต" },
  { src: "with-title.jpg", width: 1395, height: 1173, alt: "ก้อนสบู่มังคุดบนผ้าลินินกับมังคุดผ่าครึ่งและถ้วยดอกเกลือ" },
  { src: "with-tag.jpg", width: 1135, height: 944, alt: "ก้อนสบู่บนโต๊ะไม้พร้อมป้ายชื่อสินค้า มังคุดและดอกเกลือ" },
];

export default function SoapPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "สบู่มังคุด ดอกเกลือ ตรา พนารินทร์ (PANARIN Mangosteen Salt Soap)",
    image: `https://www.tmk555.com${IMG}/box-and-bar.jpg`,
    description: DESCRIPTION,
    brand: { "@type": "Brand", name: "PANARIN" },
    manufacturer: { "@type": "Organization", name: "บริษัท รุจิรา สยามโฮลดิ้ง จำกัด" },
    weight: { "@type": "QuantitativeValue", value: 100, unitCode: "GRM" },
  };

  return (
    <div className={PAGE_CLASS} id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <PanarinHeader links={[["#benefits", "จุดเด่น"], ["#texture", "เนื้อสบู่"], ["#herbs", "สมุนไพร"]]} />

      <main>
        <section className="pn-hero">
          <div className="pn-wrap pn-hero__grid">
            <div className="pn-hero__copy">
              <p className="pn-wordmark" aria-hidden="true">PANARIN</p>
              <p className="pn-descriptor">THAI HERBAL SOAP</p>
              <h1>
                <span>สบู่มังคุด ดอกเกลือ</span> <span>ตรา พนารินทร์</span>
              </h1>
              <p className="pn-tag pn-tag--mangosteen">ดอกเกลือ + เปลือกมังคุด</p>
              <ul className="pn-claims">
                <li>ใช้แล้วสะอาดสดชื่น รู้สึกเบาตัว</li>
                <li>ผิวนุ่มมาก ฟองเยอะ</li>
                <li>ไม่เหนียว ไม่คัน กลิ่นตัวไม่มีเลย</li>
                <li>ไม่ผสมสี ใช้สีจากเปลือกมังคุด</li>
              </ul>
              <div className="pn-call">
                <PhoneButton className="pn-btn--xl" label="สั่งซื้อ / สอบถามราคา โทรเลย" />
                <LineButton className="pn-btn--lg" label={`แอดไลน์ ${LINE_ID}`} />
              </div>
            </div>
            <div className="pn-hero__media">
              <div className="pn-hero__photo">
                <Image
                  src={`${IMG}/box-and-bar.jpg`}
                  alt="กล่องและก้อนสบู่มังคุด ดอกเกลือ ตรา พนารินทร์ พร้อมมังคุดผ่าครึ่งและถ้วยดอกเกลือ"
                  width={1254}
                  height={1254}
                  sizes="(min-width: 960px) 460px, 86vw"
                  preload
                />
              </div>
              <p className="pn-size pn-soap-size">
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
              <h2>อาบแล้ว <em>เบาตัว</em> ผิวนุ่ม</h2>
              <p>สูตรพิเศษที่นำดอกเกลือและเปลือกมังคุดมาทำสบู่</p>
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

        <section className="pn-soap-texture" id="texture">
          <div className="pn-wrap pn-soap-texture__grid">
            <div className="pn-soap-texture__photo">
              <Image src={`${IMG}/real-bar.jpg`} alt="ภาพถ่ายจริงของก้อนสบู่มังคุด สีน้ำตาลแดงจากเปลือกมังคุด" width={1402} height={1167} sizes="(min-width: 900px) 520px, 100vw" loading="lazy" />
            </div>
            <div>
              <h2>เนื้อสบู่ที่จับแล้วรู้เลย</h2>
              <ul className="pn-soap-texture__list">
                {TEXTURE.map((t) => (
                  <li key={t.title}>
                    <b>{t.title}</b>
                    <span>{t.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pn-section pn-herbs" id="herbs">
          <div className="pn-wrap">
            <div className="pn-sec-head">
              <h2>ส่วนผสมสมุนไพร</h2>
              <p>เปลือกมังคุดและดอกเกลือ พร้อมสมุนไพรไทยในก้อนเดียว</p>
            </div>
            <ul className="pn-herb-list pn-herb-list--plain">
              {HERBS.map((h) => (
                <li className="pn-herb" key={h.img}>
                  <Image src={`${HERB_IMG}/${h.img}.webp`} alt="" width={240} height={240} sizes="96px" />
                  <span>{h.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pn-section pn-gallery" id="gallery">
          <div className="pn-wrap">
            <div className="pn-sec-head">
              <h2>ดูรายละเอียดสินค้า</h2>
              <p>แตะที่ภาพเพื่อดูขนาดเต็ม</p>
            </div>
            <div className="pn-soap-gallery">
              {GALLERY.map((g) => (
                <a key={g.src} href={`${IMG}/${g.src}`} target="_blank" rel="noreferrer">
                  <Image src={`${IMG}/${g.src}`} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="pn-section pn-info" id="info">
          <div className="pn-wrap">
            <div className="pn-card">
              <h2>ข้อมูลสินค้า</h2>
              <dl className="pn-specs">
                <dt>สินค้า</dt><dd>สบู่มังคุด ดอกเกลือ ตรา พนารินทร์</dd>
                <dt>แบรนด์</dt><dd>บริษัท ทิพย์มงคล 555 จำกัด</dd>
                <dt>น้ำหนักสุทธิ</dt><dd>100 กรัม</dd>
                <dt>ผลิตและจัดจำหน่ายโดย</dt><dd>บริษัท รุจิรา สยามโฮลดิ้ง จำกัด<br />456 หมู่ 2 ต.บ้านดุง อ.บ้านดุง จ.อุดรธานี 41190</dd>
                <dt>เลขที่ใบรับจดแจ้ง</dt><dd className="pn-num">{NOTIFICATION_NO}</dd>
              </dl>
            </div>
          </div>
        </section>

        <section className="pn-final">
          <div className="pn-wrap pn-final__grid">
            <div className="pn-soap-final__photo">
              <Image src={`${IMG}/with-tag.jpg`} alt="" width={1135} height={944} sizes="(min-width: 900px) 240px, 130px" loading="lazy" />
            </div>
            <div>
              <p className="pn-wordmark pn-wordmark--on-dark" aria-hidden="true">PANARIN</p>
              <h2><span>สะอาดสดชื่น</span> <span>ผิวนุ่มมาก</span></h2>
              <p className="pn-final__lead">สั่งซื้อหรือสอบถามราคา โทรหาเราได้เลย</p>
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
            <b>บริษัท ทิพย์มงคล 555 จำกัด</b>
            <p>สบู่มังคุด ดอกเกลือ ตรา พนารินทร์ · เลขที่ใบรับจดแจ้ง <span className="pn-num">{NOTIFICATION_NO}</span></p>
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
