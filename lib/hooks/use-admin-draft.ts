'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

/** Brouillon limité à cet onglet, sans mot de passe ni fichier. */
export function useAdminDraft<T extends FieldValues>(
  key: string,
  { watch, getValues, reset }: Pick<UseFormReturn<T>, 'watch' | 'getValues' | 'reset'>,
  onRestore?: () => void,
) {
  const baseline = useRef('');
  const restoreCallback = useRef(onRestore);
  restoreCallback.current = onRestore;

  useEffect(() => {
    baseline.current = JSON.stringify(getValues());
    try {
      const stored = sessionStorage.getItem(key);
      if (stored) {
        const draft: unknown = JSON.parse(stored);
        if (draft && typeof draft === 'object' && !Array.isArray(draft)) {
          // Ne restaurer que les champs du formulaire concerné.
          const defaults = getValues();
          const restored = { ...defaults };
          for (const field of Object.keys(defaults)) {
            if (Object.prototype.hasOwnProperty.call(draft, field)) {
              restored[field as keyof T] = (draft as T)[field];
            }
          }
          reset(restored);
          restoreCallback.current?.();
        }
      }
    } catch {
      // Un stockage bloqué ou un ancien brouillon invalide ne bloque pas la saisie.
    }
    const subscription = watch(() => {
      try {
        const current = JSON.stringify(getValues());
        if (current === baseline.current) sessionStorage.removeItem(key);
        else sessionStorage.setItem(key, current);
      } catch {
        // Les formulaires restent utilisables si sessionStorage est indisponible.
      }
    });
    return () => subscription.unsubscribe();
  }, [key, watch, getValues, reset]);

  return useCallback((submitted: T) => {
    // Garder les modifications éventuellement saisies pendant la sauvegarde.
    if (JSON.stringify(getValues()) !== JSON.stringify(submitted)) return;
    baseline.current = JSON.stringify(submitted);
    try { sessionStorage.removeItem(key); } catch { /* Stockage indisponible. */ }
  }, [key, getValues]);
}
