import bookingModel from "../models/bookingModel.js";
import BookingModel from "../models/bookingModel.js";
import { sendMail } from "../utils/mailSender.js";

export const NewBooking = async (req, res) => {
  try {
    const {
      checkIn,
      checkOut,
      name,
      email,
      phone,
      placeId,
      numberOfGuest,
      price,
    } = req.body;
    if (!checkIn || !checkOut || !name || !email || !phone || !numberOfGuest) {
      return res.status(400).json({ msg: "Please provide all data fields" });
    }
    const { _id } = req.user;
    const newBookingDoc = await BookingModel.create({
      checkIn,
      checkOut,
      name,
      email,
      phone,
      placeId,
      numberOfGuest,
      price,
      userId: _id.toString(),
    });

    // send mail to user
    if (newBookingDoc) {
      const text = "Thanks for booking";
      const emailPromise = sendMail(email, name, text);
      emailPromise
        .then((resp) => {
          return res.status(201).json({ msg: resp, newBookingDoc });
        })
        .catch((error) => {
          return res.status(400).joson(error);
        });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const AllBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await bookingModel
      .find({ userId: _id.toString() })
      .populate("placeId");
    if(bookings){
      return res.status(200).json(bookings)
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
