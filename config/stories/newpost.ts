import type { StoryConfig } from "./index";

export const newpostConfig: StoryConfig = {
  type: "newpost",
  title: "Nouveau post / Réel",
  filename: "episteme-nouveau-post",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    {
      name: "format",
      label: "Format",
      type: "toggle",
      default: "post",
      options: [
        { id: "post", label: "Post (1:1)" },
        { id: "reel", label: "Réel (9:16)" },
      ],
    },
    {
      name: "variant",
      label: "Variante",
      type: "variant-picker",
      default: "or",
      options: [
        { id: "or", label: "Or", preview: "bg-gradient-to-br from-[#C9A84C]/30 to-[#8C3A44]/20" },
        { id: "pourpre", label: "Pourpre", preview: "bg-gradient-to-br from-[#833AB4]/40 to-[#E1306C]/30" },
        { id: "nuit", label: "Nuit", preview: "bg-gradient-to-br from-[#1a3a5c]/50 to-[#0d2137]/40" },
        { id: "vin", label: "Vin", preview: "bg-gradient-to-br from-[#6B1D2A]/40 to-[#3D0F18]/30" },
      ],
    },
    { name: "caption", label: "Accroche", type: "text", default: "Ça vient de sortir !", width: "full" },
  ],
  hint: "Colle une capture de ton post ou réel sur l'emplacement prévu dans Insta.",
};
