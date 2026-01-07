<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const fontOptions = [16, 18, 20, 24] as const;

const activeFont = ref<number>(16);

// store original root font size to restore on unmount
let originalRootFontSize: string | null = null;

const setRootFont = (px: number): void => {
  document.documentElement.style.fontSize = `${px}px`;
  activeFont.value = px;
};

const buttonClass = (px: number): string => {
  const base = "rounded-lg px-3 py-1.5 text-sm font-semibold shadow-sm";
  const active = "bg-slate-900 text-white hover:bg-slate-800";
  const inactive = "bg-slate-100 text-slate-800 hover:bg-slate-200";
  return `${base} ${activeFont.value === px ? active : inactive}`;
};

onMounted((): void => {
  originalRootFontSize = document.documentElement.style.fontSize || null;
  setRootFont(16);
});

onBeforeUnmount((): void => {
  // restore whatever the app had before this component mounted
  if (originalRootFontSize === null) {
    document.documentElement.style.removeProperty("font-size");
  } else {
    document.documentElement.style.fontSize = originalRootFontSize;
  }
});
</script>
<template>
  <div class="m-6 space-y-6" id="font-demo">
    <!-- Controls -->
    <div
      class="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div class="text-sm font-medium text-slate-700">Root font size:</div>

      <div class="flex gap-2">
        <button
          v-for="px in fontOptions"
          :key="px"
          type="button"
          :class="buttonClass(px)"
          @click="setRootFont(px)"
        >
          {{ px }}px<span v-if="px === 16"> (default)</span>
        </button>
      </div>

      <div class="ml-auto text-xs text-slate-500">
        Tip: this is the scenario where
        <span class="font-semibold">rem</span> and
        <span class="font-semibold">px</span> diverge.
      </div>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <!-- REM-based card -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="text-sm font-semibold text-teal-700">
              REM card (scales)
            </div>
            <div class="mt-1 text-xl font-bold tracking-tight text-slate-900">
              “Accessible sizing”
            </div>
            <p class="mt-2 max-w-prose text-sm leading-6 text-slate-600">
              This card uses <span class="font-semibold">rem</span> for padding,
              icon, and spacing. When the user increases their device/browser
              font size, the layout grows proportionally.
            </p>
          </div>

          <!-- Icon bubble: 3rem x 3rem (same as size-12) -->
          <div
            class="grid size-12 place-items-center rounded-2xl bg-teal-600 text-white shadow-sm"
          >
            <span class="text-sm font-semibold">REM</span>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
            class="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
            >padding: 1.25rem</span
          >
          <span
            class="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
            >icon: 3rem</span
          >
          <span
            class="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
            >gaps: rem-based</span
          >
        </div>

        <div class="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          Try setting the root font size to
          <span class="font-semibold">24px</span> — everything stays balanced.
        </div>
      </div>

      <!-- PX-based card -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="text-sm font-semibold text-fuchsia-700">
              PX card (doesn’t scale)
            </div>
            <div class="mt-1 text-xl font-bold tracking-tight text-slate-900">
              “Fixed sizing”
            </div>
            <p class="mt-2 max-w-prose text-sm leading-6 text-slate-600">
              This card intentionally mixes fixed
              <span class="font-semibold">px</span> values with text that
              scales. When the user increases their font size, the layout starts
              to feel cramped or misaligned.
            </p>
          </div>

          <!-- Icon bubble: fixed 48px x 48px -->
          <div
            class="grid size-[48px] place-items-center rounded-2xl bg-fuchsia-600 text-white shadow-sm"
          >
            <span class="text-xs font-semibold">PX</span>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
            class="rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-semibold text-fuchsia-800"
            >icon: 48px</span
          >
          <span
            class="rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-semibold text-fuchsia-800"
            >some gaps: px</span
          >
          <span
            class="rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-semibold text-fuchsia-800"
          >
            text scales separately
          </span>
        </div>

        <div class="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          Set root font size to <span class="font-semibold">24px</span> and
          notice the icon feels small and the spacing looks off compared to the
          text.
        </div>
      </div>
    </div>

    <!-- Extra: your original comparison -->
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="text-sm font-semibold text-slate-800">
        Original comparison
      </div>
      <p class="mt-1 text-sm text-slate-600">
        Left is
        <code class="rounded bg-slate-100 px-1 py-0.5">size-12</code> (3rem),
        right is
        <code class="rounded bg-slate-100 px-1 py-0.5">size-[48px]</code>. They
        match at 16px root font size, but diverge when root changes.
      </p>

      <div class="mt-4 flex gap-3 *:rounded-xl *:shadow-sm">
        <div class="grid size-12 place-items-center bg-teal-600 text-white">
          <span class="text-xs font-semibold">3rem</span>
        </div>
        <div
          class="grid size-[48px] place-items-center bg-slate-900 text-white"
        >
          <span class="text-xs font-semibold">48px</span>
        </div>
        <GradientText text="Add a splash of color!" />
        <GradientText text="Add a splash of color!" show-border />
      </div>
    </div>
    <GradientText text="Add a splash of color!" />
    <GradientText text="Add a splash of color!" show-border />
  </div>
</template>
