import { useEffect, useState } from "react";

const QUERY = "(max-width: 767px)";

/**
 * Czy to telefon (węższy niż 768 px)? Służy do ograniczania animacji
 * TYLKO na telefonach — na komputerze wszystko zostaje bez zmian.
 */
export function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return mobile;
}
