import { useEffect, useRef, useState } from "react";
import "./HeroFlight.css";

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

export default function HeroFlight() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;

      // El section es "largo" (ej 250vh).
      // Queremos mapear el scroll dentro del section a un progress 0..1.
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Cuando el top del section llega al top del viewport => inicio animación.
      // Cuando el bottom del section llega al bottom del viewport => fin animación.
      const totalScrollable = rect.height - viewportH;
      const scrolledInside = -rect.top; // cuánto "subió" el section
      const p = totalScrollable > 0 ? scrolledInside / totalScrollable : 0;

      setProgress(clamp01(p));
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Coordenadas relativas del avión (en % del contenedor)
  const start = { x: 15, y: 60 }; // Chile
  const end = { x: 85, y: 60 };   // Argentina (mismo nivel que Chile)
  const mid = { x: 50, y: 40 };   // Punto medio para simular curva (arco)

  // Calcular puntos de la curva Bezier para la línea punteada
  const getBezierPoint = (t) => {
    const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * mid.x + t * t * end.x;
    const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * mid.y + t * t * end.y;
    return { x, y };
  };

  // Calcular la derivada (tangente) de la curva Bezier cuadrática
  // P'(t) = 2[(1-t)(P₁ - P₀) + t(P₂ - P₁)]
  const getBezierTangent = (t) => {
    const dx = 2 * ((1 - t) * (mid.x - start.x) + t * (end.x - mid.x));
    const dy = 2 * ((1 - t) * (mid.y - start.y) + t * (end.y - mid.y));
    return { dx, dy };
  };

  // Generar path SVG para la línea punteada curva
  const pathPoints = [];
  for (let i = 0; i <= 100; i++) {
    pathPoints.push(getBezierPoint(i / 100));
  }
  const pathData = pathPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Curva cuadrática simple (Bezier) para que no vaya en línea recta
  const t = progress;
  const bx =
    (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * mid.x + t * t * end.x;
  const by =
    (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * mid.y + t * t * end.y;

  // Calcular la dirección usando la derivada analítica de la curva Bezier
  const tangent = getBezierTangent(t);
  const dx = tangent.dx;
  const dy = tangent.dy;
  const angleRad = Math.atan2(dy, dx);
  const angleDeg = (angleRad * 180) / Math.PI;
  
  // Ajuste adaptativo del offset de rotación:
  // - Al inicio (t=0): rotar más en sentido horario (aumentar ángulo)
  // - Al final (t=1): rotar más en sentido antihorario (disminuir ángulo)
  // Interpolación lineal entre un ajuste positivo al inicio y negativo al final
  const rotationAdjustment = 16; // Grados de ajuste máximo
  const adaptiveOffset = 90 + rotationAdjustment * (1 - 2 * t); // Va de +16 a -16
  
  const finalAngle = angleDeg + adaptiveOffset;

  return (
    <section ref={sectionRef} className="heroFlightSection section-soft">
      <div className="heroSticky">
        <div className="heroBackground" />

        {/* Capa de contenido */}
        <div className="heroStage">
          {/* Puntos estáticos */}
          <div className="point pointChile" />
          <div className="point pointArgentina" />

          {/* Línea punteada curva que sigue la trayectoria del avión */}
          <svg className="dottedLineSvg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d={pathData}
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="0.3"
              strokeDasharray="0.5,0.8"
            />
          </svg>

          {/* Avión animado por scroll */}
          <div
            className="plane"
            style={{
              left: `${bx}%`,
              top: `${by}%`,
              transform: `translate(-50%, -50%) rotate(${finalAngle}deg)`,
            }}
            aria-label="Plane"
          >
            {/* SVG del avión */}
            <svg
              width="68"
              height="68"
              viewBox="0 0 24 24"
              fill="none"
              className="planeSvg"
            >
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
