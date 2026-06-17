export interface Acupoint {
  id: string;
  code: string;
  name: string;
  trName: string;
  meridian: string; // Meridian ID (e.g. 'lu', 'ht', 'st')
  bodyRegion: "head" | "face" | "neck" | "chest" | "abdomen" | "arm" | "hand" | "leg" | "foot";
  side: "left" | "right" | "center";
  position: [number, number, number];
  labelOffset?: [number, number, number];
  description: string;
  location: string;
  benefits: string[];
  caution: string;
}

export interface Meridian {
  id: string;
  name: string;
  shortName: string;
  color: string;
  element: string;
  time: string;
  emotion: string;
  physical: string;
  desc: string;
  points: [number, number, number][];
}
