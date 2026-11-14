# ELIGIBILITY INDICATION RULES SPECIFICATION
Version: 1.0 (Phase 0b Deliverable)
Target Academic Year: 2026-27
Last Updated: 2026-09-18

---

## 1. MANDATORY LEGAL & COPY CONSTRAINTS

> [!CAUTION]
> **Strict Non-Determining Language**
> - The system must **NEVER** display: `"You are eligible"`, `"You qualify"`, `"Admission Guaranteed"`, or `"Selected"`.
> - The result banner MUST display:
>   > *"Based on the information you provided, you may meet the published criteria for [Branch Name]. Final eligibility depends on entrance examination (IEMJEE / WBJEE / JEE Main), board regulations, subject-wise passing marks, category, and domicile verification. Verify with official sources."*
> - The primary CTA following any indication result is **"Get Admission Guidance"** — never `"Apply Now"`.

---

## 2. ENGINE EVALUATION LOGIC & OUTCOME ENUM

### Outcomes Enum
1. `POSSIBLY_MEETS`: User-declared percentage ≥ published threshold AND rule is `VERIFIED_PRIMARY`.
2. `BELOW_THRESHOLD`: User-declared percentage < published threshold AND rule is `VERIFIED_PRIMARY`.
3. `REVIEW_REQUIRED`: Rule status is `CONFLICTED` or `UNVERIFIED`, OR user entered an aggregate percentage when only PCM is published, OR user marks are near borderline threshold.
4. `NOT_APPLICABLE`: No rule exists for the selected branch/percentage-type combination.

### Guardrail Algorithm
```typescript
export function evaluateEligibilityIndication(
  branchSlug: string,
  percentage: number,
  percentageType: 'Aggregate' | 'PCM',
  rule: EligibilityRule | undefined
): IndicationResult {
  // If rule is absent or unverified, fail safe to REVIEW_REQUIRED
  if (!rule || rule.status !== 'VERIFIED_PRIMARY') {
    return {
      status: 'REVIEW_REQUIRED',
      thresholdChecked: null,
      message: 'Published institutional criteria for this branch require counsellor verification.'
    };
  }

  // Check matching threshold based on submitted modifier
  const threshold = percentageType === 'PCM' 
    ? rule.minPcmPercent 
    : rule.minAggregatePercent;

  // If specific percentage type threshold is not established, escalate to review
  if (threshold === null || threshold === undefined) {
    return {
      status: 'REVIEW_REQUIRED',
      thresholdChecked: null,
      message: `Counsellor review required: specific published criteria for ${percentageType}% are pending confirmation.`
    };
  }

  if (percentage >= threshold) {
    return {
      status: 'POSSIBLY_MEETS',
      thresholdChecked: threshold,
      message: `Based on the information you provided, you may meet the published threshold (${threshold}% ${percentageType}) for ${rule.branchName}.`
    };
  } else {
    return {
      status: 'BELOW_THRESHOLD',
      thresholdChecked: threshold,
      message: `The entered percentage is below the typical published cut-off (${threshold}% ${percentageType}) for direct counseling in ${rule.branchName}. Admission guidance may advise on entrance examination options.`
    };
  }
}
```

---

## 3. BRANCH-WISE RULES DATABASE (2026–27 ACADEMIC YEAR)

```json
[
  {
    "branchSlug": "cse",
    "branchName": "Computer Science & Engineering",
    "academicYear": "2026-27",
    "minAggregatePercent": 80.0,
    "minPcmPercent": 60.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "http://cse.iem.edu.in/",
    "sourceName": "IEM CSE Department Criteria",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_PRIMARY"
  },
  {
    "branchSlug": "cse-aiml",
    "branchName": "CSE (Artificial Intelligence & Machine Learning)",
    "academicYear": "2026-27",
    "minAggregatePercent": 75.0,
    "minPcmPercent": 50.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "https://aiml.iem.edu.in/",
    "sourceName": "IEM AIML Department Criteria",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_PRIMARY"
  },
  {
    "branchSlug": "cse-ai",
    "branchName": "CSE (Artificial Intelligence)",
    "academicYear": "2026-27",
    "minAggregatePercent": 70.0,
    "minPcmPercent": 50.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "https://iem.edu.in/admissions",
    "sourceName": "IEM Admissions Criteria Circular",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_PRIMARY"
  },
  {
    "branchSlug": "it",
    "branchName": "Information Technology",
    "academicYear": "2026-27",
    "minAggregatePercent": 70.0,
    "minPcmPercent": 50.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "https://it.iem.edu.in",
    "sourceName": "IEM IT Department Criteria",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_PRIMARY"
  },
  {
    "branchSlug": "ece",
    "branchName": "Electronics & Communication Engineering",
    "academicYear": "2026-27",
    "minAggregatePercent": 60.0,
    "minPcmPercent": 45.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "http://ece.iem.edu.in",
    "sourceName": "IEM ECE Department Circular",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_PRIMARY"
  },
  {
    "branchSlug": "ee",
    "branchName": "Electrical Engineering",
    "academicYear": "2026-27",
    "minAggregatePercent": 60.0,
    "minPcmPercent": 45.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "https://ee.iem.edu.in",
    "sourceName": "IEM EE Department Circular",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_PRIMARY"
  },
  {
    "branchSlug": "eee",
    "branchName": "Electrical & Electronics Engineering",
    "academicYear": "2026-27",
    "minAggregatePercent": 60.0,
    "minPcmPercent": 45.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "https://eee.iem.edu.in/",
    "sourceName": "IEM EEE Department Circular",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_PRIMARY"
  },
  {
    "branchSlug": "me",
    "branchName": "Mechanical Engineering",
    "academicYear": "2026-27",
    "minAggregatePercent": 60.0,
    "minPcmPercent": 45.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "https://me.iem.edu.in",
    "sourceName": "IEM ME Department Circular",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_PRIMARY"
  },
  {
    "branchSlug": "cse-iot-cs-bt",
    "branchName": "CSE (IoT & Cyber Security with Blockchain)",
    "academicYear": "2026-27",
    "minAggregatePercent": 65.0,
    "minPcmPercent": 50.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "https://iotcsbt.uem.edu.in/",
    "sourceName": "IEM-UEM Group Criteria",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_SECONDARY"
  },
  {
    "branchSlug": "cse-iot",
    "branchName": "CSE (Internet of Things)",
    "academicYear": "2026-27",
    "minAggregatePercent": 65.0,
    "minPcmPercent": 50.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "https://iot.uem.edu.in/",
    "sourceName": "IEM-UEM Group Criteria",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_SECONDARY"
  },
  {
    "branchSlug": "cse-cs",
    "branchName": "CSE (Cyber Security)",
    "academicYear": "2026-27",
    "minAggregatePercent": 65.0,
    "minPcmPercent": 50.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "https://csit.uem.edu.in/",
    "sourceName": "IEM-UEM Group Criteria",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_SECONDARY"
  },
  {
    "branchSlug": "cse-ds",
    "branchName": "CSE (Data Science)",
    "academicYear": "2026-27",
    "minAggregatePercent": 65.0,
    "minPcmPercent": 50.0,
    "requiredEntranceExam": ["IEMJEE", "WBJEE", "JEE Main"],
    "sourceUrl": "https://ds.uem.edu.in/",
    "sourceName": "IEM-UEM Group Criteria",
    "verifiedAt": "2026-09-18",
    "status": "VERIFIED_SECONDARY"
  }
]
```

*Note: For branches marked `VERIFIED_SECONDARY`, the engine strictly defaults to `REVIEW_REQUIRED` until primary department circulars are cross-signed.*
