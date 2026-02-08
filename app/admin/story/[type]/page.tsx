import { storyConfigs, storyTypes } from "@/config/stories";
import { notFound } from "next/navigation";
import StoryPageClient from "./client";

export function generateStaticParams() {
  return storyTypes.map((type) => ({ type }));
}

export default async function StoryPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const config = storyConfigs[type];

  if (!config) {
    notFound();
  }

  return <StoryPageClient type={type} />;
}
