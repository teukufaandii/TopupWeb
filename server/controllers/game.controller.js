import Game from "../models/game.model.js";

export const getAllGames = async (req, res) => {
  try {
    const games = await Game.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
    ]);

    res.status(200).json({ games });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getGamesByPopularity = async (req, res) => {
  try {
    const games = await Game.aggregate([
      {
        $match: {
          isPopular: true,
          $and: [{ isActive: true }],
        },
      },
      {
        $sort: {
          name: -1,
        },
      },
      {
        $limit: 5,
      },
    ]).allowDiskUse(true);

    res.status(200).json({ games });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
};
