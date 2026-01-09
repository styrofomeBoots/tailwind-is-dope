// composables/useScopedFont.ts
import { nextTick, ref, type Ref, watch } from "vue";

const fontOptions = [16, 18, 20, 24] as const;
export type FontOption = (typeof fontOptions)[number];

export const useScopedFont = () => {
  const wrapperRef: Ref<HTMLElement | null> = ref(null);
  const activeFont = ref<FontOption>(16);

  const applyFont = async (): Promise<void> => {
    await nextTick();
    if (wrapperRef.value) {
      wrapperRef.value.style.setProperty("font-size", `${activeFont.value}px`);
    }
  };

  const setFont = (px: FontOption): void => {
    activeFont.value = px;
  };

  // Re-apply when font changes
  watch(activeFont, () => {
    void applyFont();
  });

  // Re-apply when wrapperRef becomes available
  watch(wrapperRef, () => {
    void applyFont();
  });

  return {
    wrapperRef,
    activeFont,
    setFont,
    fontOptions,
  };
};
