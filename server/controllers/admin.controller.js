import Game from "../models/game.model.js";
import Item from "../models/item.model.js";

import Game from "../models/game.model.js";
import Item from "../models/item.model.js";

export const createItem = async (req, res) => {
  try {
    let { gameId, name, price, isDiscount, discount, discountValue, category } =
      req.body;

    if (!gameId || !name || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof price !== "number" || price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    if (isDiscount) {
      if (!["percentage", "flat"].includes(discount)) {
        return res.status(400).json({ message: "Invalid discount type" });
      }

      if (typeof discountValue !== "number" || discountValue < 0) {
        return res
          .status(400)
          .json({ message: "Discount value must be a positive number" });
      }

      if (discount === "percentage" && discountValue > 100) {
        return res
          .status(400)
          .json({ message: "Discount cannot be more than 100%" });
      }

      if (discount === "flat" && discountValue > price) {
        return res
          .status(400)
          .json({ message: "Discount cannot be more than the price" });
      }
    } else {
      discount = null;
      discountValue = null;
    }

    const item = await Item.create({
      gameId,
      name,
      price,
      isDiscount,
      discount,
      discountValue,
      category,
    });

    res.status(201).json({ message: "Item created successfully", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    let { gameId, name, price, isDiscount, discount, discountValue, category } =
      req.body;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (gameId) {
      const gameExists = await Game.findById(gameId);
      if (!gameExists) {
        return res.status(404).json({ message: "Game not found" });
      }
    }

    if (price !== undefined && (typeof price !== "number" || price <= 0)) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    if (isDiscount) {
      if (!["percentage", "flat"].includes(discount)) {
        return res.status(400).json({ message: "Invalid discount type" });
      }

      if (typeof discountValue !== "number" || discountValue < 0) {
        return res
          .status(400)
          .json({ message: "Discount value must be a positive number" });
      }

      if (discount === "percentage" && discountValue > 100) {
        return res
          .status(400)
          .json({ message: "Discount cannot be more than 100%" });
      }

      if (discount === "flat" && discountValue > price) {
        return res
          .status(400)
          .json({ message: "Discount cannot be more than the price" });
      }
    } else {
      discount = null;
      discountValue = null;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        gameId,
        name,
        price,
        isDiscount,
        discount,
        discountValue,
        category,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
