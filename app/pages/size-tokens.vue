<script setup lang="ts">
import { Icon } from "@iconify/vue";
let originalRootFontSize: string | null = null;

onMounted(async (): Promise<void> => {
  originalRootFontSize = document.documentElement.style.fontSize || null;

  document.documentElement.style.fontSize = "16px";

  await nextTick();
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
    <HeroCard>
      <template #left>
        <div class="space-y-3">
          <div class="flex items-start gap-4">
            <div
              class="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-base-300/60"
            >
              <Icon icon="mdi:ruler-square-compass" class="size-6" />
            </div>

            <div class="space-y-1">
              <h1 class="text-3xl font-extrabold tracking-tight md:text-4xl">
                Tailwind size tokens
              </h1>
              <p class="max-w-2xl text-base text-base-content/70">
                Tailwind’s spacing/size utilities are driven by a shared,
                proportional spacing scale (tokens like <code>size-12</code>,
                <code>h-16</code>, <code>max-w-96</code>). Those tokens are
                <code>rem</code>-based and scale when a user increases their
                default font size.
              </p>
              <p class="max-w-2xl text-base text-base-content/70">
                The “bad” examples below use fixed <code>px</code> values
                (arbitrary sizes) that don’t scale which is where drift,
                clipping, and cramped UI show up.
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
      </template>

      <template #right>
        <!-- Root font controls -->
        <div
          class="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="card-body gap-3 p-4">
            <div class="overflow-x-auto">
              <table class="table table-sm w-full">
                <thead>
                  <tr>
                    <th class="text-xs">Token</th>
                    <th class="text-xs">rem</th>
                    <th class="text-xs">px @ 16px root</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr>
                    <td><code>4</code></td>
                    <td><code>1rem</code></td>
                    <td><code>16px</code></td>
                  </tr>
                  <tr>
                    <td><code>5</code></td>
                    <td><code>1.25rem</code></td>
                    <td><code>20px</code></td>
                  </tr>
                  <tr>
                    <td><code>6</code></td>
                    <td><code>1.5rem</code></td>
                    <td><code>24px</code></td>
                  </tr>
                  <tr>
                    <td><code>7</code></td>
                    <td><code>1.75rem</code></td>
                    <td><code>28px</code></td>
                  </tr>
                  <tr>
                    <td><code>8</code></td>
                    <td><code>2rem</code></td>
                    <td><code>32px</code></td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-2 text-xs text-base-content/60">
                px column assumes <code>html</code> font-size is 16px.
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Default slot content (below the top row) -->
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
            <div class="badge badge-success badge-outline gap-2 py-3">
              <Icon icon="mdi:check-circle-outline" class="size-4" />
              scales clean
            </div>
            <div class="badge badge-secondary badge-outline gap-2 py-3">
              <Icon icon="mdi:alert-circle-outline" class="size-4" />
              gets weird
            </div>
          </div>
        </div>

        <div class="mt-4 grid gap-3 md:grid-cols-2">
          <ul class="space-y-2 text-sm text-base-content/80">
            <li class="flex items-start gap-2">
              <Icon icon="mdi:chevron-right" class="mt-0.5 size-4 text-info" />
              <span
                ><b>Icons</b> fixed in px look too small as text grows.</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:chevron-right" class="mt-0.5 size-4 text-info" />
              <span
                ><b>Fixed-height rows</b> start clipping or misaligning.</span
              >
            </li>
          </ul>

          <ul class="space-y-2 text-sm text-base-content/80">
            <li class="flex items-start gap-2">
              <Icon icon="mdi:chevron-right" class="mt-0.5 size-4 text-info" />
              <span><b>Chips/buttons</b> stop matching their text.</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:chevron-right" class="mt-0.5 size-4 text-info" />
              <span><b>Side-by-side comparisons</b> show drift clearly.</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- NEW: spacing scale explainer -->
      <div class="rounded-2xl border border-base-300 bg-base-100 p-4 md:p-5">
        <div class="flex items-start gap-3">
          <div
            class="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-base-300/60"
          >
            <Icon icon="mdi:tag-outline" class="size-6" />
          </div>

          <div class="space-y-1">
            <div class="font-semibold">What “tokens” mean in Tailwind</div>
            <p class="text-sm text-base-content/70">
              Tailwind’s default spacing scale is a shared set of size tokens
              used across padding, margin, width/height, gap, inset,
              space-between, and translate. The values are proportional, and one
              spacing unit is <code>0.25rem</code> (typically
              <code>4px</code> at a 16px root). Using tokens keeps your UI
              coherent and makes it scale when the user’s base font size
              changes.
            </p>
          </div>
        </div>
      </div>
    </HeroCard>

    <!-- DEMOS (ONE CARD PER ROW) -->
    <div class="grid grid-cols-1 gap-6">
      <!-- Wrap each card so we can anchor scroll to it -->
      <div data-demo-card>
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
                    class="grid min-h-12 place-items-center rounded-2xl bg-success text-success-content font-bold ring-1 ring-base-300/60"
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
      </div>

      <div data-demo-card>
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
                  class="flex items-center justify-between rounded-xl bg-base-200/70 px-4 h-16 ring-1 border border-base-300"
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
                  class="flex items-center justify-between rounded-xl bg-base-200/70 px-4 h-[56px] ring-1 border border-base-300"
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
                  Row is <code>h-[56px]</code> (fixed). Gets tight as fonts
                  grow.
                </div>
              </div>
            </div>
          </div>
        </DemoCard>
      </div>

      <div data-demo-card>
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

                <button class="btn btn-success shadow-sm">
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

                <button
                  type="button"
                  class="inline-flex items-center justify-center gap-2 rounded-sm bg-secondary/10 text-secondary ring-1 ring-base-300/60 px-[16px] h-[42px] leading-[42px] transition hover:bg-secondary/15 active:scale-[0.99]"
                >
                  <Icon icon="mdi:gesture-tap-button" class="size-[18px]" />
                  Action button
                </button>

                <div class="text-xs text-base-content/60">
                  Text + height + padding are fixed in px. Increase root font
                  size and these start to feel cramped while everything else
                  scales.
                </div>
              </div>
            </div>
          </div>
        </DemoCard>
      </div>

      <div data-demo-card>
        <DemoCard
          title="4) Sidebar + content drift"
          description="Rem sidebars scale with user font size. Px sidebars stay fixed—so menu text wraps/overflows sooner."
          tone="primary"
          icon="ph:sidebar"
        >
          <div class="grid grid-cols-1 gap-4">
            <div
              class="rounded-2xl border border-base-300 bg-base-100 shadow-sm"
            >
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
      </div>

      <div data-demo-card>
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
                  class="rounded-xl bg-base-200/70 p-4 max-w-[24rem] ring-1 ring-base-300/60 border border-success/25"
                >
                  <div class="font-semibold">Payment notice</div>
                  <p class="text-sm text-base-content/70">
                    Uses <code>24rem</code>. Stays readable as font size
                    increases regardless of the user's font size settings or the
                    content length.
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
                  class="rounded-xl bg-base-200/70 p-4 max-w-[320px] ring-1 ring-base-300/60 border border-secondary/25"
                >
                  <div class="font-semibold">Payment notice</div>
                  <p class="text-sm text-base-content/70">
                    Uses <code>320px</code>. At large roots, wrapping gets
                    extreme and the content becomes cramped and less
                    aesthetically pleasing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DemoCard>
      </div>

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
                Tailwind tokens (the default spacing scale) keep spacing, sizes,
                and layout proportional because they’re rem-based. Arbitrary px
                values bypass the scale and are where drift starts.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
