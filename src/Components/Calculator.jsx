import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Calculator() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState("");

  const handleClick = (val) => {
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
        // Safe evaluation of the expression
        const result = String(Function(`"use strict"; return (${value})`)());
        setHistory(value);
        setValue(result);
      } catch {
        setValue("Error");
      }
      return;
    }
    setValue((prev) => prev + val);
  };

  // Handling Keyboard Events
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
    { val: "/", span: 1, color: "bg-purple-500 hover:bg-purple-600" },
    { val: "7", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "8", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "9", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "*", span: 1, color: "bg-purple-500 hover:bg-purple-600" },
    { val: "4", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "5", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "6", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "-", span: 1, color: "bg-purple-500 hover:bg-purple-600" },
    { val: "1", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "2", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "3", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "+", span: 1, color: "bg-purple-500 hover:bg-purple-600" },
    { val: "0", span: 2, color: "bg-slate-700 hover:bg-slate-600" },
    { val: ".", span: 1, color: "bg-slate-700 hover:bg-slate-600" },
    { val: "=", span: 1, color: "bg-green-500 hover:bg-green-600" },
  ];

  return (
    // Main container: Full viewport width and height
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-slate-900 to-black p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // Full width on mobile (w-full), max-width on larger screens (max-w-md)
        className="w-full h-full sm:h-auto sm:max-w-[400px] bg-slate-900/80 backdrop-blur-2xl flex flex-col shadow-2xl overflow-hidden sm:rounded-3xl border border-white/10"
      >
        {/* Display Section: Pushes buttons to bottom on mobile */}
        <div className="flex-grow flex flex-col justify-end p-6 sm:p-8">
          <div className="text-right text-lg text-purple-400 font-mono mb-2 h-8 overflow-hidden">
            {history}
          </div>
          <div className="text-right text-6xl sm:text-5xl text-white font-bold font-mono break-all leading-tight">
            {value || "0"}
          </div>
        </div>

        {/* Buttons Grid Section */}
        <div className="bg-slate-800/50 p-4 sm:p-6 grid grid-cols-4 gap-3 sm:gap-4 rounded-t-[3rem] sm:rounded-t-none">
          {buttons.map((btn, i) => (
            <motion.button
              whileTap={{ scale: 0.92 }}
              key={i}
              onClick={() => handleClick(btn.val)}
              style={{ gridColumn: `span ${btn.span}` }}
              className={`${btn.color} py-5 sm:py-4 rounded-2xl text-xl font-bold text-white shadow-lg transition-colors flex items-center justify-center`}
            >
              {btn.val}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
