import { Hero } from "@/sections/Hero";
import { Ornament } from "@/components/Ornament";
import { Story } from "@/sections/Story";
import { MenuSection } from "@/sections/MenuSection";
import { Reservation } from "@/sections/Reservation";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Ornament className="pb-2 pt-8 sm:pt-10" />
      <Story />
      <MenuSection />
      <Reservation />
      <Contact />
    </>
  );
}
