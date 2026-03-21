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
      onClick={handleEventCardClick}
      className="group w-full max-w-[410px] rounded-xl overflow-hidden bg-linear-to-br from-white/15 to-white/5 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-white/40"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 sm:h-64 md:h-72">
        <Image
          src={image}
          alt={title}
          width={410}
          height={300}
          className="rounded-lg w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Container */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
          <Image src="/icons/pin.svg" alt="location" width={16} height={16} className="shrink-0" />
          <p className="line-clamp-1 truncate">{location}</p>
        </div>

        {/* DateTime Section */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
            <Image src="/icons/calendar.svg" alt="date" width={16} height={16} className="shrink-0" />
            <p className="font-medium">{formattedDate}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
            <Image src="/icons/clock.svg" alt="time" width={16} height={16} className="shrink-0" />
            <p className="font-medium">{formattedTime}</p>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="pt-2">
          <button className="w-full px-4 py-2 mt-2 bg-linear-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 border border-blue-400/30 hover:border-blue-400/60 rounded-lg text-sm font-semibold text-blue-200 transition-all duration-300 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
