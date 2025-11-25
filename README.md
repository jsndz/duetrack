# Duetrack

DueTrack helps users never miss a bill payment again. Users manually add bills (rent, utilities, subscriptions, credit cards, etc.), set reminders, and receive notifications via email, calendar integration and optionally WhatsApp/Telegram. The app emphasises simplicity, recurring bills, and minimal setup — no bank linking required.

---

## Key Value Propositions

* **Peace of mind** — “Never get a late fee again.”
* **Low friction setup** — add a bill in under 30 seconds.
* **Recurring automation** — hands-off once set.
* **Multiple delivery channels** — email + calendar feed + WhatsApp/Telegram.
* **Privacy-first** — no financial account links, minimal personal data.
* **Universal applicability** — users globally can use it; local currency/timezone support.

---

## Core Features (MVP)

### 1) Account & Profile

* Sign up via Email (and optionally Google OAuth).
* Set timezone & default reminder times.
* Choose “reminder channels” (email required; optionally WhatsApp/Telegram).
* Basic profile: name/nickname, default currency (for display), locale.

### 2) Bill Management

* Create a new bill:

  * Title (e.g., “Electricity – ABC Power”)
  * Amount (optional) & currency
  * Due date (e.g., “15 Nov 2025”)
  * Recurrence rule: none / monthly / yearly / custom (for MVP, monthly “same date” is enough)
  * Reminder offsets: default “T-3 days”, “T-1 day”, “T (9:00 AM)” — user adjustable.
  * Category/tag (rent, utilities, subscription, credit card etc.).
  * Notes (optional).
* List view: Active bills, upcoming (next 7/30 days), overdue bills.
* Ability to mark a bill as “Paid” — which stops current reminder chain and if recurring, schedules next occurrence.

### 3) Reminder Engine

* For each bill occurrence: compute due date in user’s timezone.
* Schedule jobs for each offset (e.g., due date minus 3 days).
* On trigger: send email (and/or WhatsApp/Telegram) to user.
* If paid before due: cancel pending reminders.
* If overdue and unpaid by end of day: optionally send “late payment” notice.
* ICS calendar feed:

  * Generate a per-user, secure URL (with token) that exposes upcoming bill occurrences.
  * Users subscribe in Google/Apple calendar; each occurrence shows as event.
  * Updates propagate automatically (i.e., if user marks paid, future occurrences still show; or if user snoozes reminders etc).

### 4) Dashboard & History

* Main dashboard: upcoming bills (next 7–30 days) + overdue items.
* Occurrence history: list of past bills, status (Paid / Missed) + date paid.
* Simple metrics: “You paid X out of Y bills on time this month”, “You avoided approximately ₹Z in late fees” (for gamification).
* Notification/log history: what reminders were sent, link to mark paid from each channel.

### 5) Basic Settings & Preferences

* Configure default reminder schedule (number of days before, time of day).
* Delete / deactivate bills.
* Change default currency and locale.
* Change password, email.
* Manage subscription (if monetised).
* Rotate ICS token (invalidate previous calendar feed).
* Opt-in/out of WhatsApp/Telegram channel.

---

## Monetisation & Premium Features

**Free plan**: up to e.g. 5 active bills, email reminders, calendar feed.
**Pro plan** (small monthly/yearly fee): unlimited bills, WhatsApp/Telegram reminders, shared bills (invite others), attachments & bill-scans, export CSV, advanced recurrence rules (e.g., “every 2nd Monday”), dark-mode themes, priority support.

Potential B2B: small landlord/property-manager version (send reminders to tenants), SaaS for co-living spaces, digital property managers.

---

## UX / UI Suggestions

* Clean, minimalistic design: one screen “Add Bill” is central.
* Use cards for each bill showing title, next due date, days left, “Mark Paid” button.
* On mailing reminder: include the “Mark Paid” link/button → reduces friction.
* Use colours: green for on-track bills, yellow for bills due soon, red for overdue.
* Onboarding: quick walk-through—“Add your first bill in 30 sec”, “We’ll remind you automatically”, “Subscribe your calendar”.
* Push (optional) at native mobile – could be added later.

---

## Technical Architecture

* Frontend: Web (responsive) – can expand to mobile later. Use React + Tailwind or Next JS.
* Backend: Node JS (Express/NestJS) or Python (FastAPI) + PostgreSQL.
* Scheduler: Use Redis + BullMQ (for Node) or Celery/Redis (for Python) for scheduled jobs.
* Email provider: Postmark, SendGrid, or Amazon SES (with proper SPF/DKIM).
* WhatsApp/Telegram: Twilio WhatsApp API or Meta WhatsApp Business API (need templates).
* ICS feed: Serve `GET /api/calendar/{user_token}.ics` — generate ICS dynamically from upcoming occurrences.
* Hosting: Backend on Heroku/Render/Fly.io; DB via managed Postgres (Heroku, Neon, AWS RDS).
* Storage (if attachments): S3 or Backblaze B2.
* Analytics & logging: PostHog or Google Analytics (respect privacy).
* Auth: JWT + refresh tokens; password login + Google OAuth (optional).

---

## Data Schema (High Level)

```
User {
  id: UUID,
  email: string (unique),
  password_hash: string,
  timezone: string,
  default_reminder_offsets: JSON,
  token_calendar_feed: string,
  created_at, updated_at
}

Bill {
  id: UUID,
  user_id: UUID,
  title: string,
  amount_cents: integer (nullable),
  currency: string,
  category: string,
  notes: text (nullable),
  recurrence_rule: string (RRULE or simple enum),
  is_active: boolean,
  created_at, updated_at
}

Occurrence {
  id: UUID,
  bill_id: UUID,
  due_at: timestamp (UTC),
  status: enum {PENDING, PAID, MISSED},
  paid_at: timestamp (nullable),
  created_at, updated_at
}

ReminderJob {
  id: UUID,
  occurrence_id: UUID,
  offset_description: string (e.g., “-3d”), 
  scheduled_at: timestamp (UTC),
  channel: enum {EMAIL, WHATSAPP, TELEGRAM},
  sent_at: timestamp (nullable),
  status: enum {SCHEDULED, SENT, FAILED},
  error_message: text (nullable)
}
```

---

## Launch & Growth Strategy

* **Landing page**: clear USP (“Never get a late bill again”), show screenshots of dashboard.
* **Blog/SEO**: Content like “How to avoid late fees”, “Rent reminder checklist”, “Best calendar hacks for bills”.
* **Community posts**: Reddit (r/personalfinance, r/IndiaFinance), Twitter threads about “I used this app and I haven’t paid a late fee in 6 months” (with testimonial).
* **Freemium model** to drive sign-ups; enough free value to get traction.
* **Referral programme**: “Invite 3 friends, get 1 month Pro” or “Add a shared bill with 2 roommates and all get month free”.
* **Local marketing**: Target co-living spaces & students in India (Mysuru, Bengaluru) — partnership with hostel managers/PGs.
* **Add multilingual support** (Hindi, Kannada) to appeal in India.
* **Press kit**: Send to fintech/productivity blogs; “Simple app saves you late fees” angle.

---

## Success Metrics to Track

* Activation: % of new users who add ≥1 bill within first session.
* Engagement: average bills per user; reminders sent per user; % users marking bills paid.
* Retention: Day 1, Day 7, Day 30 retention.
* Monetisation: % of free users upgrading, churn rate for Pro.
* Viral coefficient: how many invites/referrals per user.
* Late fee avoidance: Provide an estimated “fees saved” number to create shareable metrics.

---

## Risks / Challenges & Mitigations

* **User doesn’t add bills** → Onboarding must stress simplicity; maybe pre-populate with “Rent”, “Internet”, “Mobile bill” template.
* **Low retention** → Need recurring value; auto-reminders + next-cycle scheduling; send “You have 1 bill due in 2 days” push.
* **Deliverability (emails/WhatsApp)** → Setup good deliverability early; monitor bounce/complaint rates.
* **WhatsApp template approval** → For Pro channel, plan time for Meta approval; begin with email + calendar first.
* **Competition** → Cast your difference clearly (privacy, simplicity, calendar feed) and pick niche segment to dominate before expanding.

---

If you like, I can **mock up the full user-flow screens** (onboarding, add bill, dashboard, settings) and we can **estimate a tech-build roadmap with time-costs** (for you as a solo dev) so you can pick your first 2-week sprint. Do you want that?
