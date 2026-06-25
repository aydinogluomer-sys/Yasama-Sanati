/**
 * Motion tokens — single source of truth for easing, duration and stagger.
 *
 * Round 2 rule (decisions.md D022): the same kind of animation must use the same
 * duration/easing everywhere. Import from here instead of re-typing cubic-beziers.
 */

export const easing = {
  /** Signature editorial ease used across reveals (was copy-pasted as [0.24,0.43,0.15,0.97]). */
  editorial: [0.24, 0.43, 0.15, 0.97] as const,
  /** Gentle settle for elements that travel a long distance. */
  softOut: [0.16, 1, 0.3, 1] as const,
  /** Crisp ease for small UI / micro-interactions. */
  precise: [0.22, 1, 0.36, 1] as const,
} as const;

export const duration = {
  hover: 0.22,
  buttonStroke: 0.52,
  textLine: 0.72,
  section: 0.9,
  hero: 1.2,
} as const;

export const stagger = {
  word: 0.025,
  line: 0.08,
  section: 0.12,
} as const;

export const motionTokens = { ease: easing, duration, stagger } as const;

export default motionTokens;
