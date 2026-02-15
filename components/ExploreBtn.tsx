"use client";
import Image from "next/image";
const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mx-auto mt-7">
        <a href="#events">
            Explore Events
            <Image src="/icons/arrow-down.svg" alt="Arrow Down" width={20} height={20}></Image>
        </a>
    </button>
  )
}

export default ExploreBtn
