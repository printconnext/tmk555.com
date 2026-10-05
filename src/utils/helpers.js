export const LISTINGS = [
  {id:1,type:"sea",prov:"กระบี่",area:"อ่าวนาง",title:"ที่ดินติดหาดส่วนตัว วิวเขาหินปูน",rai:3,ngan:2,wa:40,ppw:85000,
   img:"https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800",
   deed:"โฉนด น.ส.4 จ.",road:"ถนนลาดยาง กว้าง 8 ม.",util:"ไฟฟ้า 3 เฟส · ประปาส่วนภูมิภาค",front:"ติดหาด 62 ม.",feat:["ติดหาดทราย","วิวพระอาทิตย์ตก","เหมาะทำรีสอร์ต"]},
  
  {id:2,type:"villa",prov:"ภูเก็ต",area:"กมลา",title:"พูลวิลล่าวิวทะเล 4 ห้องนอน",rai:0,ngan:2,wa:10,total:38500000,
   img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
   deed:"โฉนด น.ส.4 จ.",road:"ถนนคอนกรีต กว้าง 6 ม.",util:"ไฟฟ้า · ประปา · อินเทอร์เน็ตไฟเบอร์",front:"พื้นที่ใช้สอย 420 ตร.ม.",feat:["สระว่ายน้ำ 12 ม.","เฟอร์นิเจอร์ครบ","ห่างหาด 900 ม."]},
  
  {id:3,type:"sea",prov:"เกาะสมุย",area:"เชิงมน",title:"ที่ดินบนเนิน เห็นทะเล 180 องศา",rai:1,ngan:0,wa:50,ppw:45000,
   img:"https://images.unsplash.com/photo-1581337204873-ef36aa186caa?auto=format&fit=crop&q=80&w=800",
   deed:"โฉนด น.ส.4 จ.",road:"ถนนลาดยาง กว้าง 6 ม.",util:"ไฟฟ้าถึงหน้าแปลง",front:"หน้ากว้างติดถนน 38 ม.",feat:["วิวทะเลไม่มีบัง","ความสูง 45 ม. จากน้ำทะเล","ใกล้สนามบิน 10 นาที"]},
  
  {id:4,type:"villa",prov:"หัวหิน",area:"ปราณบุรี",title:"บ้านพักตากอากาศริมหาด 3 ห้องนอน",rai:0,ngan:3,wa:0,total:29900000,
   img:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
   deed:"โฉนด น.ส.4 จ.",road:"ถนนลาดยาง กว้าง 6 ม.",util:"ไฟฟ้า · ประปา",front:"พื้นที่ใช้สอย 280 ตร.ม.",feat:["เดินลงหาดได้","สวนมะพร้าว","จากกรุงเทพฯ 3 ชม."]},
  
  {id:5,type:"hill",prov:"เขาใหญ่",area:"ปากช่อง",title:"ที่ดินวิวภูเขา อากาศเย็นทั้งปี",rai:5,ngan:0,wa:0,ppw:9500,
   img:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
   deed:"โฉนด น.ส.4 จ.",road:"ถนนลาดยาง กว้าง 8 ม.",util:"ไฟฟ้า · บ่อบาดาล",front:"หน้ากว้างติดถนน 80 ม.",feat:["วิวเขาซ้อนชั้น","มีลำธารผ่าน","เหมาะทำบ้านพักหรือแคมป์"]},
  
  {id:6,type:"sea",prov:"พังงา",area:"เขาหลัก",title:"ที่ดินติดทะเลอันดามัน แปลงใหญ่",rai:8,ngan:1,wa:20,ppw:18000,
   img:"https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800",
   deed:"โฉนด น.ส.4 จ.",road:"ทางสาธารณะ กว้าง 6 ม.",util:"ไฟฟ้าห่าง 200 ม.",front:"ติดหาด 110 ม.",feat:["หาดยาวเงียบสงบ","เหมาะพัฒนาโครงการ","ใกล้ถนนเพชรเกษม"]}
];

export const PLACE_NOTE = {"กระบี่":"อันดามัน","ภูเก็ต":"อันดามัน","พังงา":"อันดามัน","เกาะสมุย":"อ่าวไทย","หัวหิน":"อ่าวไทย","เขาใหญ่":"วิวภูเขา"};

export const toWa = l => l.rai * 400 + l.ngan * 100 + l.wa;
export const priceOf = l => l.total ?? toWa(l) * l.ppw;
export const baht = n => (n || 0).toLocaleString("th-TH");
export const million = n => (n / 1e6).toLocaleString("th-TH", { maximumFractionDigits: 2 }) + " ล้านบาท";

export const typeName = { 
  sea: "ที่ดินติดทะเล", 
  villa: "พูลวิลล่า / บ้านพัก", 
  hill: "ที่ดินวิวภูเขา",
  agri: "ที่ดินเพื่อการเกษตร",
  invest: "เพื่อการลงทุน",
  industry: "เพื่ออุตสาหกรรม"
};

export const getTypeDisplay = (typeVal) => {
  if (!typeVal) return "";
  const types = typeof typeVal === 'string' ? typeVal.split(',') : typeVal;
  return types.map(t => typeName[t] || t).join(' · ');
};

export const Deed = ({ rai, ngan, wa }) => (
  <div className="deed">
    <div><b className="num">{rai}</b><small>ไร่</small></div>
    <div><b className="num">{ngan}</b><small>งาน</small></div>
    <div><b className="num">{wa}</b><small>ตร.ว.</small></div>
  </div>
);
