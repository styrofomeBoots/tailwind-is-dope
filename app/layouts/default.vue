<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

type NavItem = {
  label: string;
  to: string;
  icon: string;
  exact?: boolean;
};

const route = useRoute();
const showFontOptions = computed<boolean>(() => route.name === "size-tokens");

const { fontOptions, activeFont, setRootFont } = useRootFontSize();

// IMPORTANT: use <details> open state instead of DaisyUI's `dropdown-open` class
const dropdownRef = ref<HTMLDetailsElement | null>(null);

const closeFontMenu = (): void => {
  const el = dropdownRef.value;
  if (el) el.open = false;
};

const openFontMenu = (): void => {
  const el = dropdownRef.value;
  if (el) el.open = true;
};

const toggleFontMenu = (): void => {
  const el = dropdownRef.value;
  if (el) el.open = !el.open;
};

const coerceToFontOption = (px: number): (typeof fontOptions)[number] => {
  let best = fontOptions[0];
  let bestDist = Math.abs(px - (best ?? fontOptions[0]!));

  for (const opt of fontOptions) {
    const d = Math.abs(px - opt);
    if (d < bestDist) {
      best = opt;
      bestDist = d;
    }
  }
  return best ?? fontOptions[0]!;
};

const syncActiveFontFromDom = (): void => {
  if (!import.meta.client) return;

  const raw = globalThis.getComputedStyle(document.documentElement).fontSize;
  const parsed = Number.parseFloat(raw);
  if (Number.isNaN(parsed)) return;

  activeFont.value = coerceToFontOption(parsed);
};

const onPickFont = async (px: (typeof fontOptions)[number]): Promise<void> => {
  closeFontMenu();
  await setRootFont(px, { preserveDemoScroll: route.name === "size-tokens" });
  syncActiveFontFromDom();
};

// close dropdown when route changes
watch(
  () => route.name,
  (name, oldName): void => {
    if (!import.meta.client) return;

    closeFontMenu();

    if (name === "size-tokens") {
      queueMicrotask(() => syncActiveFontFromDom());
      return;
    }

    if (oldName === "size-tokens") {
      requestAnimationFrame(() => syncActiveFontFromDom());
    }
  },
  { immediate: true }
);

// click-outside + escape close (capture to avoid propagation issues)
const onDocPointerDownCapture = (e: PointerEvent): void => {
  const root = dropdownRef.value;
  if (!root?.open) return;

  const t = e.target;
  if (t instanceof Node && root.contains(t)) return;

  closeFontMenu();
};

const onDocKeyDown = (e: KeyboardEvent): void => {
  const root = dropdownRef.value;
  if (!root?.open) return;

  if (e.key === "Escape") closeFontMenu();
};

onMounted((): void => {
  if (!import.meta.client) return;
  document.addEventListener("pointerdown", onDocPointerDownCapture, true);
  document.addEventListener("keydown", onDocKeyDown);
});

onBeforeUnmount((): void => {
  if (!import.meta.client) return;
  document.removeEventListener("pointerdown", onDocPointerDownCapture, true);
  document.removeEventListener("keydown", onDocKeyDown);
});

const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: "mdi:home-outline", exact: true },
  {
    label: "Size Tokens",
    to: "/size-tokens",
    icon: "mdi:ruler-square-compass",
  },
  { label: "Cut the BS", to: "/cut-the-bs", icon: "la:poop" },
  { label: "Theming", to: "/theming", icon: "mdi:paint-outline" },
  { label: "About", to: "/about", icon: "mingcute:dog-line" },
];

const closeDrawerIfToggleable = (): void => {
  if (!import.meta.client) return;
  if (globalThis.matchMedia("(min-width: 1024px)").matches) return;

  const el = document.getElementById("app-drawer") as HTMLInputElement | null;
  if (el) el.checked = false;
};
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="app-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content">
      <div class="navbar bg-base-200 shadow-sm sticky top-0 z-50">
        <div class="flex-none lg:hidden">
          <label
            for="app-drawer"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <Icon icon="lucide-lab:burger" class="size-6" />
          </label>
        </div>

        <div class="ml-auto flex items-center gap-2">
          <!-- Mobile: dropdown (autoclose) -->
          <div v-if="showFontOptions" class="lg:hidden">
            <!-- DaisyUI works great with details/summary -->
            <details ref="dropdownRef" class="dropdown dropdown-end">
              <summary
                class="btn btn-sm btn-outline btn-primary gap-2 list-none"
                @click.prevent="toggleFontMenu"
                @keydown.down.prevent="openFontMenu"
              >
                <Icon icon="mdi:format-size" class="size-4" />
                {{ activeFont }}px
                <Icon icon="mdi:chevron-down" class="size-4" />
              </summary>

              <ul
                class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44"
              >
                <li v-for="px in fontOptions" :key="px">
                  <button
                    type="button"
                    class="justify-between"
                    :class="activeFont === px ? 'active' : ''"
                    @click="onPickFont(px)"
                  >
                    <span>{{ px }}px</span>
                    <span v-if="px === 16" class="text-xs opacity-70"
                      >default</span
                    >
                  </button>
                </li>
              </ul>
            </details>
          </div>

          <!-- Desktop/tablet: join buttons -->
          <div v-if="showFontOptions" class="join hidden lg:flex">
            <button
              v-for="px in fontOptions"
              :key="px"
              class="btn btn-sm join-item"
              :class="
                activeFont === px ? 'btn-primary' : 'btn-outline btn-primary'
              "
              type="button"
              @click="onPickFont(px)"
            >
              {{ px }}px<span v-if="px === 16"> (default)</span>
            </button>
          </div>

          <label for="theme-controller" class="swap swap-rotate">
            <input
              id="theme-controller"
              type="checkbox"
              class="theme-controller"
              value="cmyk"
            />
            <Icon class="swap-on size-6 fill-current" icon="heroicons:sun" />
            <Icon class="swap-off size-6 fill-current" icon="heroicons:moon" />
          </label>
        </div>
      </div>

      <main class="p-6">
        <slot />
      </main>
    </div>

    <div class="drawer-side z-50">
      <label
        for="app-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      />

      <aside class="min-h-full w-52 bg-base-200">
        <div class="tooltip tooltip-bottom m-4 tooltip-info">
          <div class="tooltip-content">
            <div class="flex items-center gap-2">
              <Icon icon="logos:daisyui-icon" class="size-6" />
              <span>DaisyUI too!</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="devicon:tailwindcss" class="size-8" />
            <span class="text-lg font-bold">tailwindIsDope</span>
          </div>
        </div>

        <ul class="menu px-2 gap-1 w-full">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              :exact="item.exact ?? false"
              class="gap-3"
              active-class="menu-active"
              exact-active-class="menu-active"
              @click="closeDrawerIfToggleable"
            >
              <Icon :icon="item.icon" class="size-6" />
              <span class="text-lg">{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
