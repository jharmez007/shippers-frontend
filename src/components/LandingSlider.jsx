import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "../constants";

const slides = [
  {
    title: "Confirmation of Reasonableness of Freight,\nDemurrage Fees and Charter Party Fees",
    text: "In an effort to eliminate incidences of illegal capital flight, the Nigerian Shippers' Council confirms reasonableness of Freight, Demurrage Fees And Charter Party Fees, on behalf of Central Bank of Nigeria (CBN).",
    image: images.port,
  },
  {
    title: "Digitalization of Port Processes",
    text: "The Nigerian Shippers' Council is collaborating with stakeholders to streamline port processes through technology.",
    image: images.porttwo,
  },
  {
    title: "Ensuring Transparent Shipping Charges",
    text: "Efforts are underway to regulate shipping charges across all Nigerian ports.",
    image: images.portthree,
  },
];

// Preload images for smooth transitions
const preloadImages = (slides) => {
  slides.forEach((slide) => {
    const img = new Image();
    img.src = slide.image;
  });
};

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    willChange: "transform, opacity",
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7 },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: { duration: 0.5 },
    willChange: "transform, opacity",
  }),
};

const LandingSlider = () => {
  const [[current, direction], setCurrent] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const requestRef = useRef(null);

  // Preload images on mount
  useEffect(() => {
    preloadImages(slides);
  }, []);

  const slideTo = useCallback(
    (index) => {
      const newDirection = index > current ? 1 : -1;
      setCurrent([index, newDirection]);
    },
    [current]
  );

  const nextSlide = useCallback(() => {
    setCurrent(([prev]) => [(prev + 1) % slides.length, 1]);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent(([prev]) => [(prev - 1 + slides.length) % slides.length, -1]);
  }, []);

  // Smooth autoplay with requestAnimationFrame
  useEffect(() => {
    if (paused) return;

    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      if (elapsed > 3000) {
        nextSlide();
        start = timestamp;
      }
      requestRef.current = requestAnimationFrame(step);
    };

    requestRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(requestRef.current);
  }, [current, paused, nextSlide]);

  return (
    <div className="app__flex w-full h-[80vh] py-8 lg:p-20">
      <div
        className="w-full relative h-full overflow-hidden lg:rounded"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background Image as Motion Div for GPU acceleration */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
        </AnimatePresence>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-6xl px-6 md:px-16 text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[current].title}
                initial={{ opacity: 0, y: 20, willChange: "transform, opacity" }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug whitespace-pre-line">
                  {slides[current].title}
                </h1>
                <p className="mt-4 text-sm md:text-base max-w-2xl leading-relaxed">
                  {slides[current].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Prev/Next Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 w-full flex justify-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => slideTo(i)}
              className={`w-3 h-3 rounded-full ${
                i === current ? "bg-white" : "bg-white/40"
              } transition-colors`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingSlider;
