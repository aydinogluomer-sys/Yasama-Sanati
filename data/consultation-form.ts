export type ConsultationFieldName =
  | "program"
  | "ad"
  | "soyad"
  | "eposta"
  | "telefon"
  | "kvkk_onay";

export interface ConsultationActionState {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<ConsultationFieldName, string>>;
}

export const INITIAL_CONSULTATION_STATE: ConsultationActionState = {
  success: false,
};
