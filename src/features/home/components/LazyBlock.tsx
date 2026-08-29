import { Suspense, lazy, useEffect, useMemo, useRef, useState, type ComponentType } from "react";

interface LazyBlockProps {
  /** Import dynamique du bloc, ex: () => import("./HowItWorks").then(m => ({ default: m.HowItWorks })) */
  load: () => Promise<{ default: ComponentType }>;
  /** Hauteur reservee pour eviter tout saut de mise en page */
  minHeight?: number;
  /** Libelle accessible du bloc pendant le chargement */
  label: string;
}

/**
 * Charge (code + rendu) un bloc de la page d'accueil uniquement quand il
 * approche du viewport. Les blocs hors ecran ne sont pas telecharges au
 * premier rendu.
 */
export function LazyBlock({ load, minHeight = 180, label }: LazyBlockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const Comp = useMemo(() => (visible ? lazy(load) : null), [visible, load]);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div ref={ref}>
      {Comp ? (
        <Suspense
          fallback={
            <div
              className="home-block-skeleton"
              style={{ minHeight }}
              role="status"
              aria-label={`Chargement : ${label}`}
            />
          }
        >
          <Comp />
        </Suspense>
      ) : (
        <div
          className="home-block-skeleton"
          style={{ minHeight }}
          role="status"
          aria-label={`Chargement : ${label}`}
        />
      )}
    </div>
  );
}
