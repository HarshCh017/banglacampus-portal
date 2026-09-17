'use client';

import React, { useState, useEffect, useId } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadFormSchema, LeadFormInput, normalizePhoneNumber } from '@/lib/schema';
import { VERIFIED_BRANCHES } from '@/data/branches';
import { evaluateEligibility } from '@/lib/eligibility';
import { IndicationResult, PercentageType } from '@/types';
import { CheckCircle, CheckCircle2, AlertCircle, Info, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

interface LeadCaptureFormProps {
  id?: string;
  sourceCtaId?: string;
  defaultBranch?: string;
  headline?: string;
  subheadline?: string;
  className?: string;
  onSuccess?: () => void;
}

export function LeadCaptureForm({
  id = 'lead-form',
  sourceCtaId = 'homepage-hero',
  defaultBranch = 'cse',
  headline = 'Get B.Tech Admission Guidance',
  subheadline = 'Check preliminary criteria & receive verified branch and fee details.',
  className = '',
  onSuccess,
}: LeadCaptureFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [indication, setIndication] = useState<IndicationResult | null>(null);
  const [idempotencyKey, setIdempotencyKey] = useState('');

  // Form input unique IDs for accessibility
  const baseId = useId();
  const nameId = `${baseId}-name`;
  const phoneId = `${baseId}-phone`;
  const pctId = `${baseId}-pct`;
  const pctTypeAggregateId = `${baseId}-pct-agg`;
  const pctTypePcmId = `${baseId}-pct-pcm`;
  const branchId = `${baseId}-branch`;
  const consentId = `${baseId}-consent`;
  const statusLiveId = `${baseId}-status-live`;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      twelfthPercentage: '' as any,
      percentageType: 'Aggregate',
      branch: defaultBranch,
      consent: false as any,
    },
    mode: 'onBlur',
  });

  // Watch fields for real-time preliminary evaluation
  const watchedBranch = watch('branch');
  const watchedPct = watch('twelfthPercentage');
  const watchedPctType = watch('percentageType') as PercentageType;

  // Initialize session idempotency key & draft persistence
  useEffect(() => {
    // Generate UUID or timestamp-based idempotency key
    const existingKey = sessionStorage.getItem('iem_form_idempotency');
    if (existingKey) {
      setIdempotencyKey(existingKey);
    } else {
      const newKey = `iem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('iem_form_idempotency', newKey);
      setIdempotencyKey(newKey);
    }

    // Load draft if present
    try {
      const savedDraft = localStorage.getItem('iem_lead_draft');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.fullName) setValue('fullName', parsed.fullName);
        if (parsed.phone) setValue('phone', parsed.phone);
        if (parsed.twelfthPercentage) setValue('twelfthPercentage', parsed.twelfthPercentage);
        if (parsed.percentageType) setValue('percentageType', parsed.percentageType);
        if (parsed.branch) setValue('branch', parsed.branch);
      }
    } catch {
      // Storage unavailable or invalid JSON
    }
  }, [setValue]);

  // Persist draft to local storage on change
  useEffect(() => {
    try {
      const draft = {
        fullName: watch('fullName'),
        phone: watch('phone'),
        twelfthPercentage: watchedPct,
        percentageType: watchedPctType,
        branch: watchedBranch,
      };
      localStorage.setItem('iem_lead_draft', JSON.stringify(draft));
    } catch {
      // Ignore storage errors
    }
  }, [watch, watchedPct, watchedPctType, watchedBranch]);

  // Evaluate preliminary percentage indication when valid percentage and branch exist
  useEffect(() => {
    if (watchedBranch && watchedPct !== undefined && watchedPct !== null) {
      const num = typeof watchedPct === 'number' ? watchedPct : parseFloat(String(watchedPct));
      if (!isNaN(num) && num >= 0 && num <= 100) {
        const result = evaluateEligibility(watchedBranch, num, watchedPctType);
        setIndication(result);
        return;
      }
    }
    setIndication(null);
  }, [watchedBranch, watchedPct, watchedPctType]);

  const onSubmit = async (data: LeadFormInput) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const payload = {
        fullName: data.fullName.trim(),
        phone: normalizePhoneNumber(data.phone),
        twelfthPercentage: Number(Number(data.twelfthPercentage).toFixed(2)),
        percentageType: data.percentageType,
        branch: data.branch,
        consentGiven: true,
        consentTimestamp: new Date().toISOString(),
        consentVersion: 'v1.0-2027',
        sourceCtaId,
        idempotencyKey,
        landingPage: typeof window !== 'undefined' ? window.location.pathname : '/',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        eligibilityResult: indication ? indication.status : 'REVIEW_REQUIRED',
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'We could not submit your request. Please try again.');
      }

      // Clear draft on successful persistence
      try {
        localStorage.removeItem('iem_lead_draft');
        sessionStorage.removeItem('iem_form_idempotency');
      } catch {
        // Ignore storage errors
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/thank-you?leadId=${encodeURIComponent(json.leadId || '')}&branch=${encodeURIComponent(data.branch)}`);
      }
    } catch (err: any) {
      setSubmissionError(err.message || 'A network error occurred. Please verify your details and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id={id}
      className={`bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200/80 p-5 sm:p-6 md:p-8 transition-all ${className}`}
    >
      <div className="mb-5 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brandBlue-100 text-brandBlue-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-brandBlue-600" />
          Verified Admission Guidance
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{headline}</h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{subheadline}</p>
      </div>

      {/* Submission status live region */}
      <div id={statusLiveId} aria-live="polite" className="sr-only">
        {isSubmitting ? 'Submitting your admission guidance request...' : ''}
        {submissionError ? `Error: ${submissionError}` : ''}
      </div>

      {submissionError && (
        <div
          role="alert"
          className="mb-5 p-4 rounded-lg bg-red-50 border border-red-200 text-red-900 text-sm flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to complete request</p>
            <p className="text-red-700 mt-0.5">{submissionError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Field 1: Full Name */}
        <div>
          <label htmlFor={nameId} className="block text-sm font-semibold text-slate-800 mb-1">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            id={nameId}
            type="text"
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? `${nameId}-error` : undefined}
            {...register('fullName')}
            className={`w-full px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm rounded-lg border text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.fullName
                ? 'border-red-400 focus:ring-red-400'
                : 'border-slate-300 focus:ring-brandBlue-600 focus:border-brandBlue-600'
            }`}
          />
          {errors.fullName && (
            <p id={`${nameId}-error`} className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Field 2: Mobile Number */}
        <div>
          <label htmlFor={phoneId} className="block text-sm font-semibold text-slate-800 mb-1">
            Mobile Number <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-medium text-sm">
              +91
            </div>
            <input
              id={phoneId}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="9876543210"
              maxLength={10}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? `${phoneId}-error` : `${phoneId}-help`}
              {...register('phone')}
              className={`w-full pl-12 pr-3.5 py-2.5 min-h-[44px] text-base sm:text-sm rounded-lg border text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-slate-300 focus:ring-brandBlue-600 focus:border-brandBlue-600'
              }`}
            />
          </div>
          {errors.phone ? (
            <p id={`${phoneId}-error`} className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phone.message}
            </p>
          ) : (
            <p id={`${phoneId}-help`} className="text-xs text-slate-500 mt-1">
              For official admission counselling & WhatsApp assistance.
            </p>
          )}
        </div>

        {/* Field 3 & Modifier: 12th Percentage + Percentage Type */}
        <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <label htmlFor={pctId} className="block text-sm font-semibold text-slate-800">
              Class 12th Percentage <span className="text-red-600">*</span>
            </label>
            <span className="text-[11px] sm:text-xs text-slate-500">Board exam or pre-board estimate</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* Number Input */}
            <div>
              <div className="relative">
                <input
                  id={pctId}
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="e.g. 84.5"
                  aria-invalid={errors.twelfthPercentage ? 'true' : 'false'}
                  aria-describedby={errors.twelfthPercentage ? `${pctId}-error` : undefined}
                  {...register('twelfthPercentage')}
                  className={`w-full px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm rounded-lg border text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.twelfthPercentage
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-slate-300 focus:ring-brandBlue-600 focus:border-brandBlue-600'
                  }`}
                />
                <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400 font-semibold text-sm">
                  %
                </span>
              </div>
              {errors.twelfthPercentage && (
                <p id={`${pctId}-error`} className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.twelfthPercentage.message}
                </p>
              )}
            </div>

            {/* Radio Modifier: Percentage Type */}
            <div className="flex flex-col justify-center space-y-1 bg-white p-2 rounded-lg border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-600">Calculate based on:</span>
              <div className="grid grid-cols-2 gap-1.5">
                <label className="flex items-center justify-center gap-1.5 cursor-pointer text-xs font-medium text-slate-700 py-1.5 px-2 rounded-md hover:bg-slate-50 transition-colors">
                  <input
                    id={pctTypeAggregateId}
                    type="radio"
                    value="Aggregate"
                    {...register('percentageType')}
                    className="text-brandBlue-600 focus:ring-brandBlue-600"
                  />
                  <span>Aggregate</span>
                </label>
                <label className="flex items-center justify-center gap-1.5 cursor-pointer text-xs font-medium text-slate-700 py-1.5 px-2 rounded-md hover:bg-slate-50 transition-colors">
                  <input
                    id={pctTypePcmId}
                    type="radio"
                    value="PCM"
                    {...register('percentageType')}
                    className="text-brandBlue-600 focus:ring-brandBlue-600"
                  />
                  <span>PCM</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Field 4: Desired B.Tech Branch */}
        <div>
          <label htmlFor={branchId} className="block text-sm font-semibold text-slate-800 mb-1">
            Desired B.Tech Branch <span className="text-red-600">*</span>
          </label>
          <select
            id={branchId}
            aria-invalid={errors.branch ? 'true' : 'false'}
            aria-describedby={errors.branch ? `${branchId}-error` : undefined}
            {...register('branch')}
            className={`w-full px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm rounded-lg border text-slate-900 bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.branch
                ? 'border-red-400 focus:ring-red-400'
                : 'border-slate-300 focus:ring-brandBlue-600 focus:border-brandBlue-600'
            }`}
          >
            {VERIFIED_BRANCHES.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name} ({b.shortName})
              </option>
            ))}
          </select>
          {errors.branch && (
            <p id={`${branchId}-error`} className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.branch.message}
            </p>
          )}
        </div>

        {/* Dynamic Non-Determining Indication Result Badge */}
        {indication && (
          <div
            className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all duration-200 ${
              indication.status === 'POSSIBLY_MEETS'
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                : indication.status === 'BELOW_THRESHOLD'
                ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                : 'bg-blue-50/90 border-blue-300 text-blue-950'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {indication.status === 'POSSIBLY_MEETS' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : indication.status === 'BELOW_THRESHOLD' ? (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold">{indication.message}</p>
                <p className="mt-1 opacity-90 text-[11px] leading-normal">{indication.disclaimer}</p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Consent Checkbox (Unchecked by default) */}
        <div className="pt-1">
          <label htmlFor={consentId} className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 leading-normal select-none py-1">
            <input
              id={consentId}
              type="checkbox"
              aria-invalid={errors.consent ? 'true' : 'false'}
              aria-describedby={errors.consent ? `${consentId}-error` : undefined}
              {...register('consent')}
              className="mt-0.5 rounded border-slate-300 text-brandBlue-600 focus:ring-brandBlue-600 h-4 w-4 shrink-0 cursor-pointer"
            />
            <span>
              I agree to be contacted about I.E.M admissions and counselling via Call, SMS, and WhatsApp.{' '}
              <a href="/privacy" target="_blank" className="text-brandBlue-600 underline font-medium hover:text-brandBlue-700">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.consent && (
            <p id={`${consentId}-error`} className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Submit Action Button (Labelled with Value, not generic "Submit") */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[48px] py-3.5 px-6 rounded-lg bg-brandBlue-600 hover:bg-brandBlue-500 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brandBlue-600 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying & Connecting...</span>
            </>
          ) : (
            <>
              <span>Get Admission Guidance</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Operator SLA note */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Counsellor Response SLA: &lt; 15 mins
        </span>
        <span>Zero Application Fee for IEMJEE</span>
      </div>
    </div>
  );
}
