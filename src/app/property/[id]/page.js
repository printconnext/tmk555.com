"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { LISTINGS, toWa, priceOf, baht, million, getTypeDisplay, Deed } from "@/utils/helpers";

export default function PropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(null);
  const [cWa, setCWa] = useState(0);
  const [relatedListings, setRelatedListings] = useState([]);
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true);
      try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
          const { data, error } = await supabase.from('listings').select('*').eq('id', id).single();
          if (!error && data) {
            setProperty(data);
            setActiveImg(data.img);
            setCWa(toWa(data));
            
            // ดึงแปลงที่เกี่ยวข้อง (เอาทำเลเดียวกัน หรือประเภทเดียวกันที่สุ่มมา 3-4 แปลง)
            const { data: related } = await supabase.from('listings').select('*').neq('id', id).limit(4);
            if (related) setRelatedListings(related);
            
            // ดึงอีเมลรับข้อความ
            const { data: setArr } = await supabase.from('settings').select('*').eq('key', 'contact_email').single();
            if (setArr && setArr.value) setContactEmail(setArr.value);

            setLoading(false);
            return;
          }
        }
        
        // Fallback to LISTINGS
        const found = LISTINGS.find(l => l.id.toString() === id);
        if (found) {
          setProperty(found);
          setActiveImg(found.img);
          setCWa(toWa(found));
          setRelatedListings(LISTINGS.filter(l => l.id.toString() !== id).slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchProperty();
  }, [id]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const newMessage = {
      id: Date.now(),
      date: new Date().toLocaleString('th-TH'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      subject: formData.get('_subject'),
      link: window.location.href
    };

    try {
      // ดึงกล่องข้อความเดิม
      const { data } = await supabase.from('settings').select('value').eq('key', 'inbox').single();
      let inbox = [];
      if (data && data.value) {
        try { inbox = JSON.parse(data.value); } catch(err){}
      }
      
      // เพิ่มข้อความใหม่ไปข้างบนสุด
      inbox.unshift(newMessage);
      
      // บันทึกกลับลงไป
      if (data) {
        await supabase.from('settings').update({ value: JSON.stringify(inbox) }).eq('key', 'inbox');
      } else {
        await supabase.from('settings').insert([{ key: 'inbox', value: JSON.stringify(inbox) }]);
      }
      
      alert('ส่งข้อความสำเร็จ ทีมงานได้รับข้อความของคุณแล้วและจะติดต่อกลับโดยเร็วที่สุด');
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองใหม่อีกครั้ง หรือติดต่อทาง Line');
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: 'var(--salt)' }}>กำลังโหลดข้อมูล...</div>;
  }

  if (!property) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: 'var(--salt)', textAlign: 'center' }}>
        <div>
          <h2>ไม่พบข้อมูลแปลงที่ดิน</h2>
          <p>แปลงที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่ในระบบ</p>
          <Link href="/" className="btn btn-brass" style={{ marginTop: '16px' }}>กลับหน้าหลัก</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="site-head" style={{ position: 'relative', background: 'var(--ink)' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": property.title,
            "image": [property.img, ...(property.gallery || [])],
            "description": `ขายที่ดิน ${property.title} ทำเล ${property.prov} เอกสารสิทธิ์ ${property.deed}`,
            "offers": {
              "@type": "Offer",
              "url": `https://tmk555.com/property/${property.id}`,
              "priceCurrency": "THB",
              "price": property.total || (property.ppw * toWa(property)) || 0,
              "availability": "https://schema.org/InStock"
            }
          }) }}
        />
        <div className="wrap">
          <Link className="brand" href="/">
            <b>ทิพย์มงคล<span>555</span></b>
            <small>PROPERTY</small>
          </Link>
          <nav className="nav">
            <Link href="/#listings">ประกาศขาย</Link>
            <Link href="/#places">ทำเล</Link>
            <Link href="/#contact">ฝากขาย / ติดต่อ</Link>
          </nav>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a className="btn btn-tel" href="tel:0977916555">📞 097-791-6555</a>
            <a className="btn btn-line" href="https://line.me/ti/p/~@tmk555" target="_blank" rel="noreferrer">แอดไลน์ @tmk555</a>
          </div>
        </div>
      </header>

      <main style={{ background: 'var(--salt)', minHeight: 'calc(100vh - 80px)', padding: '40px 0' }}>
        <div className="wrap">
          <Link href="/#listings" style={{ display: 'inline-block', marginBottom: '24px', color: 'var(--stone)', textDecoration: 'none' }}>
            ← กลับไปดูรายการทั้งหมด
          </Link>
          
          <div style={{ background: 'var(--paper)', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div className="m-grid">
              <div className="gallery-section" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
                <div className="ph main-ph" style={{ minHeight: 'auto', aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={activeImg || property.img} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {(property.gallery && property.gallery.length > 0) && (
                  <div className="gallery-thumbs" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '16px' }}>
                    <img src={property.img} onClick={() => setActiveImg(property.img)} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', cursor: 'pointer', borderRadius: '4px', border: activeImg === property.img ? '3px solid var(--brass)' : '1px solid var(--line)' }} alt="Main" />
                    {property.gallery.map((gImg, i) => (
                      <img key={i} src={gImg} onClick={() => setActiveImg(gImg)} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', cursor: 'pointer', borderRadius: '4px', border: activeImg === gImg ? '3px solid var(--brass)' : '1px solid var(--line)' }} alt={`Gallery ${i+1}`} />
                    ))}
                  </div>
                )}
              </div>
              <div className="m-body" style={{ padding: '40px' }}>
                <p className="eyebrow">{property.prov} · {property.area} · {getTypeDisplay(property.type)}</p>
                <h3 style={{ fontSize: "2rem", marginBottom: '16px' }}>{property.title}</h3>
                <Deed {...property} />

                {/* กล่องราคาและเงื่อนไข (อยู่ใต้ข้อมูลขนาดพื้นที่ทันที) */}
                <div className="calc" style={{ margin: '20px 0', border: '1px solid var(--line)' }}>
                  {property.ppw ? (
                    <>
                      {/* ราคาต่อไร่ - โดดเด่นเป็นพิเศษ */}
                      <div className="row" style={{ alignItems: 'baseline', paddingBottom: '10px', borderBottom: '1px solid var(--line)' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--ink)' }}>ราคาต่อไร่</span>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.9rem', fontWeight: 'bold', color: 'var(--brass)' }}>
                            {baht(property.ppw * 400)}
                          </span>
                          <span style={{ fontSize: '0.95rem', color: 'var(--stone)', marginLeft: '6px' }}>บาท / ไร่</span>
                          {property.ppw * 400 >= 1000000 && (
                            <span style={{ display: 'block', fontSize: '0.85rem', color: '#10b981', fontWeight: 'bold' }}>
                              ({(property.ppw * 400 / 1e6).toLocaleString('th-TH', { maximumFractionDigits: 2 })} ล้านบาท / ไร่)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="row" style={{ paddingTop: '8px' }}>
                        <span>ราคาต่อตารางวา</span>
                        <span className="num" style={{ fontWeight: 'bold' }}>{baht(property.ppw)} บาท</span>
                      </div>
                      <div className="row" style={{ alignItems: 'baseline', paddingTop: '6px' }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--ink)' }}>ราคารวมทั้งแปลง (ขายยกแปลง)</span>
                        <div style={{ textAlign: 'right' }}>
                          <span className="num" style={{ fontWeight: 'bold', fontSize: '1.35rem', color: 'var(--ink)' }}>
                            {million(property.total || (toWa(property) * property.ppw))}
                          </span>
                          {(property.total || (toWa(property) * property.ppw)) && (
                            <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--stone)' }}>
                              ({baht(property.total || (toWa(property) * property.ppw))} บาท)
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row" style={{ alignItems: "baseline", paddingBottom: '10px', borderBottom: '1px solid var(--line)' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--ink)' }}>ราคาขาย</span>
                        <span className="total num" style={{ color: 'var(--brass)', fontSize: '1.9rem' }}>{baht(property.total)} บาท</span>
                      </div>
                      <div className="row" style={{ paddingTop: '8px' }}>
                        <span>เฉลี่ยต่อตารางวา (รวมบ้าน)</span>
                        <span className="num">{baht(Math.round(property.total / toWa(property)))} บาท</span>
                      </div>
                    </>
                  )}

                  {/* ป้ายรับนายหน้าต่อรองราคาได้ - เด่นสะดุดตาใต้ราคา */}
                  <div style={{
                    marginTop: '14px',
                    padding: '12px 16px',
                    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                    border: '2px solid #10b981',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(16, 185, 129, 0.15)',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.4rem' }}>🤝</span>
                      <div>
                        <span style={{ display: 'block', fontWeight: '800', color: '#065f46', fontSize: '1rem' }}>
                          รับนายหน้า · ต่อรองราคาได้
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#047857' }}>
                          ยินดีร่วมงานกับนายหน้าทุกท่าน
                        </span>
                      </div>
                    </div>
                    <span style={{
                      background: '#10b981',
                      color: 'white',
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}>
                      ยินดีร่วมงาน
                    </span>
                  </div>
                </div>

                <dl className="specs" style={{ marginTop: '24px' }}>
                  <dt>เอกสารสิทธิ์</dt><dd>{property.deed}</dd>
                  <dt>เนื้อที่รวม</dt><dd>{baht(toWa(property))} ตร.ว. ({baht(toWa(property) * 4)} ตร.ม.)</dd>
                  <dt>ทางเข้าออก</dt><dd>{property.road}</dd>
                  <dt>สาธารณูปโภค</dt><dd>{property.util}</dd>
                  <dt>หน้ากว้าง / พื้นที่</dt><dd>{property.front}</dd>
                  {property.map_url && (
                    <>
                      <dt>พิกัด</dt>
                      <dd>
                        <a href={property.map_url} target="_blank" rel="noreferrer" style={{ color: 'var(--brass)', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          📍 ดูบน Google Maps
                        </a>
                      </dd>
                    </>
                  )}
                </dl>
                <ul className="feat" style={{ margin: '24px 0' }}>
                  {property.feat && property.feat.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a className="btn btn-tel" href="tel:0977916555" style={{ width: '100%', textAlign: 'center', display: 'block' }}>📞 โทรสอบถาม: 097-791-6555</a>
                  <a className="btn btn-brass" href="https://line.me/ti/p/~@tmk555" target="_blank" rel="noreferrer" style={{ width: '100%', textAlign: 'center', display: 'block' }}>💬 สอบถามแปลงนี้ทางไลน์</a>
                </div>
              </div>
            </div>

            {/* Full-width Contact Form */}
            <div style={{ borderTop: '1px solid var(--line)', padding: '40px', background: '#fafafa' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  ส่งข้อความถึงผู้ขาย
                </h3>
                <p style={{ color: 'var(--stone)', margin: '8px 0 0' }}>ฝากข้อมูลติดต่อกลับ ทีมงานจะรีบติดต่อกลับโดยเร็วที่สุด</p>
              </div>

              <form onSubmit={handleContactSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '15px', color: 'var(--ink)', fontWeight: 'bold' }}>ชื่อ</label>
                    <input type="text" name="name" required style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '16px', background: 'white' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '15px', color: 'var(--ink)', fontWeight: 'bold' }}>อีเมล</label>
                    <input type="email" name="email" required style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '16px', background: 'white' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '15px', color: 'var(--ink)', fontWeight: 'bold' }}>โทรศัพท์</label>
                    <input type="tel" name="phone" required style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '16px', background: 'white' }} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '15px', color: 'var(--ink)', fontWeight: 'bold' }}>รายละเอียด</label>
                    <textarea name="message" required style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '16px', flexGrow: 1, resize: 'vertical', background: 'white' }} placeholder="สนใจแปลงนี้..."></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn btn-brass" style={{ width: '100%', padding: '14px', fontSize: '16px', opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
                  </button>
                  <input type="hidden" name="_subject" value={`สนใจที่ดิน: ${property.title} (${property.id})`} />
                </div>
              </form>
            </div>
          </div>
          
          {relatedListings && relatedListings.length > 0 && (
            <div style={{ marginTop: '64px' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--ink)', marginBottom: '24px', borderBottom: '2px solid var(--brass)', paddingBottom: '12px', display: 'inline-block' }}>อสังหาริมทรัพย์ที่เกี่ยวข้อง</h2>
              <div className="grid">
                {relatedListings.map(l => (
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
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <footer style={{ background: "var(--ink)", color: "rgba(238,240,234,.75)", padding: "50px 0 30px" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "36px", marginBottom: "36px" }}>
          {/* Column 1: Brand Info */}
          <div>
            <Link className="brand" href="/" style={{ color: "var(--salt)", textDecoration: "none", display: "inline-block", marginBottom: "14px" }}>
              <b style={{ fontSize: "1.35rem" }}>ทิพย์มงคล<span style={{ color: "var(--brass)" }}>555</span></b>
              <small style={{ display: "block", letterSpacing: "2px", fontSize: "0.75rem", color: "var(--brass-soft)" }}>PROPERTY</small>
            </Link>
            <p style={{ fontSize: "0.88rem", lineHeight: "1.6", color: "rgba(238,240,234,.7)", margin: "0 0 14px 0" }}>
              ตัวแทนคัดสรรที่ดินริมทะเล วิวภูเขา และพูลวิลล่า ตรวจสอบโฉนดและทางเข้าออกชัดเจน พร้อมดูแลจนถึงวันโอนกรรมสิทธิ์
            </p>
            <div style={{ fontSize: "0.88rem", color: "rgba(238,240,234,.8)" }}>
              📞 โทร: <a href="tel:0977916555" style={{ color: "var(--salt)", textDecoration: "none", fontWeight: "bold" }}>097-791-6555</a>
            </div>
          </div>

          {/* Column 2: Affiliated Businesses */}
          <div>
            <h4 style={{ color: "var(--salt)", fontSize: "1rem", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,.15)", paddingBottom: "8px" }}>
              🔗 ธุรกิจในเครือทิพย์มงคล 555
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
              <li>
                <a 
                  href="https://555carwash.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: "var(--salt)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.9rem" }}
                >
                  <span style={{ fontSize: "1.2rem" }}>🚗</span>
                  <div>
                    <strong style={{ display: "block", color: "var(--salt)" }}>555 Car Wash</strong>
                    <span style={{ fontSize: "0.8rem", color: "rgba(238,240,234,.6)" }}>ศูนย์บริการล้างรถและอุปกรณ์มาตรฐาน ↗</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.thipmongkol555.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: "var(--salt)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.9rem" }}
                >
                  <span style={{ fontSize: "1.2rem" }}>🏢</span>
                  <div>
                    <strong style={{ display: "block", color: "var(--salt)" }}>บริษัท ทิพย์มงคล 555 จำกัด</strong>
                    <span style={{ fontSize: "0.8rem", color: "rgba(238,240,234,.6)" }}>ผลิตภัณฑ์เพื่อสุขภาพและธรรมะออนไลน์ ↗</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h4 style={{ color: "var(--salt)", fontSize: "1rem", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,.15)", paddingBottom: "8px" }}>
              📍 ข้อมูลติดต่อ
            </h4>
            <div style={{ fontSize: "0.88rem", lineHeight: "1.8", color: "rgba(238,240,234,.7)" }}>
              <div>LINE: <a href="https://line.me/ti/p/~@tmk555" target="_blank" rel="noreferrer" style={{ color: "var(--brass)", textDecoration: "none" }}>@tmk555</a></div>
              <div>เวลาทำการ: ทุกวัน 09:00 – 18:00 น.</div>
              <div>เว็บไซต์: <span style={{ color: "var(--salt)" }}>tmk555.com</span></div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="wrap" style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: "18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "0.82rem" }}>
          <span>© 2569 ทิพย์มงคล555 Property สงวนลิขสิทธิ์ทั้งหมด</span>
          <span><Link href="/admin" style={{ color: "rgba(238,240,234,.5)", textDecoration: "none" }}>เข้าสู่ระบบจัดการหลังบ้าน</Link></span>
        </div>
      </footer>
    </>
  );
}
