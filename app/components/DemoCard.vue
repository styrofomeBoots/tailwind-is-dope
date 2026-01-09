<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface DemoCardProps {
  title: string;
  description: string;
  tone?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "info"
    | "warning"
    | "error";
  icon?: string;
}

const props = defineProps<DemoCardProps>();

const toneToBorder: Record<NonNullable<DemoCardProps["tone"]>, string> = {
  primary: "border-primary/30",
  secondary: "border-secondary/30",
  accent: "border-accent/30",
  success: "border-success/30",
  info: "border-info/30",
  warning: "border-warning/30",
  error: "border-error/30",
};

const toneToBg: Record<NonNullable<DemoCardProps["tone"]>, string> = {
  primary: "bg-primary/5",
  secondary: "bg-secondary/5",
  accent: "bg-accent/5",
  success: "bg-success/5",
  info: "bg-info/5",
  warning: "bg-warning/5",
  error: "bg-error/5",
};

const toneToText: Record<NonNullable<DemoCardProps["tone"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  success: "text-success",
  info: "text-info",
  warning: "text-warning",
  error: "text-error",
};

const toneToIconWrap: Record<NonNullable<DemoCardProps["tone"]>, string> = {
  primary: "bg-primary/10",
  secondary: "bg-secondary/10",
  accent: "bg-accent/10",
  success: "bg-success/10",
  info: "bg-info/10",
  warning: "bg-warning/10",
  error: "bg-error/10",
};

const tone = props.tone ?? "primary";

const cardClasses = [
  "card",
  "bg-base-100",
  "shadow-sm",
  "border",
  toneToBorder[tone],
  toneToBg[tone],
  "transition",
  "hover:-translate-y-0.5",
  "hover:shadow-md",
].join(" ");

const iconWrapClasses = [
  "rounded-2xl",
  "p-3",
  toneToIconWrap[tone],
  "ring-1",
  "ring-base-300/60",
  toneToText[tone],
].join(" ");

const headerTitleClasses = ["text-lg", "font-bold"].join(" ");
const headerDescClasses = ["text-sm", "text-base-content/70"].join(" ");

const chosenIcon: string = props.icon ?? "mdi:sparkles";
</script>

<template>
  <div :class="cardClasses">
    <div class="card-body gap-4">
      <div class="flex items-start gap-4">
        <div :class="iconWrapClasses">
          <Icon :icon="chosenIcon" class="size-6" />
        </div>

        <div class="min-w-0 space-y-1">
          <h3 :class="headerTitleClasses">{{ title }}</h3>
          <p :class="headerDescClasses">{{ description }}</p>
        </div>
      </div>

      <div class="pt-1">
        <slot />
      </div>
    </div>
  </div>
</template>
