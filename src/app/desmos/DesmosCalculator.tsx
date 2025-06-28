'use client'
import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import * as Desmos from "desmos";

const DesmosCalculator = () => {
  const calculatorRef = useRef<HTMLDivElement | null>(null);
  const calculatorInstance = useRef<any>(null);

  // We don't need to explicitly check for the browser here since it's already handled by 'use client'
  useEffect(() => {
    if (typeof window === "undefined" || !calculatorRef.current) return; // Avoid SSR issues

    // Initialize Desmos Calculator
    calculatorInstance.current = Desmos.GraphingCalculator(calculatorRef.current, {
      expressions: true,
      keypad: true,
      settingsMenu: true,
      zoomButtons: true,
      features: {
        expressions: true,
        zoomButtons: true,
        settingsMenu: true,
      },
    });

    // Set default expression
    calculatorInstance.current.setExpression({
      id: "default_graph",
      latex: "y = x^2"
    });

    // Cleanup on unmount
    return () => {
      calculatorInstance.current?.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-backgroundColor">
      <header className="p-4 bg-backgroundColor shadow-sm">
        <h1 className="text-2xl font-bold text-headerColor">
          Graphing Calculator
        </h1>
      </header>
      
      <div 
        ref={calculatorRef} 
        className="flex-grow w-full bg-white"
      />
      <div className="h-10"></div>
    </div>
  );
};

export default DesmosCalculator;
