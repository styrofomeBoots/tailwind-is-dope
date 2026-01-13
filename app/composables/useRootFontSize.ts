// ~/composables/useRootFontSize.ts
import { nextTick, ref } from "vue";

export type FontOption = 16 | 18 | 20 | 24;

type ScrollAnchor = { el: Element; top: number };

const fontOptions: readonly FontOption[] = [16, 18, 20, 24] as const;

const activeFont = ref<FontOption>(16);

const findAnchor = (): ScrollAnchor | null => {
  const cards = Array.from(document.querySelectorAll("[data-demo-card]"));
  if (cards.length === 0) return null;

  let best: Element | null = null;
  let bestTop = Number.POSITIVE_INFINITY;

  for (const el of cards) {
    const r = el.getBoundingClientRect();
    const isVisible = r.bottom > 0 && r.top < window.innerHeight;
    if (!isVisible) continue;

    if (r.top >= 0 && r.top < bestTop) {
      bestTop = r.top;
      best = el;
    }
  }

  if (!best) {
    for (const el of cards) {
      const r = el.getBoundingClientRect();
      if (r.top >= 0 && r.top < bestTop) {
        bestTop = r.top;
        best = el;
      }
    }
  }

  if (!best) return null;
  return { el: best, top: best.getBoundingClientRect().top };
};

const restoreAnchor = (a: ScrollAnchor): void => {
  const topAfter = a.el.getBoundingClientRect().top;
  const delta = topAfter - a.top;
  window.scrollBy({ top: delta, left: 0 });
};

const applyRootFont = (px: FontOption): void => {
  document.documentElement.style.fontSize = `${px}px`;
  activeFont.value = px;
};

const setRootFont = async (
  px: FontOption,
  opts?: { preserveDemoScroll?: boolean }
): Promise<void> => {
  if (!import.meta.client) return;

  const preserveDemoScroll = opts?.preserveDemoScroll ?? false;
  const anchor = preserveDemoScroll ? findAnchor() : null;

  applyRootFont(px);

  await nextTick();

  // let layout settle + browser scroll anchoring finish
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (anchor) restoreAnchor(anchor);
    });
  });
};

export const useRootFontSize = (): {
  fontOptions: readonly FontOption[];
  activeFont: typeof activeFont;
  setRootFont: (
    px: FontOption,
    opts?: { preserveDemoScroll?: boolean }
  ) => Promise<void>;
} => {
  return {
    fontOptions,
    activeFont,
    setRootFont,
  };
};
