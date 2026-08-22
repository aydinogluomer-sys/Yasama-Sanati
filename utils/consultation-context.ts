import {
  getConsultationProgram,
  type ConsultationProgramSlug,
} from "@/data/consultation-programs";

const CONSULTATION_SOURCE_PATHS = new Set([
  "/",
  "/programlar",
  "/programlar/nefes-koclugu",
  "/programlar/reiki",
  "/programlar/meridyen-terapi",
  "/programlar/mucizeler-kursu",
  "/programlar/hipnoterapi",
  "/programlar/yasam-kocu",
  "/egitmenler",
  "/sss",
  "/the-story",
  "/community",
  "/blog",
  "/kvkk",
  "/privacy-terms",
]);

function oneQueryValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? undefined : value;
}

function normalizeConsultationSource(value: string): string | null {
  const normalized = value.length > 1 && value.endsWith("/")
    ? value.slice(0, -1)
    : value;

  return CONSULTATION_SOURCE_PATHS.has(normalized) ? normalized : null;
}

export function readProgramQuery(
  value: string | string[] | undefined,
): { slug: ConsultationProgramSlug | null; invalid: boolean } {
  if (Array.isArray(value)) return { slug: null, invalid: true };
  const candidate = oneQueryValue(value);
  if (candidate === undefined) return { slug: null, invalid: false };

  const program = getConsultationProgram(candidate);
  return program
    ? { slug: program.slug, invalid: false }
    : { slug: null, invalid: true };
}

export function readConsultationSource(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) return "/on-gorusme";
  const candidate = oneQueryValue(value);
  if (!candidate) return "/on-gorusme";

  return normalizeConsultationSource(candidate) ?? "/on-gorusme";
}

export function consultationHref({
  program,
  from,
}: {
  program?: ConsultationProgramSlug;
  from?: string;
} = {}): string {
  const params = new URLSearchParams();

  const resolvedProgram = program && getConsultationProgram(program) ? program : null;
  const normalizedSource = from ? normalizeConsultationSource(from) : null;

  // Ana sayfada genel bir "Ön Görüşme" çağrısı ziyaretçiyi sayfadan çıkarmaz: aynı sayfadaki
  // forma kaydırır. Aksi hâlde ana sayfadaki form hiçbir bağlantının işaret etmediği,
  // yalnızca sona kadar kaydıranların gördüğü ölü bir yüzey olurdu.
  // Program seçimi olan çağrılar her zaman özel sayfaya gider — orada program ön-seçili gelir.
  if (!resolvedProgram && normalizedSource === "/") return "/#on-kayit";

  if (resolvedProgram) params.set("program", resolvedProgram);
  if (normalizedSource) params.set("from", normalizedSource);

  const query = params.toString();
  return query ? `/on-gorusme?${query}` : "/on-gorusme";
}
