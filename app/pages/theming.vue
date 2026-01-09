<script setup lang="ts">
const themes: string[] = [
  "light",
  "valentine",
  "cyberpunk",
  "cupcake",
  "retro",
  "synthwave",
  "luxury",
  "night",
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

onMounted((): void => {
  const el = trackEl.value;
  if (!el) return;

  const tick = (): void => {
    const p = getScrollProgress(el);
    activeTheme.value = themeFromProgress(p);
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
  <section ref="trackEl" class="relative h-[500vh]">
    <div
      class="sticky top-[calc(50vh-10rem)] mx-auto grid w-[calc(100%-2rem)] max-w-[85rem] overflow-hidden rounded-2xl sm:top-20"
    >
      <div
        class="col-start-1 row-start-1 flex items-start"
        :data-theme="activeTheme"
      >
        <div
          class="border-base-200 flex w-full items-stretch justify-center gap-6 rounded-2xl border p-6 xl:h-[40rem] xl:justify-normal"
        >
          <!-- LEFT COLUMN (hidden until xl) -->
          <div class="hidden flex-col gap-6 xl:flex">
            <div class="flex gap-6">
              <!-- icon rail -->
              <div class="rounded-box bg-base-200 h-full">
                <ul class="menu">
                  <li class="menu-title">
                    <!-- grid icon -->
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

                  <!-- reuse your other icons as buttons -->
                  <li>
                    <button tabindex="-1" class="active" aria-label="demo icon">
                      📈
                    </button>
                  </li>
                  <li>
                    <button tabindex="-1" aria-label="demo icon">❤️</button>
                  </li>
                  <li>
                    <button tabindex="-1" aria-label="demo icon">💬</button>
                  </li>
                  <li>
                    <button tabindex="-1" aria-label="demo icon">👤</button>
                  </li>
                  <li>
                    <button tabindex="-1" aria-label="demo icon">📦</button>
                  </li>
                </ul>
              </div>

              <!-- Admin panel -->
              <div class="rounded-box bg-base-200 h-full w-60 shrink-0">
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

            <!-- button grid -->
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
              <button tabindex="-1" class="btn btn-error no-grow">Error</button>
            </div>
          </div>

          <!-- CENTER COLUMN -->
          <div class="flex grow flex-col gap-6 min-w-0">
            <!-- navbar -->
            <div class="navbar bg-base-200 rounded-box hidden xl:flex">
              <div class="grow">
                <button
                  class="btn btn-ghost btn-circle avatar"
                  aria-label="avatar"
                >
                  <div class="w-10 rounded-full">
                    <img
                      width="40"
                      height="40"
                      src="https://img.daisyui.com/images/profile/demo/superperson@94.webp"
                      alt="Avatar"
                    />
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
              class="rounded-box flex grow flex-col px-6 pt-12 pb-8 text-center"
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
                daisyUI adds a set of customizable color names to Tailwind CSS
                and these new colors use CSS variables for the values. Using
                daisyUI color names, you get Dark Mode and even more themes
                without adding a new class name.
              </p>

              <div class="h-4"></div>

              <div class="flex items-center justify-center gap-3">
                <a
                  class="btn btn-wide btn-primary no-grow"
                  href="#"
                  tabindex="0"
                >
                  See all themes
                </a>

                <div class="badge badge-outline">
                  {{ activeTheme }}
                </div>
              </div>
            </div>

            <!-- toggles / checkboxes -->
            <div class="card bg-base-200 hidden xl:flex">
              <div class="card-body">
                <div class="flex h-full items-center justify-between gap-6">
                  <input
                    checked
                    type="checkbox"
                    class="toggle pointer-events-none"
                  />
                  <input
                    checked
                    type="checkbox"
                    class="toggle toggle-primary pointer-events-none"
                  />
                  <input
                    checked
                    type="checkbox"
                    class="toggle toggle-secondary pointer-events-none"
                  />
                  <input
                    checked
                    type="checkbox"
                    class="toggle toggle-accent pointer-events-none"
                  />
                  <input
                    checked
                    type="checkbox"
                    class="checkbox pointer-events-none"
                  />
                  <input
                    checked
                    type="checkbox"
                    class="checkbox checkbox-primary pointer-events-none"
                  />
                  <input
                    checked
                    type="checkbox"
                    class="checkbox checkbox-secondary pointer-events-none"
                  />
                  <input
                    checked
                    type="checkbox"
                    class="checkbox checkbox-accent pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN (semantic colors) -->
          <div
            class="rounded-box bg-base-200 card hidden h-full w-80 shrink-0 xl:flex"
          >
            <div class="card-body">
              <div class="card-title mb-4 text-sm">Semantic colors</div>
              <div class="grid grid-cols-4 gap-4 w-fit">
                <div
                  v-for="group in themeGroups"
                  :key="group.label"
                  :class="group.colSpanClass"
                  class="flex flex-col gap-1"
                >
                  <div class="flex gap-4 flex-wrap">
                    <button
                      v-for="swatch in group.swatches"
                      :key="swatch.label"
                      type="button"
                      class="border-base-content/10 outline-base-content grid h-10 w-14 cursor-pointer place-items-center rounded-lg border-1 outline-offset-2 focus:outline-2"
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
            </div>
          </div>
          <!-- /RIGHT -->
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* prevents any transform scaling on hover/active (daisyUI hover sometimes scales) */
.no-grow {
  transform: none !important;
}
.no-grow:hover,
.no-grow:active,
.no-grow:focus-visible {
  transform: none !important;
}
</style>
