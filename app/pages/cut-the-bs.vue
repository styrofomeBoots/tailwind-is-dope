<script setup lang="ts">
import { Icon } from "@iconify/vue";

type Point = {
  title: string;
  icon: string;
  summary: string;
  details: string[];
  example?: {
    label: string;
    bootstrap: string;
    tailwind: string;
  };
};

const points: Point[] = [
  {
    title: "Bootstrap is tightly coupled to JavaScript behaviors",
    icon: "mdi:code-braces-box",
    summary:
      "Many Bootstrap components assume JavaScript-driven structure, behavior, and lifecycle, which increases coupling and makes customization more fragile.",
    details: [
      "Bootstrap’s higher-level UI patterns often require Bootstrap JS (or equivalents) to behave correctly (collapse, dropdowns, tooltips, modals).",
      "Customizing markup or behavior frequently means either fighting the expected structure or rewriting the component behavior.",
      "Replacing pieces later is risky because your UI ends up depending on Bootstrap’s JS APIs and DOM assumptions.",
      "Tailwind keeps styling and behavior decoupled—use any JS framework or component library without being locked into Bootstrap’s patterns.",
    ],
  },
  {
    title: "Bootstrap utility classes are incomplete (and inconsistent)",
    icon: "mdi:format-list-bulleted",
    summary:
      "Bootstrap utilities cover common cases but quickly fall short when you need precise layout control or modern design tokens.",
    details: [
      "You often bounce between utilities and custom CSS because a utility you expect doesn’t exist.",
      "Many utility values are preset and limited—great for rapid prototypes, limiting for real design systems.",
      "Tailwind’s utilities are intentionally exhaustive, so you can stay in a single styling approach.",
    ],
    example: {
      label: "Width utilities (a common pain point)",
      bootstrap: "w-25  w-50  w-75  w-100",
      tailwind: "w-1/2  w-2/3  w-[320px]  w-[min(42rem,100%)]",
    },
  },
  {
    title: "Bootstrap’s reset (Reboot) is heavy, hidden, and hard to undo",
    icon: "mdi:undo-variant",
    summary:
      "Bootstrap modifies a large range of default element styles, often using specificity and !important patterns that make overrides annoying.",
    details: [
      "Many defaults are changed globally, which can surprise you when integrating other libraries or existing styles.",
      "Overrides can require more specificity or additional !important, which leads to a brittle CSS cascade.",
      "Tailwind’s base layer is explicit and easier to reason about (and can be configured/disabled as needed).",
      "Tailwind also encourages designing with tokens and utilities instead of repeatedly overriding global element rules.",
    ],
  },
  {
    title:
      "Bootstrap is opinionated and harder to integrate with other libraries",
    icon: "mdi:puzzle-outline",
    summary:
      "Because Bootstrap styles so much globally and ships large component styling, it often clashes with third-party UI libraries and custom designs.",
    details: [
      "Global styles and component defaults frequently collide with other UI kits, widgets, editors, and component libraries.",
      "You may need significant override CSS or theme rebuilds to make multiple libraries look consistent.",
      "Tailwind is “opt-in” at the class level: it doesn’t force a component look unless you apply it.",
      "This makes mixing libraries and building custom components far less painful.",
    ],
  },
  {
    title: "Tailwind scales into a real design system more cleanly",
    icon: "mdi:palette-swatch",
    summary:
      "Tailwind is built around design tokens and configuration, which makes it a better foundation for long-term consistency across apps.",
    details: [
      "You can define spacing, typography, breakpoints, and colors once and apply them everywhere.",
      "Teams can build consistent UI primitives without inventing new CSS for every component.",
      "Tailwind’s approach reduces “random CSS” and keeps styling close to the markup that uses it.",
      "When combined with component wrappers (like your own UI kit), it becomes very maintainable.",
    ],
  },
];

const comparisons = [
  {
    title: "Customization",
    bootstrap:
      "Override global styles, fight specificity, theme variables help but still cascade-heavy",
    tailwind:
      "Configure tokens once, compose utilities locally, minimal overrides",
  },
  {
    title: "Precision",
    bootstrap: "Utilities cover common cases; frequent fallbacks to custom CSS",
    tailwind: "Exhaustive utility set + arbitrary values for exact control",
  },
  {
    title: "Integration",
    bootstrap: "Opinionated global styling; clashes are common",
    tailwind: "Styles only apply where used; easier to mix libraries",
  },
  {
    title: "JS coupling",
    bootstrap: "Many components assume Bootstrap JS or DOM structure",
    tailwind: "No JS assumptions; choose your own component behavior",
  },
  {
    title: "Maintainability",
    bootstrap: "Overrides accumulate; changes can ripple across the app",
    tailwind:
      "Local composition; refactors are less likely to break unrelated UI",
  },
] as const;
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <HeroCard>
      <template #left>
        <div class="space-y-3">
          <div class="flex items-start gap-4">
            <div
              class="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-base-300/60"
            >
              <Icon icon="mdi:tailwind" class="size-6" />
            </div>

            <div class="space-y-1">
              <h1 class="text-3xl font-extrabold tracking-tight md:text-4xl">
                Why Tailwind is a better alternative than Bootstrap
              </h1>
              <p class="max-w-3xl text-base text-base-content/70">
                Bootstrap is great for quick defaults, but it becomes harder to
                customize and maintain as your UI evolves. Tailwind keeps
                styling flexible, composable, and design-system friendly—without
                being tied to a framework’s opinionated components.
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <div class="badge badge-primary badge-outline gap-2 py-3">
              <Icon icon="mdi:scale-balance" class="size-4" />
              Flexibility
            </div>
            <div class="badge badge-secondary badge-outline gap-2 py-3">
              <Icon icon="mdi:toolbox-outline" class="size-4" />
              Maintainability
            </div>
            <div class="badge badge-accent badge-outline gap-2 py-3">
              <Icon icon="mdi:puzzle-outline" class="size-4" />
              Integration
            </div>
            <div class="badge badge-info badge-outline gap-2 py-3">
              <Icon icon="mdi:palette-swatch" class="size-4" />
              Design Systems
            </div>
          </div>
        </div>
      </template>

      <template #right>
        <div
          class="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="card-body gap-3 p-5">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:lightbulb-outline" class="size-5 text-primary" />
              <div class="text-sm font-semibold">Short version</div>
            </div>

            <ul class="space-y-2 text-sm text-base-content/75">
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:chevron-right"
                  class="mt-0.5 size-4 text-primary"
                />
                <span>
                  Tailwind is <b>utility-complete</b> and supports precise
                  layout control.
                </span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:chevron-right"
                  class="mt-0.5 size-4 text-primary"
                />
                <span>
                  It avoids <b>heavy global resets</b> and reduces override
                  battles.
                </span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:chevron-right"
                  class="mt-0.5 size-4 text-primary"
                />
                <span>
                  It’s <b>not tied to JS behaviors</b>—use any component library
                  you want.
                </span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:chevron-right"
                  class="mt-0.5 size-4 text-primary"
                />
                <span>
                  It scales cleanly into a <b>real design system</b>.
                </span>
              </li>
            </ul>

            <div class="text-xs text-base-content/60">
              If you’ve ever spent a day undoing Bootstrap defaults, this page
              is for you.
            </div>
          </div>
        </div>
      </template>

      <!-- Default slot content (below the top row) -->
      <div class="rounded-2xl border border-base-300 bg-base-100 p-5">
        <div class="mb-3 flex items-center gap-2">
          <Icon icon="mdi:compare" class="size-5 text-secondary" />
          <div class="font-semibold">
            Bootstrap vs Tailwind (practical differences)
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th class="w-[180px]">Area</th>
                <th>Bootstrap</th>
                <th>Tailwind</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparisons" :key="row.title">
                <td class="font-semibold">{{ row.title }}</td>
                <td class="text-sm text-base-content/70">
                  {{ row.bootstrap }}
                </td>
                <td class="text-sm text-base-content/70">
                  {{ row.tailwind }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </HeroCard>

    <!-- MAIN POINTS -->
    <section class="grid grid-cols-1 gap-6">
      <div
        v-for="p in points"
        :key="p.title"
        class="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="card-body gap-4">
          <div class="flex items-start gap-4">
            <div
              class="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-base-300/60"
            >
              <Icon :icon="p.icon" class="size-6" />
            </div>

            <div class="min-w-0 space-y-1">
              <h2 class="text-lg font-bold">{{ p.title }}</h2>
              <p class="text-sm text-base-content/70">{{ p.summary }}</p>
            </div>
          </div>

          <ul class="space-y-2 text-sm text-base-content/75">
            <li v-for="d in p.details" :key="d" class="flex items-start gap-2">
              <Icon
                icon="mdi:chevron-right"
                class="mt-0.5 size-4 text-primary"
              />
              <span>{{ d }}</span>
            </li>
          </ul>

          <div
            v-if="p.example"
            class="rounded-2xl border border-base-300 bg-base-200/50 p-4"
          >
            <div class="mb-2 flex items-center justify-between">
              <div class="text-sm font-semibold">{{ p.example.label }}</div>
              <div class="badge badge-secondary badge-outline">Example</div>
            </div>

            <div class="grid gap-3 md:grid-cols-2">
              <div class="rounded-xl bg-base-100 p-3 ring-1 ring-base-300/60">
                <div class="mb-1 text-xs font-semibold text-base-content/60">
                  Bootstrap
                </div>
                <code class="text-sm">{{ p.example.bootstrap }}</code>
              </div>

              <div class="rounded-xl bg-base-100 p-3 ring-1 ring-base-300/60">
                <div class="mb-1 text-xs font-semibold text-base-content/60">
                  Tailwind
                </div>
                <code class="text-sm">{{ p.example.tailwind }}</code>
              </div>
            </div>
          </div>

          <div class="pt-1 text-xs text-base-content/60">
            Practical takeaway: Tailwind reduces “override work” and makes UI
            changes safer.
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER / NOTES -->
    <section class="card border border-base-300 bg-base-100 shadow-sm">
      <div class="card-body space-y-4">
        <div class="flex items-center gap-3">
          <div
            class="rounded-2xl bg-secondary/10 p-3 text-secondary ring-1 ring-base-300/60"
          >
            <Icon icon="mdi:note-text-outline" class="size-6" />
          </div>
          <div>
            <h2 class="text-lg font-bold">Notes for teams migrating</h2>
            <p class="text-sm text-base-content/60">
              If you’re already deep in Bootstrap, this is the lowest-risk way
              to move.
            </p>
          </div>
        </div>

        <ul class="space-y-2 text-sm text-base-content/75">
          <li class="flex items-start gap-2">
            <Icon
              icon="mdi:chevron-right"
              class="mt-0.5 size-4 text-secondary"
            />
            <span>
              Start by adopting Tailwind for new screens/components rather than
              rewriting everything.
            </span>
          </li>
          <li class="flex items-start gap-2">
            <Icon
              icon="mdi:chevron-right"
              class="mt-0.5 size-4 text-secondary"
            />
            <span>
              Build a small internal component set (buttons, cards, inputs)
              using Tailwind tokens.
            </span>
          </li>
          <li class="flex items-start gap-2">
            <Icon
              icon="mdi:chevron-right"
              class="mt-0.5 size-4 text-secondary"
            />
            <span>
              Keep third-party widget styles isolated—Tailwind plays nicer with
              mixed ecosystems.
            </span>
          </li>
        </ul>

        <div class="rounded-2xl border border-info/25 bg-info/5 p-4">
          <div class="flex items-start gap-3">
            <div
              class="rounded-2xl bg-info/15 p-3 text-info ring-1 ring-base-300/60"
            >
              <Icon icon="mdi:information-outline" class="size-6" />
            </div>
            <div class="space-y-1">
              <div class="font-semibold">Key idea</div>
              <p class="text-sm text-base-content/70">
                Bootstrap gives you a look. Tailwind gives you a system. If your
                product needs to evolve, Tailwind tends to stay out of your way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
