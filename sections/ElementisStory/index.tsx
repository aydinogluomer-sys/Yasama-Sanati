import ElementisStoryClient from "./Client";
import ElementisStoryServer from "./Server";

export default function ElementisStory() {
  return (
    <section id="hikaye" aria-label="Yaşama Sanatı hikâyesi" className="overflow-x-hidden bg-[#F3EFE6] px-3-75 py-40 text-[#2B3530] md:grid md:grid-cols-11 md:grid-rows-[repeat(2,auto)] md:gap-x-5 md:gap-y-24 md:px-16 md:py-60">
      <ElementisStoryServer />
      <ElementisStoryClient />
    </section>
  );
}
