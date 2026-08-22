export const CONSULTATION_PROGRAMS = [
  {
    slug: "nefes-koclugu",
    label: "Nefes Koçluğu",
    databaseValue: "Nefes Koçluğu",
    path: "/programlar/nefes-koclugu",
  },
  {
    slug: "reiki",
    label: "Reiki",
    databaseValue: "Reiki Enerji Şifası",
    path: "/programlar/reiki",
  },
  {
    slug: "meridyen-terapi",
    label: "Meridyen Terapi",
    databaseValue: "Meridyen Terapi",
    path: "/programlar/meridyen-terapi",
  },
  {
    slug: "mucizeler-kursu",
    label: "Mucizeler Kursu",
    databaseValue: "Mucizeler Kursu",
    path: "/programlar/mucizeler-kursu",
  },
  {
    slug: "hipnoterapi",
    label: "Hipnoterapi",
    databaseValue: "Hipnoterapi",
    path: "/programlar/hipnoterapi",
  },
  {
    slug: "yasam-kocu",
    label: "Yaşam Koçluğu",
    databaseValue: "Yaşam Koçluğu",
    path: "/programlar/yasam-kocu",
  },
] as const;

export type ConsultationProgram = (typeof CONSULTATION_PROGRAMS)[number];
export type ConsultationProgramSlug = ConsultationProgram["slug"];
export type ConsultationChoice = ConsultationProgramSlug | "together";

const programBySlug = new Map<ConsultationProgramSlug, ConsultationProgram>(
  CONSULTATION_PROGRAMS.map((program) => [program.slug, program]),
);

export function getConsultationProgram(value: unknown): ConsultationProgram | null {
  if (typeof value !== "string") return null;
  return programBySlug.get(value as ConsultationProgramSlug) ?? null;
}

export function isConsultationChoice(value: unknown): value is ConsultationChoice {
  return value === "together" || getConsultationProgram(value) !== null;
}
