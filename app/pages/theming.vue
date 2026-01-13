<script setup lang="ts">
import { Icon } from "@iconify/vue";
const themes: string[] = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "caramellatte",
  "abyss",
  "silk",
];

const activeTheme = ref<string | undefined>(themes[0]);
const trackEl = ref<HTMLElement | null>(null);

let onScroll: (() => void) | null = null;

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function getScrollProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const viewportH = window.innerHeight;

  const end = rect.height - viewportH;
  const traveled = -rect.top;

  if (end <= 0) return 0;
  return clamp01(traveled / end);
}

function themeFromProgress(p: number): string | undefined {
  const idx = Math.min(themes.length - 1, Math.floor(p * themes.length));
  return themes[idx];
}

type Swatch =
  | {
      type: "color";
      label: string;
      bgClass: string;
      extraClass?: string;
    }
  | {
      type: "text";
      label: string;
      text: string;
      extraClass?: string;
    };

type ThemeGroup = {
  label: string;
  colSpanClass: string;
  swatches: Swatch[];
};

const themeGroups: ThemeGroup[] = [
  {
    label: "base",
    colSpanClass: "col-span-4",
    swatches: [
      {
        type: "text",
        label: "base-100",
        text: "100",
        extraClass: "bg-base-100 text-base-content",
      },
      {
        type: "text",
        label: "base-200",
        text: "200",
        extraClass: "bg-base-200 text-base-content",
      },
      {
        type: "text",
        label: "base-300",
        text: "300",
        extraClass: "bg-base-300 text-base-content",
      },
      {
        type: "text",
        label: "base-content",
        text: "A",
        extraClass: "bg-base-300 text-base-content font-black text-2xl",
      },
    ],
  },
  {
    label: "primary",
    colSpanClass: "col-span-2",
    swatches: [
      { type: "color", label: "primary", bgClass: "bg-primary" },
      {
        type: "text",
        label: "primary-content",
        text: "A",
        extraClass: "bg-primary text-primary-content font-black text-2xl",
      },
    ],
  },
  {
    label: "secondary",
    colSpanClass: "col-span-2",
    swatches: [
      { type: "color", label: "secondary", bgClass: "bg-secondary" },
      {
        type: "text",
        label: "secondary-content",
        text: "A",
        extraClass: "bg-secondary text-secondary-content font-black text-2xl",
      },
    ],
  },
  {
    label: "accent",
    colSpanClass: "col-span-2",
    swatches: [
      { type: "color", label: "accent", bgClass: "bg-accent" },
      {
        type: "text",
        label: "accent-content",
        text: "A",
        extraClass: "bg-accent text-accent-content font-black text-2xl",
      },
    ],
  },
  {
    label: "neutral",
    colSpanClass: "col-span-2",
    swatches: [
      { type: "color", label: "neutral", bgClass: "bg-neutral" },
      {
        type: "text",
        label: "neutral-content",
        text: "A",
        extraClass: "bg-neutral text-neutral-content font-black text-2xl",
      },
    ],
  },
  {
    label: "info",
    colSpanClass: "col-span-2",
    swatches: [
      { type: "color", label: "info", bgClass: "bg-info" },
      {
        type: "text",
        label: "info-content",
        text: "A",
        extraClass: "bg-info text-info-content font-black text-2xl",
      },
    ],
  },
  {
    label: "success",
    colSpanClass: "col-span-2",
    swatches: [
      { type: "color", label: "success", bgClass: "bg-success" },
      {
        type: "text",
        label: "success-content",
        text: "A",
        extraClass: "bg-success text-success-content font-black text-2xl",
      },
    ],
  },
  {
    label: "warning",
    colSpanClass: "col-span-2",
    swatches: [
      { type: "color", label: "warning", bgClass: "bg-warning" },
      {
        type: "text",
        label: "warning-content",
        text: "A",
        extraClass: "bg-warning text-warning-content font-black text-2xl",
      },
    ],
  },
  {
    label: "error",
    colSpanClass: "col-span-2",
    swatches: [
      { type: "color", label: "error", bgClass: "bg-error" },
      {
        type: "text",
        label: "error-content",
        text: "A",
        extraClass: "bg-error text-error-content font-black text-2xl",
      },
    ],
  },
];

const showScrollHint = ref<boolean>(true);

onMounted((): void => {
  const el = trackEl.value;
  if (!el) return;

  const tick = (): void => {
    const p = getScrollProgress(el);
    activeTheme.value = themeFromProgress(p);
    showScrollHint.value = p < 0.03;
  };

  onScroll = (): void => tick();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  tick();
});

onBeforeUnmount((): void => {
  if (!onScroll) return;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});
</script>

<template>
  <div class="max-w-6xl space-y-8 mx-auto">
    <section ref="trackEl" class="relative h-[500vh]">
      <div
        class="sticky top-16 mx-auto grid w-[calc(100%-2rem)] max-w-[85rem] rounded-2xl sm:top-20"
      >
        <div
          class="col-start-1 row-start-1 flex items-start rounded-2xl"
          :data-theme="activeTheme"
        >
          <div
            class="border-base-200 flex w-full flex-wrap items-stretch justify-center gap-6 rounded-2xl border p-6 xl:flex-nowrap xl:justify-normal xl:h-[40rem] 2xl:h-[44rem]"
          >
            <!-- LEFT COLUMN (only at 2xl+) -->
            <div class="hidden flex-col gap-6 2xl:flex">
              <div class="flex gap-6">
                <!-- icon rail -->
                <div class="rounded-box bg-base-200 h-full">
                  <ul class="menu">
                    <li class="menu-title">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </li>

                    <li>
                      <button
                        tabindex="-1"
                        class="active"
                        aria-label="demo icon"
                      >
                        📈
                      </button>
                    </li>
                    <li><button tabindex="-1">❤️</button></li>
                    <li><button tabindex="-1">💬</button></li>
                    <li><button tabindex="-1">👤</button></li>
                    <li><button tabindex="-1">📦</button></li>
                  </ul>
                </div>

                <!-- Admin panel -->
                <div class="rounded-box bg-base-200 h-full w-56 shrink-0">
                  <ul class="menu w-full">
                    <li class="menu-title">Admin panel</li>
                    <li>
                      <button tabindex="-1" class="active">📈 Dashboard</button>
                    </li>
                    <li><button tabindex="-1">❤️ Notifications</button></li>
                    <li><button tabindex="-1">💬 Messages</button></li>
                    <li><button tabindex="-1">👤 People</button></li>
                    <li>
                      <button tabindex="-1">
                        📦 Products <span class="badge badge-info">50</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                aria-hidden="true"
                class="rounded-box bg-base-200 grid grow grid-cols-2 gap-4 p-6"
              >
                <button tabindex="-1" class="btn btn-neutral no-grow">
                  Neutral
                </button>
                <button tabindex="-1" class="btn btn-primary no-grow">
                  Primary
                </button>
                <button tabindex="-1" class="btn btn-secondary no-grow">
                  Secondary
                </button>
                <button tabindex="-1" class="btn btn-accent no-grow">
                  Accent
                </button>
                <button tabindex="-1" class="btn btn-info no-grow">Info</button>
                <button tabindex="-1" class="btn btn-success no-grow">
                  Success
                </button>
                <button tabindex="-1" class="btn btn-warning no-grow">
                  Warning
                </button>
                <button tabindex="-1" class="btn btn-error no-grow">
                  Error
                </button>
              </div>
            </div>

            <!-- CENTER COLUMN -->
            <div class="flex grow flex-col gap-2 min-w-0">
              <!-- navbar: ALWAYS visible (including small) -->
              <div class="navbar bg-base-200 rounded-box">
                <div class="grow">
                  <button
                    class="btn btn-ghost btn-circle avatar"
                    aria-label="daisyUI"
                  >
                    <div
                      class="w-10 rounded-full bg-base-100 grid place-items-center"
                    >
                      <Icon icon="logos:daisyui-icon" class="size-6" />
                    </div>
                  </button>
                </div>
                <ul class="menu menu-sm menu-horizontal rounded-box">
                  <li>
                    <button tabindex="-1">
                      Inbox <span class="badge badge-sm">99+</span>
                    </button>
                  </li>
                  <li>
                    <button tabindex="-1">
                      Updates
                      <span class="badge badge-sm badge-warning">NEW</span>
                    </button>
                  </li>
                  <li>
                    <button tabindex="-1">
                      Stats <span class="badge badge-xs badge-info"></span>
                    </button>
                  </li>
                </ul>
              </div>

              <!-- hero -->
              <div
                class="rounded-box flex grow flex-col px-2 pt-4 pb-2 text-center"
              >
                <div
                  class="font-title text-[clamp(1.5rem,6vw,3rem)] leading-none font-black"
                >
                  Unlimited themes
                </div>
                <p class="font-title font-light md:text-3xl lg:text-4xl">
                  with zero effort
                </p>

                <div class="h-4"></div>

                <p
                  class="text-base-content/80 mx-auto max-w-lg text-sm font-light"
                >
                  Full UI themes powered by semantic tokens. Change the look
                  without breaking contrast, components, or layouts.
                </p>

                <div class="h-4"></div>

                <div class="flex flex-wrap items-center justify-center gap-3">
                  <a
                    class="btn btn-wide btn-primary no-grow"
                    href="#"
                    tabindex="0"
                  >
                    See all themes
                  </a>
                </div>
              </div>

              <!-- THEME ADOPTION strip: visible on sm+ (and up), hidden only on the smallest -->
              <div class="card bg-base-200 hidden sm:flex">
                <div class="card-body gap-4">
                  <div
                    class="flex flex-wrap items-center justify-between gap-4"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="radial-progress text-primary"
                        style="--value: 72; --size: 3rem"
                      >
                        72%
                      </div>
                      <div>
                        <div class="font-semibold">Theme adoption</div>
                        <div class="text-xs text-base-content/60">
                          in this UI
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-3">
                      <progress
                        class="progress progress-secondary w-40"
                        value="55"
                        max="100"
                      ></progress>
                      <div class="text-sm font-semibold">Contrast</div>
                    </div>

                    <div class="flex items-center gap-2">
                      <span class="badge badge-success">Tokens</span>
                      <span class="badge badge-info">Components</span>
                      <span class="badge badge-warning">Variants</span>
                    </div>
                  </div>

                  <div class="grid gap-3 sm:grid-cols-3">
                    <div
                      class="rounded-box bg-base-100 p-3 ring-1 ring-base-300/60"
                    >
                      <div class="text-xs text-base-content/60">Primary</div>
                      <div class="font-bold text-primary text-lg">
                        #{{ activeTheme }}
                      </div>
                    </div>

                    <div
                      class="rounded-box bg-base-100 p-3 ring-1 ring-base-300/60"
                    >
                      <div class="text-xs text-base-content/60">Secondary</div>
                      <div class="font-bold text-secondary text-lg">
                        Variants
                      </div>
                    </div>

                    <div
                      class="rounded-box bg-base-100 p-3 ring-1 ring-base-300/60"
                    >
                      <div class="text-xs text-base-content/60">Accent</div>
                      <div class="font-bold text-accent text-lg">System</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- BUTTON ROW: only on the smallest; replaces the strip -->
              <div class="card bg-base-200 sm:hidden mt-auto">
                <div class="card-body py-3">
                  <div class="flex flex-wrap items-center justify-center gap-2">
                    <button
                      tabindex="-1"
                      class="btn btn-xs btn-neutral no-grow"
                    >
                      Neutral
                    </button>
                    <button
                      tabindex="-1"
                      class="btn btn-xs btn-primary no-grow"
                    >
                      Primary
                    </button>
                    <button
                      tabindex="-1"
                      class="btn btn-xs btn-secondary no-grow"
                    >
                      Secondary
                    </button>
                    <button tabindex="-1" class="btn btn-xs btn-accent no-grow">
                      Accent
                    </button>
                    <button tabindex="-1" class="btn btn-xs btn-info no-grow">
                      Info
                    </button>
                    <button
                      tabindex="-1"
                      class="btn btn-xs btn-success no-grow"
                    >
                      Success
                    </button>
                    <button
                      tabindex="-1"
                      class="btn btn-xs btn-warning no-grow"
                    >
                      Warning
                    </button>
                    <button tabindex="-1" class="btn btn-xs btn-error no-grow">
                      Error
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN (unchanged from your current version: xl+) -->
            <div
              class="rounded-box bg-base-200 card hidden h-full w-[20rem] shrink-0 xl:flex 2xl:w-[22rem]"
            >
              <div class="card-body">
                <div class="flex items-center justify-between gap-2">
                  <div class="card-title text-sm">Semantic colors</div>
                  <div class="badge badge-outline">
                    {{ activeTheme }}
                  </div>
                </div>

                <div class="mt-2 grid grid-cols-4 gap-3">
                  <div
                    v-for="group in themeGroups"
                    :key="group.label"
                    :class="group.colSpanClass"
                    class="flex flex-col gap-1"
                  >
                    <div class="flex flex-wrap gap-3">
                      <button
                        v-for="swatch in group.swatches"
                        :key="swatch.label"
                        type="button"
                        class="border-base-content/10 outline-base-content grid h-9 w-12 cursor-pointer place-items-center rounded-lg border-1 outline-offset-2 focus:outline-2"
                        :class="swatch.extraClass"
                        :aria-label="`Choose ${swatch.label}`"
                        :title="swatch.label"
                      >
                        <div
                          v-if="swatch.type === 'color'"
                          class="rounded-lg h-full w-full"
                          :class="swatch.bgClass"
                        />
                        <span v-else>
                          {{ swatch.text }}
                        </span>
                      </button>
                    </div>

                    <div class="text-base-content/60 text-xs">
                      {{ group.label }}
                    </div>
                  </div>
                </div>

                <!-- EXTRA COOL STUFF -->
                <div
                  class="mt-4 rounded-box bg-base-100 p-4 ring-1 ring-base-300/60"
                >
                  <div class="flex items-center justify-between">
                    <div class="font-semibold text-sm">Theme tokens</div>
                    <span class="badge badge-primary badge-outline">live</span>
                  </div>

                  <div class="mt-3 space-y-2 text-xs text-base-content/70">
                    <div class="flex items-center justify-between">
                      <span>--p</span>
                      <span class="font-mono text-primary">primary</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span>--s</span>
                      <span class="font-mono text-secondary">secondary</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span>--a</span>
                      <span class="font-mono text-accent">accent</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span>--bc</span>
                      <span class="font-mono">base-content</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /RIGHT -->
          </div>
        </div>
      </div>
      <div
        v-if="showScrollHint"
        class="pointer-events-none sticky bottom-4 z-10 flex justify-center"
        aria-hidden="true"
      >
        <div
          class="rounded-full bg-base-200/80 px-3 py-2 text-xs font-semibold"
        >
          Scroll <span class="inline-block animate-bounce">↓</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.no-grow {
  transform: none !important;
}
.no-grow:hover,
.no-grow:active,
.no-grow:focus-visible {
  transform: none !important;
}
</style>
