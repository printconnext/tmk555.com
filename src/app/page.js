import { supabase } from "@/utils/supabase";
import HomePageClient from "./HomePageClient";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function Page() {
  const { data: listData } = await supabase.from("listings").select("*").order("id", { ascending: false });
  const { data: setArr } = await supabase.from("settings").select("*");
  
  const settings = setArr ? Object.fromEntries(setArr.map(x => [x.key, x.value])) : {};
  
  return <HomePageClient initialListings={listData || []} initialSettings={settings} />;
}
