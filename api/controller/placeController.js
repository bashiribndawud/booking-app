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
    maxguest,
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
    maxguest,
  });

  return res.status(201).json(placeDoc)
};
