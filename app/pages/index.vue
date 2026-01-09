<script setup lang="ts">
import { Icon } from "@iconify/vue";

type Card = {
  title: string;
  desc: string;
  icon: string;
  to?: string;
  badge?: string;
  accentClass: string;
  iconWrapClass: string;
};

const fundamentals: Card[] = [
  {
    title: "Utility-first mindset",
    desc: "Compose styles in markup, avoid naming wars, ship faster with consistent primitives.",
    icon: "mdi:format-color-fill",
    accentClass: "border-accent/30 bg-accent/5",
    iconWrapClass: "bg-accent/15 text-accent",
  },
  {
    title: "Design tokens via theme",
    desc: "Use theme values (colors, spacing, fonts) to keep everything consistent and scalable.",
    icon: "mdi:palette-outline",
    accentClass: "border-primary/30 bg-primary/5",
    iconWrapClass: "bg-primary/15 text-primary",
  },
  {
    title: "Mobile-first responsive",
    desc: "Start small then layer breakpoints: sm:, md:, lg:, xl:, 2xl:.",
    icon: "mdi:cellphone",
    accentClass: "border-secondary/30 bg-secondary/5",
    iconWrapClass: "bg-secondary/15 text-secondary",
  },
  {
    title: "State variants",
    desc: "hover:, focus:, active:, disabled:, group-hover:, peer-checked:.",
    icon: "mdi:toggle-switch-outline",
    accentClass: "border-info/30 bg-info/5",
    iconWrapClass: "bg-info/15 text-info",
  },
  {
    title: "Layout = flex + grid",
    desc: "Most UI is flexbox and grid. Learn gap, alignment, and responsive columns.",
    icon: "mdi:view-grid-outline",
    accentClass: "border-success/30 bg-success/5",
    iconWrapClass: "bg-success/15 text-success",
  },
  {
    title: "Typography & rhythm",
    desc: "Use text sizes, leading, tracking, and consistent spacing for clean hierarchy.",
    icon: "mdi:format-size",
    accentClass: "border-warning/30 bg-warning/5",
    iconWrapClass: "bg-warning/15 text-warning",
  },
];

const proMoves: Card[] = [
  {
    title: "Arbitrary values",
    desc: "Bracket syntax: w-[37rem], bg-[#0ea5e9], grid-cols-[1fr_280px].",
    icon: "mdi:code-tags",
    accentClass: "border-info/30 bg-info/5",
    iconWrapClass: "bg-info/15 text-info",
  },
  {
    title: "Composition over repetition",
    desc: "Extract repeated class strings into components; use @apply sparingly.",
    icon: "mdi:layers-outline",
    accentClass: "border-primary/30 bg-primary/5",
    iconWrapClass: "bg-primary/15 text-primary",
  },
  {
    title: "Dark mode strategy",
    desc: "Prefer explicit toggles for apps; keep tokens semantic so swaps are easy.",
    icon: "mdi:weather-night",
    accentClass: "border-secondary/30 bg-secondary/5",
    iconWrapClass: "bg-secondary/15 text-secondary",
  },
  {
    title: "Accessibility basics",
    desc: "Focus rings, contrast, target size, keyboard states. Don’t kill outlines.",
    icon: "mdi:human-wheelchair",
    accentClass: "border-success/30 bg-success/5",
    iconWrapClass: "bg-success/15 text-success",
  },
];

const commonPatterns: Card[] = [
  {
    title: "Cards",
    desc: "bg-base-100 + shadow + rounded + border + spacing = instant UI.",
    icon: "mdi:card-outline",
    accentClass: "border-primary/30 bg-primary/5",
    iconWrapClass: "bg-primary/15 text-primary",
  },
  {
    title: "Buttons",
    desc: "Variants + sizes + disabled + loading state = consistent system.",
    icon: "mdi:gesture-tap-button",
    accentClass: "border-secondary/30 bg-secondary/5",
    iconWrapClass: "bg-secondary/15 text-secondary",
  },
  {
    title: "Forms",
    desc: "Spacing, validation, and focus styles make forms feel premium.",
    icon: "mdi:form-textbox",
    accentClass: "border-info/30 bg-info/5",
    iconWrapClass: "bg-info/15 text-info",
  },
  {
    title: "Navigation",
    desc: "Drawer + navbar + active link styles = app shell done right.",
    icon: "mdi:menu-open",
    accentClass: "border-success/30 bg-success/5",
    iconWrapClass: "bg-success/15 text-success",
  },
];

const gotchas: Card[] = [
  {
    title: "Don’t fight the scale",
    desc: "Use spacing scale (p-4, gap-3) before custom values.",
    icon: "mdi:alert-circle-outline",
    accentClass: "border-warning/30 bg-warning/5",
    iconWrapClass: "bg-warning/15 text-warning",
  },
  {
    title: "Avoid class soup",
    desc: "If a block has 30+ classes, extract a component or wrapper.",
    icon: "mdi:broom",
    accentClass: "border-error/30 bg-error/5",
    iconWrapClass: "bg-error/15 text-error",
  },
  {
    title: "Arbitrary colors sparingly",
    desc: "Theme colors keep consistency; customs should be rare.",
    icon: "mdi:water-outline",
    accentClass: "border-secondary/30 bg-secondary/5",
    iconWrapClass: "bg-secondary/15 text-secondary",
  },
  {
    title: "Responsive too early",
    desc: "Build mobile layout first, then enhance at breakpoints.",
    icon: "mdi:arrow-expand",
    accentClass: "border-info/30 bg-info/5",
    iconWrapClass: "bg-info/15 text-info",
  },
];

function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<template>
  <div class="max-w-6xl space-y-8 mx-auto">
    <!-- HERO -->
    <section
      class="relative overflow-hidden rounded-2xl border bg-base-100/80 backdrop-blur shadow-sm"
    >
      <!-- soft color blobs -->
      <div
        class="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        class="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full bg-secondary/15 blur-3xl"
      />
      <div
        class="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <!-- subtle border glow -->
      <div
        class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-base-300/60"
      />

      <div class="relative p-6 md:p-8">
        <div
          class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="space-y-5">
            <div class="flex items-center gap-4">
              <div
                class="rounded-2xl bg-base-200/70 p-3 shadow-sm ring-1 ring-base-300/70"
              >
                <Icon icon="mdi:tailwind" class="size-8" />
              </div>

              <div class="space-y-1">
                <h1 class="text-3xl font-extrabold tracking-tight md:text-4xl">
                  Tailwind: the important stuff
                </h1>
                <p class="max-w-2xl text-base text-base-content/70">
                  Utility-first, but make it clean: consistent scale, sharp
                  layout, and fast iteration.
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                class="btn btn-primary shadow-sm"
                type="button"
                @click="scrollToId('fundamentals')"
              >
                <Icon icon="mdi:rocket-launch-outline" class="size-5" />
                Fundamentals
              </button>

              <button
                class="btn btn-secondary shadow-sm"
                type="button"
                @click="scrollToId('pro-moves')"
              >
                <Icon icon="mdi:star-four-points-outline" class="size-5" />
                Pro moves
              </button>

              <button
                class="btn btn-accent shadow-sm"
                type="button"
                @click="scrollToId('gotchas')"
              >
                <Icon icon="mdi:alert-outline" class="size-5" />
                Gotchas
              </button>

              <NuxtLink to="/gradient" class="btn btn-ghost">
                <Icon icon="mdi:gradient-horizontal" class="size-5" />
                Gradients
              </NuxtLink>

              <NuxtLink to="/rem-vs-px" class="btn btn-ghost">
                <Icon icon="mdi:ruler-square-compass" class="size-5" />
                rem vs px
              </NuxtLink>
            </div>
          </div>

          <div class="grid gap-3 sm:grid-cols-3">
            <div
              class="card border border-primary/25 bg-primary/5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="card-body p-4">
                <div class="flex items-center gap-2">
                  <Icon
                    icon="mdi:view-grid-outline"
                    class="size-5 text-primary"
                  />
                  <div class="text-sm font-semibold">Layouts</div>
                </div>
                <div class="text-sm text-base-content/70">
                  Flex + Grid run everything
                </div>
              </div>
            </div>

            <div
              class="card border border-secondary/25 bg-secondary/5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="card-body p-4">
                <div class="flex items-center gap-2">
                  <Icon
                    icon="mdi:scale-balance"
                    class="size-5 text-secondary"
                  />
                  <div class="text-sm font-semibold">Consistency</div>
                </div>
                <div class="text-sm text-base-content/70">
                  Use the spacing scale
                </div>
              </div>
            </div>

            <div
              class="card border border-accent/25 bg-accent/5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="card-body p-4">
                <div class="flex items-center gap-2">
                  <Icon
                    icon="mdi:toggle-switch-outline"
                    class="size-5 text-accent"
                  />
                  <div class="text-sm font-semibold">Variants</div>
                </div>
                <div class="text-sm text-base-content/70">
                  State + responsive power
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FUNDAMENTALS -->
    <section id="fundamentals" class="space-y-5">
      <div class="flex items-center gap-3">
        <div class="h-10 w-1 rounded-full bg-secondary/60" />
        <div>
          <h2 class="text-xl font-bold">Fundamentals that matter</h2>
          <p class="text-sm text-base-content/60">
            The stuff you build everything on.
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="card in fundamentals"
          :key="card.title"
          class="card border bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          :class="card.accentClass"
        >
          <div class="card-body">
            <div class="flex items-center gap-3">
              <div
                class="rounded-2xl p-3 ring-1 ring-base-300/60"
                :class="card.iconWrapClass"
              >
                <Icon :icon="card.icon" class="size-6" />
              </div>
              <h3 class="card-title text-base">{{ card.title }}</h3>
            </div>
            <p class="text-sm text-base-content/70">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRO MOVES -->
    <section id="pro-moves" class="space-y-5">
      <div class="flex items-center gap-3">
        <div class="h-10 w-1 rounded-full bg-accent/60" />
        <div>
          <h2 class="text-xl font-bold">Pro moves</h2>
          <p class="text-sm text-base-content/60">
            Higher leverage patterns and tricks.
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="card in proMoves"
          :key="card.title"
          class="card border bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          :class="card.accentClass"
        >
          <div class="card-body">
            <div class="flex items-center gap-3">
              <div
                class="rounded-2xl p-3 ring-1 ring-base-300/60"
                :class="card.iconWrapClass"
              >
                <Icon :icon="card.icon" class="size-6" />
              </div>
              <h3 class="card-title text-base">{{ card.title }}</h3>
            </div>
            <p class="text-sm text-base-content/70">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- COMMON PATTERNS -->
    <section class="space-y-5">
      <div class="flex items-center gap-3">
        <div class="h-10 w-1 rounded-full bg-primary/60" />
        <div>
          <h2 class="text-xl font-bold">Common UI patterns</h2>
          <p class="text-sm text-base-content/60">
            Fast defaults that always look good.
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="card in commonPatterns"
          :key="card.title"
          class="card border bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          :class="card.accentClass"
        >
          <div class="card-body">
            <div class="flex items-center gap-3">
              <div
                class="rounded-2xl p-3 ring-1 ring-base-300/60"
                :class="card.iconWrapClass"
              >
                <Icon :icon="card.icon" class="size-6" />
              </div>
              <h3 class="card-title text-base">{{ card.title }}</h3>
            </div>
            <p class="text-sm text-base-content/70">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- GOTCHAS -->
    <section id="gotchas" class="space-y-5">
      <div class="flex items-center gap-3">
        <div class="h-10 w-1 rounded-full bg-warning/60" />
        <div>
          <h2 class="text-xl font-bold">Gotchas (avoid these)</h2>
          <p class="text-sm text-base-content/60">
            Most common ways people make Tailwind feel messy.
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="card in gotchas"
          :key="card.title"
          class="card border bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          :class="card.accentClass"
        >
          <div class="card-body">
            <div class="flex items-center gap-3">
              <div
                class="rounded-2xl p-3 ring-1 ring-base-300/60"
                :class="card.iconWrapClass"
              >
                <Icon :icon="card.icon" class="size-6" />
              </div>
              <h3 class="card-title text-base">{{ card.title }}</h3>
            </div>
            <p class="text-sm text-base-content/70">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
