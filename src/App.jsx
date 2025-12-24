import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import Galaxy from './components/Galaxy/Galaxy';
import HeroFlight from './components/HeroFlight/HeroFlight';
import TrueFocus from './components/TrueFocus/TrueFocus';
import Masonry from './components/Masonry/Masonry';
import WhatsAppStats from './components/WhatsAppStats/WhatsAppStats';
import TextType from './components/TextType/TextType';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showMainContent, setShowMainContent] = useState(false);
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const yesBtnRef = useRef(null);
  const noBtnRef = useRef(null);
  const responseRef = useRef(null);
  const noClickCount = useRef(0);

  const handleOpenClick = () => {
    const button = heroContentRef.current?.querySelector('.enter-button');
    if (button) {
      gsap.to(button, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(heroRef.current, {
            opacity: 0,
            scale: 1.1,
            duration: 0.8,
            ease: 'power2.in',
            onComplete: () => {
              setShowMainContent(true);
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    if (!showMainContent) return;

    const yesBtn = yesBtnRef.current;
    const noBtn = noBtnRef.current;
    const response = responseRef.current;
    if (!yesBtn || !noBtn || !response) return;

    const launchConfetti = () => {
      // Confeti reducido para evitar lag
      const duration = 1500;
      const end = Date.now() + duration;
      const colors = ['#ff6b9d', '#ff9f7c', '#4ecdc4', '#a78bfa', '#fff'];

      const frame = () => {
        if (Date.now() > end) return;

        // Confeti reducido: menos partículas y menos frecuencia
        for (let i = 0; i < 2; i++) {
          confetti({
            particleCount: 15,
            angle: 60 + (Math.random() * 60),
            spread: 55,
            origin: { 
              x: Math.random(),
              y: 0.6 
            },
            colors: colors,
            startVelocity: 20 + Math.random() * 15
          });
        }

        requestAnimationFrame(frame);
      };
      frame();
      
      response.textContent = '';
      
      // Hacer el botón sí más grande
      gsap.to(yesBtn, {
        scale: 1.3,
        duration: 0.4,
        ease: 'back.out(1.7)'
      });
    };

    const handleNo = () => {
      noClickCount.current += 1;
      
      if (noClickCount.current >= 3) {
        // Desaparecer el botón después de 3 clicks
        gsap.to(noBtn, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            noBtn.style.display = 'none';
          }
        });
        return;
      }
      
      const newScale = Math.max(0.3, 0.7 - (noClickCount.current * 0.15));
      
      response.textContent = 'Respuesta incorrecta :)';
      gsap.fromTo(
        response,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
      
      // Hacer el botón no más pequeño cada vez
      gsap.to(noBtn, {
        scale: newScale,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Hacer el botón sí más grande
      gsap.to(yesBtn, {
        scale: 1.1 + (noClickCount.current * 0.05),
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    };

    yesBtn.addEventListener('click', launchConfetti);
    noBtn.addEventListener('click', handleNo);

    return () => {
      yesBtn.removeEventListener('click', launchConfetti);
      noBtn.removeEventListener('click', handleNo);
    };
  }, [showMainContent]);

  // Mensajes románticos actualizados
  const romanticMessages = [
    'Nunca pensé amar así',
    'Te extraño todos los días',
    'Quiero estar contigo siempre',
    'Me encantas demasiado',
    '¿Alguna vez te dije que te amo?',
    'Te amo',
    'Más de lo que puede amar',
    'Una persona <3'
  ];

  // Items para Masonry - Fotos organizadas en 4 columnas
  const masonryItems = [
    // Columna 2
    { id: 'col2_1', img: '/seccion_fotos/col2_1.webp', height: 420 },
    { id: 'col2_2', img: '/seccion_fotos/col2_2.jpg', height: 500 }, // Aumentado
    { id: 'col2_3', img: '/seccion_fotos/col2_3.png', height: 550 }, // Aumentado
    { id: 'col2_4', img: '/seccion_fotos/col2_4.jpg', height: 360 },

    // Columna 3
    { id: 'col3_1', img: '/seccion_fotos/col3_1.jpg', height: 500 }, // Aumentado
    { id: 'col3_2', img: '/seccion_fotos/col3_2.jpg', height: 420 },
    { id: 'col3_3', img: '/seccion_fotos/col3_3.avif', height: 480 }, // Aumentado

    // Columna 4
    { id: 'col4_1', img: '/seccion_fotos/col4_1.jpg', height: 440 },
    { id: 'col4_2', img: '/seccion_fotos/col4_2.webp', height: 480 }, // Aumentado
    { id: 'col4_3', img: '/seccion_fotos/col4_3.webp', height: 500 }, // Aumentado
    { id: 'col4_4', img: '/seccion_fotos/col4_4.jpg', height: 480 }, // Aumentado

    // Columna 5
    { id: 'col5_1', img: '/seccion_fotos/col5_1.jpg', height: 500 }, // Aumentado
    { id: 'col5_2', img: '/seccion_fotos/col5_2.jpg', height: 360 },
    { id: 'col5_3', img: '/seccion_fotos/col5_3.jpg', height: 500 }, // Aumentado
    { id: 'col5_4', img: '/seccion_fotos/col5_4.jpg', height: 480 } // Aumentado
  ];

  if (!showMainContent) {
    return (
      <div className="app">
        <section ref={heroRef} className="hero-section intro-page">
          <div className="galaxy-wrapper" id="galaxy-wrapper">
            <Galaxy
              mouseRepulsion={true}
              mouseInteraction={true}
              density={1.5}
              glowIntensity={0.5}
              saturation={0.8}
              hueShift={240}
              transparent={true}
            />
          </div>
          <div ref={heroContentRef} className="hero-content">
            <h1 className="hero-title">Para: Vicky</h1>
            <p className="hero-subtitle">De: Juan</p>
            <button 
              className="enter-button"
              onClick={handleOpenClick}
            >
              Abrir
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Sección del Avión */}
      <HeroFlight />

      {/* Sección de Mensajes Ocultos con True Focus */}
      <section className="messages-section section-soft">
        <div className="messages-container">
          <div className="messages-grid">
            {romanticMessages.map((message, index) => (
              <div key={index} className={`message-item message-item-${index % 8}`}>
                <TrueFocus
                  sentence={message}
                  manualMode={true}
                  blurAmount={8}
                  borderColor="#ff6b9d"
                  glowColor="rgba(255, 107, 157, 0.6)"
                  animationDuration={0.4}
                  hideFocusFrame={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Galería Masonry */}
      <section className="gallery-section section-soft">
        <div className="gallery-container">
          <div className="masonry-wrapper">
            <Masonry
              items={masonryItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
            />
          </div>
        </div>
      </section>

      {/* Sección de Estadísticas de WhatsApp */}
      <WhatsAppStats />

      {/* Sección Final con Text Type */}
      <section className="final-section section-soft">
        <div className="final-container">
          <TextType
            text={['¿Te quieres casar conmigo?']}
            typingSpeed={90}
            pauseDuration={3000}
            showCursor={true}
            cursorCharacter="|"
            className="final-question"
            startOnVisible={true}
            loop={false}
          />
          <div className="final-actions">
            <button ref={yesBtnRef} className="btn-yes">Sí</button>
            <button ref={noBtnRef} className="btn-no">No</button>
          </div>
          <div ref={responseRef} className="final-response"></div>
        </div>
      </section>
    </div>
  );
}

export default App;
