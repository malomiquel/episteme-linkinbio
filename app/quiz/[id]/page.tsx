import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { quizzes } from "../../../config/quizzes";
import { QuizSkeleton } from "../../../components/quiz-skeleton";

const Quiz = dynamic(() => import("../../../components/quiz").then(m => ({ default: m.Quiz })), {
  loading: () => <QuizSkeleton />,
  ssr: true,
});

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  return Object.keys(quizzes).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const quiz = quizzes[id];
  if (!quiz) return {};

  return {
    title: `${quiz.title} | Episteme`,
    description: quiz.description,
    openGraph: {
      title: `${quiz.title} | Episteme`,
      description: quiz.description,
      type: "website",
    },
  };
}

export default async function QuizPage({ params }: { params: Params }) {
  const { id } = await params;
  const quiz = quizzes[id];

  if (!quiz) notFound();

  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>
      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-5 py-10 font-(family-name:--font-inter)">
        <Quiz config={quiz.config} />
      </div>
    </>
  );
}
