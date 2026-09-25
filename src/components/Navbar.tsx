import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navItems, site } from "@/data/site";
import { silk } from "./Reveal";
import { Wordmark } from "./Logo";
import { RatingLink } from "./RatingLink";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = useCallback(
    (href: string) => {
      setOpen(false);
      const [path, hash] = href.split("#");
      const target = path || "/";

      if (location.pathname !== target) {
        navigate(target);
        window.setTimeout(() => scrollToId(hash, reduce), 90);
        return;
      }
      scrollToId(hash, reduce);
    },
    [location.pathname, navigate, reduce],
  );

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.25, ease: silk }}
        className="fixed inset-x-0 top-0 z-50"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="topbar relative">
          <nav className="flex h-20 w-full items-center gap-4 px-4 sm:px-8">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              aria-label="Bona — strona główna"
              data-no-glow
              className="block transition-transform duration-300 hover:scale-105"
            >
              <Wordmark className="h-11 w-auto" />
            </Link>

            <ul className="ml-auto hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => goTo(item.href)}
                    data-no-glow
                    className="group relative px-3.5 py-2 text-[0.8rem] font-normal tracking-wide2 text-krem transition-[color,transform] duration-300 hover:scale-105 hover:text-zloto"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-zloto transition-[width] duration-300 group-hover:w-[60%]"
                    />
                  </button>
                </li>
              ))}
              <li className="ml-3">
                <Link
                  to="/karta"
                  className="btn-primary px-5 py-2.5 text-[0.78rem] tracking-wide2 text-krem"
                >
                  Zamów online
                </Link>
              </li>
            </ul>

            <RatingLink className="hidden xl:flex" />
            <RatingLink compact className="hidden lg:flex xl:hidden" />
            <RatingLink compact className="ml-auto flex lg:hidden" />

            <button
              type="button"
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 -mr-1 flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: silk }}
                className="block h-px w-6 bg-krem"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: silk }}
                className="block h-px w-6 bg-krem"
              />
            </button>
          </nav>
          {/* Cienka złoto-czerwona linia pod paskiem (jak na haveli.com.pk). */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[min(200px,40%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-zloto to-transparent"
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: silk }}
            className="fixed inset-0 z-40 bg-wegiel/98 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              className="flex h-full flex-col justify-center gap-6 px-10"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {navItems.map((item) => (
                <motion.li key={item.href} variants={drawerItem}>
                  <button
                    type="button"
                    onClick={() => goTo(item.href)}
                    className="font-display text-3xl font-light text-krem"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
              <motion.li variants={drawerItem} className="pt-6">
                <Link
                  to="/karta"
                  onClick={() => setOpen(false)}
                  className="inline-block btn-primary px-7 py-3.5 text-[0.8rem] tracking-wide2 text-krem"
                >
                  Zamów online
                </Link>
              </motion.li>
              <motion.li variants={drawerItem}>
                <a href={site.phoneHref} className="text-sm tracking-wide2 text-zloto">
                  {site.phone}
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const drawerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: silk } },
};

function scrollToId(hash: string | undefined, reduce: boolean | null) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    return;
  }
  const el = document.getElementById(hash);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
