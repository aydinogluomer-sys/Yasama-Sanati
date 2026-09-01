import AkademiHikayesiClient from "./Client";
import AkademiHikayesiServer from "./Server";

export default function AkademiHikayesi() {
  return (
    <section id="hikaye" aria-label="Yaşama Sanatı hikâyesi" className="overflow-x-hidden bg-paper px-3-75 py-40 text-deep md:grid md:grid-cols-11 md:grid-rows-[repeat(2,auto)] md:gap-x-5 md:gap-y-24 md:px-16 md:py-60">
      <AkademiHikayesiServer />
      <AkademiHikayesiClient />
    </section>
  );
}
