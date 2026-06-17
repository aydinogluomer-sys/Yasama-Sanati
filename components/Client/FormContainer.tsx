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
    <form ref={formRef} action={action} className="w-full max-w-102 px-5 py-24 md:p-0">
      {children}
      {state && (
        <div
          className={`mt-6 p-4 rounded text-sm font-medium ${
            state.success
              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/25"
              : "bg-rose-500/10 text-rose-300 border border-rose-500/25"
          }`}
        >
          {state.success ? state.message : state.error}
        </div>
      )}
    </form>
  );
}
