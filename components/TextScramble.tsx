"use client";
import { useState, useEffect, useRef } from "react";
import { getRandomCharacter } from "@/utils/animations";

interface TextScrambleProps {
  children: React.ReactNode;
  scrambleOnMount?: boolean;
  scrambleOnHover?: boolean;
  scrambleCount?: number;
  scrambleDelay?: number;
}

export default function TextScramble({ 
  children, 
  scrambleOnMount = true,
  scrambleOnHover = false,
  scrambleCount = 5,
  scrambleDelay = 50
}: TextScrambleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrambling, setIsScrambling] = useState(scrambleOnMount);
  const originalTexts = useRef<Map<Node, string>>(new Map());

  const scrambleText = async () => {
    if (!containerRef.current) return;
    
    // Store original text content
    const textNodes: Node[] = [];
    const walker = document.createTreeWalker(
      containerRef.current,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (node.textContent?.trim()) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        },
      }
    );

    while (walker.nextNode()) {
      const node = walker.currentNode;
      originalTexts.current.set(node, node.textContent || "");
      textNodes.push(node);
    }

    let count = 0;
    const scrambleInterval = setInterval(() => {
      textNodes.forEach((node) => {
        const original = originalTexts.current.get(node) || "";
        const scrambled = Array.from(original)
          .map((char) => (char === " " ? char : getRandomCharacter()))
          .join("");
        node.textContent = scrambled;
      });

      count++;
      if (count > scrambleCount) {
        // Restore original text
        textNodes.forEach((node) => {
          node.textContent = originalTexts.current.get(node) || "";
        });
        setIsScrambling(false);
        clearInterval(scrambleInterval);
      }
    }, scrambleDelay);

    return () => clearInterval(scrambleInterval);
  };
/* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (scrambleOnMount) {
      scrambleText();
    }
  }, [scrambleOnMount]);

  return (
    <div 
      ref={containerRef} 
      className="transition-all duration-500"
      onMouseEnter={() => scrambleOnHover && scrambleText()}
    >
      {children}
    </div>
  );
} 