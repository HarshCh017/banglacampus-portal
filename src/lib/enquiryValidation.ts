import { z } from 'zod';
import { ALL_STATE_NAMES } from '@/data/indianStates';
import { VERIFIED_COLLEGES, getCollegeBySlug } from '@/data/colleges';

/**
 * Sanitizes input values against spreadsheet formula injection attacks (CSV/Google Sheets injection).
 * If a value starts with '=', '+', '-', or '@', prepends an apostrophe (') so Google Sheets
 * treats the cell content as literal text.
 */
export function sanitizeForSpreadsheet(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const str = String(value).trim();
  if (str.length === 0) return '';

  const dangerousPrefixes = ['=', '+', '-', '@', '\t', '\r'];
  if (dangerousPrefixes.some((prefix) => str.startsWith(prefix))) {
    return `'${str}`;
  }
  return str;
}

export const studentEnquirySchema = z.object({
  // Field 1: Student Name
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name cannot exceed 80 characters')
    .regex(/^[\p{L}\s.'-]+$/u, 'Full name should only contain letters, spaces, and standard name characters'),

  // Field 2: Class 10 Percentage
  class10Percentage: z
    .number({ invalid_type_error: 'Please enter a valid percentage' })
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100')
    .refine((val) => Number.isFinite(val), 'Percentage must be a valid number'),

  // Field 3: Class 12 Percentage
  class12Percentage: z
    .number({ invalid_type_error: 'Please enter a valid percentage' })
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100')
    .refine((val) => Number.isFinite(val), 'Percentage must be a valid number'),

  // Field 4: State / Union Territory
  state: z
    .string()
    .trim()
    .min(1, 'Please select your State / Union Territory')
    .refine((val) => ALL_STATE_NAMES.includes(val), 'Please select a valid Indian State or Union Territory'),

  // Field 5: Choice of College
  preferredCollege: z
    .string()
    .trim()
    .min(1, 'Please select your preferred college')
    .refine((slug) => {
      return VERIFIED_COLLEGES.some((c) => c.slug === slug || c.id === slug);
    }, 'Selected college is not recognized in our verified catalog'),

  // Field 6: Choice of Branch
  preferredBranch: z
    .string()
    .trim()
    .min(1, 'Please select your preferred engineering branch'),

  // Consent (Required)
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy policy to submit your preferences' }),
  }),

  // Honeypot field (must be empty)
  hp_field: z.string().optional(),

  // Source page attribution
  sourceUrl: z.string().optional(),

  // Idempotency key for preventing duplicate writes
  idempotencyKey: z.string().optional(),
});

export type StudentEnquiryInput = z.infer<typeof studentEnquirySchema>;

/**
 * Validates that the selected branch is actually offered by the chosen college.
 * Prevents clients from tampering with branch values.
 */
export function validateCollegeBranchCompatibility(collegeSlug: string, branchSlugOrName: string): boolean {
  const college = getCollegeBySlug(collegeSlug) || VERIFIED_COLLEGES.find((c) => c.id === collegeSlug);
  if (!college) return false;

  return college.programs.some(
    (p) =>
      p.slug.toLowerCase() === branchSlugOrName.toLowerCase() ||
      p.name.toLowerCase() === branchSlugOrName.toLowerCase()
  );
}

/**
 * Generates a collision-resistant unique Submission ID for Google Sheets
 */
export function generateSubmissionId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BC-ENQ-${timestamp}-${random}`;
}
