"use client";

import { useRef, useState, type ReactNode, type RefObject } from "react";
import { toPng } from "html-to-image";
import type { StoryConfig, StoryField } from "@/config/stories";

// Extract dominant color from image
function extractColorFromImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve("or");
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Sample colors from center area
        const samples = 100;
        const colors: { r: number; g: number; b: number }[] = [];
        const startX = Math.floor(img.width * 0.25);
        const startY = Math.floor(img.height * 0.25);
        const endX = Math.floor(img.width * 0.75);
        const endY = Math.floor(img.height * 0.75);

        for (let i = 0; i < samples; i++) {
          const x = startX + Math.floor(Math.random() * (endX - startX));
          const y = startY + Math.floor(Math.random() * (endY - startY));
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          colors.push({ r: pixel[0], g: pixel[1], b: pixel[2] });
        }

        // Calculate average color
        const avg = colors.reduce(
          (acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }),
          { r: 0, g: 0, b: 0 }
        );
        avg.r = Math.floor(avg.r / samples);
        avg.g = Math.floor(avg.g / samples);
        avg.b = Math.floor(avg.b / samples);

        // Determine which variant matches best
        const variant = getVariantFromColor(avg.r, avg.g, avg.b);
        resolve(variant);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function getVariantFromColor(r: number, g: number, b: number): string {
  // Calculate hue, saturation, lightness
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2 / 255;

  if (max === min) return "nuit"; // grayscale

  const d = max - min;
  const s = l > 0.5 ? d / (510 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  // Map hue to variant
  if (s < 0.2) return l > 0.5 ? "or" : "nuit";

  const hue = h * 360;
  if (hue < 30) return "ambre"; // red-orange
  if (hue < 60) return "ambre"; // orange-yellow
  if (hue < 90) return "olive"; // yellow-green
  if (hue < 150) return "emeraude"; // green
  if (hue < 210) return "nuit"; // cyan-blue
  if (hue < 270) return "saphir"; // blue
  if (hue < 300) return "lavande"; // blue-purple
  if (hue < 330) return "pourpre"; // purple-magenta
  return "rose"; // magenta-red
}

interface StoryEditorProps {
  config: StoryConfig;
  children: (state: Record<string, string>, ref: RefObject<HTMLDivElement | null>) => ReactNode;
}

export function StoryEditor({ config, children }: StoryEditorProps) {
  const storyRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  // Initialize state from config fields
  const [state, setState] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const field of config.fields) {
      initial[field.name] = field.default;
    }
    return initial;
  });

  function updateField(name: string, value: string) {
    setState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleImageUpload(file: File) {
    const variant = await extractColorFromImage(file);
    setState((prev) => ({ ...prev, variant }));
  }

  async function handleDownload() {
    if (!storyRef.current || generating) return;
    setGenerating(true);

    // Hide elements marked for exclusion from export
    const excludedElements = storyRef.current.querySelectorAll('[data-exclude-from-export="true"]');
    const originalDisplays: string[] = [];
    excludedElements.forEach((el, i) => {
      originalDisplays[i] = (el as HTMLElement).style.display;
      (el as HTMLElement).style.display = "none";
    });

    try {
      const dataUrl = await toPng(storyRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `${config.filename}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        try {
          const dataUrl = await toPng(storyRef.current!, { pixelRatio: 3 });
          const link = document.createElement("a");
          link.download = `${config.filename}.png`;
          link.href = dataUrl;
          link.click();
        } catch {}
      }
    } finally {
      // Restore visibility of excluded elements
      excludedElements.forEach((el, i) => {
        (el as HTMLElement).style.display = originalDisplays[i];
      });
      setGenerating(false);
    }
  }

  // Get dynamic hint based on state (for newpost format-dependent hint)
  const hint = config.hint;

  // Group fields by rows for half-width layout
  const fieldRows = groupFieldRows(config.fields);

  return (
    <div className="min-h-screen bg-dark flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 p-6 lg:p-12">
      <div className="w-full max-w-sm flex flex-col gap-5 lg:sticky lg:top-12">
        <a
          href="/admin"
          className="flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors w-fit"
        >
          <span className="text-base leading-none">&larr;</span>
          Retour
        </a>
        <h1 className="font-(family-name:--font-playfair) text-2xl font-bold text-cream">
          {config.title}
        </h1>

        {fieldRows.map((row, i) => (
          <FieldRow
            key={i}
            row={row}
            state={state}
            emojis={config.emojis}
            onChange={updateField}
            onImageUpload={handleImageUpload}
          />
        ))}

        {hint && (
          <p className="text-cream/30 text-xs leading-relaxed bg-dark-card/50 rounded-xl px-4 py-3 border border-cream/5">
            {hint}
          </p>
        )}

        <button
          onClick={handleDownload}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(225,48,108,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-wait mt-2"
        >
          {generating ? "Génération..." : "Télécharger la story"}
        </button>

        <p className="text-cream/20 text-xs text-center">
          Image {config.dimensions.width}×{config.dimensions.height} — prête pour Instagram Stories
        </p>
      </div>

      <div className="overflow-hidden shrink-0 h-[768px] w-[432px] sm:h-[960px] sm:w-[540px] lg:h-[768px] lg:w-[432px]">
        <div className="origin-top-left scale-[0.4] sm:scale-[0.5] lg:scale-[0.4]">
          {children(state, storyRef)}
        </div>
      </div>
    </div>
  );
}

// Group consecutive half-width fields into rows
function groupFieldRows(fields: StoryField[]): (StoryField | StoryField[])[] {
  const rows: (StoryField | StoryField[])[] = [];
  let i = 0;
  while (i < fields.length) {
    if (fields[i].width === "half" && i + 1 < fields.length && fields[i + 1].width === "half") {
      rows.push([fields[i], fields[i + 1]]);
      i += 2;
    } else {
      rows.push(fields[i]);
      i++;
    }
  }
  return rows;
}

function FieldRow({
  row,
  state,
  emojis,
  onChange,
  onImageUpload,
}: {
  row: StoryField | StoryField[];
  state: Record<string, string>;
  emojis?: string[];
  onChange: (name: string, value: string) => void;
  onImageUpload?: (file: File) => void;
}) {
  if (Array.isArray(row)) {
    return (
      <div className="flex gap-3">
        {row.map((field) => (
          <div key={field.name} className="flex-1">
            <FieldInput
              field={field}
              value={state[field.name]}
              emojis={emojis}
              onChange={onChange}
              onImageUpload={onImageUpload}
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <FieldInput
      field={row}
      value={state[row.name]}
      emojis={emojis}
      onChange={onChange}
      onImageUpload={onImageUpload}
    />
  );
}

function FieldInput({
  field,
  value,
  emojis,
  onChange,
  onImageUpload,
}: {
  field: StoryField;
  value: string;
  emojis?: string[];
  onChange: (name: string, value: string) => void;
  onImageUpload?: (file: File) => void;
}) {
  switch (field.type) {
    case "text":
      return (
        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
            {field.label}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="w-full bg-dark-card/80 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-gold/40 transition-colors"
          />
        </div>
      );

    case "textarea":
      return (
        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
            {field.label}
          </label>
          <textarea
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            rows={field.rows ?? 3}
            className="w-full bg-dark-card/80 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-gold/40 transition-colors resize-none"
          />
        </div>
      );

    case "emoji-picker":
      return (
        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
            {field.label}
          </label>
          <div className="flex flex-wrap gap-2">
            {(emojis ?? []).map((e) => (
              <button
                key={e}
                onClick={() => onChange(field.name, e)}
                className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                  value === e
                    ? "bg-gold/20 border-2 border-gold/60 scale-110"
                    : "bg-dark-card/80 border border-cream/10 hover:border-cream/25"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      );

    case "toggle":
      return (
        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
            {field.label}
          </label>
          <div className="flex gap-2 p-1 bg-dark-card/80 rounded-xl border border-cream/10">
            {field.options?.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onChange(field.name, opt.id)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  value === opt.id
                    ? "bg-gold/15 text-gold border border-gold/30"
                    : "text-cream/40 hover:text-cream/60 border border-transparent"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      );

    case "variant-picker":
      return (
        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
            {field.label}
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {field.options?.map((v) => (
              <button
                key={v.id}
                onClick={() => onChange(field.name, v.id)}
                className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-all cursor-pointer border ${
                  value === v.id
                    ? "border-cream/30 scale-105"
                    : "border-cream/8 hover:border-cream/20"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full ${v.preview ?? ""} border border-white/10`}
                />
                <span className="text-[9px] text-cream/50 leading-none">{v.label}</span>
              </button>
            ))}
          </div>
        </div>
      );

    case "image-upload":
      return (
        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
            {field.label}
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                // Convert to data URL
                const reader = new FileReader();
                reader.onload = () => {
                  onChange(field.name, reader.result as string);
                };
                reader.readAsDataURL(file);

                // Extract color and update variant
                if (onImageUpload) {
                  onImageUpload(file);
                }
              }}
              className="hidden"
              id={`file-${field.name}`}
            />
            <label
              htmlFor={`file-${field.name}`}
              className="block w-full bg-dark-card/80 border border-cream/10 rounded-xl px-4 py-3 text-cream/50 text-sm cursor-pointer hover:border-cream/25 transition-colors"
            >
              {value ? (
                <div className="flex items-center gap-3">
                  <img src={value} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                  <span className="text-cream/70">Image chargée • Cliquer pour changer</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-2">
                  <span className="text-lg">📸</span>
                  <span>Sélectionner une image</span>
                </div>
              )}
            </label>
          </div>
          {field.hint && (
            <p className="text-cream/25 text-[10px] mt-1.5 leading-relaxed">{field.hint}</p>
          )}
        </div>
      );
  }
}
