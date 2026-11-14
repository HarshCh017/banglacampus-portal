# Specialist Findings: Technical SEO

**Score**: 88 / 100  
**Evaluator**: `seo-technical` specialist  

## Key Observations
1. **Robots.txt (`https://bengalcampus.in/robots.txt`)**:
   - RFC 9309 compliant.
   - User-agents configured: `*`, `GPTBot`, `Claude-SearchBot`, `PerplexityBot`.
   - Properly disallows: `/admin`, `/dashboard`, `/login`, `/api/`, `/thank-you`.
   - Sitemap reference correctly points to `https://bengalcampus.in/sitemap.xml`.

2. **Sitemap (`https://bengalcampus.in/sitemap.xml`)**:
   - 104 static URLs covered.
   - Includes `/wbjee-predictor`, `/fee-calculator`, all 20 college profiles, all courses, and all educational guides.
   - Excludes `/thank-you` and administrative paths.

3. **HTTP Status & Headers**:
   - SSL: A+ Grade TLS 1.3 / HTTP/2.
   - HSTS: `max-age=63072000; includeSubDomains; preload`.
   - CSP: Strict CSP configured with Google Tag Manager and Google Analytics endpoints whitelisted.
   - Redirect chain: 1 hop (308).

4. **Action Item**:
   - Align Vercel's Primary Domain setting with apex `bengalcampus.in` to match codebase canonicals.
