import connectDB from "./mongodb";
import Event from "@/database/event.model";
export async function getEvents() {
  await connectDB();

  const events = await Event.find().lean();
  return events.map((event) => ({
    ...event,
    _id: event._id.toString(),
    createdAt: event.createdAt?.toISOString(),
    updatedAt: event.updatedAt?.toISOString(),
  }));
}
export async function getEventBySlug(slug: string){
    await connectDB();
    const event = await Event.findOne({ slug }).lean();
    return JSON.parse(JSON.stringify(event));
}