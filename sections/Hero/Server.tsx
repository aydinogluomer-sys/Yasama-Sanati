import HeroOpeningMotion from "@/components/Client/HeroOpeningMotion";

export default function HeroServer() {
  return (
    <div className="pointer-events-none relative min-h-[100svh] overflow-hidden">
      {/* Readability scrim over the hero still. Deliberately back at its original weight: the
          extra darkening added on 2026-08-20 existed only to rescue the kicker, and the kicker is
          gone. Everything that remains clears its contrast floor on this wash alone, so the
          Aegean frame keeps its light. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-deep/88 via-deep/30 to-deep/10"
      />
      {/* The fixed header lands on pale sky in this frame, so it gets its own short wash.
          Scoped to the top strip: the wordmark and nav CTA keep their contrast and the rest
          of the photograph is untouched. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-deep/86 via-deep/46 to-transparent md:h-56"
      />
      {/* the persistent signature meridian is rendered site-wide by <ScrollMeridian /> */}
      <HeroOpeningMotion />
    </div>
  );
}
