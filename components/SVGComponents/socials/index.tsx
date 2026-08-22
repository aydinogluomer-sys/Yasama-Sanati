import WhatsappLogo from "./WhatsappLogo";

// Only channels the academy actually owns belong here. The Instagram / Facebook /
// TikTok / YouTube entries that shipped with the template pointed at elementis.co's
// own accounts (and an Indonesian +62 WhatsApp line), so they were removed rather
// than left routing visitors to another brand. Re-add an entry only once a real
// Yaşama Sanatı account URL is confirmed.
const SocialLogos = [
  {
    logo: <WhatsappLogo />,
    href: "https://wa.me/905327893753",
    key: "whatsapp",
    label: "WhatsApp'tan yazın",
  },
];

export default SocialLogos;
