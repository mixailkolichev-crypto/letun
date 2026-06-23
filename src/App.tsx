/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Coffee,
  MapPin,
  Phone,
  Clock,
  Heart,
  Sparkles,
  Wifi,
  Check,
  Instagram,
  Send,
  Star,
  Menu as MenuIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Languages,
  Award,
  Smile,
  ExternalLink
} from "lucide-react";
import { MENU_DATA, REVIEWS, GALLERY_ITEMS, MenuItemWithSizes } from "./data";

export default function App() {
  // Localization state (default to RU since it's in Krasnodar, Russia)
  const [isRu, setIsRu] = useState(true);
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Menu Category selection
  const [activeCategory, setActiveCategory] = useState("with-milk");
  
  // Selected sizes for each menu item to allow dynamic pricing
  // Key is item.id, value is index of selected size/option
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: number }>({});

  // Review slider state
  const [currentReview, setCurrentReview] = useState(0);
  const reviewIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gallery filter state
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  
  // Image Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // Clipboard copied notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-advance reviews slider
  useEffect(() => {
    startReviewTimer();
    return () => stopReviewTimer();
  }, [currentReview]);

  const startReviewTimer = () => {
    stopReviewTimer();
    reviewIntervalRef.current = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
  };

  const stopReviewTimer = () => {
    if (reviewIntervalRef.current) {
      clearInterval(reviewIntervalRef.current);
    }
  };

  // Toast trigger helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(isRu ? `${label} скопирован!` : `${label} copied!`);
  };

  // Filtered gallery items
  const filteredGallery = galleryFilter === "all" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

  // Dictionary translation helper
  const t = (ru: string, en: string) => (isRu ? ru : en);

  // Header active scroll section detection
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "menu", "reviews", "gallery", "visit"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-espresso-950 text-gray-100 font-sans selection:bg-coffee-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background radial soft light highlight */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-coffee-900/15 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[50%] right-[-10%] w-[40vw] h-[40vh] bg-coffee-800/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vh] bg-coffee-800/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Modern Top Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coffee-600 via-gold-accent to-coffee-400 origin-left z-50"
        style={{
          scaleX: "var(--scroll-percent, 0%)",
        }}
      />

      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-espresso-950/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coffee-600 to-espresso-900 border border-gold-accent/20 flex items-center justify-center shadow-lg group-hover:border-gold-accent/40 transition-all duration-300">
              <Coffee className="w-5 h-5 text-gold-accent group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-[0.2em] text-gold-cream group-hover:text-gold-accent transition-colors">
                ЛЕТУН
              </span>
              <span className="text-[9px] font-mono tracking-[0.3em] text-coffee-400 uppercase">
                {t("КОФЕЙНЯ", "COFFEE SHOP")}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "about", ru: "О нас", en: "About" },
              { id: "menu", ru: "Меню", en: "Menu" },
              { id: "reviews", ru: "Отзывы", en: "Reviews" },
              { id: "gallery", ru: "Галерея", en: "Gallery" },
              { id: "visit", ru: "Контакты", en: "Visit" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === item.id 
                    ? "text-gold-accent font-semibold" 
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {t(item.ru, item.en)}
                {activeSection === item.id && (
                  <motion.span 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-accent rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Action buttons (Language selector & CTA) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setIsRu(!isRu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-gold-accent/30 bg-white/5 hover:bg-white/10 transition-all text-xs font-semibold text-gold-cream cursor-pointer"
              title={t("Сменить язык на English", "Switch language to Russian")}
            >
              <Languages className="w-3.5 h-3.5 text-gold-accent" />
              <span>{isRu ? "EN" : "RU"}</span>
            </button>

            <a
              href="#visit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-coffee-700 to-coffee-800 hover:from-coffee-600 hover:to-coffee-700 border border-coffee-500/20 text-xs font-semibold tracking-widest text-white shadow-lg shadow-black/30 hover:shadow-coffee-900/20 hover:scale-[1.02] transition-all"
            >
              {t("В ГОСТИ", "VISIT US")}
            </a>
          </div>

          {/* Mobile navigation toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsRu(!isRu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-gold-cream cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-gold-accent" />
              <span>{isRu ? "EN" : "RU"}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-30 bg-espresso-950 border-b border-white/5 shadow-2xl md:hidden py-6 px-4"
          >
            <div className="flex flex-col gap-4">
              {[
                { id: "about", ru: "О нас", en: "About" },
                { id: "menu", ru: "Меню", en: "Menu" },
                { id: "reviews", ru: "Отзывы", en: "Reviews" },
                { id: "gallery", ru: "Галерея", en: "Gallery" },
                { id: "visit", ru: "Контакты", en: "Visit" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 text-base font-medium transition-colors ${
                    activeSection === item.id ? "text-gold-accent" : "text-gray-400"
                  }`}
                >
                  {t(item.ru, item.en)}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <a
                  href="#visit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-coffee-700 hover:bg-coffee-600 text-center text-sm font-semibold tracking-wider text-white transition-all"
                >
                  {t("В ГОСТИ", "VISIT US")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        {/* Background Image with Dark Cinema Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/letun_hero_bg_1782236586951.jpg"
            alt="Letun Coffee Cinematic Background"
            className="w-full h-full object-cover scale-[1.03] filter brightness-[0.25] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Gradients overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-espresso-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso-950/80 via-transparent to-espresso-950/80" />
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid md:grid-cols-12 gap-12 items-center py-12">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 text-center md:text-left flex flex-col items-center md:items-start"
          >
            {/* Minimal boutique badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coffee-950/60 border border-gold-accent/20 text-gold-accent text-xs font-semibold tracking-[0.2em] mb-6 uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{t("КРАСНОДАР • СПЕШЕЛТИ КОФЕ", "KRASNODAR • SPECIALTY COFFEE")}</span>
            </div>

            {/* Main Title */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-2 leading-[1.05]">
              ЛЕТУН
            </h1>
            
            {/* Tagline */}
            <h2 className="font-serif text-lg sm:text-2xl text-gold-accent font-medium italic tracking-wide mb-6">
              {t("Кофе • Атмосфера • Уют", "Coffee • Atmosphere • Comfort")}
            </h2>

            {/* Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-light">
              {t(
                "Уютная кофейня в Краснодаре, где каждый глоток — это тепло, мастерство и любовь к деталям.",
                "“A cozy coffee place in Krasnodar where every cup feels special.”"
              )}
            </p>

            {/* CTA Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#menu"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-coffee-600 to-coffee-800 hover:from-coffee-500 hover:to-coffee-700 border border-coffee-400/20 text-sm font-bold tracking-widest text-white shadow-xl shadow-black/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
              >
                {t("ПОСМОТРЕТЬ МЕНЮ", "VIEW MENU")}
              </a>
              <a
                href="#visit"
                className="px-8 py-4 rounded-xl border border-white/10 hover:border-gold-accent/40 bg-white/5 hover:bg-white/10 text-sm font-bold tracking-widest text-gold-cream hover:text-white transition-all text-center"
              >
                {t("КАК НАС НАЙТИ", "VISIT US")}
              </a>
            </div>
          </motion.div>

          {/* Right Steam Cup Interactive Widget Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Glowing circle backplate */}
            <div className="absolute w-72 h-72 rounded-full bg-coffee-500/10 blur-3xl -z-10" />

            <div className="relative p-8 rounded-3xl bg-espresso-900/40 backdrop-blur-md border border-white/5 flex flex-col items-center">
              
              {/* Steams Container */}
              <div className="absolute top-1/4 h-32 flex gap-4 justify-center items-end pointer-events-none mb-4">
                <div className="w-[3px] h-12 bg-gradient-to-t from-gold-accent/30 to-transparent rounded-full animate-steam-1" />
                <div className="w-[3px] h-16 bg-gradient-to-t from-coffee-400/35 to-transparent rounded-full animate-steam-2" />
                <div className="w-[3px] h-14 bg-gradient-to-t from-gold-accent/40 to-transparent rounded-full animate-steam-3" />
              </div>

              {/* Coffee Cup Representation */}
              <div className="w-56 h-56 flex items-center justify-center relative select-none">
                <div className="absolute inset-0 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-500 cursor-pointer group">
                  {/* Decorative Outer Coffee Art Circles */}
                  <div className="absolute w-52 h-52 rounded-full border border-gold-accent/10 group-hover:border-gold-accent/20 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute w-44 h-44 rounded-full border border-dashed border-coffee-400/10 group-hover:rotate-12 transition-all duration-1000" />
                  
                  {/* Actual Ceramic Cup Shape */}
                  <div className="w-36 h-36 rounded-full bg-gradient-to-b from-espresso-800 to-espresso-950 border border-gold-accent/30 shadow-2xl flex items-center justify-center relative">
                    {/* Handle */}
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-16 rounded-r-3xl border-2 border-l-0 border-gold-accent/30 bg-espresso-900 -z-10" />
                    
                    {/* Coffee Liquid */}
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-coffee-950 to-espresso-900 border border-coffee-800/60 p-1 flex items-center justify-center">
                      {/* Milk Foam Latte Art Pattern */}
                      <div className="w-26 h-26 rounded-full bg-gradient-to-br from-coffee-900 to-coffee-800 flex items-center justify-center relative overflow-hidden">
                        {/* Latte art heart leaf inside cup using css */}
                        <div className="w-14 h-14 rounded-full bg-gold-cream/90 flex items-center justify-center transform rotate-45 opacity-90 group-hover:scale-110 transition-transform duration-500">
                          <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gold-cream/95" />
                          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gold-cream/95" />
                          <div className="w-6 h-6 transform -rotate-45 text-coffee-800 font-bold text-center mt-3">☕</div>
                        </div>
                        {/* Shimmer lines */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-label under cup widget */}
              <div className="text-center mt-4">
                <span className="text-xs font-mono text-coffee-400 uppercase tracking-[0.2em]">
                  {t("Сварено с любовью", "BREWED WITH PASSION")}
                </span>
                <p className="text-[10px] text-gray-400 mt-1">
                  {t("Кликните на чашку, чтобы пустить пар", "Hover to warm the cup")}
                </p>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
          <a href="#about" className="flex flex-col items-center gap-2 group">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-coffee-400 group-hover:text-gold-accent transition-colors">
              {t("ЛИСТАЙТЕ", "EXPLORE")}
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-white/10 group-hover:border-gold-accent/40 flex justify-center p-1 transition-colors">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-gold-accent"
              />
            </div>
          </a>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="py-24 sm:py-32 border-t border-white/5 relative z-10 bg-gradient-to-b from-espresso-950 to-espresso-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Story text */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-8 bg-gold-accent" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-accent">
                    {t("О КОФЕЙНЕ", "ABOUT LETUN")}
                  </span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                  {t("Пространство вкуса", "Space for Craft")}<br />
                  <span className="text-gold-accent">{t("и вдохновения", "and Inspiration")}</span>
                </h2>
              </div>

              <div className="space-y-6 text-gray-300 font-light leading-relaxed text-base sm:text-lg">
                <p>
                  <strong>{t("ЛЕТУН", "Letun")}</strong> — {t(
                    "это уютная спешелти-кофейня в Краснодаре с современным лаконичным интерьером, теплой обволакивающей атмосферой и напитками, приготовленными с филигранной заботой.",
                    "is a cozy specialty coffee shop in Krasnodar with a modern minimalist interior, warm enveloping atmosphere, and carefully crafted artisan drinks."
                  )}
                </p>
                <p>
                  {t(
                    "Наши гости ценят нас за бескомпромиссный выбор кофейных зерен класса спешелти, нежнейшие авторские десерты, продуманное освещение и искреннюю гостеприимность бариста. Это место спроектировано для тех, кто ищет баланс.",
                    "Guests love our uncompromising specialty coffee bean selection, delicate signature pastries, thoughtfully designed warm lighting, and genuinely friendly baristas. Designed to help you find your daily balance."
                  )}
                </p>
                <p className="text-sm font-mono text-coffee-400">
                  {t(
                    "✓ Идеально подходит для бодрящего утреннего ритуала, продуктивной работы за ноутбуком, деловых встреч или расслабленного завершения дня.",
                    "✓ Perfect for your morning coffee ritual, focused laptop work sessions, warm meetings, or peaceful evening relaxation."
                  )}
                </p>
              </div>

              {/* Secondary CTA */}
              <div className="pt-2">
                <a 
                  href="#menu" 
                  className="inline-flex items-center gap-2.5 text-sm font-bold tracking-widest text-gold-accent hover:text-white uppercase transition-colors group"
                >
                  <span>{t("ИЗУЧИТЬ НАШЕ МЕНЮ", "EXPLORE THE MENU")}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Glassmorphic highlight cards & image grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              
              {/* Card 1: Rating */}
              <div className="p-6 rounded-2xl glass-panel glow-hover border border-white/5 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center mb-6">
                  <Star className="w-5 h-5 text-gold-accent fill-gold-accent" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    5.0 / 5.0
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    {t("44+ отзывов гостей", "44+ customer ratings")}
                  </p>
                </div>
              </div>

              {/* Card 2: Dog Friendly */}
              <div className="p-6 rounded-2xl glass-panel glow-hover border border-white/5 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-coffee-500/10 border border-coffee-500/20 flex items-center justify-center mb-6">
                  <Smile className="w-5 h-5 text-coffee-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1 uppercase tracking-wide">
                    {t("Dog-Friendly", "Dog-Friendly")}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    {t("Рады хвостикам 🐶", "Pets always welcome 🐶")}
                  </p>
                </div>
              </div>

              {/* Card 3: Coffee To Go */}
              <div className="p-6 rounded-2xl glass-panel glow-hover border border-white/5 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-coffee-500/10 border border-coffee-500/20 flex items-center justify-center mb-6">
                  <Coffee className="w-5 h-5 text-coffee-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1 uppercase tracking-wide">
                    {t("Coffee To Go", "Coffee To Go")}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    {t("Быстрая выдача ☕", "Quick takeaway ☕")}
                  </p>
                </div>
              </div>

              {/* Card 4: Daily Hours */}
              <div className="p-6 rounded-2xl glass-panel glow-hover border border-white/5 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center mb-6">
                  <Clock className="w-5 h-5 text-gold-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1 uppercase tracking-wide">
                    {t("До 22:00", "Until 22:00")}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    {t("Ежедневно ⏰", "Daily without weekends ⏰")}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Full Coffee Menu */}
      <section id="menu" className="py-24 sm:py-32 relative z-10 bg-espresso-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2">
              <div className="h-[1px] w-6 bg-gold-accent" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-accent">
                {t("ФИРМЕННАЯ КАРТА", "PREMIUM MENU")}
              </span>
              <div className="h-[1px] w-6 bg-gold-accent" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-black text-white">
              {t("Наше кофейное меню", "Our Crafted Drinks")}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-light">
              {t(
                "Каждый напиток готовится нашими профессиональными бариста на зернах свежего спешелти-обжара.",
                "Every recipe is carefully calculated and brewed using high-scoring single-origin and premium espresso beans."
              )}
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-2xl bg-espresso-900 border border-white/5 shadow-inner">
              {[
                { id: "with-milk", ru: "С молоком", en: "With Milk" },
                { id: "without-milk", ru: "Без молока", en: "Without Milk" },
                { id: "non-coffee", ru: "Без кофе", en: "Non-Coffee" },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative cursor-pointer ${
                    activeCategory === category.id 
                      ? "text-white" 
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {/* Sliding active background marker */}
                  {activeCategory === category.id && (
                    <motion.span
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-gradient-to-r from-coffee-700 to-coffee-800 rounded-xl shadow-md border border-coffee-500/10"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{t(category.ru, category.en)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {MENU_DATA.find((c) => c.id === activeCategory)?.items.map((item) => {
                // Determine current size selection
                const currentSizeIdx = selectedSizes[item.id] !== undefined ? selectedSizes[item.id] : 0;
                const activeOption = item.options[currentSizeIdx] || item.options[0];

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    className={`p-6 rounded-2xl bg-espresso-900/60 border hover:border-gold-accent/25 transition-all duration-300 flex flex-col justify-between relative group ${
                      item.featured ? "shadow-lg shadow-coffee-950/40 border-coffee-800/50" : "border-white/5"
                    }`}
                  >
                    {/* Featured label glow */}
                    {item.featured && (
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-accent/10 border border-gold-accent/30 text-[9px] font-mono tracking-wider text-gold-accent uppercase">
                        <Award className="w-2.5 h-2.5" />
                        {t("РЕКОМЕНДУЕМ", "POPULAR")}
                      </span>
                    )}

                    <div>
                      {/* Item Title and Sub-title */}
                      <div className="mb-4">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-gold-accent transition-colors">
                          {isRu ? item.russianName : item.name}
                        </h3>
                        <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-wide">
                          {isRu ? item.name : item.russianName}
                        </p>
                      </div>

                      {/* Drink Description mockup for realistic touch */}
                      <p className="text-xs text-gray-400 font-light mb-6 line-clamp-2 leading-relaxed">
                        {item.id === "cheese-latte" && t("Уникальный соленый вкус сливочного сыра и карамели.", "Unique rich flavor with real cream cheese and sea salt caramel.")}
                        {item.id === "cappuccino" && t("Идеальный баланс плотного эспрессо и нежной молочной пенки.", "Classic rich espresso beautifully balanced with silky milk foam.")}
                        {item.id === "latte" && t("Нежный кофейный напиток с шелковистой глянцевой текстурой.", "Milder flavor with plenty of sweet steamed milk and a thin microfoam.")}
                        {item.id === "spiced-cherry-latte" && t("Согревающий латте с натуральным вишневым сиропом и пряностями.", "Warm signature latte sweetened with cherry juice infusion and autumn spices.")}
                        {item.id === "filter-coffee" && t("Чистый, яркий вкус кофе. Каждое утро новые сорта.", "Bright and exceptionally clean cup. Different single origins weekly.")}
                        {item.id === "v60-pour-over" && t("Ручное заваривание для максимального раскрытия всех дескрипторов.", "Manual precise pour over showing complex, elegant fruit tasting notes.")}
                        {item.id === "matcha-latte" && t("Натуральная японская пудра матча с горячим нежным молоком.", "High-grade Japanese stone-ground matcha whisked into sweet textured milk.")}
                        {item.id === "sea-buckthorn-tea" && t("Яркий согревающий облепиховый взвар с добавлением корня имбиря.", "Antioxidant-rich wild sea buckthorn berries simmered with ginger slice.")}
                        {item.id === "peanut-raf" && t("Супер-сытный раф со вкусом арахисовой пасты собственного приготовления.", "Indulgent sweet recipe made with double cream and homemade natural peanut butter.")}
                        {!["cheese-latte", "cappuccino", "latte", "spiced-cherry-latte", "filter-coffee", "v60-pour-over", "matcha-latte", "sea-buckthorn-tea", "peanut-raf"].includes(item.id) && t("Сбалансированный рецепт, приготовленный по строгим стандартам.", "Carefully measured recipe, brewed using filtered mineral water.")}
                      </p>
                    </div>

                    {/* Volume and price section */}
                    <div className="pt-4 border-t border-white/5 mt-auto">
                      
                      {/* Options sizes toggles */}
                      {item.options.length > 1 ? (
                        <div className="flex gap-2 mb-4">
                          {item.options.map((opt, idx) => (
                            <button
                              key={opt.volume}
                              onClick={() => {
                                setSelectedSizes(prev => ({
                                  ...prev,
                                  [item.id]: idx
                                }));
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                currentSizeIdx === idx
                                  ? "bg-coffee-700 text-white border border-coffee-500/20"
                                  : "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10 hover:text-gray-200"
                              }`}
                            >
                              {opt.volume}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="mb-4">
                          <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded-md">
                            {activeOption.volume}
                          </span>
                        </div>
                      )}

                      {/* Price tag with animation */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">
                          {t("Цена за объем:", "Price:")}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <motion.span
                            key={activeOption.price}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-black font-display text-gold-accent"
                          >
                            {activeOption.price}
                          </motion.span>
                          <span className="text-sm font-semibold text-gold-accent">₽</span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Special Menu note */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500 italic max-w-xl mx-auto">
              {t(
                "* Мы рады приготовить любой напиток на альтернативном молоке (овсяное, кокосовое, миндальное) + 50 ₽.",
                "* Alternative milks (Oat, Coconut, Almond) are available for any recipe upon request for +50 ₽."
              )}
            </p>
          </div>

        </div>
      </section>

      {/* 4. Customer Reviews Section */}
      <section id="reviews" className="py-24 sm:py-32 bg-gradient-to-b from-espresso-900 to-espresso-950 border-t border-white/5 relative z-10 overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-[-5%] w-72 h-72 rounded-full bg-coffee-700/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column Section Title */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-8 bg-gold-accent" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-accent">
                    {t("ОТЗЫВЫ ГОСТЕЙ", "TESTIMONIALS")}
                  </span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl font-black text-white leading-tight">
                  {t("Атмосфера,", "Atmosphere,")}<br />
                  {t("которую любят", "People Adore")}
                </h2>
              </div>
              
              <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base">
                {t(
                  "Мы ценим каждого посетителя и ежедневно работаем над тем, чтобы кофе оставался бескомпромиссным, а сервис — самым искренним.",
                  "We strive every morning to serve outstanding cups while preserving a quiet, premium, and welcoming atmosphere."
                )}
              </p>

              {/* Slider Indicator controls */}
              <div className="flex items-center gap-3 pt-4">
                {REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentReview(idx);
                      startReviewTimer();
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentReview === idx ? "w-10 bg-gold-accent" : "w-2.5 bg-white/10 hover:bg-white/20"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column Sliding Card */}
            <div className="lg:col-span-7 relative min-h-[320px] flex items-center justify-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="w-full p-8 sm:p-10 rounded-3xl glass-panel border border-white/5 relative shadow-xl"
                  onMouseEnter={stopReviewTimer}
                  onMouseLeave={startReviewTimer}
                >
                  {/* Glowing light highlight inside card */}
                  <div className="absolute top-0 left-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-accent/40 to-transparent" />

                  {/* Decorative quote mark */}
                  <span className="absolute top-6 right-8 text-7xl font-serif text-coffee-800/15 leading-none select-none">
                    “
                  </span>

                  {/* Star Ratings with Animation */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 text-gold-accent fill-gold-accent animate-pulse`}
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                    <span className="text-xs font-mono text-gold-accent ml-2">5.0</span>
                  </div>

                  {/* Review Text */}
                  <blockquote className="font-serif text-lg sm:text-xl text-gray-200 leading-relaxed font-light italic mb-8">
                    "{isRu ? REVIEWS[currentReview].russianText : REVIEWS[currentReview].text}"
                  </blockquote>

                  {/* Review Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={REVIEWS[currentReview].avatar}
                      alt={REVIEWS[currentReview].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold-accent/20"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display text-sm sm:text-base font-bold text-white">
                        {REVIEWS[currentReview].name}
                      </h4>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">
                        {REVIEWS[currentReview].date}
                      </p>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Slider Navigation buttons */}
              <div className="absolute -bottom-14 right-4 flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
                    startReviewTimer();
                  }}
                  className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
                    startReviewTimer();
                  }}
                  className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. Gallery Section */}
      <section id="gallery" className="py-24 sm:py-32 bg-espresso-950 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2">
              <div className="h-[1px] w-6 bg-gold-accent" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-accent">
                {t("ФОТОГАЛЕРЕЯ", "COZY GALLERY")}
              </span>
              <div className="h-[1px] w-6 bg-gold-accent" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-black text-white">
              {t("Атмосфера в деталях", "Glimpses of Letun")}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-light">
              {t(
                "Качественное сырье, согревающий свет, идеальная молочная микропена и наши уютные уголки.",
                "Take a virtual look inside our warm interior, specialty beans, and gourmet freshly baked desserts."
              )}
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "all", ru: "Все", en: "All" },
              { id: "coffee", ru: "Кофе", en: "Coffee" },
              { id: "interior", ru: "Интерьер", en: "Interior" },
              { id: "dessert", ru: "Десерты", en: "Desserts" },
              { id: "atmosphere", ru: "Уют", en: "Atmosphere" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setGalleryFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                  galleryFilter === cat.id
                    ? "bg-gold-accent text-espresso-950 border-gold-accent font-bold"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-gray-200"
                }`}
              >
                {t(cat.ru, cat.en)}
              </button>
            ))}
          </div>

          {/* Grid Layout (Bento / masonry style) */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => setLightboxImage(item.url)}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in border border-white/5 shadow-md bg-espresso-900"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dark glow overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[10px] font-mono text-gold-accent tracking-widest uppercase mb-1">
                      {t(item.category.toUpperCase(), item.category.toUpperCase())}
                    </span>
                    <h3 className="text-base font-serif font-bold text-white">
                      {isRu ? item.russianTitle : item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 6. Contact / Visit Us Section */}
      <section id="visit" className="py-24 sm:py-32 bg-gradient-to-b from-espresso-950 to-espresso-900 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Interactive Contacts details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-8 bg-gold-accent" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-accent">
                    {t("ПРИХОДИТЕ В ГОСТИ", "VISIT US")}
                  </span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl font-black text-white leading-tight">
                  {t("Будем рады вам", "Where Coffee")}<br />
                  <span className="text-gold-accent">{t("каждый день", "Meets Serenity")}</span>
                </h2>
              </div>

              {/* Info Block list */}
              <div className="space-y-6">
                
                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gold-accent/25 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-coffee-500/10 flex items-center justify-center shrink-0 border border-coffee-500/20">
                    <MapPin className="w-5 h-5 text-gold-accent" />
                  </div>
                  <div className="space-y-2.5 w-full">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-coffee-400">
                        {t("Адрес", "Address")}
                      </h4>
                      <p className="text-sm font-semibold text-white mt-1">
                        {t("Краснодар, ул. Наставников, д. 12, к. 1", "12 Nastavnikov Street, Building 1, Krasnodar")}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(
                        t("Краснодар, ул. Наставников, д. 12, к. 1", "12 Nastavnikov Street, Building 1, Krasnodar"),
                        t("Адрес", "Address")
                      )}
                      className="inline-flex items-center gap-1.5 text-xs text-gold-accent hover:text-white font-semibold cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t("Скопировать адрес", "Copy Address")}</span>
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gold-accent/25 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-coffee-500/10 flex items-center justify-center shrink-0 border border-coffee-500/20">
                    <Phone className="w-5 h-5 text-gold-accent" />
                  </div>
                  <div className="space-y-2.5 w-full">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-coffee-400">
                        {t("Телефон", "Phone")}
                      </h4>
                      <a 
                        href="tel:+79604967325"
                        className="text-sm font-semibold text-white mt-1 hover:text-gold-accent transition-colors block"
                      >
                        +7 (960) 496-73-25
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard("+79604967325", t("Телефон", "Phone"))}
                      className="inline-flex items-center gap-1.5 text-xs text-gold-accent hover:text-white font-semibold cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t("Скопировать номер", "Copy Phone")}</span>
                    </button>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-coffee-500/10 flex items-center justify-center shrink-0 border border-coffee-500/20">
                    <Clock className="w-5 h-5 text-gold-accent" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-coffee-400">
                      {t("Часы работы", "Working Hours")}
                    </h4>
                    <p className="text-sm font-semibold text-white mt-1">
                      {t("Ежедневно — до 22:00", "Daily — Open until 22:00")}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {t("Кухня закрывается в 21:30", "Kitchen closes at 21:30")}
                    </p>
                  </div>
                </div>

              </div>

              {/* Unique micro features grid */}
              <div className="pt-4 grid grid-cols-2 gap-4">
                {[
                  { text: t("Кофе с собой", "Coffee to go"), icon: Coffee },
                  { text: t("Можно с собаками", "Dog-friendly"), icon: Smile },
                  { text: t("Уютные кресла", "Cozy seating"), icon: Heart },
                  { text: t("Быстрый Wi-Fi", "Free Wi-Fi"), icon: Wifi },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <Check className="w-4 h-4 text-gold-accent" />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right: Embedded Interactive Map */}
            <div className="lg:col-span-7 w-full space-y-4">
              <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative bg-espresso-950 aspect-[4/3] md:aspect-video lg:aspect-[16/10] w-full">
                
                {/* Styled OpenStreetMap dark themed leaflet/iframe map of Nastavnikov, Krasnodar */}
                <iframe
                  title="Letun Coffee Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.8791321013446!2d38.9806443!3d45.0354716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f0462058fc1f91%3A0xe5a363d6fa0be9!2sKrasnodar%20Russia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  className="absolute inset-0 w-full h-full filter invert-[90%] hue-rotate-[180deg] saturate-[60%] brightness-[85%] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Ambient map tag card */}
                <div className="absolute bottom-4 left-4 p-4 rounded-xl bg-espresso-950/90 backdrop-blur-md border border-white/10 shadow-lg text-xs hidden sm:block max-w-xs">
                  <span className="font-bold text-white block">
                    {t("Наставников, 12к1", "12 Nastavnikov St")}
                  </span>
                  <span className="text-gray-400 mt-1 block leading-relaxed">
                    {t("Уютная зеленая улица рядом с центром города.", "Cozy green street located close to Krasnodar center.")}
                  </span>
                </div>

              </div>
              <div className="flex justify-between items-center text-xs text-gray-500 font-mono px-2">
                <span>{t("Координаты: 45.03547, 38.98064", "Coordinates: 45.03547, 38.98064")}</span>
                <a
                  href="https://yandex.ru/maps/?text=Краснодар+Наставников+12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-accent hover:underline flex items-center gap-1"
                >
                  <span>{t("Открыть в картах", "Open in Yandex Maps")}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Minimal Dark Footer */}
      <footer className="bg-espresso-950 border-t border-white/5 relative z-10 pt-16 pb-8 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
            
            {/* Column 1: Brand details */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-coffee-700/20 border border-gold-accent/25 flex items-center justify-center">
                  <Coffee className="w-4.5 h-4.5 text-gold-accent" />
                </div>
                <span className="font-display text-lg font-bold tracking-[0.2em] text-white">
                  ЛЕТУН
                </span>
              </div>
              <p className="text-xs text-gray-400 max-w-sm font-light leading-relaxed">
                {t(
                  "Кофейня третьей волны в Краснодаре. Профессиональное заваривание, бережное отношение к сырью и заботливый сервис каждый день.",
                  "Third wave specialty coffee bar based in Krasnodar. Professional brewing, premium single-origin beans, and welcoming service daily."
                )}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
                {t("Навигация", "Explore")}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#about" className="hover:text-gold-accent transition-colors">
                    {t("О кофейне", "About Us")}
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-gold-accent transition-colors">
                    {t("Меню напитков", "Drinks Menu")}
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-gold-accent transition-colors">
                    {t("Отзывы гостей", "Testimonials")}
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-gold-accent transition-colors">
                    {t("Галерея", "Photo Gallery")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Socials */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
                {t("Социальные сети", "Connect")}
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-gold-accent hover:border-gold-accent/40 hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="Instagram Link"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-gold-accent hover:border-gold-accent/40 hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="Telegram Link"
                >
                  <Send className="w-5 h-5" />
                </a>
              </div>
              <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">
                {t(
                  "* Деятельность Meta (Instagram) запрещена на территории РФ.",
                  "* Instagram is operated by Meta Platforms Inc."
                )}
              </p>
            </div>

          </div>

          {/* Sub-Footer copyrights */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              &copy; {new Date().getFullYear()} ЛЕТУН Coffee. {t("Все права защищены.", "All rights reserved.")}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono">
              <span>{t("Сделано с любовью и кофе", "Made with passion and coffee")}</span>
              <Heart className="w-3 h-3 text-coffee-500 fill-coffee-500 animate-pulse" />
            </div>
          </div>

        </div>
      </footer>

      {/* Lightbox Modal for Gallery Images */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white border border-white/10 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Big format image wrapper */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden border border-white/10"
            >
              <img
                src={lightboxImage}
                alt="Lightbox View"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Notification Toast Component */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-gradient-to-r from-espresso-900 to-espresso-950 border border-gold-accent/40 shadow-xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gold-accent/10 flex items-center justify-center">
              <Check className="w-4 h-4 text-gold-accent" />
            </div>
            <span className="text-sm font-semibold text-white">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
