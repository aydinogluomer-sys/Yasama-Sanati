"use client";
import React, { useActionState, useRef, useEffect } from "react";
import { submitOnKayit } from "@/app/actions";

interface FormContainerProps {
  children: React.ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
  const [state, action] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const res = await submitOnKayit(prevState, formData);
      return res;
    },
    null
  );

  const formRef = useRef<HTMLFormElement>(null);

  // Başarılı gönderim sonrasında formu temizle
  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="w-full max-w-118 px-5 py-24 md:px-16 md:py-28 xl:px-20" aria-describedby="form-response">
      {children}
      {state && (
        <div
          id="form-response"
          role={state.success ? "status" : "alert"}
          aria-live="polite"
          className={`mt-6 rounded border p-4 text-sm font-medium ${
            state.success
              ? "border-emerald-800/30 bg-emerald-900/10 text-emerald-950"
              : "border-rose-800/30 bg-rose-900/10 text-rose-950"
          }`}
        >
          {state.success ? state.message : state.error}
        </div>
      )}
    </form>
  );
}
