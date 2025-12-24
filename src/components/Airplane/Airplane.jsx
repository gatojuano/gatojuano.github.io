import { useRef, useMemo, useEffect } from 'react';
import { useScroll, useTransform, motion, useMotionValue } from 'framer-motion';
import './Airplane.css';

export default function Airplane() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Calcular puntos del path para la animación
  const pathPoints = useMemo(() => {
    if (!pathRef.current) return [];
    
    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    const points = [];
    const numPoints = 200;
    
    for (let i = 0; i <= numPoints; i++) {
      const progress = i / numPoints;
      const point = path.getPointAtLength(pathLength * progress);
      const nextPoint = path.getPointAtLength(Math.min(pathLength, pathLength * (progress + 0.01)));
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      
      points.push({
        x: point.x,
        y: point.y,
        angle: angle
      });
    }
    
    return points;
  }, []);

  // Actualizar posición del avión basado en el scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (pathPoints.length === 0 || !stickyRef.current) return;
      
      const index = Math.min(Math.floor(progress * (pathPoints.length - 1)), pathPoints.length - 1);
      const point = pathPoints[index];
      if (!point) return;
      
      const stickyRect = stickyRef.current.getBoundingClientRect();
      const scaleX = stickyRect.width / 1200; // viewBox width
      const scaleY = stickyRect.height / 600; // viewBox height
      
      x.set(point.x * scaleX);
      y.set(point.y * scaleY);
      rotate.set(point.angle);
    });

    // Inicializar posición
    if (pathPoints.length > 0 && stickyRef.current) {
      const point = pathPoints[0];
      const stickyRect = stickyRef.current.getBoundingClientRect();
      const scaleX = stickyRect.width / 1200;
      const scaleY = stickyRect.height / 600;
      x.set(point.x * scaleX);
      y.set(point.y * scaleY);
      rotate.set(point.angle);
    }

    return () => unsubscribe();
  }, [scrollYProgress, pathPoints, x, y, rotate]);

  return (
    <div ref={containerRef} className="airplane-section section-soft">
      <div ref={stickyRef} className="airplane-sticky">
        <svg 
          ref={svgRef}
          className="airplane-svg" 
          viewBox="0 0 1200 600" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Path de Chile a Argentina */}
          <path
            ref={pathRef}
            id="flight-path"
            d="M 120 360 Q 280 220 520 260 T 1050 300"
            fill="none"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="3"
            strokeDasharray="6,8"
          />
          
          {/* Marcadores de ciudades */}
          <circle cx="120" cy="360" r="9" fill="#ff6b6b" />
          <text x="120" y="340" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">
            Chile
          </text>
          
          <circle cx="1050" cy="300" r="9" fill="#4ecdc4" />
          <text x="1050" y="280" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">
            Argentina
          </text>
        </svg>

        {/* Avión */}
        <motion.div 
          className="airplane"
          style={{
            x,
            y,
            rotate,
            xPercent: -50,
            yPercent: -50
          }}
        >
          <svg width="68" height="68" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              fill="#fff"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
