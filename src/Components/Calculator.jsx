import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Calculator() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState("");

  const handleClick = (val) => {
    // English comment: Mobile vibration logic for haptic feedback
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }

    if (val === "C") {
      setValue("");
      setHistory("");
      return;
    }
    if (val === "⌫") {
      setValue((prev) => prev.slice(0, -1));
      return;
    }
    if (val === "=") {
      try {
        const lastChar = value.slice(-1);
        if (["+", "-", "*", "/", "."].includes(lastChar)) return;

        // English comment: Safe evaluation using Function constructor
        const result = String(Function(`"use strict"; return (${value})`)());
        setHistory(value);
        setValue(result);
      } catch {
        setValue("Error");
      }
      return;
    }

    const operators = ["+", "-", "*", "/", "."];
    const lastChar = value.slice(-1);

    if (value === "" && operators.includes(val) && val !== "-") return;

    if (operators.includes(lastChar) && operators.includes(val)) {
      setValue((prev) => prev.slice(0, -1) + val);
      return;
    }

    setValue((prev) => prev + val);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/[0-9]/.test(key)) handleClick(key);
      if (["+", "-", "*", "/", "."].includes(key)) handleClick(key);
      if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleClick("=");
      }
      if (key === "Backspace") handleClick("⌫");
      if (key === "Escape") handleClick("C");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [value]);

  const buttons = [
    { val: "C", span: 2, color: "bg-red-500 hover:bg-red-600" },
    { val: "⌫", span: 1, color: "bg-orange-500 hover:bg-orange-600" },
    { val: "/", span: 1, color: "bg-purple-600 hover:bg-purple-700" },
    { val: "7", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "8", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "9", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "*", span: 1, color: "bg-purple-600 hover:bg-purple-700" },
    { val: "4", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "5", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "6", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "-", span: 1, color: "bg-purple-600 hover:bg-purple-700" },
    { val: "1", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "2", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "3", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "+", span: 1, color: "bg-purple-600 hover:bg-purple-700" },
    { val: "0", span: 2, color: "bg-slate-700 hover:bg-slate-600" },
    { val: ".", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "=", span: 1, color: "bg-green-600 hover:bg-green-700" },
  ];

  return (
    // English comment: Use fixed inset-0 to prevent scrolling and ensure full-screen feel
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-950 via-slate-950 to-black overflow-hidden selection:bg-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full sm:h-auto sm:max-w-[420px] bg-slate-900/40 backdrop-blur-3xl flex flex-col shadow-2xl sm:rounded-[3rem] border-white/5"
      >
        {/* English comment: Display section uses flex-1 to push buttons down on mobile */}
        <div className="flex-[1.2] flex flex-col justify-end p-8 sm:p-10">
          <div className="text-right text-xl text-purple-400 font-mono mb-4 h-8 opacity-70 tracking-widest">
            {history}
          </div>
          <div className="text-right text-7xl sm:text-6xl text-white font-bold font-mono overflow-hidden break-all leading-tight">
            {value || "0"}
          </div>
        </div>

        {/* English comment: Button grid with increased height on mobile (h-[65%]) */}
        <div className="flex-[2] bg-slate-800/60 p-5 sm:p-8 grid grid-cols-4 gap-4 sm:gap-5 rounded-t-[3.5rem] sm:rounded-t-none shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
          {buttons.map((btn, i) => (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={i}
              onClick={() => handleClick(btn.val)}
              style={{ gridColumn: `span ${btn.span}` }}
              // English comment: h-full ensures buttons stretch to fill the grid container
              className={`${btn.color} h-full min-h-[70px] sm:min-h-[60px] rounded-[1rem] text-3xl font-bold text-white shadow-xl flex items-center justify-center border border-white/5 active:brightness-125 transition-all`}
            >
              {btn.val}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
