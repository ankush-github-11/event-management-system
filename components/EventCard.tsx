"use client";

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";
import type { IEvent } from "@/database/event.model";

type EventCardProps = Pick<
  IEvent,
  "title" | "image" | "slug" | "location" | "date"
>;

const EventCard = ({ title, image, slug, location, date }: EventCardProps) => {
  const eventDate = new Date(date);

  const formattedDate = eventDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = eventDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleEventCardClick = () => {
    posthog.capture("event_card_clicked", {
      event_title: title,
      event_slug: slug,
      event_location: location,
      event_date: date,
    });
  };

  return (
    <Link
      href={`/events/${slug}`}
      id="event-card"
      onClick={handleEventCardClick}
    >
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />

      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p>{location}</p>
      </div>

      <p className="title">{title}</p>

      <div className="datetime">
        <div className="flex items-center gap-1">
          <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
          <p>{formattedDate}</p>
        </div>

        <div className="flex items-center gap-1">
          <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
          <p>{formattedTime}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
