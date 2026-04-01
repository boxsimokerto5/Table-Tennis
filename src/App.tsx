/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Play, Info, ChevronRight, RotateCcw, Target, Loader2, Image as ImageIcon, Download } from "lucide-react";
import { generateAppIcon } from "./services/iconService";

// --- Start.io Integration ---
const START_APP_ID = "203319884";

const useStartApp = () => {
  useEffect(() => {
    const initAds = () => {
      if ((window as any).startapp) {
        (window as any).startapp.init(START_APP_ID);
      }
    };
    
    if (document.readyState === "complete") {
      initAds();
    } else {
      window.addEventListener("load", initAds);
      return () => window.removeEventListener("load", initAds);
    }
  }, []);

  const showInterstitial = (onComplete: () => void) => {
    if ((window as any).startapp && (window as any).startapp.showInterstitial) {
      (window as any).startapp.showInterstitial();
      setTimeout(onComplete, 2000); 
    } else {
      console.log("Start.io Interstitial requested");
      setTimeout(onComplete, 1000);
    }
  };

  const showLaviAd = (onComplete: () => void) => {
    if ((window as any).startapp && (window as any).startapp.showVideo) {
      (window as any).startapp.showVideo();
      setTimeout(onComplete, 3000);
    } else {
      console.log("Start.io Lavi/Video Ad requested");
      setTimeout(onComplete, 1500);
    }
  };

  const loadBanner = (containerId: string) => {
    if ((window as any).startapp && (window as any).startapp.addBanner) {
      try {
        (window as any).startapp.addBanner({
          container: containerId,
          appId: START_APP_ID,
          adUnit: "banner"
        });
      } catch (e) {
        console.error("Start.io Banner Error:", e);
      }
    }
  };

  return { showInterstitial, showLaviAd, loadBanner };
};

// --- Components ---

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#3a5a9a] flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(58,90,154,0.8) 0%, rgba(20,40,80,1) 100%), url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Title from Image */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-black text-white tracking-widest uppercase mb-0 drop-shadow-lg leading-none">
            TABLE TENNIS
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="h-[2px] w-12 bg-white/50" />
            <span className="text-white text-lg font-bold tracking-[0.3em] uppercase opacity-90">WORLD TOUR</span>
            <div className="h-[2px] w-12 bg-white/50" />
          </div>
          
          {/* Wings and Globe Decoration */}
          <div className="flex items-center justify-center mt-4 opacity-80">
            <div className="w-10 h-[1px] bg-white" />
            <div className="mx-2 w-6 h-6 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center overflow-hidden">
               <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/22/Earth_Western_Hemisphere_transparent_background.png')] bg-cover" />
            </div>
            <div className="w-10 h-[1px] bg-white" />
          </div>
        </motion.div>

        {/* Crossed Paddles Animation */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <motion.div
            initial={{ rotate: -45, x: -100, opacity: 0 }}
            animate={{ rotate: -30, x: -20, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="absolute z-10"
          >
            <div className="w-24 h-24 bg-red-600 rounded-full border-4 border-[#222] shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
            </div>
            <div className="w-4 h-16 bg-[#d4a373] mx-auto -mt-2 rounded-b-md border-2 border-[#222] shadow-md" />
          </motion.div>

          <motion.div
            initial={{ rotate: 45, x: 100, opacity: 0 }}
            animate={{ rotate: 30, x: 20, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="absolute z-10"
          >
            <div className="w-24 h-24 bg-emerald-600 rounded-full border-4 border-[#222] shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
            </div>
            <div className="w-4 h-16 bg-[#d4a373] mx-auto -mt-2 rounded-b-md border-2 border-[#222] shadow-md" />
          </motion.div>

          {/* Yellow Ball */}
          <motion.div
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: -20 }}
            transition={{ delay: 1.2, type: "spring", bounce: 0.6 }}
            className="absolute z-20 w-8 h-8 bg-yellow-400 rounded-full shadow-lg border-2 border-yellow-600 flex items-center justify-center"
          >
            <div className="w-1 h-1 bg-white/50 rounded-full absolute top-1 left-1" />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center">
        <div className="flex gap-1 mb-3">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          ))}
        </div>
        <p className="text-white/70 text-[10px] uppercase tracking-[0.4em] font-bold">PREPARING ARENA</p>
      </div>
    </motion.div>
  );
};

const Instructions = ({ onStart, loadBanner }: { onStart: () => void; loadBanner: (id: string) => void }) => {
  const bannerId = "startapp-banner-container";
  const [generatedIcon, setGeneratedIcon] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateIcon = async () => {
    setIsGenerating(true);
    try {
      const iconUrl = await generateAppIcon();
      setGeneratedIcon(iconUrl);
    } catch (error) {
      console.error("Failed to generate icon:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBanner(bannerId);
    }, 500);
    return () => clearTimeout(timer);
  }, [loadBanner]);

  const steps = [
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Control the Paddle",
      desc: "Swipe or move your mouse to control the paddle's position."
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-white" />,
      title: "Timing is Everything",
      desc: "Hit the ball at the right moment to perform powerful smashes."
    },
    {
      icon: <Trophy className="w-6 h-6 text-white" />,
      title: "Win the Tour",
      desc: "Defeat opponents from around the world to become the champion."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundColor: '#3a5a9a',
        backgroundImage: `radial-gradient(circle, rgba(58,90,154,0.7) 0%, rgba(20,40,80,1) 100%), url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
      }}
    >
      <div className="flex-1 max-w-md mx-auto w-full p-6 overflow-y-auto">
        <header className="py-6 text-center">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-black text-white tracking-tighter uppercase italic drop-shadow-md"
          >
            HOW TO PLAY
          </motion.h2>
          <div className="h-1 w-24 bg-yellow-400 mx-auto mt-2 rounded-full shadow-sm" />
        </header>

        {/* Start.io Banner Ad Placement */}
        <div className="mb-6 bg-black/30 rounded-2xl h-24 flex items-center justify-center overflow-hidden border border-white/10 relative backdrop-blur-sm">
          <div id={bannerId} className="w-full h-full flex items-center justify-center">
             <div className="text-white/30 text-[10px] font-bold italic animate-pulse tracking-widest uppercase">Fetching Ad...</div>
          </div>
          <p className="text-[7px] text-white/40 absolute top-1 right-2 uppercase tracking-widest font-bold">Advertisement</p>
        </div>

        <div className="space-y-3">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex gap-4 items-center shadow-lg"
            >
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 shadow-inner">
                {step.icon}
              </div>
              <div>
                <h3 className="font-black text-white uppercase text-sm tracking-tight">{step.title}</h3>
                <p className="text-white/70 text-xs leading-tight mt-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Demo Area */}
        <div className="mt-6 bg-black/20 rounded-3xl h-40 relative overflow-hidden flex items-center justify-center border border-white/10 backdrop-blur-sm">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
           
           <motion.div 
            animate={{ x: [-40, 40, -40] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 bg-red-600 rounded-full border-4 border-[#222] shadow-2xl flex items-center justify-center relative z-10"
           >
             <div className="w-1 h-5 bg-white/20 rounded-full" />
           </motion.div>
           
           <motion.div 
            animate={{ 
              x: [-60, 60, -60],
              y: [0, -20, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-lg border border-yellow-600 z-20"
           />
           
           <p className="absolute bottom-3 text-white/40 font-black text-[9px] uppercase tracking-[0.3em]">Practice Mode</p>
        </div>

        {/* Icon Generator Section */}
        <div className="mt-8 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
          <h3 className="text-white font-black uppercase text-sm mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-yellow-400" />
            App Icon Generator
          </h3>
          
          {!generatedIcon ? (
            <button
              onClick={handleGenerateIcon}
              disabled={isGenerating}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  DESIGNING ICON...
                </>
              ) : (
                "GENERATE DIGITAL ICON"
              )}
            </button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
              >
                <img src={generatedIcon} alt="Generated App Icon" className="w-full h-full object-cover" />
              </motion.div>
              <div className="flex gap-2 w-full">
                <button
                  onClick={handleGenerateIcon}
                  disabled={isGenerating}
                  className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-lg border border-white/20 transition-all"
                >
                  REGENERATE
                </button>
                <a
                  href={generatedIcon}
                  download="icon-only.png"
                  className="flex-1 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/30 transition-all flex items-center justify-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  DOWNLOAD
                </a>
              </div>
              <p className="text-[9px] text-white/40 text-center leading-tight">
                Download this image and save it as <code className="text-yellow-400/60">resources/icon-only.png</code> to update your app icon.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto w-full p-6 pb-10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full bg-gradient-to-b from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-slate-900 font-black py-5 rounded-full shadow-[0_8px_0_rgb(180,130,0)] flex items-center justify-center gap-3 transition-all relative overflow-hidden group border-t-2 border-white/30"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-inner">
            <Play className="w-5 h-5 fill-slate-900 text-slate-900 ml-1" />
          </div>
          <span className="text-xl tracking-tighter uppercase italic">PLAY NOW</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const GameScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black flex flex-col"
    >
      <div className="flex-1 relative">
        <iframe
          src="https://play.famobi.com/table-tennis-world-tour"
          className="absolute inset-0 w-full h-full border-0"
          title="Table Tennis World Tour"
          allow="autoplay; fullscreen; gamepad"
        />
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<"splash" | "instructions" | "game">("splash");
  const [isAdLoading, setIsAdLoading] = useState(false);
  const { showInterstitial, showLaviAd, loadBanner } = useStartApp();

  const handleStartGame = () => {
    setIsAdLoading(true);
    
    // Show Lavi/Video Ad first
    showLaviAd(() => {
      // Then show Interstitial Ad
      showInterstitial(() => {
        setIsAdLoading(false);
        setScreen("game");
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans selection:bg-emerald-200">
      <AnimatePresence mode="wait">
        {isAdLoading && (
          <motion.div
            key="ad-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center text-white p-6 text-center"
          >
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <h3 className="text-xl font-bold">Preparing Arena...</h3>
            <p className="text-white/60 text-sm mt-2">Showing a short ad to support the game</p>
          </motion.div>
        )}

        {screen === "splash" && (
          <SplashScreen onFinish={() => setScreen("instructions")} />
        )}
        {screen === "instructions" && (
          <Instructions onStart={handleStartGame} loadBanner={loadBanner} />
        )}
        {screen === "game" && (
          <GameScreen />
        )}
      </AnimatePresence>
    </div>
  );
}
