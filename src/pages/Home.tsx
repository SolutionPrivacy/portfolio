import { Hero } from "@/sections/Hero";
import { Story } from "@/sections/Story";
import { MenuSection } from "@/sections/MenuSection";
import { Reservation } from "@/sections/Reservation";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <MenuSection />
      <Reservation />
      <Contact />
    </>
  );
}
