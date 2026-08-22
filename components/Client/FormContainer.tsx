"use client";
import React, { useActionState, useRef, useEffect, useState } from "react";
import { submitOnKayit } from "@/app/actions";
import { INITIAL_CONSULTATION_STATE } from "@/data/consultation-form";

interface FormContainerProps {
  children: React.ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
  const [state, action] = useActionState(
    submitOnKayit,
    INITIAL_CONSULTATION_STATE,
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [resetVersion, setResetVersion] = useState(0);

  // Başarılı gönderim sonrasında formu temizle
  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset();
      setResetVersion((version) => version + 1);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="w-full max-w-118 px-5 py-32 md:px-16 md:py-42-5 xl:px-20"
      aria-describedby={state.success || state.error ? "form-response" : undefined}
    >
      <React.Fragment key={resetVersion}>{children}</React.Fragment>
      {(state.success || state.error) && (
        <div
          id="form-response"
          role={state.success ? "status" : "alert"}
          aria-live="polite"
          className={`mt-6 rounded border p-4 text-sm font-medium ${
            state.success
              ? "border-[var(--status-success-border)] bg-[var(--status-success-surface)] text-[var(--status-success-text)]"
              : "border-[var(--status-error-border)] bg-[var(--status-error-surface)] text-[var(--status-error-text)]"
          }`}
        >
          {state.success ? state.message : state.error}
        </div>
      )}
    </form>
  );
}
