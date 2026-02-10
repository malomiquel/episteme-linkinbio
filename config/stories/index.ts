export interface StoryField {
  name: string;
  label: string;
  type: "text" | "textarea" | "emoji-picker" | "toggle" | "variant-picker" | "image-upload";
  default: string;
  rows?: number;
  options?: { id: string; label: string; preview?: string }[];
  width?: "full" | "half";
  hint?: string;
}

export interface StoryConfig {
  type: string;
  title: string;
  filename: string;
  dimensions: { width: number; height: number };
  fields: StoryField[];
  emojis?: string[];
  hint?: string;
}

export { annonceConfig } from "./annonce";
export { teaserConfig } from "./teaser";
export { questionConfig } from "./question";
export { pollConfig } from "./poll";
export { factConfig } from "./fact";
export { eventConfig } from "./event";
export { quoteConfig } from "./quote";
export { thisorthatConfig } from "./thisorthat";
export { newpostConfig } from "./newpost";
export { publicationConfig } from "./publication";

import { annonceConfig } from "./annonce";
import { teaserConfig } from "./teaser";
import { questionConfig } from "./question";
import { pollConfig } from "./poll";
import { factConfig } from "./fact";
import { eventConfig } from "./event";
import { quoteConfig } from "./quote";
import { thisorthatConfig } from "./thisorthat";
import { newpostConfig } from "./newpost";
import { publicationConfig } from "./publication";

export const storyConfigs: Record<string, StoryConfig> = {
  annonce: annonceConfig,
  teaser: teaserConfig,
  question: questionConfig,
  poll: pollConfig,
  fact: factConfig,
  event: eventConfig,
  quote: quoteConfig,
  thisorthat: thisorthatConfig,
  newpost: newpostConfig,
  publication: publicationConfig,
};

export const storyTypes = Object.keys(storyConfigs);
