import { supabase } from "@/utils/supabase";
import { LISTINGS } from "@/utils/helpers";

export async function generateMetadata({ params }) {
  const id = params.id;
  let property = null;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { data } = await supabase.from('listings').select('*').eq('id', id).single();
    if (data) property = data;
  }
  
  if (!property) {
    property = LISTINGS.find(l => l.id.toString() === id);
  }

  if (!property) return { title: 'ไม่พบที่ดิน' };

  return {
    title: property.title,
    description: `ขายที่ดิน ${property.title} ทำเล ${property.prov} เนื้อที่ ${property.area} เหมาะสำหรับ ${property.type}`,
    openGraph: {
      title: property.title,
      description: `ขายที่ดิน ${property.title} ทำเล ${property.prov} เนื้อที่ ${property.area}`,
      url: `https://tmk555.com/property/${id}`,
      images: [
        {
          url: property.img,
          width: 800,
          height: 600,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: `ขายที่ดิน ${property.title} ทำเล ${property.prov} เนื้อที่ ${property.area}`,
    }
  };
}

export default function PropertyLayout({ children }) {
  return children;
}
