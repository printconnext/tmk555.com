"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [activeTab, setActiveTab] = useState('listings');
  
  // โหมดของฟอร์ม (สร้างใหม่ หรือ แก้ไข)
  const [listings, setListings] = useState([]);
  const [mode, setMode] = useState('create'); // 'create' | 'edit'
  
  const defaultForm = {
    title: '', prov: '', area: '', type: ['sea'], 
    rai: 0, ngan: 0, wa: 0, ppw: '', total: '', 
    road: '', util: '', front: '', feat: '', deed: 'โฉนด น.ส.4 จ.', map_url: ''
  };
  
  const [form, setForm] = useState(defaultForm);
  const [imageFile, setImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  // ตั้งค่าหน้าแรก (Hero)
  const [heroBanner, setHeroBanner] = useState('');
  const [bannerFile, setBannerFile] = useState(null);
  const [heroEyebrow, setHeroEyebrow] = useState('ที่ดินริมทะเล · พูลวิลล่า · บ้านพักตากอากาศ');
  const [heroTitle, setHeroTitle] = useState('ที่ดินริมทะเล<br /><em>ตรวจโฉนดแล้ว</em>ทุกแปลง');
  const [heroSubtitle, setHeroSubtitle] = useState('เราคัดเฉพาะแปลงที่มีโฉนด ทางเข้าออกชัดเจน และถ่ายภาพโดรนจากหน้างานจริง ทั้งอันดามัน อ่าวไทย และวิวภูเขา');
  
  const [whyEyebrow, setWhyEyebrow] = useState('มาตรฐานทิพย์มงคล555');
  const [whyTitle, setWhyTitle] = useState('ก่อนลงประกาศ เราตรวจให้ครบ 3 เรื่อง');
  const [whyImg, setWhyImg] = useState('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800');
  const [whyFile, setWhyFile] = useState(null);
  const [why1Title, setWhy1Title] = useState('เอกสารสิทธิ์');
  const [why1Desc, setWhy1Desc] = useState('ตรวจสารบัญโฉนดที่สำนักงานที่ดิน ดูภาระจำนองและชื่อเจ้าของให้ตรงกับผู้ขาย');
  const [why2Title, setWhy2Title] = useState('ทางเข้าออกและสาธารณูปโภค');
  const [why2Desc, setWhy2Desc] = useState('ยืนยันว่ามีทางสาธารณะหรือภาระจำยอม รวมถึงระยะไฟฟ้าและประปาถึงแปลง');
  const [why3Title, setWhy3Title] = useState('หน้างานจริง');
  const [why3Desc, setWhy3Desc] = useState('ถ่ายโดรนมุมสูงและวัดหน้ากว้างติดถนนหรือติดหาด ให้ภาพตรงกับที่ไปเห็นจริง');
  
  const [contactEmail, setContactEmail] = useState('');
  const [inbox, setInbox] = useState([]);
  
  const [savingBanner, setSavingBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('tmk_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setIsConfigured(true);
      fetchListings();
      fetchSettings();
    }
  }, []);

  async function fetchSettings() {
    const { data } = await supabase.from('settings').select('*');
    if (data) {
      const s = Object.fromEntries(data.map(x => [x.key, x.value]));
      if (s.hero_banner) setHeroBanner(s.hero_banner);
      if (s.hero_eyebrow) setHeroEyebrow(s.hero_eyebrow);
      if (s.hero_title) setHeroTitle(s.hero_title);
      if (s.hero_subtitle) setHeroSubtitle(s.hero_subtitle);
      
      if (s.why_eyebrow) setWhyEyebrow(s.why_eyebrow);
      if (s.why_title) setWhyTitle(s.why_title);
      if (s.why_img) setWhyImg(s.why_img);
      if (s.why_1_title) setWhy1Title(s.why_1_title);
      if (s.why_1_desc) setWhy1Desc(s.why_1_desc);
      if (s.why_2_title) setWhy2Title(s.why_2_title);
      if (s.why_2_desc) setWhy2Desc(s.why_2_desc);
      if (s.why_3_title) setWhy3Title(s.why_3_title);
      if (s.why_3_desc) setWhy3Desc(s.why_3_desc);
      if (s.contact_email) setContactEmail(s.contact_email);
      if (s.inbox) {
        try { setInbox(JSON.parse(s.inbox)); } catch(e){}
      }
    }
  }

  async function handleSettingsSave(e) {
    e.preventDefault();
    setSavingBanner(true);
    try {
      let imgUrl = heroBanner;
      if (bannerFile) {
        const fileExt = bannerFile.name.split('.').pop();
        const fileName = `banner/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('property-images').upload(fileName, bannerFile);
        if (uploadError) throw new Error('อัปโหลดรูปล้มเหลว: ' + uploadError.message);
        
        const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);
        imgUrl = data.publicUrl;
      }
      
      let wImgUrl = whyImg;
      if (whyFile) {
        const fileExt = whyFile.name.split('.').pop();
        const fileName = `banner/${Date.now()}_why.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('property-images').upload(fileName, whyFile);
        if (uploadError) throw new Error('อัปโหลดรูปล้มเหลว: ' + uploadError.message);
        const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);
        wImgUrl = data.publicUrl;
      }
      
      // บันทึกลงตาราง settings
      const updates = [
        { key: 'hero_banner', value: imgUrl },
        { key: 'hero_eyebrow', value: heroEyebrow },
        { key: 'hero_title', value: heroTitle },
        { key: 'hero_subtitle', value: heroSubtitle },
        { key: 'why_img', value: wImgUrl },
        { key: 'why_eyebrow', value: whyEyebrow },
        { key: 'why_title', value: whyTitle },
        { key: 'why_1_title', value: why1Title },
        { key: 'why_1_desc', value: why1Desc },
        { key: 'why_2_title', value: why2Title },
        { key: 'why_2_desc', value: why2Desc },
        { key: 'why_3_title', value: why3Title },
        { key: 'why_3_desc', value: why3Desc },
        { key: 'contact_email', value: contactEmail }
      ];

      for (const item of updates) {
        if (!item.value && (item.key === 'hero_banner' || item.key === 'why_img')) continue; // ข้ามถ้าไม่มีรูป
        
        const { error } = await supabase.from('settings').upsert({ key: item.key, value: item.value }, { onConflict: 'key' });
        if (error) {
          // ถ้า upsert ไม่ได้ ลองใช้วิธีอัปเดต/เพิ่มตรงๆ
          const { data: existing } = await supabase.from('settings').select('*').eq('key', item.key);
          if (existing && existing.length > 0) {
            await supabase.from('settings').update({ value: item.value }).eq('key', item.key);
          } else {
            await supabase.from('settings').insert([{ key: item.key, value: item.value }]);
          }
        }
      }
      
      setHeroBanner(imgUrl);
      setBannerFile(null);
      setWhyImg(wImgUrl);
      setWhyFile(null);
      alert('บันทึกการตั้งค่าหน้าเว็บสำเร็จ!');
    } catch(err) {
      alert('เกิดข้อผิดพลาดในการบันทึกการตั้งค่า: ' + err.message);
    }
    setSavingBanner(false);
  }

  async function fetchListings() {
    const { data, error } = await supabase.from('listings').select('*').order('id', { ascending: false });
    if (!error && data) {
      setListings(data);
    }
  }

  const handleEdit = (item) => {
    setMode('edit');
    setForm({
      id: item.id,
      title: item.title || '', prov: item.prov || '', area: item.area || '', 
      type: typeof item.type === 'string' ? item.type.split(',').filter(Boolean) : (item.type || ['sea']),
      rai: item.rai || 0, ngan: item.ngan || 0, wa: item.wa || 0, 
      ppw: item.ppw || '', total: item.total || '',
      road: item.road || '', util: item.util || '', front: item.front || '', 
      feat: item.feat ? item.feat.join(', ') : '', 
      deed: item.deed || 'โฉนด น.ส.4 จ.',
      img: item.img || '',
      gallery: item.gallery || [],
      map_url: item.map_url || ''
    });
    // เคลียร์ไฟล์ที่รออัปโหลด
    setImageFile(null);
    setGalleryFiles([]);
    window.scrollTo(0, 0); // เลื่อนจอขึ้นบนสุด
  };

  const handleCreateNew = () => {
    setMode('create');
    setForm(defaultForm);
    setImageFile(null);
    setGalleryFiles([]);
  };

  async function handleDelete(id) {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบแปลงนี้? (ไม่สามารถกู้คืนได้)')) {
      await supabase.from('listings').delete().eq('id', id);
      alert('ลบเรียบร้อยแล้ว');
      fetchListings();
      if (form.id === id) handleCreateNew();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isConfigured) return alert("กรุณาตั้งค่าฐานข้อมูล Supabase ก่อนครับ (ติดต่อทีมพัฒนา)");
    
    setLoading(true);
    let imgUrl = form.img || ""; // ถ้าแก้ไข จะใช้รูปเดิมเป็นค่าเริ่มต้น
    let galleryUrls = form.gallery || [];
    
    try {
      // อัปโหลดรูปภาพหลัก (ถ้ามีการเลือกรูปใหม่)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('property-images').upload(fileName, imageFile);
        if (uploadError) throw new Error('อัปโหลดรูปล้มเหลว: ' + uploadError.message);
        
        const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);
        imgUrl = data.publicUrl;
      }

      // อัปโหลดรูปภาพประกอบ (Gallery) ถ้ามีการเลือกรูปใหม่
      if (galleryFiles && galleryFiles.length > 0) {
        let newGalleryUrls = [];
        const maxFiles = Math.min(galleryFiles.length, 10);
        for (let i = 0; i < maxFiles; i++) {
          const file = galleryFiles[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `gallery/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage.from('property-images').upload(fileName, file);
          if (!uploadError) {
            const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);
            newGalleryUrls.push(data.publicUrl);
          }
        }
        // นำรูปเก่าที่เหลืออยู่ มารวมกับรูปใหม่ที่เพิ่งอัปโหลด
        galleryUrls = [...(form.gallery || []), ...newGalleryUrls];
      } else {
        // ถ้าไม่มีการเลือกไฟล์ใหม่เลย ก็ใช้รูปเก่าที่เหลืออยู่
        galleryUrls = form.gallery || [];
      }

      // เตรียมข้อมูลบันทึก
      const payload = { 
        ...form,
        // type แปลง array เป็น string เวลาเซฟลงฐานข้อมูล
        type: Array.isArray(form.type) ? form.type.join(',') : form.type,
        rai: form.rai === '' ? 0 : Number(form.rai),
        ngan: form.ngan === '' ? 0 : Number(form.ngan),
        wa: form.wa === '' ? 0 : Number(form.wa),
        ppw: form.ppw === '' ? null : Number(form.ppw),
        total: form.total === '' ? null : Number(form.total),
        img: imgUrl,
        gallery: galleryUrls,
        feat: form.feat.split(',').map(f => f.trim()).filter(Boolean),
        map_url: form.map_url || null
      };

      if (mode === 'edit') {
        const { id, ...updateData } = payload;
        const { error } = await supabase.from('listings').update(updateData).eq('id', id);
        if (error) throw error;
        alert('อัปเดตข้อมูลเรียบร้อยแล้ว!');
      } else {
        const { id, ...insertData } = payload;
        const { error } = await supabase.from('listings').insert([insertData]);
        if (error) throw error;
        alert('เพิ่มแปลงที่ดินใหม่เรียบร้อยแล้ว!');
      }
      
      setLoading(false);
      handleCreateNew(); // กลับสู่โหมดเพิ่มข้อมูล
      fetchListings(); // รีเฟรชรายการ
      
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeToggle = (typeVal) => {
    setForm(prev => {
      const currentTypes = Array.isArray(prev.type) ? prev.type : (prev.type ? prev.type.split(',') : []);
      if (currentTypes.includes(typeVal)) {
        return { ...prev, type: currentTypes.filter(t => t !== typeVal) };
      } else {
        return { ...prev, type: [...currentTypes, typeVal] };
      }
    });
  };

  const typeOptions = [
    { id: 'sea', label: 'ที่ดินติดทะเล' },
    { id: 'villa', label: 'พูลวิลล่า / บ้านพัก' },
    { id: 'hill', label: 'ที่ดินวิวภูเขา' },
    { id: 'agri', label: 'ที่ดินเพื่อการเกษตร' },
    { id: 'invest', label: 'ที่ดินเพื่อการลงทุนอสังหาฯ' },
    { id: 'industry', label: 'ที่ดินเพื่ออุตสาหกรรม' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === '0804018888') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('tmk_admin_auth', 'true');
      }
    } else {
      alert('รหัสผ่านไม่ถูกต้อง');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#f5f7fa', fontFamily: 'sans-serif' }}>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', minWidth: '320px' }}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', color: '#111827' }}>🔒 เข้าสู่ระบบ Admin</h2>
          <input 
            type="password" 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)} 
            placeholder="รหัสผ่าน..."
            style={{ width: '100%', padding: '12px 16px', marginBottom: '20px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px', boxSizing: 'border-box' }}
            autoFocus
          />
          <button type="submit" style={{ width: '100%', padding: '12px', fontSize: '16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-wrapper" style={{ padding: '20px', fontFamily: 'sans-serif', background: '#f5f7fa', minHeight: '100vh' }}>
      <style>{`
        .admin-layout { display: flex; gap: 24px; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; }
        .admin-form-col { flex: 2; min-width: 300px; background: white; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .admin-list-col { flex: 1; min-width: 300px; background: white; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); align-self: flex-start; position: sticky; top: 20px; max-height: calc(100vh - 40px); display: flex; flex-direction: column; }
        .admin-input { width: 100%; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; margin-top: 4px; }
        .admin-btn { padding: 10px 16px; border: none; border-radius: 4px; cursor: pointer; color: white; font-weight: bold; }
        .admin-btn-primary { background: #10b981; }
        .admin-btn-edit { background: #3b82f6; }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .admin-list-item { display: flex; gap: 12px; border: 1px solid #eee; padding: 12px; border-radius: 6px; margin-bottom: 12px; background: #fafafa; }
        .admin-tab-btn { padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem; font-weight: bold; transition: all 0.2s; }
        .admin-tab-active { background: #10b981; color: white; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2); }
        .admin-tab-inactive { background: white; color: #4b5563; border: 1px solid #e5e7eb; }
        .admin-tab-inactive:hover { background: #f9fafb; }
      `}</style>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto 24px', display: 'flex', gap: '12px' }}>
        <button onClick={() => setActiveTab('listings')} className={`admin-tab-btn ${activeTab === 'listings' ? 'admin-tab-active' : 'admin-tab-inactive'}`}>
          📋 จัดการแปลงที่ดิน
        </button>
        <button onClick={() => setActiveTab('inbox')} className={`admin-tab-btn ${activeTab === 'inbox' ? 'admin-tab-active' : 'admin-tab-inactive'}`}>
          📩 กล่องข้อความ{inbox && inbox.length > 0 ? ` (${inbox.length})` : ''}
        </button>
        <button onClick={() => setActiveTab('settings')} className={`admin-tab-btn ${activeTab === 'settings' ? 'admin-tab-active' : 'admin-tab-inactive'}`}>
          ⚙️ ตั้งค่าหน้าเว็บ
        </button>
      </div>

      {!isConfigured && (
        <div style={{ maxWidth: '1200px', margin: '0 auto 24px' }} className="bg-amber-50 border-l-4 border-amber-500 p-4">
          <p className="text-amber-700">รอการเชื่อมต่อฐานข้อมูล Supabase...</p>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="admin-layout" style={{ maxWidth: '900px' }}>
          <div className="admin-form-col">
            <form onSubmit={handleSettingsSave} style={{ marginBottom: '32px' }}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.2rem', margin: '0 0 16px 0', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>⚙️ ตั้งค่าหน้าแรก (Hero Section)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>ข้อความบรรทัดบน (Eyebrow)</label>
                  <input type="text" value={heroEyebrow} onChange={(e) => setHeroEyebrow(e.target.value)} className="admin-input" />
                </div>
              </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>พาดหัวหลัก (Title)</label>
                <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="admin-input" />
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>ใช้โค้ด HTML ได้ เช่น <code>&lt;br /&gt;</code> เพื่อขึ้นบรรทัดใหม่ หรือ <code>&lt;em&gt;ข้อความ&lt;/em&gt;</code> สำหรับตัวเอียงสีทอง</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>ข้อความอธิบาย (Subtitle)</label>
                <textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="admin-input" rows="3"></textarea>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '8px 0' }} />

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ width: '120px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>ภาพปก (Banner)</label>
                {heroBanner && <img src={heroBanner} style={{ width: '120px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />}
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files[0])} className="admin-input" />
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>แนะนำรูปแนวนอน ขนาดประมาณ 1920x1080px (เลือกไฟล์ใหม่หากต้องการเปลี่ยน)</p>
              </div>
            </div>
            
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.2rem', margin: '0 0 16px 0', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>⚙️ ตั้งค่ามาตรฐาน (Why Choose Us)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div className="admin-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>ข้อความบรรทัดบน (Eyebrow)</label>
                  <input type="text" value={whyEyebrow} onChange={(e) => setWhyEyebrow(e.target.value)} className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>พาดหัวหลัก (Title)</label>
                  <input type="text" value={whyTitle} onChange={(e) => setWhyTitle(e.target.value)} className="admin-input" />
                </div>
              </div>

              <div className="admin-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>ข้อ 1: หัวข้อ</label>
                  <input type="text" value={why1Title} onChange={(e) => setWhy1Title(e.target.value)} className="admin-input" />
                  <textarea value={why1Desc} onChange={(e) => setWhy1Desc(e.target.value)} className="admin-input" rows="2" style={{ marginTop: '8px' }}></textarea>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>ข้อ 2: หัวข้อ</label>
                  <input type="text" value={why2Title} onChange={(e) => setWhy2Title(e.target.value)} className="admin-input" />
                  <textarea value={why2Desc} onChange={(e) => setWhy2Desc(e.target.value)} className="admin-input" rows="2" style={{ marginTop: '8px' }}></textarea>
                </div>
              </div>

              <div className="admin-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>ข้อ 3: หัวข้อ</label>
                  <input type="text" value={why3Title} onChange={(e) => setWhy3Title(e.target.value)} className="admin-input" />
                  <textarea value={why3Desc} onChange={(e) => setWhy3Desc(e.target.value)} className="admin-input" rows="2" style={{ marginTop: '8px' }}></textarea>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '80px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>รูปประกอบ</label>
                    {whyImg && <img src={whyImg} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <input type="file" accept="image/*" onChange={(e) => setWhyFile(e.target.files[0])} className="admin-input" />
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>รูปแนวตั้ง</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.2rem', margin: '0 0 16px 0', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>✉️ ตั้งค่าการรับข้อความติดต่อ</h2>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>ระบบข้อความได้ถูกอัปเกรดแล้ว! ตอนนี้ข้อความจากลูกค้าจะถูกบันทึกและแสดงในแท็บ <b>"📩 กล่องข้อความ"</b> ด้านบนโดยตรง ไม่ต้องใช้อีเมลหรือยืนยัน FormSubmit อีกต่อไป</p>
              </div>
            </div>
          </div>
          
          <button type="submit" disabled={savingBanner} className="admin-btn admin-btn-primary" style={{ opacity: savingBanner ? 0.5 : 1, width: '100%', padding: '12px', fontSize: '1.1rem' }}>
            {savingBanner ? 'กำลังบันทึก...' : '💾 บันทึกการตั้งค่าหน้าเว็บ (ส่วนบน & มาตรฐาน)'}
          </button>
        </form>
          </div>
        </div>
      )}

      {activeTab === 'listings' && (
        <div className="admin-layout">
          <div className="admin-form-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
              <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
                {mode === 'edit' ? '✏️ แก้ไขข้อมูลแปลงที่ดิน' : '🏠 เพิ่มแปลงที่ดินใหม่'}
              </h1>
              {mode === 'edit' && (
                <button onClick={handleCreateNew} style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  + สร้างแปลงใหม่
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit}>
          
          <div className="admin-grid">
            <div>
              <label>หัวข้อประกาศ <span style={{color:'red'}}>*</span></label>
              <input type="text" name="title" required value={form.title} onChange={handleChange} className="admin-input" />
            </div>
            <div>
              <label>จังหวัด <span style={{color:'red'}}>*</span></label>
              <input type="text" name="prov" required value={form.prov} onChange={handleChange} className="admin-input" />
            </div>
            <div>
              <label>ทำเล / ย่าน <span style={{color:'red'}}>*</span></label>
              <input type="text" name="area" required value={form.area} onChange={handleChange} className="admin-input" />
            </div>
          </div>

          <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold' }}>ประเภทที่ดิน (เลือกได้มากกว่า 1 ข้อ)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {typeOptions.map(opt => {
                const isChecked = Array.isArray(form.type) ? form.type.includes(opt.id) : (form.type || '').includes(opt.id);
                return (
                  <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: isChecked ? '#d1fae5' : 'white', padding: '6px 12px', borderRadius: '20px', border: isChecked ? '1px solid #10b981' : '1px solid #ccc', fontSize: '14px' }}>
                    <input type="checkbox" checked={isChecked} onChange={() => handleTypeToggle(opt.id)} style={{ display: 'none' }} />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </div>

          <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 12px 0' }}>ขนาดพื้นที่</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div><label>ไร่</label><input type="number" name="rai" value={form.rai} onChange={handleChange} className="admin-input" min="0" /></div>
              <div><label>งาน</label><input type="number" name="ngan" value={form.ngan} onChange={handleChange} className="admin-input" min="0" max="3" /></div>
              <div><label>ตารางวา</label><input type="number" name="wa" value={form.wa} onChange={handleChange} className="admin-input" min="0" max="99" /></div>
            </div>
          </div>

          <div className="admin-grid">
            <div>
              <label>ราคาต่อตารางวา (บาท)</label>
              <input type="number" name="ppw" value={form.ppw} onChange={handleChange} className="admin-input" />
            </div>
            <div>
              <label>ราคารวม (บาท)</label>
              <input type="number" name="total" value={form.total} onChange={handleChange} className="admin-input" />
            </div>
          </div>

          <div className="admin-grid">
            <div><label>เอกสารสิทธิ์</label><input type="text" name="deed" value={form.deed} onChange={handleChange} className="admin-input" /></div>
            <div><label>ถนนทางเข้า</label><input type="text" name="road" value={form.road} onChange={handleChange} className="admin-input" /></div>
            <div><label>สาธารณูปโภค</label><input type="text" name="util" value={form.util} onChange={handleChange} className="admin-input" /></div>
            <div><label>หน้ากว้าง / พื้นที่</label><input type="text" name="front" value={form.front} onChange={handleChange} className="admin-input" /></div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>จุดเด่น (คั่นด้วยเครื่องหมายจุลภาค ,)</label>
            <input type="text" name="feat" value={form.feat} onChange={handleChange} className="admin-input" />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>ลิงก์ Google Maps (ถ้ามี)</label>
            <input type="url" name="map_url" placeholder="https://maps.app.goo.gl/..." value={form.map_url} onChange={handleChange} className="admin-input" />
          </div>

          <div className="admin-grid">
            <div style={{ border: '2px dashed #ccc', padding: '24px', borderRadius: '8px', textAlign: 'center', gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontSize: '1.1rem', fontWeight: 'bold' }}>รูปภาพหลัก {mode === 'create' && <span style={{color:'red'}}>*</span>}</label>
              
              {(imageFile || (mode === 'edit' && form.img)) && (
                <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto 16px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                  <img src={imageFile ? URL.createObjectURL(imageFile) : form.img} style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', display: 'block' }} />
                  {imageFile && <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>รูปใหม่ที่เพิ่งเลือก</span>}
                </div>
              )}
              
              <label style={{ cursor: 'pointer', display: 'inline-block', background: '#f3f4f6', border: '1px solid #d1d5db', padding: '10px 20px', borderRadius: '6px', fontSize: '15px' }}>
                {imageFile || form.img ? 'เปลี่ยนรูปภาพหลัก' : 'เลือกรูปภาพหลัก'}
                <input type="file" accept="image/*" required={mode === 'create' && !imageFile} onChange={(e) => setImageFile(e.target.files[0])} style={{ display: 'none' }} />
              </label>
            </div>

            <div style={{ border: '2px dashed #ccc', padding: '16px', borderRadius: '8px', textAlign: 'center', gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>รูปประกอบอื่นๆ (แกลลอรี่)</label>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
                {/* รูปเก่าจากฐานข้อมูล */}
                {mode === 'edit' && form.gallery && form.gallery.map((url, i) => (
                  <div key={`old-${i}`} style={{ position: 'relative' }}>
                    <img src={url} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                    <button type="button" onClick={() => setForm(prev => ({ ...prev, gallery: prev.gallery.filter((_, idx) => idx !== i) }))} style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>✕</button>
                  </div>
                ))}
                
                {/* รูปใหม่ที่กำลังจะอัปโหลด */}
                {galleryFiles && galleryFiles.map((file, i) => (
                  <div key={`new-${i}`} style={{ position: 'relative' }}>
                    <img src={URL.createObjectURL(file)} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '2px solid #10b981' }} />
                    <button type="button" onClick={() => setGalleryFiles(prev => prev.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>✕</button>
                    <span style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(16, 185, 129, 0.9)', color: 'white', fontSize: '10px', padding: '2px 4px', borderRadius: '4px', whiteSpace: 'nowrap' }}>ใหม่</span>
                  </div>
                ))}
              </div>

              <label style={{ cursor: 'pointer', display: 'inline-block', background: '#f3f4f6', border: '1px solid #d1d5db', padding: '8px 16px', borderRadius: '6px', fontSize: '14px' }}>
                + เลือกรูปเพิ่ม
                <input type="file" accept="image/*" multiple onChange={(e) => setGalleryFiles(prev => [...prev, ...Array.from(e.target.files)])} style={{ display: 'none' }} />
              </label>
              <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>กด + เลือกรูปเพิ่ม เพื่อเลือกทีละหลายรูปได้</p>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <button type="submit" disabled={loading} className={`admin-btn ${mode === 'edit' ? 'admin-btn-edit' : 'admin-btn-primary'}`} style={{ width: '100%', fontSize: '1.1rem' }}>
              {loading ? 'กำลังบันทึกข้อมูล...' : mode === 'edit' ? 'บันทึกการแก้ไข' : 'เพิ่มข้อมูลที่ดิน'}
            </button>
          </div>
            </form>
          </div>

          {/* ขวา: รายการที่มีอยู่ */}
          <div className="admin-list-col">
        <h2 style={{ margin: '0 0 16px 0', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>📋 แปลงที่ดินในระบบ ({listings.length})</h2>
        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '8px' }}>
          {listings.map(l => (
            <div key={l.id} className="admin-list-item">
              <img src={l.img} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px', background: '#e5e7eb' }} />
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title}</h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>{l.prov} · {l.area}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEdit(l)} style={{ flex: 1, padding: '4px', background: 'white', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>แก้ไข</button>
                  <button onClick={() => handleDelete(l.id)} style={{ padding: '4px 8px', background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>ลบ</button>
                </div>
              </div>
            </div>
          ))}
          {listings.length === 0 && <p style={{ textAlign: 'center', color: '#888', marginTop: '24px' }}>ยังไม่มีข้อมูลในระบบ</p>}
        </div>
          </div>
        </div>
      )}

      {activeTab === 'inbox' && (
        <div className="admin-layout" style={{ maxWidth: '900px' }}>
          <div className="admin-form-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
              <h1 style={{ fontSize: '1.5rem', margin: 0 }}>📩 ข้อความจากลูกค้า</h1>
            </div>
            
            {inbox && inbox.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {inbox.map(msg => (
                  <div key={msg.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: '#fafafa', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
                      <strong style={{ fontSize: '1.1rem', color: '#111827' }}>{msg.name}</strong>
                      <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{msg.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', marginBottom: '12px', fontSize: '14px' }}>
                      <p style={{ margin: 0, color: '#4b5563' }}>📞 <a href={`tel:${msg.phone}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{msg.phone}</a></p>
                      <p style={{ margin: 0, color: '#4b5563' }}>✉️ <a href={`mailto:${msg.email}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{msg.email}</a></p>
                    </div>
                    {msg.subject && (
                      <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>📌 {msg.subject}</p>
                    )}
                    <div style={{ background: '#fff', padding: '16px', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '15px', color: '#1f2937', whiteSpace: 'pre-wrap' }}>
                      {msg.message}
                    </div>
                    {msg.link && (
                      <div style={{ marginTop: '12px', fontSize: '13px' }}>
                        🔗 <a href={msg.link} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>เปิดดูหน้าที่ลูกค้าสนใจ</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', background: '#f9fafb', borderRadius: '8px', border: '2px dashed #e5e7eb' }}>
                <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>ยังไม่มีข้อความติดต่อจากลูกค้า</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
