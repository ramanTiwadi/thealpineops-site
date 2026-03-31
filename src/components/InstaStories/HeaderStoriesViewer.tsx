import { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import baseUrl from "../../constants/baseUrl";
import fallbackStoriesData from "../../data/fallbackStories.json";

type StoryItem = {
  id: string;
  url: string;
  type?: "video";
  header?: {
    heading: string;
    subheading: string;
    profileImage: string;
  };
};

type IgStoriesPayload = {
  items: Array<{
    id: string;
    mediaType: "IMAGE" | "VIDEO";
    mediaUrl: string;
    timestamp: string;
  }>;
};

type HeaderStoriesViewerProps = {
  open: boolean;
  onClose: () => void;
};

const fallbackStories: StoryItem[] = [
  ...fallbackStoriesData,
].map((path, index) => ({
  id: `fallback-${index + 1}`,
  url: `${baseUrl}${path.slice(1)}`,
}));

const instagramProfileUrl = "https://www.instagram.com/thealpineops";

const HeaderStoriesViewer = ({ open, onClose }: HeaderStoriesViewerProps) => {
  const [stories, setStories] = useState<StoryItem[]>(fallbackStories);

  useEffect(() => {
    const controller = new AbortController();

    const loadStories = async () => {
      try {
        const response = await fetch(`${baseUrl}ig-stories.json`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) return;

        const payload = (await response.json()) as IgStoriesPayload;
        if (!payload.items || payload.items.length === 0) return;

        const mappedStories = payload.items
          .filter((item) => item.mediaUrl)
          .map((item, index) => ({
            id: item.id || `ig-${index + 1}`,
            url: item.mediaUrl,
            type: item.mediaType === "VIDEO" ? ("video" as const) : undefined,
            header: {
              heading: "Alpine Ops",
              subheading: new Date(item.timestamp).toLocaleDateString(),
              profileImage: `${baseUrl}assets/images/logo.png`,
            },
          }));

        if (mappedStories.length > 0) {
          setStories(mappedStories);
        }
      } catch {
        // Keep fallback stories if feed fetch fails.
      }
    };

    void loadStories();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="headerStoriesViewer" role="dialog" aria-modal="true">
      <a
        className="headerStoriesProfile"
        href={instagramProfileUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Instagram profile"
      >
        <img
          src={`${baseUrl}assets/images/logo.png`}
          alt="The Alpine Ops logo"
        />
        <span>@thealpineops</span>
      </a>
      <button
        type="button"
        className="headerStoriesClose"
        onClick={onClose}
        aria-label="Close stories"
      >
        x
      </button>
      <div className="headerStoriesFrame">
        <Stories
          stories={stories}
          width="100%"
          height="100%"
          defaultInterval={4500}
          keyboardNavigation
          onAllStoriesEnd={onClose}
        />
      </div>
    </div>
  );
};

export default HeaderStoriesViewer;
