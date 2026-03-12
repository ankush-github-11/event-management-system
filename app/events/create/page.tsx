"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventInput } from "@/lib/validators/event.schema";

export default function CreateEventPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      agenda: [""],
      tags: [""],
    },
  });

  // Dynamic agenda fields
  const {
    fields: agendaFields,
    append: appendAgenda,
    remove: removeAgenda,
  } = useFieldArray({
    control,
    name: "agenda",
  });

  // Dynamic tag fields
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit = async (data: EventInput) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("overview", data.overview);
      formData.append("venue", data.venue);
      formData.append("location", data.location);
      formData.append("date", data.date);
      formData.append("mode", data.mode);
      formData.append("audience", data.audience);
      formData.append("organizer", data.organizer);
      formData.append("agenda", JSON.stringify(data.agenda));
      formData.append("tags", JSON.stringify(data.tags));

      const imageFile =
        data.image instanceof FileList
          ? data.image[0]
          : Array.isArray(data.image)
            ? data.image[0]
            : data.image;

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Title */}
        <div>
          <p>Title</p>
          <input
            placeholder="Event Title"
            {...register("title")}
            className="w-full border p-2 rounded"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <p>Description</p>
          <textarea
            placeholder="Description"
            {...register("description")}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Overview */}
        <div>
          <p>Overview</p>
          <textarea
            placeholder="Overview"
            {...register("overview")}
            className="w-full border p-2 rounded"
          />
          {errors.overview && (
            <p className="text-red-500">{errors.overview.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <p>Image</p>
          <input
            type="file"
            accept="image/*"
            placeholder="Image URL"
            {...register("image")}
            className="w-full border p-2 rounded"
          />
          {errors.image && <p className="text-red-500">{String(errors.image.message)}</p>}
        </div>

        {/* Venue */}
        <div>
          <p>Venue</p>
          <input
            placeholder="Venue"
            {...register("venue")}
            className="w-full border p-2 rounded"
          />
          {errors.venue && <p className="text-red-500">{errors.venue.message}</p>}
        </div>

        {/* Location */}
        <div>
          <p>Location</p>
          <input
            placeholder="Location"
            {...register("location")}
            className="w-full border p-2 rounded"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <p>Date</p>
          <input
            type="datetime-local"
            {...register("date")}
            className="w-full border p-2 rounded"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        {/* Mode */}
        <div>
          <p>Mode</p>

          <label className="mr-4">
            <input type="radio" value="online" {...register("mode")} /> Online
          </label>

          <label className="mr-4">
            <input type="radio" value="offline" {...register("mode")} /> Offline
          </label>

          <label>
            <input type="radio" value="hybrid" {...register("mode")} /> Hybrid
          </label>

          {errors.mode && <p className="text-red-500">{errors.mode.message}</p>}
        </div>

        {/* Audience */}
        <div>
          <p>Audience</p>
          <input
            placeholder="Audience"
            {...register("audience")}
            className="w-full border p-2 rounded"
          />
          {errors.audience && (
            <p className="text-red-500">{errors.audience.message}</p>
          )}
        </div>

        {/* Agenda */}
        <div>
          <p>Agenda</p>

          {agendaFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`agenda.${index}`)}
                className="flex-1 border p-2 rounded"
                placeholder="Agenda item"
              />

              <button
                type="button"
                onClick={() => removeAgenda(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendAgenda("")}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Agenda
          </button>

          {errors.agenda && (
            <p className="text-red-500">{errors.agenda.message}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <p>Tags</p>

          {tagFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`tags.${index}`)}
                className="flex-1 border p-2 rounded"
                placeholder="Tag"
              />

              <button
                type="button"
                onClick={() => removeTag(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendTag("")}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Tag
          </button>
        </div>

        {/* Organizer */}
        <div>
          <p>Organizer</p>
          <input
            placeholder="Organizer"
            {...register("organizer")}
            className="w-full border p-2 rounded"
          />
          {errors.organizer && (
            <p className="text-red-500">{errors.organizer.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          disabled={isSubmitting}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
