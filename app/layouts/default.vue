<script setup lang="ts">
import { Icon } from "@iconify/vue";

type NavItem = {
  label: string;
  to: string;
  icon: string;
  exact?: boolean;
};

type FontOption = 16 | 18 | 20 | 24;

const fontOptions: readonly FontOption[] = [16, 18, 20, 24] as const;
const activeFont = ref<FontOption>(16);

const setRootFont = (px: FontOption): void => {
  document.documentElement.style.fontSize = `${px}px`;
  activeFont.value = px;
};

const route = useRoute();
const showFontOptions = computed<boolean>(() => route.name === "rem-vs-px");

const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: "mdi:home-outline", exact: true },
  { label: "Rem vs Px", to: "/rem-vs-px", icon: "mdi:ruler-square-compass" },
  { label: "Scroll", to: "/scroll", icon: "mdi:scroll" },
];
</script>

<template>
  <div class="drawer lg:drawer-open">
    <!-- Drawer toggle -->
    <input id="app-drawer" type="checkbox" class="drawer-toggle" />

    <!-- Main content -->
    <div class="drawer-content">
      <!-- Navbar -->
      <div class="navbar bg-base-200 shadow-sm sticky top-0 z-50">
        <div class="flex-none lg:hidden">
          <label
            for="app-drawer"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <Icon icon="mdi:menu" class="size-6" />
          </label>
        </div>

        <div class="ml-auto flex items-center gap-2">
          <div v-if="showFontOptions" class="join w-full">
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
          <label for="theme-controller" class="swap swap-rotate">
            <input
              id="theme-controller"
              type="checkbox"
              class="theme-controller"
              value="cmyk"
            />
            <Icon class="swap-on size-8 fill-current" icon="heroicons:sun" />
            <Icon class="swap-off size-8 fill-current" icon="heroicons:moon" />
          </label>
        </div>
      </div>

      <!-- Page content -->
      <main class="p-6">
        <slot />
      </main>
    </div>

    <!-- Sidebar -->
    <div class="drawer-side">
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
            >
              <Icon :icon="item.icon" class="size-5" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
