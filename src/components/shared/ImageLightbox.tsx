"use client";

import { useReducer, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

/* ──────────────────────── types ────────────────────────────────── */
export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

interface LightboxState {
  currentIndex: number;
  isZoomed: boolean;
  isLoading: boolean;
  direction: number;
  imgKey: number;
}

type LightboxAction =
  | { type: "OPEN"; index: number }
  | { type: "CLOSE" }
  | { type: "NEXT"; total: number }
  | { type: "PREV" }
  | { type: "GO_TO"; index: number; from: number }
  | { type: "TOGGLE_ZOOM" }
  | { type: "IMAGE_LOADED" };

function lightboxReducer(state: LightboxState, action: LightboxAction): LightboxState {
  switch (action.type) {
    case "OPEN":
      return {
        currentIndex: action.index,
        isZoomed: false,
        isLoading: true,
        direction: 0,
        imgKey: state.imgKey + 1,
      };
    case "CLOSE":
      return state;
    case "NEXT":
      if (state.currentIndex < action.total - 1) {
        return { ...state, currentIndex: state.currentIndex + 1, isZoomed: false, isLoading: true, direction: 1, imgKey: state.imgKey + 1 };
      }
      return state;
    case "PREV":
      if (state.currentIndex > 0) {
        return { ...state, currentIndex: state.currentIndex - 1, isZoomed: false, isLoading: true, direction: -1, imgKey: state.imgKey + 1 };
      }
      return state;
    case "GO_TO":
      return { ...state, currentIndex: action.index, isZoomed: false, isLoading: true, direction: action.index > action.from ? 1 : -1, imgKey: state.imgKey + 1 };
    case "TOGGLE_ZOOM":
      return { ...state, isZoomed: !state.isZoomed };
    case "IMAGE_LOADED":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

/* ──────────────────────── component ────────────────────────────── */
export default function ImageLightbox({
  images,
  initialIndex = 0,
  open,
  onClose,
}: ImageLightboxProps) {
  const [state, dispatch] = useReducer(lightboxReducer, {
    currentIndex: 0,
    isZoomed: false,
    isLoading: true,
    direction: 0,
    imgKey: 0,
  });
  const mainImageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const prevOpenRef = useRef(false);

  const { currentIndex, isZoomed, isLoading, direction, imgKey } = state;

  /* Reset state when lightbox opens */
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      dispatch({ type: "OPEN", index: initialIndex });
      document.body.style.overflow = "hidden";
    }
    if (!open && prevOpenRef.current) {
      document.body.style.overflow = "";
    }
    prevOpenRef.current = open;
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, initialIndex]);

  /* Navigation helpers */
  const goToNext = useCallback(() => {
    dispatch({ type: "NEXT", total: images.length });
  }, [images.length]);

  const goToPrev = useCallback(() => {
    dispatch({ type: "PREV" });
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      dispatch({ type: "GO_TO", index, from: currentIndex });
    },
    [currentIndex],
  );

  const toggleZoom = useCallback(() => {
    dispatch({ type: "TOGGLE_ZOOM" });
  }, []);

  const handleImageLoad = useCallback(() => {
    dispatch({ type: "IMAGE_LOADED" });
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, goToNext, goToPrev, onClose]);

  /* Swipe gesture handler */
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -60) goToNext();
    else if (info.offset.x > 60) goToPrev();
  };

  /* Scroll active thumbnail into view */
  useEffect(() => {
    if (!thumbnailStripRef.current) return;
    const activeThumb = thumbnailStripRef.current.children[
      currentIndex
    ] as HTMLElement | undefined;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  const currentImage = images[currentIndex];

  /* Animation variants */
  const imageVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 0.92,
      x: dir > 0 ? 40 : dir < 0 ? -40 : 0,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.92,
      x: dir > 0 ? -40 : dir < 0 ? 40 : 0,
      transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
    }),
  };

  if (!open || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Top bar: counter + close */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-2 shrink-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white/70 select-none">
              {currentIndex + 1}
              <span className="text-white/30 mx-1">/</span>
              {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center
                       bg-white/5 border border-white/10 text-white/50
                       hover:text-white hover:bg-white/10 hover:border-[rgba(212,168,83,0.3)]
                       hover:shadow-[0_0_20px_rgba(212,168,83,0.15)]
                       transition-all duration-200"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main image area */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden min-h-0">
          {currentIndex > 0 && (
            <button
              onClick={goToPrev}
              className="absolute left-2 sm:left-4 md:left-6 z-20 w-11 h-11 rounded-full
                         bg-white/5 border border-white/10 flex items-center justify-center
                         text-white/50 hover:text-[#D4A853] hover:bg-white/10
                         hover:border-[rgba(212,168,83,0.3)] hover:shadow-[0_0_15px_rgba(212,168,83,0.1)]
                         transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {currentIndex < images.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 md:right-6 z-20 w-11 h-11 rounded-full
                         bg-white/5 border border-white/10 flex items-center justify-center
                         text-white/50 hover:text-[#D4A853] hover:bg-white/10
                         hover:border-[rgba(212,168,83,0.3)] hover:shadow-[0_0_15px_rgba(212,168,83,0.1)]
                         transition-all duration-200 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Image container */}
          <motion.div
            ref={containerRef}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            key={`img-${currentIndex}-${imgKey}`}
            drag={isZoomed ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className={`relative rounded-xl overflow-hidden
                        bg-[#111114] border border-[rgba(212,168,83,0.2)]
                        shadow-[0_0_60px_rgba(0,0,0,0.5),0_0_30px_rgba(212,168,83,0.05)]
                        ${isZoomed ? "cursor-grab active:cursor-grabbing" : ""}
                        select-none`}
            style={{
              maxWidth: "90vw",
              maxHeight: "calc(100vh - 200px)",
            }}
            onDoubleClick={toggleZoom}
            onClick={toggleZoom}
          >
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-[#111114]"
                >
                  <div className="w-full h-full animate-shimmer-gold" />
                </motion.div>
              )}
            </AnimatePresence>

            <img
              ref={mainImageRef}
              key={`src-${currentIndex}`}
              src={currentImage.src}
              alt={currentImage.alt}
              className="block max-w-full max-h-[calc(100vh-200px)] object-contain transition-transform duration-300"
              style={{
                transform: isZoomed ? "scale(2)" : "scale(1)",
                cursor: isZoomed ? "grab" : "zoom-in",
                userSelect: "none",
                WebkitUserDrag: "none",
              }}
              draggable={false}
              onLoad={handleImageLoad}
              onError={handleImageLoad}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full
                         bg-black/60 backdrop-blur-sm border border-white/10
                         flex items-center justify-center text-white/50
                         hover:text-[#D4A853] hover:border-[rgba(212,168,83,0.3)]
                         transition-all duration-200"
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
          </motion.div>
        </div>

        {/* Caption */}
        <AnimatePresence mode="wait">
          {currentImage.caption && (
            <motion.div
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="px-4 sm:px-6 py-2 text-center shrink-0"
            >
              <p className="text-sm text-[rgba(245,245,245,0.6)] font-medium leading-relaxed">
                {currentImage.caption}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="shrink-0 px-4 sm:px-6 pb-4 pt-2">
            <div
              ref={thumbnailStripRef}
              className="flex gap-2 overflow-x-auto max-w-4xl mx-auto py-1 gold-scrollbar"
              role="tablist"
              aria-label="Image thumbnails"
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => goToIndex(idx)}
                  className={`relative shrink-0 rounded-lg overflow-hidden
                              border-2 transition-all duration-200
                              ${
                                idx === currentIndex
                                  ? "border-[#D4A853] shadow-[0_0_12px_rgba(212,168,83,0.3)] scale-105"
                                  : "border-transparent opacity-50 hover:opacity-80 hover:border-white/20"
                              }`}
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`View image ${idx + 1}: ${img.alt}`}
                >
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.src})` }}
                  />
                  {idx === currentIndex && (
                    <motion.div
                      layoutId="lightbox-thumb-glow"
                      className="absolute inset-0 bg-gradient-to-t from-[rgba(212,168,83,0.2)] to-transparent pointer-events-none"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
