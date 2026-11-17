import { z } from 'zod';

export const adminLoginSchema = z.object({
  password: z.string().min(1, 'Voer uw wachtwoord in.'),
});

export const bankSettingsSchema = z.object({
  beneficiaryName: z.string().trim().min(2, 'Vul de naam van de begunstigde in.'),
  iban: z.string().trim().min(10, 'IBAN invalide.'),
  bic: z.string().trim().max(20, 'BIC invalide.').optional().or(z.literal('')),
  bankName: z.string().trim().min(2, 'Vul de naam van de bank in.'),
  paymentInstructions: z.string().trim().min(5, 'Vul de betaalinstructies in.'),
  defaultDepositAmount: z.coerce.number().min(0),
  showOnConfirmations: z.boolean(),
});

export type BankSettingsInput = z.infer<typeof bankSettingsSchema>;

export const siteSettingsSchema = z.object({
  footerPhone: z.string().trim().min(6, 'Vul een geldig telefoonnummer in.').max(30),
  paymentLink: z.string().trim().url('Vul een geldige betaallink in.'),
  paymentReason: z.string().trim().max(140, 'De betalingsomschrijving mag maximaal 140 tekens bevatten.').default(''),
  showPaymentLink: z.boolean(),
  viewingFee: z.coerce.number().min(0, 'De bezichtigingskosten mogen niet negatief zijn.'),
  showOnConfirmations: z.boolean(),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
