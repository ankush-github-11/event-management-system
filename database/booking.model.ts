import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

/**
 * TypeScript Interface
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema
 */
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          // RFC 5322 compliant email validation regex
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * ✅ Fixed Pre-Save Middleware (Mongoose v7+)
 * Removed next() and using throw instead
 */
BookingSchema.pre('save', async function () {
  const booking = this as IBooking;

  if (booking.isModified('eventId') || booking.isNew) {
    try {
      const eventExists = await Event.findById(booking.eventId).select('_id');

      if (!eventExists) {
        const error = new Error(
          `Event with ID ${booking.eventId} does not exist`
        );
        error.name = 'ValidationError';
        throw error;
      }
    } catch {
      const validationError = new Error(
        'Invalid event ID format or database error'
      );
      validationError.name = 'ValidationError';
      throw validationError;
    }
  }
});

/**
 * Indexes
 */

// Faster queries by event
BookingSchema.index({ eventId: 1 });

// Event bookings sorted by latest
BookingSchema.index({ eventId: 1, createdAt: -1 });

// Lookup bookings by email
BookingSchema.index({ email: 1 });

// Enforce one booking per event per email
BookingSchema.index(
  { eventId: 1, email: 1 },
  { unique: true, name: 'uniq_event_email' }
);

/**
 * Export Model
 */
const Booking =
  models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
