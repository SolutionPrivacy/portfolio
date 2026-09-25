import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartBar } from "@/components/CartBar";
import { CartProvider } from "@/cart/CartContext";
import { useCursorGlow } from "@/components/useCursorGlow";
import { silk } from "@/components/Reveal";
import Home from "@/pages/Home";

const MenuPage = lazy(() => import("@/pages/MenuPage"));
const HoursPage = lazy(() => import("@/pages/HoursPage"));
const InfoPage = lazy(() => import("@/pages/InfoPage"));
const AllergensPage = lazy(() => import("@/pages/AllergensPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const PrivacyPage = lazy(() =>
  import("@/pages/LegalPages").then((m) => ({ default: m.PrivacyPage })),
);
const TermsPage = lazy(() =>
  import("@/pages/LegalPages").then((m) => ({ default: m.TermsPage })),
);
const NoticePage = lazy(() =>
  import("@/pages/LegalPages").then((m) => ({ default: m.NoticePage })),
);
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  const location = useLocation();
  const reduce = useReducedMotion();
  useCursorGlow();

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <CartProvider>
    <div className="flex min-h-[100svh] flex-col">
      <Navbar />

      <Suspense fallback={<PageFallback />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.5, ease: silk }}
            className="flex-1"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/karta" element={<MenuPage />} />
              <Route path="/godziny" element={<HoursPage />} />
              <Route path="/informacje" element={<InfoPage />} />
              <Route path="/alergeny" element={<AllergensPage />} />
              <Route path="/kasa" element={<CheckoutPage />} />
              <Route path="/polityka-prywatnosci" element={<PrivacyPage />} />
              <Route path="/regulamin" element={<TermsPage />} />
              <Route path="/nota-prawna" element={<NoticePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>

      <Footer />
      <CartBar />
    </div>
    </CartProvider>
  );
}

function PageFallback() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center">
      <motion.span
        animate={{ opacity: [0.25, 0.7, 0.25] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="font-display text-2xl font-light tracking-wide2 text-zloto/60"
      >
        Bona
      </motion.span>
    </div>
  );
}
