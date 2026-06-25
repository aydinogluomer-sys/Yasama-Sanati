import React from "react";
import SelectClient from "../Client/SelectClient";

interface CountryData {
  name: string;
  dial_code: string;
  code: string;
}

interface SelectProps {
  options: "countries" | "dial code" | "cities";
  name?: string;
}

const COUNTRY_DATA: CountryData[] = [
  { name: "Türkiye", dial_code: "+90", code: "TR" },
  { name: "Almanya", dial_code: "+49", code: "DE" },
  { name: "Amerika Birleşik Devletleri", dial_code: "+1", code: "US" },
  { name: "Avusturya", dial_code: "+43", code: "AT" },
  { name: "Azerbaycan", dial_code: "+994", code: "AZ" },
  { name: "Birleşik Krallık", dial_code: "+44", code: "GB" },
  { name: "Fransa", dial_code: "+33", code: "FR" },
  { name: "Hollanda", dial_code: "+31", code: "NL" },
  { name: "İsviçre", dial_code: "+41", code: "CH" },
  { name: "Kıbrıs", dial_code: "+357", code: "CY" },
];

const CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", 
  "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", 
  "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", 
  "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", 
  "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", 
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", 
  "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", 
  "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", 
  "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", 
  "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", 
  "Düzce"
];

export default function Select({ options, name }: SelectProps) {
  if (options === "cities") {
    return (
      <SelectClient
        defaultSelection="İstanbul"
        options={CITIES}
        name={name}
      />
    );
  }

  const fieldToMap = options === "countries" ? "name" : "dial_code";
  const arrayOfProperty = COUNTRY_DATA.map((country) => country[fieldToMap]);

  return (
    <SelectClient
      defaultSelection={options === "countries" ? COUNTRY_DATA[0].name : COUNTRY_DATA[0].dial_code}
      options={arrayOfProperty}
      name={name}
    />
  );
}
