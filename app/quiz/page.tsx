import type { Metadata } from "next";
import { Quiz } from "../../components/quiz";

export const metadata: Metadata = {
  title: "Quel vin es-tu ? | Episteme",
  description:
    "Découvre quel vin te correspond le mieux avec notre quiz de personnalité !",
  openGraph: {
    title: "Quel vin es-tu ? | Episteme",
    description:
      "Découvre quel vin te correspond le mieux avec notre quiz de personnalité !",
    type: "website",
  },
};

export default function QuizPage() {
  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>
      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-5 py-10 font-(family-name:--font-inter)">
        <Quiz />
      </div>
    </>
  );
}
