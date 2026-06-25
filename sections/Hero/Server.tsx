import HeroOpeningMotion from "@/components/Client/HeroOpeningMotion";

export default function HeroServer() {
  return (
    <div className="pointer-events-none relative min-h-[100svh] overflow-hidden">
      {/* readability scrim over the hero video */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#2b3530]/88 via-[#2b3530]/30 to-[#2b3530]/10"
      />
      {/* the persistent signature meridian is rendered site-wide by <ScrollMeridian /> */}
      <HeroOpeningMotion />
    </div>
  );
}
