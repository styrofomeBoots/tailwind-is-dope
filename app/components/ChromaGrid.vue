<script setup lang="ts">
import gsap from "gsap";

interface CardItem {
  image: string;
  alt: string;
  borderColor: string;
  gradient: string;
  url?: string;
}

interface GridMotionProps {
  items?: CardItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  hideOnError?: boolean;
  fadeInOnLoad?: boolean;
  showSkeleton?: boolean;
  debugImageErrors?: boolean;
}

const props = withDefaults(defineProps<GridMotionProps>(), {
  items: () => [],
  className: "",
  radius: 300,
  damping: 0.45,
  fadeOut: 0.6,
  ease: "power3.out",
  hideOnError: true,
  fadeInOnLoad: true,
  showSkeleton: true,
  debugImageErrors: true,
});

const rootRef = useTemplateRef<HTMLElement>("rootRef");
const fadeRef = useTemplateRef<HTMLElement>("fadeRef");
const setX = shallowRef<(value: number | string) => void>();
const setY = shallowRef<(value: number | string) => void>();
const pos = reactive({ x: 0, y: 0 });

const demo: CardItem[] = [
  {
    image: "/images/rita/rita-0.jpg",
    alt: "rita 0",
    borderColor: "#4F46E5",
    gradient: "linear-gradient(145deg,#4F46E5,#000)",
  },
  {
    image: "/images/rita/rita-1.jpg",
    alt: "rita 1",
    borderColor: "#10B981",
    gradient: "linear-gradient(210deg,#10B981,#000)",
  },
  {
    image: "/images/rita/rita-2.jpg",
    alt: "rita 2",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg,#F59E0B,#000)",
  },
  {
    image: "/images/rita/rita-3.jpg",
    alt: "rita 3",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg,#EF4444,#000)",
  },
  {
    image: "/images/rita/rita-4.jpg",
    alt: "rita 4",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg,#8B5CF6,#000)",
  },
  {
    image: "/images/rita/rita-5.jpg",
    alt: "rita 5",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg,#06B6D4,#000)",
  },
  {
    image: "/images/rita/rita-6.jpg",
    alt: "rita 6",
    borderColor: "#4F46E5",
    gradient: "linear-gradient(145deg,#4F46E5,#000)",
  },
  {
    image: "/images/rita/rita-7.jpg",
    alt: "rita 7",
    borderColor: "#10B981",
    gradient: "linear-gradient(210deg,#10B981,#000)",
  },
  {
    image: "/images/rita/rita-8.jpg",
    alt: "rita 8",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg,#F59E0B,#000)",
  },
  {
    image: "/images/rita/rita-9.jpg",
    alt: "rita 9",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg,#EF4444,#000)",
  },
  {
    image: "/images/rita/rita-10.jpg",
    alt: "rita 10",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg,#8B5CF6,#000)",
  },
  {
    image: "/images/rita/rita-11.jpg",
    alt: "rita 11",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg,#06B6D4,#000)",
  },
  {
    image: "/images/rita/rita-12.jpg",
    alt: "rita 12",
    borderColor: "#4F46E5",
    gradient: "linear-gradient(145deg,#4F46E5,#000)",
  },
  {
    image: "/images/rita/rita-13.jpg",
    alt: "rita 13",
    borderColor: "#10B981",
    gradient: "linear-gradient(210deg,#10B981,#000)",
  },
  {
    image: "/images/rita/rita-14.jpg",
    alt: "rita 14",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg,#F59E0B,#000)",
  },
  {
    image: "/images/rita/rita-15.jpg",
    alt: "rita 15",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg,#EF4444,#000)",
  },
  {
    image: "/images/rita/rita-16.jpg",
    alt: "rita 16",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg,#8B5CF6,#000)",
  },
  {
    image: "/images/rita/rita-17.jpg",
    alt: "rita 17",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg,#06B6D4,#000)",
  },
  {
    image: "/images/rita/rita-18.jpg",
    alt: "rita 18",
    borderColor: "#4F46E5",
    gradient: "linear-gradient(145deg,#4F46E5,#000)",
  },
  {
    image: "/images/rita/rita-19.jpg",
    alt: "rita 19",
    borderColor: "#10B981",
    gradient: "linear-gradient(210deg,#10B981,#000)",
  },
];

const data = computed(() => (props.items.length ? props.items : demo));

/**
 * Track image load state per card.
 * IMPORTANT:
 * - do NOT hide the <img> with display:none while pending + lazy loading,
 *   or the request may never start and you'll stay in "pending" forever.
 * - instead, render the <img> and overlay a skeleton until it loads.
 */
type LoadState = "pending" | "loaded" | "error";
const loadStateByKey = shallowRef<Record<string, LoadState>>({});

const keyFor = (c: CardItem, i: number): string => `${c.image}__${i}`;

const setLoadState = (key: string, state: LoadState): void => {
  loadStateByKey.value = { ...loadStateByKey.value, [key]: state };
};

const getLoadState = (key: string): LoadState =>
  loadStateByKey.value[key] ?? "pending";

const isLoaded = (key: string): boolean => getLoadState(key) === "loaded";
const isError = (key: string): boolean => getLoadState(key) === "error";

/**
 * Cards we allow to render:
 * - if hideOnError = true -> remove failed images
 * - else -> keep them, but show fallback UI
 */
const visibleCards = computed((): (CardItem & { _key: string })[] => {
  return data.value
    .map((c, i) => ({ ...c, _key: keyFor(c, i) }))
    .filter((c) => (props.hideOnError ? !isError(c._key) : true));
});

const onImgLoad = (key: string): void => {
  setLoadState(key, "loaded");
};

const onImgError = (key: string, src: string): void => {
  setLoadState(key, "error");

  if (props.debugImageErrors) {
    // eslint-disable-next-line no-console
    console.warn("[GridMotion] image failed:", src);
  }
};

onMounted(() => {
  const el = rootRef.value;
  if (!el) return;

  setX.value = gsap.quickSetter(el, "--x", "px") as (
    value: number | string
  ) => void;
  setY.value = gsap.quickSetter(el, "--y", "px") as (
    value: number | string
  ) => void;

  const { width, height } = el.getBoundingClientRect();
  pos.x = width / 2;
  pos.y = height / 2;

  setX.value?.(pos.x);
  setY.value?.(pos.y);
});

const moveTo = (x: number, y: number): void => {
  gsap.to(pos, {
    x,
    y,
    duration: props.damping,
    ease: props.ease,
    onUpdate: () => {
      setX.value?.(pos.x);
      setY.value?.(pos.y);
    },
    overwrite: true,
  });
};

const handleMove = (e: PointerEvent): void => {
  const r = rootRef.value?.getBoundingClientRect();
  if (!r) return;

  moveTo(e.clientX - r.left, e.clientY - r.top);

  if (fadeRef.value) {
    gsap.to(fadeRef.value, { opacity: 0, duration: 0.25, overwrite: true });
  }
};

const handleLeave = (): void => {
  if (fadeRef.value) {
    gsap.to(fadeRef.value, {
      opacity: 1,
      duration: props.fadeOut,
      overwrite: true,
    });
  }
};

const handleCardClick = (url?: string): void => {
  if (url) window.open(url, "_blank", "noopener,noreferrer");
};

const handleCardMove = (e: MouseEvent): void => {
  const c = e.currentTarget as HTMLElement;
  const rect = c.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  c.style.setProperty("--mouse-x", `${x}px`);
  c.style.setProperty("--mouse-y", `${y}px`);
};

const spotlightStyle: Record<string, string> = {
  backdropFilter: "grayscale(1) brightness(0.78)",
  WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
  background: "rgba(0,0,0,0.001)",
  maskImage:
    "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
  WebkitMaskImage:
    "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
};

const fadeStyle: Record<string, string | number> = {
  ...spotlightStyle,
  maskImage:
    "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
  WebkitMaskImage:
    "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
  opacity: 1,
};
</script>

<template>
  <div
    ref="rootRef"
    class="relative w-full h-full overflow-hidden rounded-[24px]"
    :class="props.className"
    :style="{
      '--r': `${props.radius}px`,
      '--x': '50%',
      '--y': '50%',
    }"
    @pointermove="handleMove"
    @pointerleave="handleLeave"
  >
    <div
      class="columns-1 sm:columns-2 lg:columns-3 gap-0 [column-fill:_balance] [line-height:0]"
    >
      <article
        v-for="(c, i) in visibleCards"
        :key="c._key"
        class="group relative mb-0 inline-block w-full break-inside-avoid border border-[#333] hover:border-[var(--card-border)] transition-all duration-300"
        :style="{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--card-border': c.borderColor || 'transparent',
          '--spotlight-color': 'rgba(255,255,255,0.3)',
          background: c.gradient,
        }"
        @mousemove="handleCardMove"
        @click="handleCardClick(c.url)"
      >
        <div
          class="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
          :style="{
            background:
              'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)',
          }"
        />

        <div
          class="relative z-10 p-[10px] box-border bg-transparent transition-colors duration-300"
        >
          <div class="relative">
            <!-- Skeleton overlay while pending -->
            <div
              v-if="props.showSkeleton && getLoadState(c._key) === 'pending'"
              class="absolute inset-0 rounded-[10px] bg-base-200/50 animate-pulse z-10"
            />

            <!-- Optional fallback if hideOnError=false -->
            <div
              v-if="!props.hideOnError && getLoadState(c._key) === 'error'"
              class="w-full aspect-[4/3] rounded-[10px] bg-base-200/40 grid place-items-center text-xs text-base-content/60"
            >
              Image failed
            </div>

            <img
              v-if="getLoadState(c._key) !== 'error' || !props.hideOnError"
              :src="c.image"
              :alt="c.alt"
              loading="lazy"
              class="w-full h-auto object-cover rounded-[10px] block"
              :style="{
                opacity: !props.fadeInOnLoad || isLoaded(c._key) ? 1 : 0,
                transition: 'opacity 250ms ease',
              }"
              @load="onImgLoad(c._key)"
              @error="onImgError(c._key, c.image)"
            />
          </div>
        </div>
      </article>
    </div>

    <div
      class="absolute inset-0 pointer-events-none z-30"
      :style="spotlightStyle"
    />
    <div
      ref="fadeRef"
      class="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
      :style="fadeStyle"
    />
  </div>
</template>
