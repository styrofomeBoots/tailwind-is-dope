<script setup lang="ts">
type Props = {
  showBlobs?: boolean;
  sectionClass?: string;
  contentClass?: string;
  topRowClass?: string;
  leftColClass?: string;
  rightColClass?: string;
};

const props = withDefaults(defineProps<Props>(), {
  showBlobs: true,
  sectionClass: "",
  contentClass: "",
  topRowClass: "",
  leftColClass: "",
  rightColClass: "",
});
</script>

<template>
  <section
    class="relative overflow-hidden rounded-2xl border bg-base-100/80 shadow-sm backdrop-blur"
    :class="sectionClass"
  >
    <!-- soft color blobs -->
    <div
      v-if="showBlobs"
      class="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl"
    />
    <div
      v-if="showBlobs"
      class="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full bg-secondary/15 blur-3xl"
    />
    <div
      v-if="showBlobs"
      class="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
    />
    <div
      class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-base-300/60"
    />

    <div class="relative space-y-6 p-6 md:p-8" :class="contentClass">
      <!-- Top row: left + optional right -->
      <div
        class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"
        :class="topRowClass"
      >
        <div class="space-y-3" :class="leftColClass">
          <slot name="left" />
        </div>

        <div
          v-if="$slots.right"
          class="w-full lg:w-[26rem]"
          :class="rightColClass"
        >
          <slot name="right" />
        </div>
      </div>

      <!-- Anything below (tables, extra sections, etc.) -->
      <slot />
    </div>
  </section>
</template>
