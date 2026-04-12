"use client";

import { useEffect, useCallback, useState, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useNavigation } from "@/lib/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { BackToTop } from "@/components/shared/BackToTop";
import { BackToTopPercentage } from "@/components/shared/BackToTopPercentage";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { ScrollNavDots } from "@/components/shared/ScrollNavDots";
import { LiveChatIndicator } from "@/components/shared/LiveChatIndicator";
import { LiveStatus } from "@/components/shared/LiveStatus";
import { toast } from "sonner";
import { PageTransitionSkeleton } from "@/components/shared/PageTransitionSkeleton";
import HomePage from "@/components/pages/HomePage";
import AboutPage from "@/components/pages/AboutPage";
import ServicesPage from "@/components/pages/ServicesPage";
import PortfolioPage from "@/components/pages/PortfolioPage";
import PackagesPage from "@/components/pages/PackagesPage";
import ContactPage from "@/components/pages/ContactPage";

const pageComponents = {
  home: HomePage,
  about: AboutPage,
  services: ServicesPage,
  portfolio: PortfolioPage,
  packages: PackagesPage,
  contact: ContactPage,
};

const pageLabels: Record<string, string> = {
  home: "Home",
  about: "About",
  services: "Services",
  portfolio: "Portfolio",
  packages: "Packages",
  contact: "Contact",
};

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function Page() {
  const { currentPage, navigate } = useNavigation();
  // Track whether loading screen has completed this session
  const loadingCompleteRef = useState(false);
  const [loadingComplete, setLoadingComplete] = loadingCompleteRef;

  // Hydration-safe read from sessionStorage via useSyncExternalStore
  const loadedFromStorage = useSyncExternalStore(
    () => () => {},
    () => sessionStorage.getItem('carter-loaded') === 'true',
    () => false
  );

  const hasLoaded = loadedFromStorage || loadingComplete;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const initialLoadRef = useRef(true);

  // ─── Page transition progress bar ───
  const progressValue = useMotionValue(0);
  const progressSpring = useSpring(progressValue, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const startTransitionProgress = useCallback(() => {
    setIsTransitioning(true);
    // Show skeleton only on non-initial page transitions
    if (!initialLoadRef.current) {
      setShowSkeleton(true);
    }
    progressValue.set(0);
    // Animate to 70% quickly
    requestAnimationFrame(() => {
      progressValue.set(70);
    });
    // Then complete to 100%
    setTimeout(() => {
      progressValue.set(100);
    }, 200);
    // Hide skeleton and bar after completion
    setTimeout(() => {
      setIsTransitioning(false);
      setShowSkeleton(false);
      progressValue.set(0);
    }, 500);
  }, [progressValue]);

  const handleNavigateWithTransition = useCallback(
    (page: string) => {
      if (page === currentPage) return;
      startTransitionProgress();
      navigate(page as keyof typeof pageComponents);
    },
    [currentPage, navigate, startTransitionProgress]
  );

  const handleLoadingComplete = useCallback(() => {
    setLoadingComplete(true);
    sessionStorage.setItem('carter-loaded', 'true');
  }, []);

  // Listen for hash changes to support direct navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const validPages = ["home", "about", "services", "portfolio", "packages", "contact"];
      if (hash && validPages.includes(hash)) {
        navigate(hash as keyof typeof pageComponents);
      }
    };
    window.addEventListener("hashchange", handleHash);
    // Check initial hash
    handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  }, [navigate]);

  // Keyboard accessibility with toast notifications
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const pages = ["home", "about", "services", "portfolio", "packages", "contact"];
      const idx = pages.indexOf(currentPage);
      if (e.altKey) {
        if (e.key === "ArrowRight" && idx < pages.length - 1) {
          const nextPage = pages[idx + 1];
          navigate(nextPage as keyof typeof pageComponents);
          window.location.hash = nextPage;
          startTransitionProgress();
          toast.info(`Navigated to ${pageLabels[nextPage]}`, {
            description: "Alt + Arrow Right",
            duration: 2000,
          });
        } else if (e.key === "ArrowLeft" && idx > 0) {
          const prevPage = pages[idx - 1];
          navigate(prevPage as keyof typeof pageComponents);
          window.location.hash = prevPage;
          startTransitionProgress();
          toast.info(`Navigated to ${pageLabels[prevPage]}`, {
            description: "Alt + Arrow Left",
            duration: 2000,
          });
        }
      }
    },
    [currentPage, navigate, startTransitionProgress]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const PageComponent = pageComponents[currentPage];

  // Mark initial load as complete after first page mount
  useEffect(() => {
    const timer = setTimeout(() => {
      initialLoadRef.current = false;
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update hash on navigation + smooth scroll to top
  useEffect(() => {
    if (currentPage !== "home") {
      window.history.replaceState(null, "", `#${currentPage}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
    // Smooth scroll to top on every page navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] dark:bg-[#0A0A0B]">
      {/* Loading screen - shows only on first visit per session */}
      {!hasLoaded && <LoadingScreen onComplete={handleLoadingComplete} />}
      {/* Scroll progress bar */}
      <ScrollProgress />
      {/* Page transition progress indicator */}
      {isTransitioning && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[60] h-[3px]"
          style={{
            scaleX: progressSpring,
            transformOrigin: "0%",
          }}
        >
          <div className="h-full w-full bg-gradient-to-r from-[#B8922F] via-[#D4A853] to-[#E8C97A]" />
        </motion.div>
      )}
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {showSkeleton && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <PageTransitionSkeleton />
            </motion.div>
          )}
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <PageComponent />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      {/* Back to top button with percentage */}
      <BackToTopPercentage />
      {/* WhatsApp floating button */}
      <WhatsAppButton />
      {/* Live status indicator */}
      <LiveStatus />
      {/* Live chat availability indicator */}
      <LiveChatIndicator />
      {/* Scroll navigation dots */}
      <ScrollNavDots />
      {/* Custom cursor effect (desktop only) */}
      <CustomCursor />
      {/* Cookie consent banner */}
      <CookieConsent />
    </div>
  );
}
