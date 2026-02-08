import type { StoryConfig } from "./index";

export const quoteConfig: StoryConfig = {
  type: "quote",
  title: "Story Citation",
  filename: "episteme-citation",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    { name: "quote", label: "Citation", type: "textarea", default: "Le vin est la lumière du soleil, assemblée par l\u2019eau.", rows: 3, width: "full" },
    { name: "author", label: "Auteur", type: "text", default: "Galilée", width: "full" },
  ],
};
