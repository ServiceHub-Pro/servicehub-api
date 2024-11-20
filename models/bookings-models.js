import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const bookingSchema = new Schema(
  {
    service: { type: Types.ObjectId, ref: "Service", required: true }, // References the Service model
    date: { type: String, required: true }, // Booking date
    time: { type: String, required: true }, // Booking time
    user: { type: Types.ObjectId, ref: "User", required: true }, // References the User model
    provider: { type: Types.ObjectId, ref: "Provider", required: true }, // References the Provider model
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Apply the toJSON plugin
bookingSchema.plugin(toJSON);

// Export the Booking model
export const BookingModel = model("Booking", bookingSchema);
