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

export const searchGames = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const games = await Game.aggregate([
      {
        $match: {
          isActive: true,
          $or: [
            { name: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
          ],
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ]);

    if (games.length === 0) {
      return res
        .status(404)
        .json({ message: "No games found matching your search" });
    }

    const formattedGames = games.map((game) => ({
      _id: game._id,
      name: game.name,
      slug: game.slug,
      description: game.description,
      image: game.image,
    }));

    res.status(200).json({ games: formattedGames });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
