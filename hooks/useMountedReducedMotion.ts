"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Hydration-safe reduced-motion preference.
 *
 * `useReducedMotion()` resolves to `null` on the server but to the real boolean on the
 * client, so components that branch their rendered DOM / attributes / styles / motion
 * `initial` directly on it diverge between SSR and first client render → React hydration
 * mismatch (for reduced-motion users).
 *
 * This hook returns `false` (full-motion — the branch the server already renders) during
 * SSR and the first client render, then the real preference after mount. SSR and first
 * client render therefore always match; reduced-motion users still get reduced behavior
 * once mounted, and normal-motion users see no change at all.
 */
export default function useMountedReducedMotion(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? prefersReducedMotion === true : false;
}
