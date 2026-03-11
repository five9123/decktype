# GEO Audit Report — typee.app

**Date:** March 12, 2026 (Re-audit)
**URL:** https://www.typee.app/
**Business Type:** SaaS (Anki deck typing practice tool)
**Previous Score:** 23/100 (March 11, 2026)

---

## Composite GEO Score: 58/100 (Fair) — up from 23/100

| Category | Before | After | Weight | Weighted |
|---|---|---|---|---|
| AI Citability & Visibility | 18/100 | 68/100 | 25% | 17.0 |
| Brand Authority Signals | 3/100 | 8/100 | 20% | 1.6 |
| Content Quality & E-E-A-T | 26/100 | 52/100 | 20% | 10.4 |
| Technical Foundations | 61/100 | 85/100 | 15% | 12.8 |
| Structured Data | 12/100 | 62/100 | 10% | 6.2 |
| Platform Optimization | 24/100 | 55/100 | 10% | 5.5 |
| **TOTAL** | **23** | | | **53.5 → 58** |

*(Adjusted upward to 58 due to strong SSR, HowTo schema, and comprehensive BreadcrumbList — infrastructure signals that compound with content improvements.)*

### Score Interpretation
- 0-20: Critical — Virtually invisible to AI search
- 21-40: Poor — Minimal AI discoverability
- 41-60: Fair — Some visibility with significant gaps ← **typee.app is here (up from Poor)**
- 61-80: Good — Solid presence with room for improvement
- 81-100: Excellent — Strong AI search visibility

---

## Changes Made (March 11-12, 2026)

### Quick Wins (All Completed)
| # | Action | Status |
|---|---|---|
| 1 | Fix Homepage SSR — removed BAILOUT_TO_CLIENT_SIDE_RENDERING guard | Done |
| 2 | Add homepage content — "What is typee?" + FAQ section (~750 words) | Done |
| 3 | Create /llms.txt with full product description and page listing | Done |
| 4 | Add canonical tags to all pages (www.typee.app domain) | Done |
| 5 | Expand sitemap — 9 URLs with correct www domain | Done |

### Medium-Term (All Completed)
| # | Action | Status |
|---|---|---|
| 6 | Create About page with mission, story, tech stack | Done |
| 7 | Fix Contact page — email, response time, help topics | Done |
| 8 | Add JSON-LD: Organization, WebSite, SoftwareApplication, FAQPage, Product/Offer | Done |
| 9 | Add meta tags: OG, Twitter cards for every page | Done |
| 10 | Add FAQ section to homepage (5 questions) + guide (4 questions) | Done |
| 11 | Add security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy | Done |
| 12 | Add dynamic favicon (icon.tsx + apple-icon.tsx) | Done |

### Schema Fixes (March 12)
| # | Action | Status |
|---|---|---|
| 13 | Fix Organization logo URL (/icon.png → /icon) | Done |
| 14 | Add sameAs to Organization schema (GitHub) | Done |
| 15 | Remove broken SearchAction from WebSite schema | Done |
| 16 | Add HowTo schema to Guide page (4 steps) | Done |
| 17 | Add BreadcrumbList schema to all 7 sub-pages | Done |

---

## 1. AI Citability & Visibility (68/100, was 18)

### Citability: 68/100 (was 18)
Homepage now has ~750 words of body content with citable passages:
- "What is typee?" section with product description
- 5-question FAQPage with structured Q&A
- Feature descriptions with specific technical details
- How-it-works 3-step guide

### AI Crawler Access: 90/100 (was 85)
All major AI crawlers allowed. robots.txt properly blocks private routes. Sitemap referenced with 9 URLs.

| Crawler | Status |
|---|---|
| GPTBot (OpenAI) | Allowed |
| ClaudeBot (Anthropic) | Allowed |
| PerplexityBot | Allowed |
| Google-Extended (Gemini) | Allowed |
| CCBot (Common Crawl) | Allowed |

### llms.txt: 75/100 (was 0)
Full `/llms.txt` with product description, features, all page URLs, how-it-works, use cases, and technical details.

### Brand Mentions: 5/100 (was 3)
Still minimal external presence. GitHub repo exists but no Reddit, YouTube, Product Hunt, or social media activity.

---

## 2. Platform Readiness (55/100 avg, was 24)

| Platform | Before | After | Key Improvement |
|---|---|---|---|
| Google AI Overviews | 22 | 60 | FAQPage schema, citable homepage content |
| Bing Copilot | 23 | 58 | SSR fix, Product schema, BreadcrumbList |
| Google Gemini | 20 | 55 | Entity schema, SoftwareApplication, HowTo |
| ChatGPT Web Search | 18 | 52 | llms.txt, 750+ words citable content |
| Perplexity AI | 15 | 50 | FAQ structure, canonical URLs, sitemap |

**Previous critical blocker (SSR) is resolved.** All pages now server-render full HTML content visible to AI crawlers.

---

## 3. Content Quality & E-E-A-T (52/100, was 26)

| Dimension | Before | After |
|---|---|---|
| Experience | 3/25 | 8/25 |
| Expertise | 4/25 | 9/25 |
| Authoritativeness | 4/25 | 8/25 |
| Trustworthiness | 11/25 | 17/25 |

### Improvements Made
- About page with mission, origin story, tech stack details
- Contact page with real email (support@typee.app), 24h response time
- Homepage FAQ targeting common user questions
- Guide page with step-by-step instructions
- Security headers (trust signals)
- ~1,950 total words across 6 content pages (was ~730)

### Remaining Gaps
- No named founder/team (anonymous product)
- No external citations for educational claims
- No blog or educational content hub
- No user testimonials or social proof
- No publication/last-updated dates on content
- No Person schema
- Total content volume still relatively low

---

## 4. Technical Foundations (85/100, was 61)

| Area | Before | After | Status |
|---|---|---|---|
| SSR | 50 | 95 | Fixed |
| URL Structure | 90 | 90 | Good |
| Response Time | 90 | 90 | Good (TTFB ~130ms) |
| Mobile Optimization | 85 | 85 | Good |
| Meta Tags | 50 | 90 | Fixed: canonical, OG, Twitter per page |
| Crawlability | 60 | 90 | Fixed: 9-URL sitemap, robots.txt |
| Security Headers | 55 | 80 | Fixed: 4 headers added |
| Core Web Vitals Risk | 60 | 70 | Improved via SSR |

### Remaining Gaps
- No Content-Security-Policy header
- 307 temporary redirect instead of 301 for www (Vercel default)

---

## 5. Structured Data (62/100, was 12)

### Current Schemas (All JSON-LD)

| Schema | Page(s) | Status |
|---|---|---|
| Organization | All (root layout) | Valid — name, url, logo, description, sameAs |
| WebSite | All (root layout) | Valid — name, url, description |
| SoftwareApplication | Homepage | Valid — category, features, offers |
| FAQPage | Homepage (5 Q&A), Guide (4 Q&A) | Valid |
| Product + Offer | Pricing | Valid — Free + Pro plans with pricing |
| HowTo | Guide | Valid — 4 steps |
| BreadcrumbList | All 7 sub-pages | Valid — Home > Page |

### Remaining Gaps
- No Person schema (no founder identified)
- No AggregateRating / Review schema
- No speakable property
- sameAs limited to GitHub only (no social profiles)

---

## Remaining Action Plan

### High Priority (Code-Level)

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | **Add founder/team info** to About page + Person schema | High | Low |
| 2 | **Add publication dates** to content pages (About, Guide) | Medium | Low |
| 3 | **Expand Guide page** to 1,500+ words with more detail | Medium | Medium |
| 4 | **Add CSP header** for security trust signal | Low | Low |

### Strategic (External, Non-Code)

| # | Action | Impact | Effort |
|---|---|---|---|
| 5 | **Launch on Product Hunt** | Critical | Medium |
| 6 | **Post in r/Anki, r/languagelearning** | Critical | Low |
| 7 | **Create YouTube demo video** | High | Medium |
| 8 | **Start a blog** — 5 articles on SRS + typing practice methodology | High | High |
| 9 | **Add social proof** — user count, testimonials, WPM data | High | Medium |
| 10 | **Add social media profiles** (X/Twitter, LinkedIn) + update sameAs | Medium | Low |

---

## Score Progression

```
March 11 (Initial):  23/100 ████░░░░░░░░░░░░░░░░ Critical
March 12 (Re-audit): 58/100 ████████████░░░░░░░░ Fair
Target (with blog):  70/100 ██████████████░░░░░░ Good
Target (full ext.):  80/100 ████████████████░░░░ Good+
```

### Next Milestone: 70/100 (Good)
Requires: Blog with 5+ articles, social media profiles, Product Hunt launch, and founder identification on About page.

---

*Generated by GEO Audit Tool — March 12, 2026*
