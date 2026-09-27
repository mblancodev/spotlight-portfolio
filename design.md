DESIGN.md

Purpose

This file is a design inspiration and decision guide for agents working on UI, UX, product surfaces, websites, onboarding, settings, dashboards, landing pages, motion, or component styling.

It is not a fixed visual style guide and it should not be treated as permission to copy another product blindly.

The goal is to help agents:

ask what matters most before designing,

use strong external references deliberately,

explain which references influenced the result,

adapt inspiration to the product instead of cloning it,

preserve usability, accessibility, consistency, and implementation quality.

Rule Zero: Ask Before Designing

Before making a meaningful visual or interaction design decision, ask the user what should be weighted most heavily for this task.

Do not assume that visual novelty, conversion, motion, brand consistency, density, minimalism, or implementation speed is the priority.

A concise question is enough:

What should I optimize for most here: visual style, usability, brand consistency, motion/polish, conversion, information density, or implementation simplicity?

When useful, offer task-specific choices instead of a generic question.

Examples:

Product UI

For this screen, what should matter most: clarity, compactness, MichelleOS brand consistency, delight/motion, or power-user density?

Landing page

Should I prioritize conversion, visual impact, product storytelling, trust, or technical simplicity?

Component redesign

Which matters most: consistency with the current system, a stronger visual identity, accessibility, compactness, or motion polish?

Installation / onboarding

Should this feel more premium, more friendly, more technical, more minimal, or more informative?

If the user already gave a clear priority in the current request, do not ask them to repeat it.

Decision Hierarchy

Unless the user explicitly changes the priorities, use this order:

User intent

Usability and clarity

Existing product identity and design system

Accessibility

Consistency across the product

Appropriate visual polish

Motion and delight

Novelty

A beautiful design that makes the product harder to use is a regression.

Reference Library

Use these sites as inspiration sources, not templates to reproduce verbatim.

When drawing inspiration from one of them, state internally what is being borrowed:

layout principle,

spacing rhythm,

hierarchy,

interaction pattern,

animation behavior,

composition,

typography treatment,

CTA structure,

navigation structure,

visual density,

or component anatomy.

Do not copy proprietary branding, illustrations, text, or distinctive compositions one-to-one.

Motion & High-Polish Web Inspiration

motionsites.ai

<https://motionsites.ai>

Use for:

premium motion direction,

animated gradients,

3D web presentation,

transitions,

scroll choreography,

high-impact hero sections,

interaction sequencing.

Best when the user prioritizes:

visual impact,

premium feel,

motion,

product launches,

marketing surfaces.

Avoid overusing this language in productivity UI where motion could slow the user down.

60fps.design

<https://60fps.design>

Use for:

micro-interactions,

hover states,

state transitions,

subtle motion,

polished feedback,

animation timing,

tactile-feeling UI behavior.

Best when the UI is already structurally sound and needs the last 10–20% of polish.

Navigation

navbar.gallery

<https://navbar.gallery>

Use for:

navigation structure,

desktop/mobile navbar patterns,

command/navigation hybrids,

responsive behavior,

hierarchy,

account/action placement,

sticky/floating navigation patterns.

Use the pattern, not the exact appearance.

Footers

footer.design

<https://footer.design>

Use for:

information architecture at the bottom of marketing surfaces,

compact vs expansive footer structures,

legal/product/company grouping,

newsletter or CTA integration,

visual closure.

Calls to Action

cta.gallery

<https://cta.gallery>

Use for:

CTA hierarchy,

primary vs secondary actions,

conversion-oriented composition,

action copy structure,

trust elements around actions,

CTA section layouts.

Agents should still prioritize honest UX over dark patterns or conversion tricks.

404 / Empty / Error States

404s.design

<https://404s.design>

Use for:

error-page personality,

recovery actions,

playful but useful empty states,

navigation back to safety,

maintaining brand tone during failure.

The recovery path matters more than the joke.

Full Sections & Page Composition

unsection.com

<https://unsection.com>

Use for:

full-page sections,

landing-page composition,

section rhythm,

pricing,

features,

testimonials,

product explanations,

comparison areas,

page sequencing.

Use this especially when an agent needs to avoid producing a page made of disconnected generic cards.

Bento Layouts

bentogrids.com

<https://bentogrids.com>

Use for:

dashboard composition,

feature storytelling,

modular content,

visual hierarchy,

grouped product capabilities,

responsive bento structures.

Do not use bento grids automatically. They are useful when the content naturally decomposes into modules.

DESIGN.md / Agent-Oriented Design References

These references are especially useful when an agent is generating UI directly from product requirements.

typeui.sh

<https://typeui.sh>

Use for:

UI component inspiration,

component anatomy,

reusable patterns,

practical application UI,

clean interface composition.

Good default reference for product UI.

designmd.me

<https://designmd.me>

Use for:

DESIGN.md conventions,

documenting visual direction for agents,

translating design intent into agent-readable rules,

systematizing aesthetic decisions.

designmd.supply

<https://designmd.supply>

Use for:

agent-facing design guidance,

reusable design instructions,

style-system references,

inspiration for maintaining visual consistency across generated UI.

styles.refero.design

<https://styles.refero.design>

Use for:

visual style exploration,

identifying design directions,

comparing stylistic families,

UI mood and visual language.

Best used when the user says something like:

“make it warmer,”

“make it more editorial,”

“make it feel premium,”

“make it more technical,”

“make it softer,”

“make it less SaaS-like.”

getdesign.md

<https://getdesign.md>

Use for:

design instruction patterns,

agent-readable design context,

documenting visual decisions,

reusable design constraints.

collectui.com

<https://collectui.com>

Use for:

broad UI pattern discovery,

screens,

flows,

common application patterns,

exploring multiple solutions to the same interface problem.

Because the catalog is broad, agents should filter aggressively rather than averaging random styles together.

designmd-store.com

<https://designmd-store.com>

Use for:

examples of reusable design specifications,

design-system instruction structures,

agent-consumable visual presets.

Additional Reference Categories

Styles

styles.refero.design

<https://styles.refero.design>

Primary use:

choosing an aesthetic direction before implementation.

Design Systems

neuform.ai

<https://neuform.ai>

Use for:

design-system thinking,

token structures,

component families,

visual consistency,

systematic UI decisions.

Prefer this category when the user asks for something that must scale across multiple surfaces rather than a one-off screen.

UI Components

typeui.sh

<https://typeui.sh>

Primary use:

component structure,

interaction patterns,

product UI.

Web Design

aura.build

<https://aura.build>

Use for:

full web experiences,

marketing presentation,

visual composition,

modern landing-page direction,

visual storytelling.

How Agents Should Use References

1. Start from the task, not from the gallery

Bad:

“I found a cool bento layout, so I used it.”

Better:

“The user needs six capabilities compared at a glance. A bento structure fits that information model, so I used bentogrids.com as layout inspiration.”

The reference should solve a problem.

1. Pick a small reference set

For most tasks, use 1–3 primary references.

Example:

typeui.sh for component anatomy,

60fps.design for motion polish,

styles.refero.design for aesthetic direction.

Do not mash together ten unrelated styles.

1. Identify what is being borrowed

Before implementation, determine:

Structure — page or component anatomy

Hierarchy — what is visually dominant

Spacing — density and rhythm

Typography — scale and emphasis

Surface treatment — borders, depth, elevation, transparency

Color behavior — accent usage and contrast

Motion — timing, easing, transitions, feedback

Interaction — hover, focus, expansion, navigation

Content strategy — CTA wording, grouping, progressive disclosure

Borrow selectively.

1. Adapt to the existing product

Never let an inspiration source erase the product's existing identity.

Before introducing a new visual pattern, inspect:

existing tokens,

typography,

border radii,

shadows,

spacing,

icons,

motion language,

navigation conventions,

light/dark behavior,

accessibility behavior.

A reference is a direction, not a replacement design system.

1. Avoid “AI design soup”

Common failure mode:

glassmorphism,

huge gradients,

bento cards,

floating blobs,

random glow,

oversized text,

animated everything,

pill-shaped controls everywhere.

These elements are not inherently premium.

Use them only when they serve the task and match the chosen direction.

Required Design Brief

For non-trivial UI work, agents should establish this short brief before implementation.

## Design Brief

Primary priority:
Secondary priority:

User / audience:
Surface:
Main task the user must complete:

Desired feeling:

- [ ] Calm
- [ ] Premium
- [ ] Friendly
- [ ] Technical
- [ ] Playful
- [ ] Minimal
- [ ] Dense / professional
- [ ] Editorial
- [ ] Other:

Reference sources:
1.
2.
3.

What we are borrowing:

- Structure:
- Visual language:
- Interaction:
- Motion:

Existing product constraints:

- Design system:
- Accessibility:
- Responsive behavior:
- Technical constraints:

What we explicitly do NOT want
-

This can be lightweight. It does not need to become bureaucracy.

Implementation Expectations

Design agents should not stop at visual appearance.

They should account for:

responsive layout,

keyboard navigation,

focus states,

reduced-motion preferences,

loading states,

empty states,

errors,

disabled states,

hover states,

touch behavior,

dark/light themes when applicable,

text overflow,

localization,

realistic content,

implementation cost.

A design that only works in a screenshot is incomplete.

Motion Rules

Motion should communicate:

causality,

hierarchy,

state change,

location,

progress,

feedback.

Prefer:

subtle transitions,

short durations,

purposeful movement,

continuity between states.

Avoid:

motion for every hover,

long blocking animations,

excessive parallax,

layout shifts,

animation that obscures state,

effects that compete with the task.

Use 60fps.design and motionsites.ai as inspiration, but scale the motion intensity to the product context.

Agent Output Expectations

When presenting a significant design proposal, the agent should be able to explain:

what was prioritized,

which references influenced the work,

what specifically was borrowed,

how it was adapted to the existing product,

what tradeoffs were made.

Example:

I prioritized clarity and product consistency over visual novelty. The component structure takes inspiration from typeui.sh, while the transition behavior is closer to examples on 60fps.design. I kept the existing MichelleOS typography, tokens, spacing logic, and interaction hierarchy rather than importing the visual style wholesale.

Final Principle

References are evidence, not authority.

The right design is the one that best serves:

the user,

the task,

the product,

and the constraints.

The agent should use inspiration to make better decisions — not to avoid making decisions.
