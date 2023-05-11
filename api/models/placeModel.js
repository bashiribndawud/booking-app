import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    owners: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    address: String,
    addedPhotos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkin: Number,
    checkout: Number,
    maxGuest: Number,
    price: Number,
  },
  { timestamps: true }
);

const placeModel = mongoose.model("Place", placeSchema);
export default placeModel;
