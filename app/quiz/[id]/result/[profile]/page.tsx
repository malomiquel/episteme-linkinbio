import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { quizzes } from "../../../../../config/quizzes";
import { ResultCard } from "../../../../../components/result-card";

type Params = Promise<{ id: string; profile: string }>;

export async function generateStaticParams() {
  return Object.entries(quizzes).flatMap(([id, quiz]) =>
    Object.keys(quiz.config.results).map((profile) => ({ id, profile }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id, profile } = await params;
  const quiz = quizzes[id];
  if (!quiz) return {};

  const result = quiz.config.results[profile];
  if (!result) return {};

  return {
    title: `Je suis ${result.name} ! | ${quiz.config.title}`,
    description: result.description,
    openGraph: {
      title: `${result.emoji} Je suis ${result.name} - ${result.title}`,
      description: `${result.description} Fais le quiz pour d\u00e9couvrir ton r\u00e9sultat !`,
      type: "website",
      images: [`/quiz/${id}/result/${profile}/og`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${result.emoji} Je suis ${result.name} !`,
      description: `${result.title} - Fais le quiz !`,
      images: [`/quiz/${id}/result/${profile}/og`],
    },
  };
}

export default async function ResultPage({ params }: { params: Params }) {
  const { id, profile } = await params;
  const quiz = quizzes[id];

  if (!quiz) notFound();

  const result = quiz.config.results[profile];
  if (!result) notFound();

  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>
      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-5 py-10 font-(family-name:--font-inter)">
        <div className="w-full max-w-md mx-auto text-center">
          <ResultCard result={result} />

          <div className="flex flex-col gap-3 mt-6">
            <a
              href={`/quiz/${id}`}
              data-umami-event="result_page_take_quiz"
              data-umami-event-quiz={id}
              data-umami-event-from={profile}
              className="inline-flex items-center justify-center gap-2 bg-gold text-dark px-7 py-3 rounded-full font-semibold text-sm transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(201,168,76,0.25)]"
            >
              Fais le quiz toi aussi !
            </a>

            <a
              href="https://www.instagram.com/asso_episteme/"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="result_page_follow_instagram"
              data-umami-event-from={profile}
              className="inline-flex items-center justify-center gap-2 bg-dark-card/80 border border-cream/8 text-cream/80 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:border-gold/40 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Suivre @asso_episteme
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
