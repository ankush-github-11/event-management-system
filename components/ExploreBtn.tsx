"use client";
import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
  const handleExploreClick = () => {
    posthog.capture("explore_events_clicked");
  };

  return (
    <button type="button" id="explore-btn" className="mx-auto mt-7" onClick={handleExploreClick}>
        <a href="#events">
            Explore Events
            <Image src="/icons/arrow-down.svg" alt="Arrow Down" width={20} height={20}></Image>
        </a>
    </button>
  )
}

export default ExploreBtn
