import HeroClient from "./Client";
import HeroServer from "./Server";

export default function HeroWrapper() {
  return (
    <div className="relative bg-deep">
      <HeroClient />
      <HeroServer />
    </div>
  );
}
