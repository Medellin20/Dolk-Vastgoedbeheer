import { CopyableField } from '@/components/shared/copyable-field';

export function PaymentReason({ reason }: { reason: string }) {
  if (!reason.trim()) return null;

  return (
    <div className="mt-6 rounded-2xl border border-canal-200 bg-canal-50 p-4 text-left">
      <CopyableField label="Verplichte betalingsomschrijving" value={reason} highlight />
      <p className="mt-3 text-sm leading-relaxed text-ink-600">
        Gebruik exact deze omschrijving bij uw betaling. Kopieer de tekst en vul deze in bij de betalingsomschrijving.
      </p>
    </div>
  );
}
