import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);
  const fadeRef = useRef<number | null>(null);
  const [showServices, setShowServices] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const animateOpacity = (target: number, duration: number, startOpacity: number) => {
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = startOpacity + (target - startOpacity) * progress;
      
      setOpacity(currentOpacity);
      
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(animate);
      }
    };
    
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    fadeRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      video.play();
      animateOpacity(1, 500, 0);
    };

    let isFadingOut = false;
    const checkFadeOut = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !isFadingOut && video.currentTime > 0) {
        isFadingOut = true;
        animateOpacity(0, 500, 1);
      }
      if (remaining > 0.55) {
        isFadingOut = false;
      }
    };

    const handleEnded = () => {
      setOpacity(0);
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        animateOpacity(1, 500, 0);
        isFadingOut = false;
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', checkFadeOut);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', checkFadeOut);
      video.removeEventListener('ended', handleEnded);
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  const scrollToPlanning = () => {
    const element = document.getElementById('planning');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuizFinish = (answers: Record<number, string>) => {
    setQuizAnswers(answers);
    setShowServices(true);
    setTimeout(() => {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <main className="bg-black min-h-screen text-white font-serif">
      {/* SECTION 1 -- HERO */}
      <section className="min-h-screen relative flex flex-col overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
          muted
          autoPlay
          playsInline
          preload="auto"
          style={{ opacity }}
        />

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full max-w-fit mx-auto px-6 py-2 flex items-center justify-center">
            <span className="text-white/90 text-sm font-medium tracking-wide">Hà Nội, 16/5/2026</span>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%] md:-translate-y-[20%]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-6"
          >
            Our First Date
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white/80 text-lg md:text-xl leading-relaxed px-4 max-w-2xl mb-12 italic"
          >
            Let’s take the time to get to know each other better.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={scrollToPlanning}
            className="liquid-glass rounded-full px-10 py-4 text-white text-lg font-medium hover:bg-white/10 transition-all active:scale-95"
          >
            Where should we go?
          </motion.button>
        </div>
      </section>

      {/* Sections 2-4 */}
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection onFinish={handleQuizFinish} />

      {/* Conditional Section 5 */}
      {showServices && <ServicesSection answers={quizAnswers} />}

      {/* Footer */}
      <footer className="bg-black py-12 px-6 text-center border-t border-white/5">
        <p className="text-white/20 text-xs tracking-widest uppercase">&copy; 2026 Our First Date. Hà Nội.</p>
      </footer>
    </main>
  );
}
