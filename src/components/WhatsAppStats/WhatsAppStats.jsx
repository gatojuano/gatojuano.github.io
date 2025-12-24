import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhatsAppStats.css';

gsap.registerPlugin(ScrollTrigger);

// Estadísticas hardcodeadas calculadas del chat actual.txt
const chatStats = {
  totalMessages: 60644,
  juanMessages: 33558,
  vickyMessages: 27086,
  multimediaCount: 4544,
  firstMessageDate: 'lunes, 11 de agosto de 2025',
  lastMessageDate: 'miércoles, 24 de diciembre de 2025',
  daysChatted: 136,
  messagesByMonth: [
    0, 0, 0, 0, 0, 0, 0,
    21229, // Agosto
    13165, // Septiembre
    11144, // Octubre
    10192, // Noviembre
    4914   // Diciembre
  ],
  messagesByHour: [
    3687,   // 0 (medianoche)
    2146,   // 1 (1 a.m.)
    1079,   // 2 (2 a.m.)
    712,    // 3 (3 a.m.)
    24,     // 4 (4 a.m.)
    107,    // 5 (5 a.m.)
    66,     // 6 (6 a.m.)
    728,    // 7 (7 a.m.)
    1815,   // 8 (8 a.m.)
    2918,   // 9 (9 a.m.)
    2997,   // 10 (10 a.m.)
    3272,   // 11 (11 a.m.)
    3557,   // 12 (mediodía)
    3162,   // 13 (1 p.m.)
    3685,   // 14 (2 p.m.)
    3087,   // 15 (3 p.m.)
    3055,   // 16 (4 p.m.)
    3341,   // 17 (5 p.m.)
    3250,   // 18 (6 p.m.)
    3160,   // 19 (7 p.m.)
    3474,   // 20 (8 p.m.)
    3600,   // 21 (9 p.m.)
    3106,   // 22 (10 p.m.)
    4616    // 23 (11 p.m.)
  ],
  messagesByDayOfWeek: [
    6587, // Domingo
    8369, // Lunes
    8873, // Martes
    8645, // Miércoles
    8487, // Jueves
    10007, // Viernes
    9676  // Sábado
  ],
  topWords: [
    { word: 'que', count: 6687 },
    { word: 'pero', count: 2257 },
    { word: 'amo', count: 1686 },
    { word: 'por', count: 1405 },
    { word: 'mas', count: 1388 },
    { word: 'con', count: 1376 },
    { word: 'para', count: 1356 },
    { word: 'voy', count: 1354 },
    { word: 'te', count: 1200 },
    { word: 'me', count: 1150 }
  ],
  activeMonths: [
    { month: 'Ago', index: 7, count: 21229 },
    { month: 'Sep', index: 8, count: 13165 },
    { month: 'Oct', index: 9, count: 11144 },
    { month: 'Nov', index: 10, count: 10192 },
    { month: 'Dic', index: 11, count: 4914 }
  ]
};

export default function WhatsAppStats() {
  const containerRef = useRef(null);
  const statsRefs = useRef([]);
  const chartRefs = useRef([]);

  useEffect(() => {
    const stats = statsRefs.current;
    const charts = chartRefs.current;
    
    if (stats.length === 0 || charts.length === 0) return;

    const animation = gsap.fromTo(
      [...stats, ...charts],
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animar las barras de los gráficos
    charts.forEach((chart, index) => {
      if (chart) {
        const bars = chart.querySelectorAll('.chart-bar, .hour-bar');
        gsap.fromTo(
          bars,
          { scaleY: 0, transformOrigin: 'bottom' },
          {
            scaleY: 1,
            duration: 1,
            delay: 0.5 + index * 0.1,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: chart,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => {
      animation.kill();
    };
  }, []);

  // Calcular porcentajes para el gráfico de dona
  const juanPercent = chatStats.totalMessages > 0 
    ? Math.round((chatStats.juanMessages / chatStats.totalMessages) * 100) 
    : 0;
  const vickyPercent = chatStats.totalMessages > 0 
    ? Math.round((chatStats.vickyMessages / chatStats.totalMessages) * 100) 
    : 0;

  // Calcular circunferencia completa (2 * π * r = 2 * π * 80 = ~502.65)
  const circumference = 2 * Math.PI * 80;
  // Asegurar que los porcentajes sumen 100% (ajustar por redondeo)
  const totalPercent = juanPercent + vickyPercent;
  const adjustedJuanPercent = totalPercent === 100 ? juanPercent : juanPercent;
  const adjustedVickyPercent = totalPercent === 100 ? vickyPercent : (100 - adjustedJuanPercent);
  
  const juanDash = (adjustedJuanPercent / 100) * circumference;
  const vickyDash = (adjustedVickyPercent / 100) * circumference;

  // Datos por hora del día
  const maxHourly = Math.max(...chatStats.messagesByHour);

  // Datos por mes (solo meses activos)
  const maxMonthly = Math.max(...chatStats.activeMonths.map(m => m.count), 1);

  // Datos por día de la semana
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const maxWeekly = Math.max(...chatStats.messagesByDayOfWeek, 1);

  // Palabras más usadas
  const maxWordCount = chatStats.topWords.length > 0 ? chatStats.topWords[0].count : 1;

  return (
    <div ref={containerRef} className="whatsapp-stats section-soft">
      <div className="dashboard-container">
        {/* Información principal */}
        <div className="stats-header">
          <div ref={el => statsRefs.current[0] = el} className="header-item">
            <span className="header-label">Primer mensaje</span>
            <span className="header-value">{chatStats.firstMessageDate}</span>
          </div>
          <div ref={el => statsRefs.current[1] = el} className="header-item">
            <span className="header-label">Último mensaje</span>
            <span className="header-value">{chatStats.lastMessageDate}</span>
          </div>
        </div>

        {/* Cards principales */}
        <div className="main-stats">
          <div ref={el => statsRefs.current[2] = el} className="main-stat-card days-card">
            <div className="stat-icon-large">📅</div>
            <div className="stat-text">
              <span className="stat-label-main">Hemos conversado por</span>
              <span className="stat-value-main">{chatStats.daysChatted}</span>
              <span className="stat-unit">días</span>
            </div>
          </div>
          <div ref={el => statsRefs.current[3] = el} className="main-stat-card messages-card">
            <div className="stat-icon-large">💬</div>
            <div className="stat-text">
              <span className="stat-label-main">Nos hemos enviado</span>
              <span className="stat-value-main">{chatStats.totalMessages.toLocaleString()}</span>
              <span className="stat-unit">Mensajes</span>
            </div>
          </div>
        </div>

        {/* Gráficos principales */}
        <div className="charts-main-grid">
          {/* Gráfico de dona - Proporción de mensajes */}
          <div ref={el => (chartRefs.current[0] = el)} className="chart-card donut-card">
            <h3 className="chart-title">Mensajes por persona</h3>
            <div className="donut-chart">
              <svg viewBox="0 0 200 200" className="donut-svg">
                {/* Círculo de fondo (completo) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="40"
                />
                {/* Círculo de Juan */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#4ecdc4"
                  strokeWidth="40"
                  strokeDasharray={`${juanDash} ${circumference}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 100 100)"
                  strokeLinecap="round"
                />
                {/* Círculo de Vicky */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="40"
                  strokeDasharray={`${vickyDash} ${circumference}`}
                  strokeDashoffset={-juanDash}
                  transform="rotate(-90 100 100)"
                  strokeLinecap="round"
                />
                {/* Texto central */}
                <text x="100" y="95" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="32" fontWeight="bold">
                  {adjustedJuanPercent}%
                </text>
                <text x="100" y="115" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.7)" fontSize="16">
                  Juan
                </text>
              </svg>
              <div className="donut-legend">
                <div className="legend-item">
                  <span className="legend-color" style={{ background: '#4ecdc4' }}></span>
                  <span>Juan</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ background: '#a78bfa' }}></span>
                  <span>Vicky</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico de barras por hora */}
          <div ref={el => (chartRefs.current[1] = el)} className="chart-card hour-chart">
            <h3 className="chart-title">Mensajes por hora</h3>
            <div className="hour-chart-container">
              <div className="hour-bars">
                {chatStats.messagesByHour.map((count, hour) => {
                  // Altura máxima del contenedor es 300px (definido en CSS)
                  const maxHeight = 300;
                  const heightPercent = maxHourly > 0 ? (count / maxHourly) * 100 : 0;
                  const barHeight = (heightPercent / 100) * maxHeight;
                  return (
                    <div key={hour} className="hour-bar-group">
                      <div className="hour-bar-wrapper">
                        <div 
                          className="hour-bar juan-bar"
                          style={{ 
                            height: `${barHeight}px`,
                            opacity: count > 0 ? 1 : 0.3
                          }}
                          title={`${count} mensajes a las ${hour}:00`}
                        ></div>
                      </div>
                      <span className="hour-label">{hour}</span>
                    </div>
                  );
                })}
              </div>
              <div className="hour-legend">
                <div className="legend-item">
                  <span className="legend-color" style={{ background: '#4ecdc4' }}></span>
                  <span>Total mensajes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos de radar - Mes y Día */}
        <div className="radar-charts">
          <div ref={el => (chartRefs.current[2] = el)} className="chart-card radar-card">
            <h3 className="chart-title">Mes</h3>
            <div className="radar-container">
              {chatStats.activeMonths.length > 0 ? (
                <>
                  <svg viewBox="0 0 300 300" className="radar-svg">
                    {/* Grid circles */}
                    {[1, 2, 3, 4, 5].map((r, i) => (
                      <circle key={i} cx="150" cy="150" r={25 + i * 25} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    ))}
                    {/* Axes - solo para meses activos */}
                    {chatStats.activeMonths.map((data, i) => {
                      const totalMonths = chatStats.activeMonths.length;
                      const angle = (i * (360 / totalMonths) - 90) * (Math.PI / 180);
                      const x = 150 + 100 * Math.cos(angle);
                      const y = 150 + 100 * Math.sin(angle);
                      // Posicionar etiquetas más lejos y mejor alineadas
                      const labelRadius = 120;
                      const labelX = 150 + labelRadius * Math.cos(angle);
                      const labelY = 150 + labelRadius * Math.sin(angle);
                      // Ajustar textAnchor según el ángulo
                      let textAnchor = 'middle';
                      if (angle < -Math.PI / 2 || angle > Math.PI / 2) {
                        textAnchor = 'end';
                      } else {
                        textAnchor = 'start';
                      }
                      return (
                        <g key={i}>
                          <line x1="150" y1="150" x2={x} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                          <text 
                            x={labelX} 
                            y={labelY} 
                            textAnchor={textAnchor}
                            dominantBaseline="middle"
                            fill="rgba(255,255,255,0.8)" 
                            fontSize="12"
                            fontWeight="600"
                          >
                            {data.month}
                          </text>
                        </g>
                      );
                    })}
                    {/* Polygon de datos */}
                    <polygon
                      points={chatStats.activeMonths.map((data, i) => {
                        const totalMonths = chatStats.activeMonths.length;
                        const angle = (i * (360 / totalMonths) - 90) * (Math.PI / 180);
                        const radius = (data.count / maxMonthly) * 100;
                        const x = 150 + radius * Math.cos(angle);
                        const y = 150 + radius * Math.sin(angle);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="rgba(78, 205, 196, 0.3)"
                      stroke="#4ecdc4"
                      strokeWidth="2"
                    />
                  </svg>
                </>
              ) : (
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Cargando datos...</p>
              )}
            </div>
          </div>

          <div ref={el => (chartRefs.current[3] = el)} className="chart-card radar-card">
            <h3 className="chart-title">Día de la Semana</h3>
            <div className="radar-container">
              <svg viewBox="0 0 300 300" className="radar-svg">
                {/* Grid circles */}
                {[1, 2, 3, 4, 5].map((r, i) => (
                  <circle key={i} cx="150" cy="150" r={25 + i * 25} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                ))}
                {/* Axes con etiquetas */}
                {chatStats.messagesByDayOfWeek.map((count, i) => {
                  const angle = (i * (360 / 7) - 90) * (Math.PI / 180);
                  const x = 150 + 100 * Math.cos(angle);
                  const y = 150 + 100 * Math.sin(angle);
                  // Posicionar etiquetas más lejos y mejor alineadas
                  const labelRadius = 120;
                  const labelX = 150 + labelRadius * Math.cos(angle);
                  const labelY = 150 + labelRadius * Math.sin(angle);
                  // Ajustar textAnchor según el ángulo
                  let textAnchor = 'middle';
                  if (angle < -Math.PI / 2 || angle > Math.PI / 2) {
                    textAnchor = 'end';
                  } else {
                    textAnchor = 'start';
                  }
                  return (
                    <g key={i}>
                      <line x1="150" y1="150" x2={x} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      <text 
                        x={labelX} 
                        y={labelY} 
                        textAnchor={textAnchor}
                        dominantBaseline="middle"
                        fill="rgba(255,255,255,0.8)" 
                        fontSize="12"
                        fontWeight="600"
                      >
                        {dayNames[i]}
                      </text>
                    </g>
                  );
                })}
                {/* Polygon de datos */}
                <polygon
                  points={chatStats.messagesByDayOfWeek.map((count, i) => {
                    const angle = (i * (360 / 7) - 90) * (Math.PI / 180);
                    const radius = (count / maxWeekly) * 100;
                    const x = 150 + radius * Math.cos(angle);
                    const y = 150 + radius * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="rgba(78, 205, 196, 0.3)"
                  stroke="#4ecdc4"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Palabras más usadas */}
        <div ref={el => (chartRefs.current[4] = el)} className="chart-card words-card">
          <h3 className="chart-title">Palabras más usadas</h3>
          <div className="words-list">
            {chatStats.topWords.length > 0 ? (
              chatStats.topWords.map((item, index) => (
                <div key={index} className="word-item">
                  <div className="word-label">{item.word}</div>
                  <div className="word-bar-wrapper">
                    <div 
                      className="word-bar"
                      style={{ 
                        width: `${(item.count / maxWordCount) * 100}%`,
                        '--delay': `${index * 0.1}s`
                      }}
                    >
                      <span className="word-count">{item.count}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Cargando palabras...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
