"use client";

import { storyConfigs } from "@/config/stories";
import { StoryEditor } from "@/components/admin/story-editor";

import AnnonceContent from "./content/annonce";
import TeaserContent from "./content/teaser";
import QuestionContent from "./content/question";
import PollContent from "./content/poll";
import FactContent from "./content/fact";
import EventContent from "./content/event";
import QuoteContent from "./content/quote";
import ThisOrThatContent from "./content/thisorthat";
import NewPostContent from "./content/newpost";
import PublicationContent from "./content/publication";
import UrgenceContent from "./content/urgence";
import DiffusionContent from "./content/diffusion";
import MatchAnnonceContent from "./content/match-annonce";

type StoryComponent = React.ForwardRefExoticComponent<
  object & React.RefAttributes<HTMLDivElement>
>;

const contentMap = {
  annonce: AnnonceContent,
  teaser: TeaserContent,
  question: QuestionContent,
  poll: PollContent,
  fact: FactContent,
  event: EventContent,
  quote: QuoteContent,
  thisorthat: ThisOrThatContent,
  newpost: NewPostContent,
  publication: PublicationContent,
  urgence: UrgenceContent,
  diffusion: DiffusionContent,
  "match-annonce": MatchAnnonceContent,
} as Record<string, StoryComponent>;

export default function StoryPageClient({ type }: { type: string }) {
  const config = storyConfigs[type];
  const ContentComponent = contentMap[type];

  return (
    <StoryEditor config={config}>
      {(state, ref) => <ContentComponent ref={ref} {...state} />}
    </StoryEditor>
  );
}
