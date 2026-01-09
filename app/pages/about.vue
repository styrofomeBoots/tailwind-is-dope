<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="max-w-6xl space-y-8 mx-auto">
    <section
      class="relative overflow-hidden rounded-2xl border bg-base-100/80 backdrop-blur shadow-sm"
    >
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

      <div class="relative p-6 md:p-8 space-y-4">
        <div class="flex items-start gap-4">
          <div
            class="rounded-2xl bg-base-200/70 p-3 shadow-sm ring-1 ring-base-300/70"
          >
            <Icon icon="mdi:information-outline" class="size-6" />
          </div>

          <div class="space-y-2">
            <h2 class="text-2xl font-extrabold tracking-tight md:text-3xl">
              About
            </h2>

            <p class="text-base text-base-content/70 leading-relaxed">
              I bought fireworks in Pennsylvania and brought them across state
              lines. I hid them in my crawlspace as I count down the days to my
              eminent arrest. My dog is economical size, a fifty pound bag of
              food lasts 400 days.
            </p>
          </div>
        </div>
      </div>
    </section>

    <ChromaGrid />
  </div>
</template>
