import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(30),
  email: z.string().trim().email().max(180),
  institution: z.string().trim().min(2).max(160),
  issueType: z.string().trim().min(1).max(80),
  amount: z.string().trim().min(1).max(80),
  urgency: z.string().trim().min(1).max(80),
  notes: z.string().trim().max(2000).optional().default(""),
  consent: z.literal(true),
  website: z.string().max(0).optional().default("")
});

export type LeadInput = z.infer<typeof leadSchema>;

export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

