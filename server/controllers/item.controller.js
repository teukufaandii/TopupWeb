import Item from "../models/item.model.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    res.status(200).json({ items });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error in getAllItems controller",
        error: error.message,
      });
  }
};
