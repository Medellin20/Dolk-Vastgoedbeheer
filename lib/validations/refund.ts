import { z } from 'zod';

export const refundRequestSchema = z.object({
  guaranteePaymentId: z.string().uuid('Ongeldig waarborgdossier.'),
  reason: z.string().trim().max(2000, 'De reden mag maximaal 2000 tekens bevatten.').optional().or(z.literal('')),
  confirm: z.literal(true, {
    errorMap: () => ({ message: 'Bevestig uw verzoek om terugbetaling.' }),
  }),
});

export type RefundRequestInput = z.infer<typeof refundRequestSchema>;

export const declareTransferSchema = z.object({
  guaranteePaymentId: z.string().uuid('Ongeldig waarborgdossier.'),
  transferDate: z.string().min(1, 'Vul de datum van de overschrijving in.'),
  bankName: z.string().trim().min(2, 'Vul uw bank in.'),
  reference: z.string().trim().min(2, 'Vul de gebruikte betalingsreferentie in.'),
});

export type DeclareTransferInput = z.infer<typeof declareTransferSchema>;
