<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="max-w-6xl space-y-8 mx-auto">
    <HeroCard>
      <template #left>
        <div class="space-y-4">
          <!-- Header row -->
          <div class="flex items-start gap-4">
            <div
              class="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-base-300/60"
            >
              <Icon icon="ph:hand-peace-light" class="size-6" />
            </div>

            <div class="space-y-2">
              <h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">
                Who am I?
              </h2>

              <div
                class="space-y-3 max-w-prose text-base leading-relaxed text-base-content/80"
              >
                <p>
                  I'm Seth. I bought fireworks in Pennsylvania and brought them
                  across state lines. They’re hidden in my attic as I count down
                  the days to my imminent arrest.
                </p>

                <p>
                  My dog is built on efficiency, a fifty-pound bag of food lasts
                  about 400 days. I stopped believing in favorite colors in
                  January 2021, but it was purple.
                </p>

                <p>
                  Not a fan of anime but I like Chainsaw Man. I think smoking
                  cigarettes looks cool and I would probably do it if they
                  didn’t make me sick.
                </p>

                <p>Enjoy the Rita pics.</p>
              </div>
            </div>
          </div>

          <!-- Badges -->
          <div class="flex flex-wrap gap-2">
            <div class="badge badge-primary badge-outline gap-2 py-3">
              <Icon icon="streamline:fireworks-rocket" class="size-4" />
              crime
            </div>

            <div class="badge badge-secondary badge-outline gap-2 py-3">
              <Icon icon="solar:paw-outline" class="size-4" />
              efficient canine
            </div>
            <div class="badge badge-success badge-outline gap-2 py-3">
              <Icon icon="mdi:palette-outline" class="size-4" />
              ex-purple
            </div>
            <div class="badge badge-info badge-outline gap-2 py-3">
              <Icon icon="game-icons:chainsaw" class="size-4" />
              chainsaw man
            </div>
            <div class="badge badge-accent badge-outline gap-2 py-3">
              <Icon icon="ph:cigarette-light" class="size-4" />
              unfortunate
            </div>
          </div>
        </div>
      </template>

      <template #right>
        <div
          class="card border border-base-300 bg-base-100 shadow-sm overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="relative">
            <img src="/images/rita/seth-and-rita.png" alt="Seth, and Rita"
            loading="lazy" class="w-full block object-cover h-[26rem]
            sm:h-[28rem] md:h-[40rem] lg:h-[20rem] [object-position:50%_12%]
            lg:object-top"" />
          </div>
        </div>
      </template>
    </HeroCard>

    <ChromaGrid />
  </div>
</template>
