"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Mıknatıs etkisi — imleç yaklaşınca öğe ona doğru hafifçe kayar.
 *
 * Bileşen repoda vardı ama HİÇBİR YERDE kullanılmıyordu (ölü kod, bkz.
 * docs/AWWWARDS-90-BLOCKERS.md A6). Silmek yerine birincil CTA'ya bağlandı:
 * sitenin en çok tıklanan düğmesi, imza mikro-etkileşimini taşımak için doğru
 * yer.
 *
 * Bağlamadan önce iki koruma eklendi:
 *   • `prefers-reduced-motion` — hareket tamamen kapanır.
 *   • Dokunmatik — `onMouseMove` dokunmatik cihazda da tetiklenebiliyor;
 *     ince işaretçi yoksa etki uygulanmaz, düğme yerinde durur.
 */
interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export default function Magnetic({ children, range = 40, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || reduce) return;
    // Kaba işaretçi (parmak) mıknatıslanmaz: dokunmatikte düğmenin kayması
    // hedefi kaçırtır.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance between cursor and center of element
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      // Pull element towards mouse
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
