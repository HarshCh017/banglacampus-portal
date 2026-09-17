import { z } from 'zod';
import { VERIFIED_BRANCHES } from '@/data/branches';

const validBranchSlugs = VERIFIED_BRANCHES.map((b) => b.slug);

// Name validation: 2–80 chars; trim; letters, spaces, . - '
const nameRegex = /^[A-Za-z][A-Za-z\s.\-']{1,79}$/;

// Phone validation: Indian 10-digit mobile starting with 6-9
const phoneRegex = /^[6-9]\d{9}$/;

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Please enter your full name (minimum 2 characters)' })
    .max(80, { message: 'Name cannot exceed 80 characters' })
    .regex(nameRegex, { message: 'Please enter a valid name using letters, spaces, or hyphens' }),

  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\D/g, '')) // strip non-digits for cleaning
    .refine((val) => phoneRegex.test(val), {
      message: 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)',
    }),

  twelfthPercentage: z.preprocess((val) => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string' && val.trim() !== '') {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
  }, z
    .number({ invalid_type_error: 'Please enter your Class 12 percentage' })
    .min(0, { message: 'Percentage cannot be less than 0' })
    .max(100, { message: 'Percentage cannot exceed 100' })
    .refine((val) => {
      // Check max 2 decimal places
      return Number(val.toFixed(2)) === val;
    }, { message: 'Percentage can have at most 2 decimal places' })
  ),

  percentageType: z.enum(['Aggregate', 'PCM'], {
    required_error: 'Please select whether this score is Overall Aggregate or PCM',
  }),

  branch: z
    .string({ required_error: 'Please select your desired B.Tech branch' })
    .refine((val) => validBranchSlugs.includes(val), {
      message: 'Please select a valid engineering branch from the verified list',
    }),

  consent: z.literal(true, {
    errorMap: () => ({
      message: 'You must agree to be contacted regarding I.E.M admissions to receive guidance',
    }),
  }),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export function normalizePhoneNumber(rawDigits: string): string {
  const digits = rawDigits.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  return `+91${digits.slice(-10)}`;
}
