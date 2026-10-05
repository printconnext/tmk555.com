"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase";

const GAS_URL = "https://script.google.com/macros/s/AKfycb.../exec";

import { LISTINGS, PLACE_NOTE, toWa, priceOf, baht, million, typeName, getTypeDisplay, Deed } from "@/utils/helpers";
import Link from "next/link";

export default function HomePageClient({ initialListings = [], initialSettings = {} }) {
  const [navOpen, setNavOpen] = useState(false);
  const [listingsData, setListingsData] = useState(initialListings);

  const [heroBanner, setHeroBanner] = useState(initialSettings.hero_banner || "");
  const [heroEyebrow, setHeroEyebrow] = useState(initialSettings.hero_eyebrow || "");
  const [heroTitle, setHeroTitle] = useState(initialSettings.hero_title || "");
  const [heroSubtitle, setHeroSubtitle] = useState(initialSettings.hero_subtitle || "");
  
  const [whyEyebrow, setWhyEyebrow] = useState(initialSettings.why_eyebrow || "");
  const [whyTitle, setWhyTitle] = useState(initialSettings.why_title || "");
  const [whyImg, setWhyImg] = useState(initialSettings.why_img || "");
  const [why1Title, setWhy1Title] = useState(initialSettings.why_1_title || "");
  const [why1Desc, setWhy1Desc] = useState(initialSettings.why_1_desc || "");
  const [why2Title, setWhy2Title] = useState(initialSettings.why_2_title || "");
  const [why2Desc, setWhy2Desc] = useState(initialSettings.why_2_desc || "");
  const [why3Title, setWhy3Title] = useState(initialSettings.why_3_title || "");
  const [why3Desc, setWhy3Desc] = useState(initialSettings.why_3_desc || "");

  const [qLoc, setQLoc] = useState("");
  const [qType, setQType] = useState("");
  const [qBudget, setQBudget] = useState("");
  const [formMsg, setFormMsg] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const provs = [...new Set(listingsData.map(l => l.prov))];
  
  const filteredListings = listingsData.filter(l => {
    if (qType && !(l.type || "").includes(qType)) return false;
    if (qLoc && l.prov !== qLoc) return false;
    if (qBudget) {
      const [a, b] = qBudget.split("-").map(Number);
      const m = priceOf(l) / 1e6;
      if (m < a || m >= b) return false;
    }
    return true;
  });

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    alert("คัดลอกแล้ว");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.name || !data.phone) {
      setFormMsg({ text: "กรุณากรอกชื่อและเบอร์โทร เพื่อให้ทีมงานติดต่อกลับได้", type: "error" });
      return;
    }

    if (!GAS_URL || GAS_URL.includes("AKfycb.../exec")) {
      setFormMsg({ text: `(ระบบจำลอง) ขอบคุณคุณ${data.name} ข้อมูลของคุณคือ: สนใจ${data.intent} เบอร์โทร ${data.phone}`, type: "info" });
      return;
    }

    setIsSubmitting(true);
    setFormMsg({ text: "กำลังส่งข้อมูล...", type: "loading" });
    
    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setFormMsg({ text: `ขอบคุณคุณ${data.name} ทีมงานได้รับข้อมูลแล้ว`, type: "success" });
      e.target.reset();
    } catch (err) {
      setFormMsg({ text: "เกิดข้อผิดพลาดในการส่งข้อมูล", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <>
      <header className="site-head">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="ทิพย์มงคล555 Property หน้าแรก">
            <b>ทิพย์มงคล<span>555</span></b>
            <small>PROPERTY</small>
          </a>
          <nav className={`nav ${navOpen ? 'open' : ''}`} id="nav" onClick={() => setNavOpen(false)}>
            <a href="#listings">ประกาศขาย</a>
            <a href="#places">ทำเล</a>
            <a href="#why">มาตรฐานของเรา</a>
            <a href="#steps">ขั้นตอนการซื้อ</a>
            <a href="#contact">ฝากขาย / ติดต่อ</a>
          </nav>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a className="btn btn-tel" href="tel:0977916555">📞 097-791-6555</a>
            <a className="btn btn-line" href="https://line.me/ti/p/~@tmk555" target="_blank" rel="noreferrer">แอดไลน์ @tmk555</a>
          </div>
          <button className="menu-btn" aria-expanded={navOpen} onClick={() => setNavOpen(!navOpen)}>เมนู</button>
        </div>
      </header>

      <main id="top">
        <section className="hero" style={{ padding: 0 }}>
          <img className="bg" src={heroBanner} alt="ภาพวิวมุมสูงภูเขาสลับซับซ้อน" />
          <div className="wrap">
            <p className="eyebrow" style={{ color: "var(--brass-soft)" }}>{heroEyebrow}</p>
            <h1 dangerouslySetInnerHTML={{ __html: heroTitle }}></h1>
            <p className="lead">{heroSubtitle}</p>
            <form className="search" onSubmit={(e) => { e.preventDefault(); document.getElementById('listings').scrollIntoView(); }}>
              <label><span>ทำเล</span>
                <select value={qLoc} onChange={e => setQLoc(e.target.value)}>
                  <option value="">ทุกทำเล</option>
                  {provs.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label><span>ประเภท</span>
                <select value={qType} onChange={e => setQType(e.target.value)}>
                  <option value="">ทุกประเภท</option>
                  <option value="sea">ที่ดินติดทะเล</option>
                  <option value="villa">พูลวิลล่า / บ้านพัก</option>
                  <option value="hill">ที่ดินวิวภูเขา</option>
                  <option value="agri">ที่ดินเพื่อการเกษตร</option>
                  <option value="invest">การลงทุนอสังหาฯ</option>
                  <option value="industry">ที่ดินเพื่ออุตสาหกรรม</option>
                </select>
              </label>
              <label><span>งบประมาณ</span>
                <select value={qBudget} onChange={e => setQBudget(e.target.value)}>
                  <option value="">ไม่จำกัด</option>
                  <option value="0-20">ไม่เกิน 20 ล้าน</option>
                  <option value="20-40">20 – 40 ล้าน</option>
                  <option value="40-80">40 – 80 ล้าน</option>
                  <option value="80-9999">80 ล้านขึ้นไป</option>
                </select>
              </label>
              <button className="btn btn-brass" type="submit">ค้นหาแปลง</button>
            </form>
            <div className="hero-foot">
              <span>ขายเฉพาะที่ดินมีโฉนด (น.ส.4 จ.)</span>
              <span>ภาพโดรนจากหน้างานทุกแปลง</span>
              <span>ดูแลจนโอนที่สำนักงานที่ดิน</span>
            </div>
          </div>
        </section>

        <section id="listings">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow">ประกาศขายล่าสุด</p>
                <h2>แปลงคัดพิเศษ</h2>
              </div>
              <p>ขนาดแสดงแบบเดียวกับในโฉนด คือ ไร่ – งาน – ตารางวา กดที่แปลงเพื่อดูรายละเอียดและคำนวณราคา</p>
            </div>
            <div className="chips" role="group" aria-label="กรองตามประเภท" style={{ flexWrap: 'wrap', gap: '8px' }}>
              <button className="chip" data-type="" aria-pressed={qType === ""} onClick={() => setQType("")}>ทั้งหมด</button>
              <button className="chip" data-type="sea" aria-pressed={qType === "sea"} onClick={() => setQType("sea")}>ที่ดินติดทะเล</button>
              <button className="chip" data-type="villa" aria-pressed={qType === "villa"} onClick={() => setQType("villa")}>พูลวิลล่า / บ้านพัก</button>
              <button className="chip" data-type="hill" aria-pressed={qType === "hill"} onClick={() => setQType("hill")}>ที่ดินวิวภูเขา</button>
              <button className="chip" data-type="agri" aria-pressed={qType === "agri"} onClick={() => setQType("agri")}>เพื่อการเกษตร</button>
              <button className="chip" data-type="invest" aria-pressed={qType === "invest"} onClick={() => setQType("invest")}>เพื่อการลงทุน</button>
              <button className="chip" data-type="industry" aria-pressed={qType === "industry"} onClick={() => setQType("industry")}>เพื่ออุตสาหกรรม</button>
            </div>
            {(qLoc || qBudget) && (
              <p className="result-note">พบ {filteredListings.length} แปลง สำหรับ {qLoc} {qBudget} — <button onClick={() => { setQLoc(""); setQBudget(""); }}>ล้างตัวกรอง</button></p>
            )}
            <div className="grid">
              {filteredListings.length ? filteredListings.map(l => (
                <Link key={l.id} className="card" href={`/property/${l.id}`} aria-label={`ดูรายละเอียด ${l.title}`} style={{textDecoration: 'none', color: 'inherit', display: 'flex'}}>
                  <div className="ph"><img src={l.img} alt={l.title} loading="lazy" /><span className="tag" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '80%' }}>{getTypeDisplay(l.type)}</span></div>
                  <div className="meta">
                    <span className="loc">{l.prov} · {l.area}</span>
                    <h3>{l.title}</h3>
                    <Deed {...l} />
                    <div className="price-row">
                      <span className="price num">{million(priceOf(l))}</span>
                      <span className="ppw num">{l.ppw ? baht(l.ppw) + " บ./ตร.ว." : l.front}</span>
                    </div>
                  </div>
                </Link>
              )) : <div className="empty">ยังไม่มีแปลงที่ตรงกับเงื่อนไขนี้ ลองเปลี่ยนงบหรือทำเล หรือฝากความต้องการไว้ที่ฟอร์มด้านล่าง</div>}
            </div>
          </div>
        </section>

        <section className="band" id="places">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow" style={{ color: "var(--brass-soft)" }}>ทำเลที่เราดูแล</p>
                <h2>จากอันดามันถึงเขาใหญ่</h2>
              </div>
              <p>ทีมของเราลงพื้นที่จริงในทุกทำเล เลือกจังหวัดเพื่อดูแปลงที่ขายอยู่</p>
            </div>
            <div className="dest">
              {provs.map(p => {
                const n = listingsData.filter(l => l.prov === p);
                const min = Math.min(...n.map(priceOf));
                return (
                  <button key={p} onClick={() => { setQLoc(p); document.getElementById('listings').scrollIntoView(); }}>
                    <small>{PLACE_NOTE[p] || ""}</small>
                    <b>{p}</b>
                    <span>{n.length} แปลง · เริ่ม {million(min)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="why">
          <div className="wrap promise">
            <div className="ph"><img src={whyImg} alt={whyTitle} /></div>
            <div>
              <p className="eyebrow">{whyEyebrow}</p>
              <h2>{whyTitle}</h2>
              <ul>
                <li><i>๑</i><div><b>{why1Title}</b><p>{why1Desc}</p></div></li>
                <li><i>๒</i><div><b>{why2Title}</b><p>{why2Desc}</p></div></li>
                <li><i>๓</i><div><b>{why3Title}</b><p>{why3Desc}</p></div></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="steps" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow">ขั้นตอนการซื้อ</p>
                <h2>จากทักไลน์ถึงวันโอน</h2>
              </div>
            </div>
            <ol className="steps">
              <li><b>บอกงบและทำเล</b><p>ทักไลน์หรือกรอกฟอร์ม บอกงบ ขนาด และจังหวัดที่สนใจ</p></li>
              <li><b>รับรายการแปลง</b><p>ส่งแปลงที่ตรงโจทย์พร้อมภาพโดรนและสำเนาโฉนด</p></li>
              <li><b>นัดดูแปลงจริง</b><p>ทีมงานพาไปดูหน้างาน ชี้หมุดเขตที่ดินให้เห็น</p></li>
              <li><b>ทำสัญญาจะซื้อจะขาย</b><p>ตกลงราคา เงินมัดจำ และวันโอนเป็นลายลักษณ์อักษร</p></li>
              <li><b>โอนกรรมสิทธิ์</b><p>ไปสำนักงานที่ดินด้วยกัน ชำระค่าธรรมเนียมและรับโฉนด</p></li>
            </ol>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap contact-grid">
            <div className="contact-info">
              <p className="eyebrow">ติดต่อ / ฝากขาย</p>
              <h2>มีที่ดินริมทะเลอยากขาย หรือกำลังหาแปลงในใจ</h2>
              <p style={{ color: "var(--stone)", maxWidth: "44ch" }}>ฝากรายละเอียดไว้ ทีมงานจะติดต่อกลับภายในวันทำการ หรือทักไลน์เพื่อคุยได้เร็วที่สุด</p>
              <dl>
                <dt>LINE</dt><dd><span>@tmk555</span><button className="copy" onClick={() => handleCopy('@tmk555')}>คัดลอก</button></dd>
                <dt>โทร</dt><dd><span>097-791-6555</span><button className="copy" onClick={() => handleCopy('097-791-6555')}>คัดลอก</button></dd>
                <dt>เว็บไซต์</dt><dd>tmk555.com</dd>
                <dt>เวลาทำการ</dt><dd>ทุกวัน 09:00 – 18:00 น.</dd>
              </dl>
            </div>
            <form className="lead" onSubmit={handleFormSubmit} noValidate>
              <div className="full">
                <p style={{ margin: "0 0 8px", fontSize: ".85rem", color: "var(--stone)" }}>ต้องการ</p>
                <div className="seg">
                  <input type="radio" name="intent" id="iBuy" value="ซื้อ" defaultChecked /><label htmlFor="iBuy">หาซื้อที่ดิน</label>
                  <input type="radio" name="intent" id="iSell" value="ฝากขาย" /><label htmlFor="iSell">ฝากขายที่ดิน</label>
                </div>
              </div>
              <label htmlFor="fName">ชื่อ<input id="fName" name="name" required autoComplete="name" /></label>
              <label htmlFor="fPhone">เบอร์โทร<input id="fPhone" name="phone" required inputMode="tel" autoComplete="tel" /></label>
              <label htmlFor="fArea">ทำเลที่สนใจ
                <select id="fArea" name="area">
                  <option>ยังไม่แน่ใจ</option>
                  {provs.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label htmlFor="fBudget">งบประมาณ
                <select id="fBudget" name="budget">
                  <option>ไม่เกิน 20 ล้าน</option><option>20 – 40 ล้าน</option><option>40 – 80 ล้าน</option><option>80 ล้านขึ้นไป</option>
                </select>
              </label>
              <label className="full" htmlFor="fMsg">รายละเอียดเพิ่มเติม<textarea id="fMsg" name="message" placeholder="เช่น ต้องการติดหาด หน้ากว้าง 40 เมตรขึ้นไป" /></label>
              <div className="full"><button className="btn btn-brass" type="submit" disabled={isSubmitting}>ส่งข้อมูลให้ทีมงาน</button></div>
              {formMsg.text && <p className={`form-msg ${formMsg.type}`}>{formMsg.text}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <a className="brand" href="#top"><b>ทิพย์มงคล<span>555</span></b><small>PROPERTY</small></a>
          <span>© 2569 ทิพย์มงคล555 Property · <Link href="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>tmk555.com</Link> · โทร: 097-791-6555</span>
        </div>
      </footer>

      <div className="fab" style={{ display: 'flex', flexDirection: 'column', gap: '8px', bottom: '24px', right: '24px', position: 'fixed', zIndex: 100 }}>
        <a className="btn btn-tel" href="tel:0977916555" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>📞 โทรเลย</a>
        <a className="btn btn-line" href="https://line.me/ti/p/~@tmk555" target="_blank" rel="noreferrer" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>แอดไลน์</a>
      </div>


    </>
  );
}
