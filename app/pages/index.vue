<script setup lang="ts">
import { Icon } from "@iconify/vue";

type Pill = {
  label: string;
  icon: string;
  tone: "primary" | "secondary" | "accent" | "info" | "success" | "warning";
};

type Feature = {
  title: string;
  desc: string;
  icon: string;
  bullets: string[];
  tone: "primary" | "secondary" | "accent" | "info" | "success" | "warning";
};

type MiniCard = {
  title: string;
  desc: string;
  icon: string;
  tone: "primary" | "secondary" | "accent" | "info" | "success" | "warning";
};

type PatternCard = {
  title: string;
  icon: string;
  tailwind: string;
  why: string;
  tone: "primary" | "secondary" | "accent" | "info" | "success" | "warning";
};

type Gotcha = {
  title: string;
  desc: string;
  fix: string;
  icon: string;
  tone: "warning" | "info" | "success" | "accent";
};

const pills: Pill[] = [
  { label: "Utility-first", icon: "mdi:view-grid-outline", tone: "primary" },
  { label: "Design tokens", icon: "mdi:palette-outline", tone: "secondary" },
  { label: "Responsive", icon: "mdi:cellphone", tone: "accent" },
  { label: "Variants", icon: "mdi:toggle-switch-outline", tone: "info" },
  { label: "Composable", icon: "mdi:layers-outline", tone: "success" },
];

const features: Feature[] = [
  {
    title: "Tailwind is a utility-first CSS framework",
    desc: "Instead of shipping pre-styled components, Tailwind gives you low-level building blocks (layout, spacing, typography, color) that you compose into your own UI.",
    icon: "mdi:tailwind",
    tone: "primary",
    bullets: [
      "You build components by combining small, predictable classes.",
      "No naming wars (no `.btn-primary-alt-2`), fewer one-off CSS files.",
      "You control the look—Tailwind doesn’t impose one.",
      "The UI stays consistent because utilities share the same scale.",
    ],
  },
  {
    title: "Tailwind is driven by tokens (your theme)",
    desc: "Spacing, colors, type, shadows, radii, and breakpoints come from a shared scale so your product UI behaves like a system.",
    icon: "mdi:palette-swatch-outline",
    tone: "secondary",
    bullets: [
      "Define brand colors and semantic tokens once.",
      "Use the spacing/type scales everywhere for consistent rhythm.",
      "Make global design changes without chasing dozens of selectors.",
      "Creates alignment between design + code (shared vocabulary).",
    ],
  },
  {
    title: "Responsive and state styles are part of the API",
    desc: "Tailwind bakes responsive and state variants into the class syntax so you don’t write separate CSS for common patterns.",
    icon: "mdi:responsive",
    tone: "accent",
    bullets: [
      "Mobile-first: base styles apply to small screens first.",
      "Layer up with `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.",
      "State variants: `hover:`, `focus:`, `active:`, `disabled:`.",
      "Context variants: `group-hover:`, `peer-checked:`.",
    ],
  },
  {
    title: "Tailwind is precise without fighting the cascade",
    desc: "The utility set is intentionally exhaustive—and when you need exact values, arbitrary values are first-class.",
    icon: "mdi:crosshairs-gps",
    tone: "info",
    bullets: [
      "Most layout work stays inside the markup instead of CSS overrides.",
      "Use arbitrary values for edge cases: `w-[37rem]`, `grid-cols-[1fr_280px]`.",
      "No surprise global component styling leaking into your page.",
      "Your CSS stays smaller because you write less custom CSS.",
    ],
  },
  {
    title: "Tailwind scales best with components (not overrides)",
    desc: "Tailwind isn’t “no components.” It’s “build your own primitives” so your team has consistent building blocks.",
    icon: "mdi:cube-outline",
    tone: "success",
    bullets: [
      "Extract repeated class strings into components (Button, Card, Input).",
      "Keep Tailwind classes close to where they’re used.",
      "Refactors become safer because styles are local and explicit.",
      "Less override debt compared to global CSS frameworks.",
    ],
  },
];

const mentalModel: MiniCard[] = [
  {
    title: "Tokens",
    desc: "Theme scales define the system.",
    icon: "mdi:tune-vertical",
    tone: "secondary",
  },
  {
    title: "Utilities",
    desc: "Compose UI from primitives.",
    icon: "mdi:view-grid-outline",
    tone: "primary",
  },
  {
    title: "Variants",
    desc: "States + breakpoints built-in.",
    icon: "mdi:toggle-switch-outline",
    tone: "info",
  },
];

const patterns: PatternCard[] = [
  {
    title: "Layout",
    icon: "mdi:view-dashboard-outline",
    tailwind: "flex gap-4 items-center justify-between",
    why: "Most UI is flex + grid. Learn these and Tailwind becomes fast.",
    tone: "primary",
  },
  {
    title: "Spacing + rhythm",
    icon: "mdi:arrow-expand-all",
    tailwind: "p-6 space-y-4 gap-3",
    why: "Use the scale instead of random numbers to keep consistency.",
    tone: "secondary",
  },
  {
    title: "Typography",
    icon: "mdi:format-size",
    tailwind: "text-sm text-base-content/70 leading-6",
    why: "Hierarchy is mostly type + spacing, not fancy CSS tricks.",
    tone: "accent",
  },
  {
    title: "Responsive",
    icon: "mdi:cellphone",
    tailwind: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    why: "Build mobile first, then layer up at breakpoints.",
    tone: "info",
  },
  {
    title: "States",
    icon: "mdi:cursor-default-click-outline",
    tailwind: "hover:shadow-md focus:ring-2 active:scale-[0.99]",
    why: "Variants keep interaction states consistent across the app.",
    tone: "success",
  },
  {
    title: "Arbitrary values",
    icon: "mdi:code-tags",
    tailwind: "w-[min(42rem,100%)] grid-cols-[1fr_280px]",
    why: "Escape hatch for real-world UI without custom CSS files.",
    tone: "warning",
  },
];

const gotchas: Gotcha[] = [
  {
    title: "Class soup",
    desc: "If a block has too many utilities, it becomes hard to scan and reuse.",
    fix: "Extract a component (or a wrapper) and pass variants as props.",
    icon: "mdi:broom",
    tone: "warning",
  },
  {
    title: "Ignoring the scale",
    desc: "Using random values too early breaks consistency and increases one-offs.",
    fix: "Start with the spacing/type scale; use arbitrary values only when needed.",
    icon: "mdi:scale-balance",
    tone: "info",
  },
  {
    title: "Killing focus styles",
    desc: "Removing outlines makes keyboard navigation and accessibility worse.",
    fix: "Use deliberate focus rings (`focus:ring`, `focus-visible:`) instead.",
    icon: "mdi:keyboard-outline",
    tone: "success",
  },
  {
    title: "Responsive too early",
    desc: "If you add breakpoints before a solid mobile layout, the UI gets messy fast.",
    fix: "Build the base layout first, then enhance at `md:` and up.",
    icon: "mdi:arrow-expand",
    tone: "accent",
  },
];

function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const toneToAccent: Record<Pill["tone"], string> = {
  primary: "border-primary/30 bg-primary/5",
  secondary: "border-secondary/30 bg-secondary/5",
  accent: "border-accent/30 bg-accent/5",
  info: "border-info/30 bg-info/5",
  success: "border-success/30 bg-success/5",
  warning: "border-warning/30 bg-warning/5",
};

const toneToIconWrap: Record<Pill["tone"], string> = {
  primary: "bg-primary/15 text-primary",
  secondary: "bg-secondary/15 text-secondary",
  accent: "bg-accent/15 text-accent",
  info: "bg-info/15 text-info",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
};
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <HeroCard>
      <template #left>
        <div class="space-y-4">
          <div class="flex items-start gap-4">
            <div
              class="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-base-300/60"
            >
              <Icon icon="mdi:tailwind" class="size-6" />
            </div>

            <div class="space-y-2">
              <h1 class="text-3xl font-extrabold tracking-tight md:text-4xl">
                What Tailwind is (and why it works)
              </h1>
              <p class="max-w-3xl text-base text-base-content/70">
                Tailwind CSS is a utility-first framework: instead of shipping
                pre-styled components, it gives you low-level building blocks
                (spacing, layout, typography, color) that you compose into your
                own design system.
              </p>
              <p class="max-w-3xl text-sm text-base-content/60">
                Think: <b>design tokens + utilities + variants</b>. You get
                control, consistency, and speed—without fighting global resets
                or framework opinions.
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <div
              v-for="p in pills"
              :key="p.label"
              class="badge badge-outline gap-2 py-3"
              :class="
                p.tone === 'primary'
                  ? 'badge-primary'
                  : p.tone === 'secondary'
                  ? 'badge-secondary'
                  : p.tone === 'accent'
                  ? 'badge-accent'
                  : p.tone === 'info'
                  ? 'badge-info'
                  : p.tone === 'success'
                  ? 'badge-success'
                  : 'badge-warning'
              "
            >
              <Icon :icon="p.icon" class="size-4" />
              {{ p.label }}
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              class="btn btn-primary shadow-sm"
              type="button"
              @click="scrollToId('how-it-works')"
            >
              <Icon icon="mdi:rocket-launch-outline" class="size-5" />
              How it works
            </button>

            <button
              class="btn btn-secondary shadow-sm"
              type="button"
              @click="scrollToId('patterns')"
            >
              <Icon icon="mdi:view-grid-outline" class="size-5" />
              Common patterns
            </button>

            <button
              class="btn btn-accent shadow-sm"
              type="button"
              @click="scrollToId('gotchas')"
            >
              <Icon icon="mdi:alert-outline" class="size-5" />
              Gotchas
            </button>
          </div>
        </div>
      </template>

      <template #right>
        <!-- Quick definition card -->
        <div
          class="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="card-body gap-4 p-5">
            <div class="flex items-center gap-2">
              <Icon
                icon="mdi:information-outline"
                class="size-5 text-primary"
              />
              <div class="text-sm font-semibold">In one sentence</div>
            </div>

            <div class="rounded-2xl border bg-base-200/50 p-4">
              <p class="text-sm text-base-content/80">
                Tailwind is a <b>utility-first</b> CSS framework that helps you
                build UI using <b>composable classes</b> powered by a shared
                <b>theme scale</b>, with responsive and state styles built in.
              </p>
            </div>

            <div class="text-xs text-base-content/60">
              It’s not “no CSS.” It’s “less custom CSS, more predictable
              composition.”
            </div>
          </div>
        </div>
      </template>

      <!-- Default slot content (below the top row) -->
      <section class="card border border-base-300 bg-base-100 shadow-sm">
        <div class="card-body space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="rounded-2xl bg-secondary/10 p-3 text-secondary ring-1 ring-base-300/60"
            >
              <Icon icon="mdi:brain" class="size-6" />
            </div>
            <div>
              <h2 class="text-lg font-bold">Tailwind mental model</h2>
              <p class="text-sm text-base-content/60">
                This is the whole framework.
              </p>
            </div>
          </div>

          <div class="grid gap-3 md:grid-cols-3">
            <div
              v-for="m in mentalModel"
              :key="m.title"
              class="rounded-2xl border bg-base-200/40 p-4"
              :class="toneToAccent[m.tone]"
            >
              <div class="flex items-center gap-3">
                <div
                  class="rounded-2xl p-3 ring-1 ring-base-300/60"
                  :class="toneToIconWrap[m.tone]"
                >
                  <Icon :icon="m.icon" class="size-6" />
                </div>
                <div class="min-w-0">
                  <div class="font-semibold">{{ m.title }}</div>
                  <div class="text-sm text-base-content/70">
                    {{ m.desc }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-info/25 bg-info/5 p-4">
            <div class="flex items-start gap-3">
              <div
                class="rounded-2xl bg-info/15 p-3 text-info ring-1 ring-base-300/60"
              >
                <Icon icon="mdi:lightbulb-outline" class="size-6" />
              </div>
              <div class="space-y-1">
                <div class="font-semibold">Key idea</div>
                <p class="text-sm text-base-content/70">
                  Tailwind doesn’t give you “a look.” It gives you a
                  <b>system</b>
                  that makes your own look easy to build and maintain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HeroCard>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="space-y-5">
      <div class="flex items-center gap-3">
        <div class="h-10 w-1 rounded-full bg-primary/60" />
        <div>
          <h2 class="text-xl font-bold">How Tailwind works</h2>
          <p class="text-sm text-base-content/60">
            The core traits that make it different.
          </p>
        </div>
      </div>

      <div class="grid gap-6">
        <div
          v-for="f in features"
          :key="f.title"
          class="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          :class="toneToAccent[f.tone]"
        >
          <div class="card-body gap-4">
            <div class="flex items-start gap-4">
              <div
                class="rounded-2xl p-3 ring-1 ring-base-300/60"
                :class="toneToIconWrap[f.tone]"
              >
                <Icon :icon="f.icon" class="size-7" />
              </div>

              <div class="min-w-0 space-y-1">
                <h3 class="text-lg font-bold">{{ f.title }}</h3>
                <p class="text-sm text-base-content/70">
                  {{ f.desc }}
                </p>
              </div>
            </div>

            <ul class="space-y-2 text-sm text-base-content/75">
              <li
                v-for="b in f.bullets"
                :key="b"
                class="flex items-start gap-2"
              >
                <Icon
                  icon="mdi:chevron-right"
                  class="mt-0.5 size-4 text-primary"
                />
                <span>{{ b }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- COMMON PATTERNS -->
    <section id="patterns" class="space-y-5">
      <div class="flex items-center gap-3">
        <div class="h-10 w-1 rounded-full bg-secondary/60" />
        <div>
          <h2 class="text-xl font-bold">Common Tailwind patterns</h2>
          <p class="text-sm text-base-content/60">
            The mental shortcuts that make Tailwind feel fast.
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="p in patterns"
          :key="p.title"
          class="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          :class="toneToAccent[p.tone]"
        >
          <div class="card-body gap-4">
            <div class="flex items-start gap-4">
              <div
                class="rounded-2xl p-3 ring-1 ring-base-300/60"
                :class="toneToIconWrap[p.tone]"
              >
                <Icon :icon="p.icon" class="size-6" />
              </div>

              <div class="min-w-0 space-y-1">
                <div class="text-base font-bold">{{ p.title }}</div>
                <p class="text-sm text-base-content/70">{{ p.why }}</p>
              </div>
            </div>

            <div class="rounded-2xl border bg-base-200/50 p-4">
              <div class="mb-2 flex items-center justify-between">
                <div class="text-sm font-semibold">Example</div>
                <div class="badge badge-outline">Tailwind</div>
              </div>
              <code class="text-sm">{{ p.tailwind }}</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GOTCHAS -->
    <section id="gotchas" class="space-y-5">
      <div class="flex items-center gap-3">
        <div class="h-10 w-1 rounded-full bg-warning/70" />
        <div>
          <h2 class="text-xl font-bold">Gotchas (avoid these)</h2>
          <p class="text-sm text-base-content/60">
            Mistakes that make Tailwind feel messy.
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="g in gotchas"
          :key="g.title"
          class="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          :class="toneToAccent[g.tone]"
        >
          <div class="card-body gap-3">
            <div class="flex items-start gap-3">
              <div
                class="rounded-2xl p-3 ring-1 ring-base-300/60"
                :class="toneToIconWrap[g.tone]"
              >
                <Icon :icon="g.icon" class="size-6" />
              </div>

              <div class="min-w-0 space-y-1">
                <div class="font-bold">{{ g.title }}</div>
                <div class="text-sm text-base-content/70">{{ g.desc }}</div>
              </div>
            </div>

            <div class="rounded-2xl border bg-base-200/50 p-4">
              <div class="text-xs font-semibold text-base-content/60">Fix</div>
              <div class="mt-1 text-sm text-base-content/75">{{ g.fix }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER NOTE -->
    <section class="card border border-base-300 bg-base-100 shadow-sm">
      <div class="card-body space-y-4">
        <div class="flex items-center gap-3">
          <div
            class="rounded-2xl bg-accent/10 p-3 text-accent ring-1 ring-base-300/60"
          >
            <Icon icon="mdi:flag-checkered" class="size-6" />
          </div>
          <div>
            <h2 class="text-lg font-bold">What to do next</h2>
            <p class="text-sm text-base-content/60">
              Tailwind becomes easy once you stop thinking in CSS files.
            </p>
          </div>
        </div>

        <ul class="space-y-2 text-sm text-base-content/75">
          <li class="flex items-start gap-2">
            <Icon icon="mdi:chevron-right" class="mt-0.5 size-4 text-accent" />
            <span>
              Build a small internal UI kit: Button, Card, Input, Modal.
            </span>
          </li>
          <li class="flex items-start gap-2">
            <Icon icon="mdi:chevron-right" class="mt-0.5 size-4 text-accent" />
            <span>
              Keep most styles on the component that uses them—less cascade,
              fewer surprises.
            </span>
          </li>
          <li class="flex items-start gap-2">
            <Icon icon="mdi:chevron-right" class="mt-0.5 size-4 text-accent" />
            <span>
              Use your theme scale first; use arbitrary values only when needed.
            </span>
          </li>
        </ul>

        <div class="rounded-2xl border border-primary/25 bg-primary/5 p-4">
          <div class="flex items-start gap-3">
            <div
              class="rounded-2xl bg-primary/15 p-3 text-primary ring-1 ring-base-300/60"
            >
              <Icon icon="mdi:information-outline" class="size-6" />
            </div>
            <div class="space-y-1">
              <div class="font-semibold">Bottom line</div>
              <p class="text-sm text-base-content/70">
                Tailwind is a framework for building your own consistent UI
                system using utilities. It’s best when you treat it like
                <b>tokens + composition</b>, not a replacement for thinking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
