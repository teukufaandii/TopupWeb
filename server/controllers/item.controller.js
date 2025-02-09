import Game from "../models/game.model.js";
import Item from "../models/item.model.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({
      message: "Error in getAllItems controller",
      error: error.message,
    });
  }
};

export const getItemsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const items = await Game.find({ slug }).populate("items");

    if (!items) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ items });
  } catch (error) {
    console.log("Error in getItemsBySlug controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
