# Citizen Café Design Reference

Condensed build guide for the citizen-exam flashcard app. Use this when making UI decisions.

## Brand promise

Warm belonging through modern Hebrew, culture, and real human connection. Editorial + human + structured — not generic EdTech SaaS.

## Colors

| Token | Hex | Use |
|---|---|---|
| `brand-yellow` | `#F9E24C` | CTAs, accents, active highlights |
| `brand-charcoal` | `#373230` | Headlines, dark text, dark surfaces |
| `brand-white` | `#FFFFFF` | Cards, inputs, raised surfaces |
| `surface-base` | `#F2F1EC` | Page background (never pure white site-wide) |
| `text-muted` | `#716C66` | Labels, metadata, captions |
| `line-subtle` | `#D2CEC6` | Borders, dividers |

### Rules

- Charcoal text on yellow buttons — not white on yellow
- Yellow signals action and emphasis; don't flood the UI with it
- Prefer warm off-white backgrounds over sterile pure white

## Typography

| Role | Font | Use |
|---|---|---|
| Display / headlines | Fedra (fallback: Libre Baskerville) | H1, hero, editorial moments |
| UI / body | Assistant | Labels, buttons, controls, body copy |

- Don't mix both fonts inside small UI components
- Body line-height >= 1.4
- Hebrew flashcard text: large, RTL (`dir="rtl"`), readable

## Buttons

Primary CTA:
- Yellow fill (`brand-yellow`)
- Charcoal text (`brand-charcoal`)
- Lightly rounded corners
- Clear hover/focus states (slightly darker yellow)
- Generous horizontal padding

Secondary/outline:
- White or transparent background
- Subtle border (`line-subtle`)
- Charcoal text

## Forms & inputs

- White input surfaces on neutral or yellow bands
- Thin subtle borders
- Assistant font for labels
- Generous tap targets on mobile

## Cards (flashcards)

- White raised surface on warm background
- Thin border (`line-subtle`)
- Restrained shadow on hover
- Calm flip/reveal animation — no bouncy gimmicks

## Layout

- Generous whitespace and side margins
- Slim header with app title in display font
- Single focused study screen beats cluttered multi-panel layouts

## Motion

Favor: soft fades, subtle reveals, restrained hover states.
Avoid: bouncy animations, flashy yellow effects, performance-heavy reveals.

## Guardrails — avoid

- Pure white everywhere
- Generic blue link defaults
- Dense, dashboard-like layouts
- Over-polished sterile SaaS feel
- Browser-default form styling

## Level color accents (optional UI hints)

| Tier | Levels |
|---|---|
| Foundation | Red, Orange, Pink, Yellow |
| Flow | Light Blue, Blue, Lime, Green |
| Freedom | Dark Green, Turquoise, Indigo, Purple |

Use level colors as small dots/badges in selectors — not as full-page backgrounds.

## Tailwind usage

Brand tokens are available as CSS variables and Tailwind utilities:

```
bg-surface-base   text-brand-charcoal   bg-brand-yellow
text-text-muted   border-line-subtle    font-display
```
