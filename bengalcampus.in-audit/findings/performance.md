# Specialist Findings: Performance & Core Web Vitals

**Score**: 90 / 100  
**Evaluator**: `seo-performance` specialist  

## Key Observations
1. **SSG & Edge Architecture**:
   - 100% of pages prerendered at build time (`x-nextjs-prerender: 1`).
   - Served directly from Vercel's global edge network cache (`x-vercel-cache: HIT / PRERENDER`).
   - Sub-100ms TTFB across regional edge points.

2. **Core Web Vitals Optimizations**:
   - Hero video uses `preload="none"` to yield network bandwidth to the LCP poster image.
   - Zero render-blocking third-party scripts.

3. **Recommendation**:
   - Add explicit `width` and `height` dimensions to image tags in card lists to prevent potential CLS.
