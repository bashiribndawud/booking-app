import { handleError } from "vue";
import placeModel from "../models/placeModel.js";

export const addNewPlace = async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkin,
    checkout,
    maxGuest,
    price
  } = req.body;
  const { id } = req.user;
  const placeDoc = await placeModel.create({
    owners: id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkin,
    checkout,
    maxGuest,
    price
  });

  return res.status(201).json(placeDoc);
};

export const getAllUserPlaces = async (req, res) => {
  try {
    const { id } = req.user;
    const allPlacess = await placeModel.find({ owners: id });
    if (allPlacess) {
      return res.status(200).json(allPlacess);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getOnePlace = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ msg: "Id not provided" });
    }
    const place = await placeModel.findById(id);
    if (place) {
      return res.status(200).json(place);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updatePlace = async (req, res) => {
  try {
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkin,
      checkout,
      maxGuest,
      price
    } = req.body;
    const { id } = req.params;
    const { id: userId } = req.user;
    const placeDoc = await placeModel.findById(id);
    placeDoc.set(req.body);
    await placeDoc.save();
    return res.status(200).json('Ok')
  } catch (error) {}
};

export const getAllPlaces = async (req, res) => {
  const places = await placeModel.find();
  return res.status(200).json(places)
}
