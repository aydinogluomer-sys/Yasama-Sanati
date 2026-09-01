"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FormEvent, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { submitConsultationRequest } from "@/app/actions";
import {
  INITIAL_CONSULTATION_STATE,
  type ConsultationFieldName,
} from "@/data/consultation-form";
import {
  CONSULTATION_PROGRAMS,
  isConsultationChoice,
  type ConsultationChoice,
} from "@/data/consultation-programs";
import styles from "@/app/on-gorusme/on-gorusme.module.css";
import { easing, duration } from "@/utils/motion/tokens";

type Step = 1 | 2 | 3;

interface ConsultationExperienceProps {
  initialProgram: ConsultationChoice;
  invalidProgramQuery: boolean;
  sourcePath: string;
}

interface FormValues {
  ad: string;
  soyad: string;
  sehir: string;
  eposta: string;
  telefonKodu: string;
  telefon: string;
  kvkkOnay: boolean;
}

const STEP_META = [
  { step: 1 as const, short: "Konu", title: "Neyi konuşalım?" },
  { step: 2 as const, short: "Sen", title: "Seni tanıyalım" },
  { step: 3 as const, short: "İletişim", title: "Sana ulaşalım" },
];

const STEP_FOR_FIELD: Record<ConsultationFieldName, Step> = {
  program: 1,
  ad: 2,
  soyad: 2,
  eposta: 3,
  telefon: 3,
  kvkk_onay: 3,
};

const FIELD_IDS: Record<ConsultationFieldName, string> = {
  program: "consultation-program-nefes-koclugu",
  ad: "consultation-ad",
  soyad: "consultation-soyad",
  eposta: "consultation-eposta",
  telefon: "consultation-telefon",
  kvkk_onay: "consultation-kvkk",
};

const DIAL_CODES = ["+90", "+49", "+1", "+43", "+994", "+44", "+33", "+31", "+41", "+357"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={styles.arrowIcon}>
      {diagonal ? (
        <path d="M5 15 15 5M8 5h7v7" />
      ) : (
        <path d="M3 10h13M11 5l5 5-5 5" />
      )}
    </svg>
  );
}

function SubmitConsultationButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={styles.primaryButton}
      disabled={pending}
    >
      <span>{pending ? "Talep gönderiliyor…" : "Görüşme talebini gönder"}</span>
      <ArrowIcon />
    </button>
  );
}

export default function ConsultationExperience({
  initialProgram,
  invalidProgramQuery,
  sourcePath,
}: ConsultationExperienceProps) {
  const [state, action] = useActionState(
    submitConsultationRequest,
    INITIAL_CONSULTATION_STATE,
  );
  const [step, setStep] = useState<Step>(1);
  const [highestStep, setHighestStep] = useState<Step>(1);
  const [program, setProgram] = useState<ConsultationChoice>(
    isConsultationChoice(initialProgram) ? initialProgram : "together",
  );
  const [values, setValues] = useState<FormValues>({
    ad: "",
    soyad: "",
    sehir: "",
    eposta: "",
    telefonKodu: "+90",
    telefon: "",
    kvkkOnay: false,
  });
  const [clientErrors, setClientErrors] = useState<
    Partial<Record<ConsultationFieldName, string>>
  >({});
  const [dismissedServerErrors, setDismissedServerErrors] = useState<
    ConsultationFieldName[]
  >([]);
  const headingRefs = useRef<Record<Step, HTMLHeadingElement | null>>({
    1: null,
    2: null,
    3: null,
  });
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const progress = step === 1 ? 0.24 : step === 2 ? 0.58 : 0.92;

  const errorFor = (field: ConsultationFieldName) =>
    clientErrors[field] ??
    (dismissedServerErrors.includes(field)
      ? undefined
      : state.fieldErrors?.[field]);

  const allVisibleErrors = useMemo(() => {
    const errors: Partial<Record<ConsultationFieldName, string>> = {};
    (Object.keys(STEP_FOR_FIELD) as ConsultationFieldName[]).forEach((field) => {
      const error = errorFor(field);
      if (error) errors[field] = error;
    });
    return errors;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientErrors, dismissedServerErrors, state.fieldErrors]);

  const clearFieldError = (field: ConsultationFieldName) => {
    setClientErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setDismissedServerErrors((current) =>
      current.includes(field) ? current : [...current, field],
    );
  };

  const focusStepHeading = (nextStep: Step) => {
    window.requestAnimationFrame(() => headingRefs.current[nextStep]?.focus());
  };

  const goToStep = (nextStep: Step) => {
    setStep(nextStep);
    setHighestStep((current) => Math.max(current, nextStep) as Step);
    focusStepHeading(nextStep);
  };

  const validateCurrentStep = (): boolean => {
    const nextErrors: Partial<Record<ConsultationFieldName, string>> = {};

    if (step === 1 && !isConsultationChoice(program)) {
      nextErrors.program = "Bir program seç veya birlikte seçelim seçeneğini işaretle.";
    }

    if (step === 2) {
      if (values.ad.trim().length < 2) nextErrors.ad = "Adını en az iki karakterle yaz.";
      if (values.soyad.trim().length < 2) nextErrors.soyad = "Soyadını en az iki karakterle yaz.";
    }

    setClientErrors(nextErrors);
    const firstField = Object.keys(nextErrors)[0] as ConsultationFieldName | undefined;
    if (firstField) {
      window.requestAnimationFrame(() => document.getElementById(FIELD_IDS[firstField])?.focus());
      return false;
    }

    return true;
  };

  const continueFlow = () => {
    if (!validateCurrentStep()) return;
    goToStep((step + 1) as Step);
  };

  const validateBeforeSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextErrors: Partial<Record<ConsultationFieldName, string>> = {};
    const phoneDigits = values.telefon.replace(/\D/g, "");

    if (!EMAIL_PATTERN.test(values.eposta.trim())) {
      nextErrors.eposta = "Geçerli bir e-posta adresi yaz.";
    }
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.telefon = "Geçerli bir telefon numarası yaz.";
    }
    if (!values.kvkkOnay) {
      nextErrors.kvkk_onay = "Devam etmek için KVKK onayını vermelisin.";
    }

    if (Object.keys(nextErrors).length === 0) return;

    event.preventDefault();
    setClientErrors(nextErrors);
    const firstField = Object.keys(nextErrors)[0] as ConsultationFieldName;
    window.requestAnimationFrame(() => document.getElementById(FIELD_IDS[firstField])?.focus());
  };

  useEffect(() => {
    setDismissedServerErrors([]);

    if (state.success) {
      window.requestAnimationFrame(() => successRef.current?.focus());
      return;
    }

    const firstField = Object.keys(state.fieldErrors ?? {})[0] as
      | ConsultationFieldName
      | undefined;

    if (firstField) {
      const targetStep = STEP_FOR_FIELD[firstField];
      setStep(targetStep);
      setHighestStep((current) => Math.max(current, targetStep) as Step);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() =>
          document.getElementById(FIELD_IDS[firstField])?.focus(),
        );
      });
    } else if (state.error) {
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
    }
  }, [state]);

  const updateValue = <Key extends keyof FormValues>(
    key: Key,
    value: FormValues[Key],
    field?: ConsultationFieldName,
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (field) clearFieldError(field);
  };

  return (
    <section className={styles.experience} aria-labelledby="consultation-title">
      <svg
        className={styles.paperShape}
        aria-hidden="true"
        viewBox="0 0 1440 808"
        preserveAspectRatio="none"
      >
        <path
          className={styles.paperFill}
          d="M500 0H1440V758H842C759 758 718 728 700 664C674 568 681 462 664 354C643 218 600 89 500 0Z"
        />
        <path
          className={styles.meridianBase}
          pathLength="1"
          d="M500 0C600 89 643 218 664 354C681 462 674 568 700 664C718 728 759 758 842 758"
        />
        <motion.path
          className={styles.meridianActive}
          pathLength="1"
          d="M500 0C600 89 643 218 664 354C681 462 674 568 700 664C718 728 759 758 842 758"
          initial={false}
          animate={{ pathLength: progress }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: duration.textLine, ease: easing.softOut }
          }
        />
      </svg>

      <div className={styles.introPanel}>
        <h1 id="consultation-title" className={styles.introTitle}>
          Sana uygun yolu birlikte <em>netleştirelim.</em>
        </h1>
        <p className={styles.introCopy}>
          İhtiyacını ve temponu kısaca paylaş; nereden başlayacağını ön
          görüşmede birlikte belirleyelim.
        </p>
        <div className={styles.facts} aria-label="Ön görüşme bilgileri">
          <span>6 program</span>
          <span>Online &amp; İzmir</span>
          <span>Ücretsiz</span>
        </div>
      </div>

      <nav className={styles.progressNav} aria-label="Görüşme talebi adımları">
        {STEP_META.map((item) => {
          const isActive = item.step === step;
          const isComplete = item.step < step;
          const isAvailable = item.step <= highestStep;
          return (
            <button
              key={item.step}
              type="button"
              data-step={item.step}
              className={styles.progressStep}
              aria-current={isActive ? "step" : undefined}
              aria-label={`${item.step}. adım: ${item.title}${isComplete ? ", tamamlandı" : ""}`}
              disabled={!isAvailable}
              onClick={() => isAvailable && goToStep(item.step)}
            >
              <span className={styles.progressNode}>
                {String(item.step).padStart(2, "0")}
              </span>
              <span className={styles.progressLabel}>{item.short}</span>
            </button>
          );
        })}
      </nav>

      <div className={styles.formSurface}>
        {state.success ? (
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            className={styles.successPanel}
          >
            <svg aria-hidden="true" viewBox="0 0 48 48" className={styles.successIcon}>
              <circle cx="24" cy="24" r="21" />
              <path d="m14 24 7 7 14-15" />
            </svg>
            <p className={styles.stepCounter}>Görüşme Talebi</p>
            <h2>Talebini aldık.</h2>
            <p>Seninle iletişime geçeceğiz.</p>
            <div className={styles.successLinks}>
              <Link href="/" className={styles.primaryButton}>
                <span>Ana sayfaya dön</span>
                <ArrowIcon />
              </Link>
              <Link href="/programlar" className={styles.textButton}>
                Programları incele
              </Link>
            </div>
          </div>
        ) : (
          <form
            action={action}
            onSubmit={validateBeforeSubmit}
            className={styles.form}
            noValidate
          >
            <input type="hidden" name="program" value={program} />
            <input type="hidden" name="source_url" value={sourcePath} />
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="consultation-website">Web sitesi</label>
              <input
                id="consultation-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {state.error && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                className={styles.errorSummary}
              >
                <p>{state.error}</p>
                {!state.fieldErrors && (
                  <a
                    href="https://wa.me/905327893753"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp üzerinden yaz
                    <ArrowIcon diagonal />
                  </a>
                )}
              </div>
            )}

            {!state.error && Object.keys(allVisibleErrors).length > 0 && (
              <div role="alert" className={styles.errorSummary}>
                <p>Bazı alanları tamamlamamız gerekiyor. İşaretlenen alanları kontrol et.</p>
              </div>
            )}

            {invalidProgramQuery && step === 1 && (
              <p className={styles.queryNotice} role="status">
                Bağlantıdaki program bilgisi tanınmadı. Birlikte seçelim
                seçeneğiyle devam edebilirsin.
              </p>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                className={styles.stepPanel}
                initial={reduceMotion ? false : { opacity: 0.72, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.36, ease: easing.softOut }}
              >
                <div className={styles.stepHeadingRow}>
                  <h2
                    ref={(node) => {
                      headingRefs.current[step] = node;
                    }}
                    tabIndex={-1}
                    className={styles.stepTitle}
                  >
                    {STEP_META[step - 1].title}
                  </h2>
                  <p className={styles.stepCounter} aria-hidden="true">
                    {String(step).padStart(2, "0")} / 03
                  </p>
                </div>

                {step === 1 && (
                  <fieldset
                    className={styles.choiceGrid}
                    aria-invalid={Boolean(errorFor("program"))}
                    aria-describedby={errorFor("program") ? "program-error" : undefined}
                  >
                    <legend className="sr-only">Görüşmede konuşmak istediğin program</legend>
                    {CONSULTATION_PROGRAMS.map((item) => (
                      <label key={item.slug} className={styles.choice}>
                        <input
                          id={`consultation-program-${item.slug}`}
                          type="radio"
                          name="program-choice"
                          value={item.slug}
                          checked={program === item.slug}
                          onChange={() => {
                            setProgram(item.slug);
                            clearFieldError("program");
                          }}
                        />
                        <span className={styles.radioMark} aria-hidden="true" />
                        <span>{item.label}</span>
                      </label>
                    ))}
                    <label className={styles.choice}>
                      <input
                        type="radio"
                        name="program-choice"
                        value="together"
                        checked={program === "together"}
                        onChange={() => {
                          setProgram("together");
                          clearFieldError("program");
                        }}
                      />
                      <span className={styles.radioMark} aria-hidden="true" />
                      <span>Birlikte seçelim</span>
                    </label>
                    {errorFor("program") && (
                      <p id="program-error" className={styles.fieldError}>
                        {errorFor("program")}
                      </p>
                    )}
                  </fieldset>
                )}

                {step === 2 && (
                  <div className={styles.detailsGrid}>
                    <Field
                      id="consultation-ad"
                      label="Ad"
                      error={errorFor("ad")}
                    >
                      <input
                        id="consultation-ad"
                        name="ad-visible"
                        type="text"
                        autoComplete="given-name"
                        value={values.ad}
                        onChange={(event) => updateValue("ad", event.target.value, "ad")}
                        aria-invalid={Boolean(errorFor("ad"))}
                        aria-describedby={errorFor("ad") ? "consultation-ad-error" : undefined}
                      />
                    </Field>
                    <Field
                      id="consultation-soyad"
                      label="Soyad"
                      error={errorFor("soyad")}
                    >
                      <input
                        id="consultation-soyad"
                        name="soyad-visible"
                        type="text"
                        autoComplete="family-name"
                        value={values.soyad}
                        onChange={(event) => updateValue("soyad", event.target.value, "soyad")}
                        aria-invalid={Boolean(errorFor("soyad"))}
                        aria-describedby={errorFor("soyad") ? "consultation-soyad-error" : undefined}
                      />
                    </Field>
                    <Field id="consultation-sehir" label="Şehir (isteğe bağlı)" wide>
                      <input
                        id="consultation-sehir"
                        name="sehir-visible"
                        type="text"
                        autoComplete="address-level2"
                        value={values.sehir}
                        onChange={(event) => updateValue("sehir", event.target.value)}
                        placeholder="Bulunduğun şehir"
                      />
                    </Field>
                  </div>
                )}

                {step === 3 && (
                  <div className={styles.contactFields}>
                    <Field
                      id="consultation-eposta"
                      label="E-posta adresi"
                      error={errorFor("eposta")}
                    >
                      <input
                        id="consultation-eposta"
                        name="eposta-visible"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={values.eposta}
                        onChange={(event) => updateValue("eposta", event.target.value, "eposta")}
                        aria-invalid={Boolean(errorFor("eposta"))}
                        aria-describedby={errorFor("eposta") ? "consultation-eposta-error" : undefined}
                      />
                    </Field>
                    <Field
                      id="consultation-telefon"
                      label="Telefon numarası"
                      error={errorFor("telefon")}
                    >
                      <div className={styles.phoneField}>
                        <select
                          name="telefon_kod"
                          aria-label="Ülke telefon kodu"
                          value={values.telefonKodu}
                          onChange={(event) => updateValue("telefonKodu", event.target.value, "telefon")}
                        >
                          {DIAL_CODES.map((code) => (
                            <option key={code} value={code}>{code}</option>
                          ))}
                        </select>
                        <input
                          id="consultation-telefon"
                          name="telefon-visible"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel-national"
                          value={values.telefon}
                          onChange={(event) => updateValue("telefon", event.target.value, "telefon")}
                          aria-invalid={Boolean(errorFor("telefon"))}
                          aria-describedby={errorFor("telefon") ? "consultation-telefon-error" : undefined}
                        />
                      </div>
                    </Field>
                    <label className={styles.consentLabel}>
                      <input
                        id="consultation-kvkk"
                        type="checkbox"
                        checked={values.kvkkOnay}
                        onChange={(event) => updateValue("kvkkOnay", event.target.checked, "kvkk_onay")}
                        aria-invalid={Boolean(errorFor("kvkk_onay"))}
                        aria-describedby={errorFor("kvkk_onay") ? "consultation-kvkk-error" : undefined}
                      />
                      <span className={styles.checkboxMark} aria-hidden="true">
                        <svg viewBox="0 0 20 20"><path d="m4 10 4 4 8-9" /></svg>
                      </span>
                      <span>
                        Kişisel verilerimin{" "}
                        <Link href="/kvkk" target="_blank">
                          KVKK Aydınlatma Metni
                        </Link>{" "}
                        kapsamında işlenmesini kabul ediyorum.
                      </span>
                    </label>
                    {errorFor("kvkk_onay") && (
                      <p id="consultation-kvkk-error" className={styles.fieldError}>
                        {errorFor("kvkk_onay")}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <input type="hidden" name="ad" value={values.ad} />
            <input type="hidden" name="soyad" value={values.soyad} />
            <input type="hidden" name="sehir" value={values.sehir} />
            <input type="hidden" name="eposta" value={values.eposta} />
            <input type="hidden" name="telefon" value={values.telefon} />
            {values.kvkkOnay && <input type="hidden" name="kvkk_onay" value="true" />}

            <div className={styles.formActions}>
              {step > 1 && (
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={() => goToStep((step - 1) as Step)}
                >
                  Geri dön
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={continueFlow}
                >
                  <span>Devam et</span>
                  <ArrowIcon />
                </button>
              ) : (
                <SubmitConsultationButton />
              )}
            </div>

            <p className={styles.formFootnote}>
              <svg aria-hidden="true" viewBox="0 0 20 20">
                <rect x="4.5" y="8.5" width="11" height="8" rx="1" />
                <path d="M7 8.5V6a3 3 0 0 1 6 0v2.5" />
              </svg>
              <span>
                Veri kullanımı için{" "}
                <Link href="/kvkk" target="_blank">
                  KVKK Aydınlatma Metni’ni
                </Link>{" "}
                inceleyebilirsin.
              </span>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  wide = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={wide ? styles.fieldWide : styles.field}>
      <label className={styles.fieldLabel} htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span id={`${id}-error`} className={styles.fieldError}>
          {error}
        </span>
      )}
    </div>
  );
}
