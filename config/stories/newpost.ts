import type { StoryConfig } from "./index";

export const newpostConfig: StoryConfig = {
  type: "newpost",
  title: "Nouveau post / Réel",
  filename: "episteme-nouveau-post",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    {
      name: "postImage",
      label: "Image du post/réel",
      type: "image-upload",
      default: "",
      hint: "Les couleurs s'adapteront automatiquement",
    },
    {
      name: "format",
      label: "Format",
      type: "toggle",
      default: "post",
      options: [
        { id: "post", label: "Post (4:5)" },
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
        { id: "emeraude", label: "Émeraude", preview: "bg-gradient-to-br from-[#50C896]/30 to-[#105A46]/40" },
        { id: "saphir", label: "Saphir", preview: "bg-gradient-to-br from-[#4682DC]/30 to-[#14326E]/40" },
        { id: "ambre", label: "Ambre", preview: "bg-gradient-to-br from-[#FFA046]/30 to-[#8C4614]/40" },
        { id: "rose", label: "Rose", preview: "bg-gradient-to-br from-[#FF96B4]/30 to-[#8C3250]/40" },
        { id: "olive", label: "Olive", preview: "bg-gradient-to-br from-[#B4BE78]/30 to-[#505532]/40" },
        { id: "lavande", label: "Lavande", preview: "bg-gradient-to-br from-[#B496E6]/30 to-[#503C78]/40" },
      ],
    },
    { name: "caption", label: "Accroche", type: "text", default: "Ça vient de sortir !", width: "full" },
  ],
  hint: "Upload ton post/réel et les couleurs s'adapteront automatiquement ! Tu peux aussi télécharger sans image.",
};
