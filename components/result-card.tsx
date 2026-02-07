import type { WineResult } from "../config/quiz";

interface ResultCardProps {
  result: WineResult;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <div
      className="rounded-3xl p-8 border border-cream/10"
      style={{ background: result.color }}
    >
      <p
        className="text-xs uppercase tracking-[3px] mb-4"
        style={{ color: result.accent }}
      >
        Tu es un
      </p>
      <div className="text-5xl mb-4">{result.emoji}</div>
      <h2 className="font-(family-name:--font-playfair) text-3xl font-bold mb-1 text-cream">
        {result.name}
      </h2>
      <p
        className="font-(family-name:--font-playfair) italic text-lg mb-5"
        style={{ color: result.accent }}
      >
        {result.title}
      </p>
      <p className="text-sm text-cream/60 leading-relaxed mb-6 max-w-xs mx-auto">
        {result.description}
      </p>
      <div className="flex justify-center gap-2 flex-wrap">
        {result.traits.map((trait) => (
          <span
            key={trait}
            className="text-xs px-3 py-1.5 rounded-full border"
            style={{
              borderColor: result.accent + "40",
              color: result.accent,
            }}
          >
            {trait}
          </span>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-cream/8">
        <p className="text-[11px] text-cream/25 tracking-wide">
          @asso_episteme
        </p>
      </div>
    </div>
  );
}
