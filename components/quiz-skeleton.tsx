export function QuizSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto animate-pulse">
      {/* Emoji/Icon placeholder */}
      <div className="text-6xl mb-6 text-center text-cream/20">🍷</div>

      {/* Title placeholder */}
      <div className="h-9 bg-cream/10 rounded-lg mb-3 w-3/4 mx-auto" />

      {/* Subtitle placeholder */}
      <div className="h-4 bg-cream/5 rounded-lg mb-2 w-1/2 mx-auto" />

      {/* Description placeholder */}
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-cream/5 rounded-lg w-full" />
        <div className="h-4 bg-cream/5 rounded-lg w-5/6 mx-auto" />
      </div>

      {/* Button placeholder */}
      <div className="h-11 bg-gold/20 rounded-full w-40 mx-auto" />
    </div>
  );
}
