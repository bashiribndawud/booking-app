import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    checkIn: Date,
    checkOut: Date,
    numberOfGuest: Number,
    name: String,
    email: String,
    phone: String,
    price: Number,
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Bookings", bookingSchema);
export default bookingModel;
