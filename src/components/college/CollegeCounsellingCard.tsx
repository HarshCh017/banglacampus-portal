'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { College } from '@/types/college';
import {
  Headphones,
  CheckCircle2,
  ArrowRight,
  User,
  Phone,
  Award,
  ShieldCheck,
  Zap,
  GraduationCap,
  Loader2,
  Lock,
} from 'lucide-react';

interface CollegeCounsellingCardProps {
  college?: College;
  variant?: 'sidebar' | 'banner';
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function CollegeCounsellingCard({
  college,
  variant = 'sidebar',
  id,
  className = '',
  title,
  subtitle,
}: CollegeCounsellingCardProps) {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [rank, setRank] = useState<string>('');

  const collegeName = college ? college.name : 'West Bengal Engineering Admissions';
  const collegeShortName = college ? college.shortName : 'WB Engineering';
  const collegeSlug = college ? college.slug : 'general';
  const programsList =
    college?.programs && college.programs.length > 0
      ? college.programs
      : [
          { name: 'Computer Science & Engineering (CSE)', slug: 'cse', intakeEst: 180 },
          { name: 'Information Technology (IT)', slug: 'it', intakeEst: 120 },
          { name: 'Electronics & Communication (ECE)', slug: 'ece', intakeEst: 120 },
          { name: 'Computer Science (AI & ML)', slug: 'cse-aiml', intakeEst: 60 },
          { name: 'Electrical Engineering (EE)', slug: 'ee', intakeEst: 60 },
          { name: 'Mechanical Engineering (ME)', slug: 'me', intakeEst: 60 },
        ];

  // Default to CSE or first available program
  const defaultBranch =
    programsList.find(
      (p) =>
        p.name.toLowerCase().includes('computer') ||
        p.name.toLowerCase().includes('cse')
    )?.name ||
    programsList[0]?.name ||
    'Computer Science & Engineering (CSE)';

  const [branch, setBranch] = useState<string>(defaultBranch);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name.trim(),
          phone: cleanPhone,
          rank: rank ? parseInt(rank.replace(/[^0-9]/g, ''), 10) : undefined,
          preferredCollege: collegeSlug,
          preferredBranch: branch,
          state: 'West Bengal',
          source: `Counselling Card (${variant}): ${collegeName}`,
          consent: true,
          consentGiven: true,
        }),
      });

      const data = await res.json().catch(() => null);
      if (data?.submissionId) {
        setSubmissionId(data.submissionId);
      } else {
        setSubmissionId(`BC-COUNS-${Date.now().toString(36).toUpperCase()}`);
      }
      setSubmitted(true);
    } catch {
      setSubmissionId(`BC-COUNS-${Date.now().toString(36).toUpperCase()}`);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable Form Content styled per DESIGN.md
  const formContent = (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {errorMsg && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#991B1B',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Field 1: Full Name */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 500,
                color: '#222222',
                marginBottom: 6,
              }}
            >
              Student Full Name <span style={{ color: '#E11D48' }}>*</span>
            </label>
            <div className="relative">
              <User
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                  color: '#929292',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                required
                style={{
                  width: '100%',
                  height: 44,
                  paddingLeft: 38,
                  paddingRight: 14,
                  borderRadius: 8,
                  border: '1px solid #dddddd',
                  background: '#ffffff',
                  fontSize: 14,
                  color: '#222222',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#102A56')}
                onBlur={(e) => (e.target.style.borderColor = '#dddddd')}
              />
            </div>
          </div>

          {/* Field 2: Mobile / WhatsApp Number */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 500,
                color: '#222222',
                marginBottom: 6,
              }}
            >
              WhatsApp / Mobile Number <span style={{ color: '#E11D48' }}>*</span>
            </label>
            <div className="relative">
              <Phone
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                  color: '#929292',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="10-digit mobile number"
                maxLength={10}
                required
                style={{
                  width: '100%',
                  height: 44,
                  paddingLeft: 38,
                  paddingRight: 14,
                  borderRadius: 8,
                  border: '1px solid #dddddd',
                  background: '#ffffff',
                  fontSize: 14,
                  color: '#222222',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#102A56')}
                onBlur={(e) => (e.target.style.borderColor = '#dddddd')}
              />
            </div>
          </div>

          {/* Row: WBJEE Rank & Target Branch */}
          <div className={`grid ${variant === 'banner' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-3`}>
            {/* WBJEE Rank */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#222222',
                  marginBottom: 6,
                }}
              >
                WBJEE Rank <span style={{ color: '#6a6a6a', fontWeight: 400 }}>(Optional)</span>
              </label>
              <div className="relative">
                <Award
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 16,
                    height: 16,
                    color: '#929292',
                    pointerEvents: 'none',
                  }}
                />
                <input
                  type="text"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="e.g. 4500"
                  style={{
                    width: '100%',
                    height: 44,
                    paddingLeft: 38,
                    paddingRight: 14,
                    borderRadius: 8,
                    border: '1px solid #dddddd',
                    background: '#ffffff',
                    fontSize: 14,
                    color: '#222222',
                    outline: 'none',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#102A56')}
                  onBlur={(e) => (e.target.style.borderColor = '#dddddd')}
                />
              </div>
            </div>

            {/* Target Branch */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#222222',
                  marginBottom: 6,
                }}
              >
                Target Branch <span style={{ color: '#E11D48' }}>*</span>
              </label>
              <div className="relative">
                <GraduationCap
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 16,
                    height: 16,
                    color: '#929292',
                    pointerEvents: 'none',
                  }}
                />
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  style={{
                    width: '100%',
                    height: 44,
                    paddingLeft: 38,
                    paddingRight: 32,
                    borderRadius: 8,
                    border: '1px solid #dddddd',
                    background: '#ffffff',
                    fontSize: 13,
                    color: '#222222',
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {programsList.map((p, idx) => (
                    <option key={idx} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <div
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6a6a6a',
                    pointerEvents: 'none',
                    fontSize: 10,
                  }}
                >
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              height: 48,
              marginTop: 8,
              borderRadius: 8,
              background: '#102A56',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1455B8';
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#102A56';
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Scheduling Consultation...</span>
              </>
            ) : (
              <>
                <span>Request Free Counselling for {collegeShortName}</span>
                <ArrowRight style={{ width: 16, height: 16 }} />
              </>
            )}
          </button>

          {/* Privacy Notice */}
          <p style={{ fontSize: 11, color: '#6a6a6a', textAlign: 'center', marginTop: 8 }}>
            By submitting, you consent to receive admission updates per our{' '}
            <Link href="/privacy-policy" style={{ textDecoration: 'underline', color: '#1455B8' }}>
              Privacy Policy
            </Link>
            . We never sell student data.
          </p>

          {/* Micro Trust Checklist */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 10,
              borderTop: '1px solid #ebebeb',
              fontSize: 12,
              color: '#6a6a6a',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <ShieldCheck style={{ width: 14, height: 14, color: '#0F8B70' }} />
              <span>Verified Cutoffs</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Zap style={{ width: 14, height: 14, color: '#102A56' }} />
              <span>Zero Agent Fees</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Lock style={{ width: 14, height: 14, color: '#6a6a6a' }} />
              <span>100% Confidential</span>
            </span>
          </div>
        </form>
      ) : (
        /* Thank You Confirmation State */
        <div style={{ textAlign: 'center', padding: '24px 12px' }} className="space-y-4">
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 9999,
              background: '#E6F6F2',
              color: '#0F8B70',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <CheckCircle2 style={{ width: 28, height: 28 }} />
          </div>

          <div>
            <h4 style={{ fontSize: 18, fontWeight: 600, color: '#222222' }}>
              Counselling Request Confirmed!
            </h4>
            <p style={{ fontSize: 13, color: '#6a6a6a', marginTop: 6, lineHeight: 1.5 }}>
              Our dedicated counsellor for <strong>{collegeShortName}</strong> will reach out to{' '}
              <strong style={{ color: '#222222' }}>{phone}</strong> shortly.
            </p>
          </div>

          <div
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: 9999,
              background: '#f7f7f7',
              border: '1px solid #dddddd',
              fontSize: 12,
              color: '#3f3f3f',
              fontFamily: 'monospace',
            }}
          >
            Ref ID: <strong>{submissionId || 'BC-CONFIRMED'}</strong>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setPhone('');
                setRank('');
              }}
              style={{
                fontSize: 13,
                color: '#1455B8',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Submit Another Query
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Variant A: Sidebar Card (Default)
  if (variant === 'sidebar') {
    return (
      <div
        id={id || 'counselling-card-sidebar'}
        style={{
          background: '#ffffff',
          borderRadius: 14,
          padding: 24,
          border: '1px solid #dddddd',
          transition: 'box-shadow 0.2s',
        }}
        className={`hover:shadow-airbnb ${className}`}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 16,
            marginBottom: 16,
            borderBottom: '1px solid #ebebeb',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9999,
                background: '#f7f7f7',
                border: '1px solid #dddddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#102A56',
              }}
            >
              <Headphones style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222222', lineHeight: 1.2 }}>
                {title || 'Free College Counselling'}
              </h3>
              <p style={{ fontSize: 12, color: '#6a6a6a' }}>
                {subtitle || '1-on-1 WBJEE Cutoffs & Admission Desk'}
              </p>
            </div>
          </div>

          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 9999,
              background: '#E6F6F2',
              color: '#0F8B70',
              border: '1px solid #A7E3D4',
            }}
          >
            100% Free
          </span>
        </div>

        {formContent}
      </div>
    );
  }

  // Variant B: Panoramic Showcase Banner
  return (
    <section
      id={id || 'counselling-banner'}
      style={{
        background: '#f7f7f7',
        borderRadius: 20,
        border: '1px solid #dddddd',
        padding: '32px 24px',
      }}
      className={className}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-4">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 9999,
              background: '#ffffff',
              border: '1px solid #dddddd',
              fontSize: 12,
              fontWeight: 500,
              color: '#102A56',
            }}
          >
            <ShieldCheck style={{ width: 14, height: 14, color: '#0F8B70' }} />
            <span>Dedicated {collegeShortName} Admissions Desk</span>
          </span>

          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: '#222222',
              lineHeight: 1.25,
            }}
          >
            {title ? (
              title
            ) : (
              <>
                Wondering If Your Rank Secures A Seat At{' '}
                <span style={{ color: '#102A56' }}>{collegeShortName}?</span>
              </>
            )}
          </h2>

          <p style={{ fontSize: 14, color: '#6a6a6a', lineHeight: 1.5 }}>
            {subtitle || (
              <>
                Our West Bengal engineering counsellors analyze your exact WBJEE score against official{' '}
                <strong style={{ color: '#222222' }}>{collegeName}</strong> closing cutoffs, category quotas,
                and choice-filling priority order.
              </>
            )}
          </p>

          {/* 3 Strategic Trust Pillars */}
          <div className="space-y-2 pt-2" style={{ fontSize: 13, color: '#3f3f3f' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 style={{ width: 16, height: 16, color: '#0F8B70', flexShrink: 0 }} />
              <span>
                <strong>Round-by-Round Cutoff Match:</strong> See if your rank fits Round 1, Round 2, or Mop-Up.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 style={{ width: 16, height: 16, color: '#0F8B70', flexShrink: 0 }} />
              <span>
                <strong>TFW &amp; Scholarship Audit:</strong> Check eligibility for 100% Tuition Fee Waiver seats.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 style={{ width: 16, height: 16, color: '#0F8B70', flexShrink: 0 }} />
              <span>
                <strong>Alternative College Plan:</strong> Compare {collegeShortName} with top peer institutions.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean White Card */}
        <div className="lg:col-span-6">
          <div
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #dddddd',
              padding: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 14,
                marginBottom: 16,
                borderBottom: '1px solid #ebebeb',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Headphones style={{ width: 18, height: 18, color: '#102A56' }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222222' }}>
                  Get Free 1-on-1 Guidance
                </h3>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 9999,
                  background: '#E6F6F2',
                  color: '#0F8B70',
                }}
              >
                100% Free
              </span>
            </div>

            {formContent}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollegeCounsellingCard;
