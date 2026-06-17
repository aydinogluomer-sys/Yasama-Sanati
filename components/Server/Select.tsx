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

const COUNTRY_DATA_URL =
  "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json";

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

export default async function Select({ options, name }: SelectProps) {
  if (options === "cities") {
    return (
      <SelectClient
        defaultSelection="İstanbul"
        options={CITIES}
        name={name}
      />
    );
  }

  const response = await fetch(COUNTRY_DATA_URL, { cache: "force-cache" });
  const countryData: CountryData[] = await response.json();

  const fieldToMap = options === "countries" ? "name" : "dial_code";
  const arrayOfProperty = countryData.map((country) => country[fieldToMap]);

  return (
    <SelectClient
      defaultSelection={options === "countries" ? countryData[0].name : countryData[0].dial_code}
      options={arrayOfProperty}
      name={name}
    />
  );
}
