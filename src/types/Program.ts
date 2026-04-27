export interface Program {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  highlights: string[];
  location: string;
  date: string;
  duration: string;
  status: "Open" | "Coming Soon" | "Closed" | "to be announced";
  image?: string;
  gallery?: string[];
  detail: {
    eyebrow: string;
    expectTitle: string;
    snapshotTitle: string;
    snapshot: string[] | string;
    snapshotChips: string[];
    factLabels: {
      location: string;
      date: string;
      duration: string;
    };
    quickFacts: {
      icon: "duration" | "tourType" | "groupSize" | "tourGuide";
      label: string;
      value: string;
    }[];
    showPricing?: boolean;
    pricing?: {
      title: string;
      items: {
        label: string;
        value: string;
      }[];
      note?: string;
    };
    primaryCtaLabel: string;
    primaryCtaUrl: string;
    footerNote: string;
    footerCtaLabel: string;
    footerCtaUrl: string;
    showStay?: boolean;
    stay: {
      title: string;
      summary: string;
      highlights: string[];
      images: string[];
    };
    showTrainingPlan?: boolean;
    trainingPlan: {
      title: string;
      days: {
        day: string;
        heading: string;
        items: string[];
      }[];
    };
    showInclusionsExclusions?: boolean;
    inclusionsExclusions: {
      title: string;
      inclusionsTitle: string;
      exclusionsTitle: string;
      inclusions: string[];
      exclusions: string[];
    };
    showJoinCriteria?: boolean;
    joinCriteria: {
      whoCanJoinTitle: string;
      whoCanJoin: string[];
      whoShouldJoinTitle: string;
      whoShouldJoin: string[];
    };
  };
}
