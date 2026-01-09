<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

type FontOption = 16 | 18 | 20 | 24;

const fontOptions: readonly FontOption[] = [16, 18, 20, 24] as const;
const activeFont = ref<FontOption>(16);

let originalRootFontSize: string | null = null;

const setRootFont = (px: FontOption): void => {
  document.documentElement.style.fontSize = `${px}px`;
  activeFont.value = px;
};

onMounted((): void => {
  originalRootFontSize = document.documentElement.style.fontSize || null;
  setRootFont(16);
});

onBeforeUnmount((): void => {
  if (originalRootFontSize === null) {
    document.documentElement.style.removeProperty("font-size");
  } else {
    document.documentElement.style.fontSize = originalRootFontSize;
  }
});
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
      <div
        class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-base-300/60"
      />

      <div class="relative p-6 md:p-8 space-y-6">
        <!-- Title row -->
        <div
          class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"
        >
          <div class="space-y-3">
            <div class="flex items-start gap-4">
              <div
                class="rounded-2xl bg-base-200/70 p-3 shadow-sm ring-1 ring-base-300/70"
              >
                <Icon icon="mdi:ruler-square-compass" class="size-8" />
              </div>

              <div class="space-y-1">
                <h1 class="text-3xl font-extrabold tracking-tight md:text-4xl">
                  rem vs px: where things break
                </h1>
                <p class="max-w-2xl text-base text-base-content/70">
                  This simulates a user increasing their default font size (root
                  <code>html</code> font-size). Watch how <code>rem</code>-based
                  sizing stays proportional while <code>px</code>-based sizing
                  drifts or breaks.
                </p>
              </div>
            </div>

            <!-- Mini stats -->
            <div class="flex flex-wrap gap-2">
              <div class="badge badge-primary badge-outline gap-2 py-3">
                <Icon icon="mdi:scale-balance" class="size-4" />
                Proportions
              </div>
              <div class="badge badge-secondary badge-outline gap-2 py-3">
                <Icon icon="mdi:image-size-select-large" class="size-4" />
                Layout drift
              </div>
              <div class="badge badge-accent badge-outline gap-2 py-3">
                <Icon icon="mdi:alert-outline" class="size-4" />
                Clipping
              </div>
            </div>
          </div>

          <!-- Root font controls -->
          <div class="w-full lg:w-auto">
            <div
              class="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="card-body gap-3 p-4">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <Icon icon="mdi:format-size" class="size-5 text-primary" />
                    <div class="text-sm font-semibold">Root font size</div>
                  </div>
                  <div class="badge badge-primary badge-outline">
                    {{ activeFont }}px
                  </div>
                </div>

                <div class="join w-full">
                  <button
                    v-for="px in fontOptions"
                    :key="px"
                    class="btn join-item flex-1"
                    :class="activeFont === px ? 'btn-primary' : 'btn-ghost'"
                    type="button"
                    @click="setRootFont(px)"
                  >
                    {{ px }}px<span v-if="px === 16"> (default)</span>
                  </button>
                </div>

                <div class="text-xs text-base-content/60">
                  This changes <code>html</code> font-size. Try 24px and scan
                  the cards.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- What to look for -->
        <div class="rounded-2xl border border-info/25 bg-info/5 p-4 md:p-5">
          <div
            class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"
          >
            <div class="flex items-start gap-3">
              <div
                class="rounded-2xl bg-info/15 p-3 text-info ring-1 ring-base-300/60"
              >
                <Icon icon="mdi:radar" class="size-6" />
              </div>

              <div class="space-y-1">
                <div class="font-semibold">What to look for</div>
                <p class="text-sm text-base-content/70">
                  These are the subtle “it didn’t break, but it feels wrong”
                  issues.
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <div class="badge badge-info badge-outline gap-2 py-3">
                <Icon icon="mdi:emoticon-confused-outline" class="size-4" />
                “Feels off”
              </div>
              <div class="badge badge-success badge-outline gap-2 py-3">
                <Icon icon="mdi:check-circle-outline" class="size-4" />
                Scales clean
              </div>
              <div class="badge badge-warning badge-outline gap-2 py-3">
                <Icon icon="mdi:alert-circle-outline" class="size-4" />
                Clips/wraps
              </div>
            </div>
          </div>

          <div class="mt-4 grid gap-3 md:grid-cols-2">
            <ul class="space-y-2 text-sm text-base-content/80">
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:chevron-right"
                  class="mt-0.5 size-4 text-info"
                />
                <span
                  ><b>Icons</b> fixed in px look too small as text grows.</span
                >
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:chevron-right"
                  class="mt-0.5 size-4 text-info"
                />
                <span
                  ><b>Fixed-height rows</b> start clipping or misaligning.</span
                >
              </li>
            </ul>

            <ul class="space-y-2 text-sm text-base-content/80">
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:chevron-right"
                  class="mt-0.5 size-4 text-info"
                />
                <span><b>Chips/buttons</b> stop matching their text.</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:chevron-right"
                  class="mt-0.5 size-4 text-info"
                />
                <span><b>Side-by-side comparisons</b> show drift clearly.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- DEMOS (ONE CARD PER ROW) -->
    <div class="grid grid-cols-1 gap-6">
      <!-- 1) Icon + heading proportionality -->
      <DemoCard
        title="1) Icon + heading drift"
        description="Same layout, only the icon sizing differs. At larger root sizes, the px icon looks undersized."
        tone="secondary"
        icon="mdi:image-size-select-large"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- rem -->
          <div
            class="rounded-2xl border border-success/25 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="p-5 space-y-3">
              <div class="flex items-start gap-4">
                <div
                  class="grid size-12 place-items-center rounded-2xl bg-success text-success-content font-bold ring-1 ring-base-300/60"
                >
                  REM
                </div>
                <div class="space-y-1">
                  <div class="flex items-center gap-2 font-semibold">
                    <Icon
                      icon="mdi:check-circle-outline"
                      class="size-5 text-success"
                    />
                    REM icon (size-12)
                  </div>
                  <p class="text-sm text-base-content/70">
                    Icon and spacing scale with the root. Feels consistent at
                    24px.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- px -->
          <div
            class="rounded-2xl border border-secondary/25 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="p-5 space-y-3">
              <div class="flex items-start gap-4">
                <div
                  class="grid size-[48px] place-items-center rounded-2xl bg-secondary text-secondary-content font-bold ring-1 ring-base-300/60"
                >
                  PX
                </div>
                <div class="space-y-1">
                  <div class="flex items-center gap-2 font-semibold">
                    <Icon
                      icon="mdi:alert-circle-outline"
                      class="size-5 text-secondary"
                    />
                    PX icon (48px)
                  </div>
                  <p class="text-sm text-base-content/70">
                    Text grows but the icon doesn’t, so the icon feels smaller
                    and “off”.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DemoCard>

      <!-- 2) Fixed-height list item clipping -->
      <DemoCard
        title="2) Fixed-height row starts clipping"
        description="A list row is given a fixed height in px. When fonts grow, content overflows."
        tone="warning"
        icon="mdi:format-line-spacing"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- rem height -->
          <div
            class="rounded-2xl border border-success/25 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="p-5 space-y-3">
              <div class="badge badge-success badge-outline gap-2">
                <Icon icon="mdi:check-circle-outline" class="size-4" />
                REM height
              </div>

              <div
                class="flex items-center justify-between rounded-xl bg-base-200/70 px-4 h-16 ring-1 ring-base-300/60"
              >
                <div class="min-w-0">
                  <div class="font-semibold truncate">
                    Auction payout scheduled
                  </div>
                  <div class="text-sm text-base-content/70 truncate">
                    This row grows with font size better.
                  </div>
                </div>
                <button class="btn btn-sm btn-success">View</button>
              </div>

              <div class="text-xs text-base-content/60">
                Row is <code>h-16</code> (rem-based). Scales better with user
                font size.
              </div>
            </div>
          </div>

          <!-- px height -->
          <div
            class="rounded-2xl border border-secondary/25 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="p-5 space-y-3">
              <div class="badge badge-secondary badge-outline gap-2">
                <Icon icon="mdi:alert-circle-outline" class="size-4" />
                PX height
              </div>

              <div
                class="flex items-center justify-between rounded-xl bg-base-200/70 px-4 h-[56px] ring-1 ring-base-300/60"
              >
                <div class="min-w-0">
                  <div class="font-semibold truncate">
                    Auction payout scheduled
                  </div>
                  <div class="text-sm text-base-content/70 truncate">
                    This row can clip sooner at 24px.
                  </div>
                </div>
                <button class="btn btn-sm btn-secondary">View</button>
              </div>

              <div class="text-xs text-base-content/60">
                Row is <code>h-[56px]</code> (fixed). Gets tight as fonts grow.
              </div>
            </div>
          </div>
        </div>
      </DemoCard>

      <!-- 3) Button/chip padding mismatch -->
      <DemoCard
        title="3) Chips + buttons lose proportion"
        description="Fixed px padding + radius starts feeling wrong relative to type at larger root sizes."
        tone="accent"
        icon="mdi:gesture-tap-button"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- rem-ish chips -->
          <div
            class="rounded-2xl border border-success/25 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="p-5 space-y-3">
              <div class="badge badge-success badge-outline gap-2">
                <Icon icon="mdi:check-circle-outline" class="size-4" />
                REM tokens
              </div>

              <div class="flex flex-wrap gap-2">
                <span class="badge badge-success badge-lg">
                  <Icon icon="mdi:check-circle-outline" />
                  Status: Paid</span
                >
                <span class="badge badge-success badge-lg badge-outline">
                  <Icon icon="mdi:credit-card-outline" />
                  Invoice Ready</span
                >
                <span class="badge badge-success badge-lg">
                  <Icon
                    icon="mdi:bank-outline"
                    class="size-[16px]"
                  />Settlement</span
                >
              </div>

              <button class="btn btn-success btn-wide shadow-sm">
                <Icon icon="mdi:gesture-tap-button" class="size-5" />
                Action button
              </button>

              <div class="text-xs text-base-content/60">
                Daisy tokens scale more consistently with font size changes.
              </div>
            </div>
          </div>

          <!-- px custom chips -->
          <div
            class="rounded-2xl border border-secondary/25 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="p-5 space-y-3">
              <div class="badge badge-secondary badge-outline gap-2">
                <Icon icon="mdi:alert-circle-outline" class="size-4" />
                PX custom (fixed)
              </div>

              <div class="flex flex-wrap gap-2">
                <span
                  class="inline-flex items-center gap-2 rounded-sm bg-secondary/10 text-secondary ring-1 ring-base-300/60 px-[10px] h-[26px] leading-[26px]"
                >
                  <Icon icon="mdi:check-circle-outline" class="size-[16px]" />
                  Status: Paid
                </span>

                <span
                  class="inline-flex items-center gap-2 rounded-sm text-secondary ring-1 ring-secondary px-[10px] h-[26px] leading-[26px]"
                >
                  <Icon icon="mdi:credit-card-outline" class="size-[16px]" />
                  Invoice Ready
                </span>

                <span
                  class="inline-flex items-center gap-2 rounded-sm bg-secondary/10 text-secondary ring-1 ring-base-300/60 px-[10px] h-[26px] leading-[26px]"
                >
                  <Icon icon="mdi:bank-outline" class="size-[16px]" />
                  Settlement
                </span>
              </div>

              <!-- px fixed button (so it actually drifts vs text) -->
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-sm bg-secondary/10 text-secondary ring-1 ring-base-300/60 px-[16px] h-[42px] leading-[42px] transition hover:bg-secondary/15 active:scale-[0.99]"
              >
                <Icon icon="mdi:gesture-tap-button" class="size-[18px]" />
                Action button
              </button>

              <div class="text-xs text-base-content/60">
                Text + height + padding are fixed in px. Increase root font size
                and these start to feel cramped while everything else scales.
              </div>
            </div>
          </div>
        </div>
      </DemoCard>

      <!-- 4) Sidebar layout: px widths vs rem widths -->
      <DemoCard
        title="4) Sidebar + content drift"
        description="Rem sidebars scale with user font size. Px sidebars stay fixed—so menu text wraps/overflows sooner."
        tone="primary"
        icon="ph:sidebar"
      >
        <div class="grid grid-cols-1 gap-4">
          <div class="rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            <div class="p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- rem sidebar -->
                <div
                  class="border border-success/25 rounded-xl overflow-hidden bg-success/5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    class="bg-success/10 px-4 py-2 font-semibold text-success flex items-center gap-2"
                  >
                    <Icon icon="mdi:check-circle-outline" class="size-5" />
                    REM sidebar
                  </div>
                  <div class="grid grid-cols-[8rem_1fr]">
                    <aside class="bg-base-200/70 p-3 ring-1 ring-base-300/60">
                      <div class="font-semibold mb-2">Menu</div>
                      <ul class="menu p-0 text-sm">
                        <li><a>Dashboard</a></li>
                        <li><a>Invoices</a></li>
                        <li><a>Settlements</a></li>
                        <li><a>Reports</a></li>
                      </ul>
                    </aside>
                    <main class="p-3">
                      <div class="font-semibold">Content</div>
                      <p class="text-sm text-base-content/70">
                        Sidebar is <code>8rem</code>. As font size grows, the
                        sidebar grows too.
                      </p>
                    </main>
                  </div>
                </div>

                <!-- px sidebar -->
                <div
                  class="border border-secondary/25 rounded-xl overflow-hidden bg-secondary/5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    class="bg-secondary/10 px-4 py-2 font-semibold text-secondary flex items-center gap-2"
                  >
                    <Icon icon="mdi:alert-circle-outline" class="size-5" />
                    PX sidebar
                  </div>
                  <div class="grid grid-cols-[128px_1fr]">
                    <aside class="bg-base-200/70 p-3 ring-1 ring-base-300/60">
                      <div class="font-semibold mb-2">Menu</div>
                      <ul class="menu p-0 text-sm">
                        <li><a>Dashboard</a></li>
                        <li><a>Invoices</a></li>
                        <li><a>Settlements</a></li>
                        <li><a>Reports</a></li>
                      </ul>
                    </aside>
                    <main class="p-3">
                      <div class="font-semibold">Content</div>
                      <p class="text-sm text-base-content/70">
                        Sidebar is <code>128px</code>. As text grows, the menu
                        overflows.
                      </p>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-xs text-base-content/60">
            Looks fine at 16px root, but px widths don’t respect user font
            settings—so overflow happens fast.
          </div>
        </div>
      </DemoCard>

      <!-- 5) Tooltip/popover sizing -->
      <DemoCard
        title="5) Tooltip/popup sizing constraints"
        description="Fixed max-width in px can cause ugly wrapping at large font sizes. rem-based widths scale more naturally."
        tone="info"
        icon="mdi:tooltip-outline"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- rem max width -->
          <div
            class="rounded-2xl border border-success/25 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="p-5 space-y-3">
              <div class="badge badge-success badge-outline gap-2">
                <Icon icon="mdi:check-circle-outline" class="size-4" />
                REM max-width
              </div>
              <div
                class="rounded-xl bg-base-200/70 p-4 max-w-[24rem] ring-1 ring-base-300/60"
              >
                <div class="font-semibold">Payment notice</div>
                <p class="text-sm text-base-content/70">
                  Uses <code>24rem</code>. Stays readable as font size
                  increases.
                </p>
              </div>
            </div>
          </div>

          <!-- px max width -->
          <div
            class="rounded-2xl border border-secondary/25 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="p-5 space-y-3">
              <div class="badge badge-secondary badge-outline gap-2">
                <Icon icon="mdi:alert-circle-outline" class="size-4" />
                PX max-width
              </div>
              <div
                class="rounded-xl bg-base-200/70 p-4 max-w-[320px] ring-1 ring-base-300/60"
              >
                <div class="font-semibold">Payment notice</div>
                <p class="text-sm text-base-content/70">
                  Uses <code>320px</code>. At large roots, wrapping gets
                  extreme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DemoCard>

      <!-- Footer note -->
      <section class="card border border-base-300 bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="flex items-center gap-3">
            <div
              class="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-base-300/60"
            >
              <Icon icon="mdi:note-text-outline" class="size-6" />
            </div>
            <div>
              <h2 class="text-lg font-bold">Notes</h2>
              <p class="text-sm text-base-content/60">
                Why this matters in real apps.
              </p>
            </div>
          </div>

          <ul class="mt-4 space-y-2 text-sm text-base-content/75">
            <li class="flex items-start gap-2">
              <Icon
                icon="mdi:chevron-right"
                class="mt-0.5 size-4 text-primary"
              />
              <span>
                Browser zoom (<kbd>Cmd</kbd> + <kbd>+</kbd>) scales everything,
                so px and rem appear to scale together.
              </span>
            </li>
            <li class="flex items-start gap-2">
              <Icon
                icon="mdi:chevron-right"
                class="mt-0.5 size-4 text-primary"
              />
              <span>
                The real drift happens when the user changes their default font
                size (or your app changes <code>html</code> font-size).
              </span>
            </li>
            <li class="flex items-start gap-2">
              <Icon
                icon="mdi:chevron-right"
                class="mt-0.5 size-4 text-primary"
              />
              <span>
                The “breaks” are usually proportionality issues: icons feel
                small, padding feels tight, rows clip.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
